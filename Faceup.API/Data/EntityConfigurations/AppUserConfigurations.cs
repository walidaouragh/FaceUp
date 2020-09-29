using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Faceup.API.Data
{
    public class AppUserConfigurations : IEntityTypeConfiguration<AppUser>
    {
    
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(k => k.UserId);
        }
    }
}