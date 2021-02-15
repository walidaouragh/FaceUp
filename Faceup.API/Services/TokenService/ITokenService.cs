using System.Threading.Tasks;
using Faceup.API.Entities;

namespace Faceup.API.Services
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}