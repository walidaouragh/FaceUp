using Faceup.API.Entities;

namespace Faceup.API.Services
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}