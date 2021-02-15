using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Faceup.API.Data
{
    public class AppUserConfigurations : IEntityTypeConfiguration<AppUser>
    {

        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.HasKey(k => k.Id);
            builder.HasMany(d => d.Photos)
                .WithOne(p => p.AppUser)
                .HasForeignKey(d => d.PhotoId);
        }
    }
}
