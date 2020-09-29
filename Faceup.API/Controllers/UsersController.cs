using System.Collections.Generic;
using System.Threading.Tasks;
using Faceup.API.Data;
using Faceup.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<AppUser>> GetUser(int userId)
        {
            return await _context.Users.FindAsync(userId);
        }
    }
}