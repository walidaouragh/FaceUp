using System.Linq;
using AutoMapper;
using Faceup.API.DTOs;
using Faceup.API.Entities;
using Faceup.API.Extentions;

namespace Faceup.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();

            CreateMap<MemberUpdateDto, AppUser>()
                .ForMember(dest => dest.Introduction, opt => opt.MapFrom(src => src.Description));

            CreateMap<RegisterDto, AppUser>();
        }
    }
}