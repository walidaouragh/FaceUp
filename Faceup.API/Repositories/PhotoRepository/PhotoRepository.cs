using System.Linq;
using System.Threading.Tasks;
using Faceup.API.Data;
using Faceup.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace Faceup.API.Repositories.PhotoRepository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        public PhotoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task AddPhoto(string username, Photo photo)
        {
            var user = _context.Users.Where(x => x.UserName == username).FirstOrDefault();
            user.Photos.Add(photo);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePhoto(Photo photo)
        {
            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();
        }

        public async Task<Photo> GetPhotoById(int photoId)
        {
            return await _context.Photos.FirstOrDefaultAsync(p => p.PhotoId == photoId);
        }

        public async Task UpdatePhoto(int userId, Photo photo)
        {
            var currentMainPhoto = await _context.Photos.FirstOrDefaultAsync(p => p.IsMain && p.UserId == userId);
            if (currentMainPhoto !=null)
            {
                currentMainPhoto.IsMain = false;
                _context.Photos.Update(currentMainPhoto);
            }

            photo.IsMain = true;
            _context.Photos.Update(photo);
            
            await _context.SaveChangesAsync();
        }
    }
}