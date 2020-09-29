using System;
using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

         protected override void OnModelCreating(ModelBuilder builder){
             
            if (builder == null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            builder.ApplyConfiguration(new AppUserConfigurations());
            base.OnModelCreating(builder);
         }
    }
}