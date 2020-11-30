using System.Security.Claims;

namespace Faceup.API.Extentions
{
    public static class ClaimsPrincipalExtentions
    {
        public static object User { get; private set; }

        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}