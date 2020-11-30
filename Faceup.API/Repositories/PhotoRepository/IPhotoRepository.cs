using System.Threading.Tasks;
using Faceup.API.Entities;

namespace Faceup.API.Repositories.PhotoRepository
{
    public interface IPhotoRepository
    {
        Task AddPhoto(string username, Photo photo);
        Task DeletePhoto(Photo photo);
        Task<Photo> GetPhotoById(int photoId);
        Task UpdatePhoto(int userId, Photo photo);
    }
}