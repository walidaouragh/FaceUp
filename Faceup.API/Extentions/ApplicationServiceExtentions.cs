using Faceup.API.Data;
using Faceup.API.Services;
using Faceup.API.Services.TokenService;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Faceup.API.Repositories;
using AutoMapper;
using Faceup.API.Helpers;

namespace Faceup.API.Extentions
{
    public static class ApplicationServiceExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt => opt.UseSqlServer(config.GetConnectionString("DefaultConnection")));

            services.AddScoped<ITokenService, TokenService>();

            services.AddScoped<IUserRepository, UserRepository>();

            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            return services;
        }
    }
}