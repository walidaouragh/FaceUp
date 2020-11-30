using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Faceup.API.Repositories;
using Faceup.API.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Faceup.API.Extentions;
using Faceup.API.Services.PhotoService;
using Faceup.API.Entities;
using Faceup.API.Repositories.PhotoRepository;

namespace Faceup.API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IPhotoRepository _photoRepository;
        public UsersController(
            IUserRepository userRepository, 
            IMapper mapper, 
            IPhotoService photoService, 
            IPhotoRepository photoRepository)
        {
            _photoService = photoService;
            _mapper = mapper;
            _userRepository = userRepository;
            _photoRepository = photoRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {
            var users = await _userRepository.GetMembers();

            return Ok(users);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<MemberDto>> GetUserById(int userId)
        {
            var user = await _userRepository.GetUserById(userId);

            return Ok(_mapper.Map<MemberDto>(user));
        }

        [HttpGet("{username}", Name = "GetUserByName")]
        public async Task<ActionResult<MemberDto>> GetUserByName(string username)
        {
            var user = await _userRepository.GetMember(username);

            return Ok(user);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsername(User.GetUserName());

            _mapper.Map(memberUpdateDto, user);

            await _userRepository.UpdateUser(user);

            return Ok();
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _userRepository.GetUserByUsername(User.GetUserName());

            var result = await _photoService.AddPhoto(file);

            if (result.Error != null)
            {
                return BadRequest(result.Error.Message);
            };

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            await _photoRepository.AddPhoto(User.GetUserName(), photo);

            if (photo != null)
            {
                return CreatedAtRoute("GetUserByName", new {username = user.UserName},_mapper.Map<PhotoDto>(photo));
            }

            return BadRequest("Problem adding photo");
        }

        [HttpDelete("photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var photo = await _photoRepository.GetPhotoById(photoId);

            if (photo == null)
            {
                return NotFound();
            }

            if (photo.IsMain)
            {
                return BadRequest("You cannot delete main photo");
            }

            if (photo.PublicId != null)
            {
               var result = await _photoService.DeletePhoto(photo.PublicId); 
               if (result.Error != null)
               {
                    return BadRequest(result.Error.Message);
               }
            }

            await _photoRepository.DeletePhoto(photo);

            return Ok();
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult<PhotoDto>> SetMainPhoto(int photoId)
        {
            var user = await _userRepository.GetUserByUsername(User.GetUserName());
            var photo = await _photoRepository.GetPhotoById(photoId);

            if (photo.IsMain)
            {
                return BadRequest("This is already your main photo");
            }


            await _photoRepository.UpdatePhoto(user.UserId, photo);

            return NoContent();
        }
    }
}