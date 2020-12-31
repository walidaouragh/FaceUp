using System.Collections.Generic;
using System.Threading.Tasks;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Extentions;
using Faceup.API.Helpers;
using Faceup.API.Repositories;
using Faceup.API.Repositories.LikeRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Faceup.API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly ILikesRepository _likesRepository;
        private readonly IUserRepository _userRepository;
        public LikesController(ILikesRepository likesRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _likesRepository = likesRepository;
        }

        [HttpPost("{userName}")]
        public async Task<ActionResult> AddLike(string userName)
        {
            var likerId = User.GetUserId();
            var likee = await _userRepository.GetUserByUsername(userName);
            var liker = await _likesRepository.GetUserWithLikes(likerId);

            if (likee == null)
            {
                return NotFound();
            }

            if (liker.UserName == userName)
            {
                return BadRequest("You cannot like yourself");
            }

            var userLike = await _likesRepository.GetUserLike(likerId, likee.UserId);
            if (userLike != null)
            {
                return BadRequest("You already like this user");
            }

            userLike = new UserLike()
            {
                LikerId = likerId,
                LikeeId = likee.UserId,
            };

            liker.Likees.Add(userLike);

            if (await _userRepository.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(likesParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}