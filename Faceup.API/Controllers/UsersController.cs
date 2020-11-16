using System.Collections.Generic;
using System.Threading.Tasks;
using Faceup.API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Faceup.API.Repositories;
using Faceup.API.DTOs;
using AutoMapper;

namespace Faceup.API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
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

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByName(string username)
        {
            var user = await _userRepository.GetMember(username);

            return Ok(user);
        }
    }
}