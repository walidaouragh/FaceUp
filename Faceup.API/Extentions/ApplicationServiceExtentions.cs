using Faceup.API.Data;
using Faceup.API.Services;
using Faceup.API.Services.TokenService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Faceup.API.Repositories;
using AutoMapper;
using Faceup.API.Helpers;
using Faceup.API.Services.PhotoService;
using Faceup.API.Repositories.PhotoRepository;
using Faceup.API.Repositories.LikeRepository;

namespace Faceup.API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

            services.AddDbContext<DataContext>(opt => opt.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<IPhotoService, PhotoService>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddScoped<IPhotoRepository, PhotoRepository>();

            services.AddScoped<ILikesRepository, LikesRepository>();

            services.AddScoped<LogUserActivity>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            return services;
        }
    }
}