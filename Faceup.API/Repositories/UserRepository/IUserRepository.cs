using System.Collections.Generic;
using System.Threading.Tasks;
using Faceup.API.DTOs;
using Faceup.API.Entities;

namespace Faceup.API.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<AppUser>> GetUsers();
        Task<AppUser> GetUserById(int userId);
        Task<AppUser> GetUserByUsername(string username);
        void Update(AppUser user);
        Task<bool> SaveAll();
        Task<IEnumerable<MemberDto>> GetMembers();
        Task<MemberDto> GetMember(string username);
        Task UpdateUser(AppUser user);
    }
}