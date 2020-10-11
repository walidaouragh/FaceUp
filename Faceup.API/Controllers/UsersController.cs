using System.Collections.Generic;
using System.Threading.Tasks;
using Faceup.API.Data;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [Authorize]
        [HttpGet("{userId}")]
        public async Task<ActionResult<AppUser>> GetUser(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }
    }
}