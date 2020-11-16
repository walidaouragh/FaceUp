using System.ComponentModel.DataAnnotations.Schema;

namespace Faceup.API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int PhotoId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        public int UserId { get; set; }
    }
}