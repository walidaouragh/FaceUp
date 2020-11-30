using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

namespace Faceup.API.Services.PhotoService
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhoto(IFormFile file);
        Task<DeletionResult> DeletePhoto(string publicId);
    };
}