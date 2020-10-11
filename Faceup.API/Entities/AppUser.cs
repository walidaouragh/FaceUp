namespace Faceup.API.Entities
{
    public class AppUser
    {
        public int UserId { get; set; }
        public string UserName { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}