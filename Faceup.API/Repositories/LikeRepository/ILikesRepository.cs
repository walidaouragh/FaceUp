using System.Threading.Tasks;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Helpers;

namespace Faceup.API.Repositories.LikeRepository
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int likerId, int likeeId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    }
}