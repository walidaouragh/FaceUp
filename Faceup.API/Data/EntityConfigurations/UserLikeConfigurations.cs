using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Faceup.API.Data.EntityConfigurations
{
    public class UserLikeConfigurations : IEntityTypeConfiguration<UserLike>
    {
        public void Configure(EntityTypeBuilder<UserLike> builder)
        {
            builder.HasKey(k => new {k.LikerId, k.LikeeId});

            builder.HasOne(d => d.Liker)
            .WithMany(p => p.Likees)
            .HasForeignKey(s => s.LikerId)
            .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(d => d.Likee)
            .WithMany(p => p.Likers)
            .HasForeignKey(s => s.LikeeId)
            .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
