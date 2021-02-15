using System.Linq;
using System.Threading.Tasks;
using Faceup.API.Data;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Extentions;
using Faceup.API.Helpers;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Repositories.LikeRepository
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;
        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int likerId, int likeeId)
        {
            return await _context.Likes.FindAsync(likerId, likeeId);
        }

        public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likesParams.Predicate == "liked")
            {
                likes = likes.Where(x => x.LikerId == likesParams.Id);
                users = likes.Select(x => x.Likee);
            }

            if (likesParams.Predicate == "likedBy")
            {
                likes = likes.Where(x => x.LikeeId == likesParams.Id);
                users = likes.Select(x => x.Liker);
            }

            var likedUsers = users.Select(user => new LikeDto()
            {
                Id = user.Id,
                UserName = user.UserName,
                Age = user.DateOfBirth.CalculateAge(),
                KnownAs = user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(f => f.IsMain).Url,
                City = user.City,
            });

            return await PagedList<LikeDto>.Create(likedUsers, likesParams.PageNumber, likesParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLikes(int userId)
        {
            return await _context.Users.Include(x => x.Likees).FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
