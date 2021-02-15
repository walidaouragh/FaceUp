using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Faceup.API.Data.EntityConfigurations
{
    public class RoleIdentityConfigurations : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.HasMany(ur => ur.UserRoles)
                   .WithOne(u => u.Role)
                   .HasForeignKey(ur => ur.RoleId)
                   .IsRequired();
        }
    }
}