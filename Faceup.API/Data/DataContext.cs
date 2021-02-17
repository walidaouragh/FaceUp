using System;
using Faceup.API.Data.EntityConfigurations;
using Faceup.API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Data
{
    public class DataContext : IdentityDbContext<
                            AppUser,
                            AppRole,
                            int,
                            IdentityUserClaim<int>,
                            AppUserRole,
                            IdentityUserLogin<int>,
                            IdentityRoleClaim<int>,
                            IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){

        if (builder == null)
        {
            throw new ArgumentNullException(nameof(builder));
        }

        base.OnModelCreating(builder);

        builder.ApplyConfiguration(new UserIdentityConfigurations());
        builder.ApplyConfiguration(new RoleIdentityConfigurations());
        builder.ApplyConfiguration(new AppUserConfigurations());
        builder.ApplyConfiguration(new PhotosConfigurations());
        builder.ApplyConfiguration(new UserLikeConfigurations());
        builder.ApplyConfiguration(new MessagesConfigurations());
        }
    }
}
