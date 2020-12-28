using Faceup.API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Faceup.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}