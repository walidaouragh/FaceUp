using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Faceup.API.Data.EntityConfigurations
{
    public class PhotosConfigurations : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.HasKey(k => k.PhotoId);

            builder.HasOne(d => d.AppUser)
                .WithMany(p => p.Photos)
                .HasForeignKey(d => d.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
