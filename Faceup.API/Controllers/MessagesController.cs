using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Extentions;
using Faceup.API.Helpers;
using Faceup.API.Repositories;
using Faceup.API.Repositories.MessageRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Faceup.API.Controllers
{
    [Authorize]
    public class MessagesController : BaseApiController
    {
        private readonly IMessageRepository _messageRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public MessagesController(IMessageRepository messageRepository, IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _messageRepository = messageRepository;
        }

        [HttpPost]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUserName();

            if (username == createMessageDto.RecipientUsername.ToLower())
            {
                return BadRequest("You cannot send messages to your self");
            }

            var sender = await _userRepository.GetUserByUsername(username);

            var recipient = await _userRepository.GetUserByUsername(createMessageDto.RecipientUsername);

            if (recipient == null)
            {
                return NotFound();
            }

            var message = new Message()
            {
                Sender = sender,
                SenderUsername = sender.UserName,
                Recipient = recipient,
                RecipientUsername = recipient.UserName,
                Content = createMessageDto.Content
            };

            _messageRepository.AddMessage(message);

            if (await _messageRepository.SaveAllAsynch())
            {
                return Ok(_mapper.Map<MessageDto>(message));
            }

            return BadRequest("Failed to save message");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.Username = User.GetUserName();

            var messages = await _messageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages);

            return Ok(messages);
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUserName();

            var messages = await _messageRepository.GetMessageThread(currentUsername, username);

            return Ok(messages);
        }

        [HttpDelete("{messageId}")]
        public async Task<ActionResult> DeleteMessage(int messageId)
        {
            var username = User.GetUserName();
            var message = await _messageRepository.GetMessage(messageId);

            if (message.Sender.UserName != username && message.Recipient.UserName != username)
            {
                return Unauthorized();
            }

            if (message.Sender.UserName == username)
            {
                message.SenderDeleted = true;
            }

            if (message.Recipient.UserName == username)
            {
                message.RecipientDeleted = true;
            }

            if (message.RecipientDeleted && message.SenderDeleted)
            {
                _messageRepository.DeleteMessage(message);
            }

            if (await _messageRepository.SaveAllAsynch())
            {
                return Ok();
            }

            return BadRequest("Deleting message failed");
        }
    }
}