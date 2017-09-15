using System.Collections.Generic;
using System.Threading.Tasks;
using BrewMgrCore.Model;
using BrewMgrCore.Utilities.ErrorHandling;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace BrewMgrCore.Controllers
{
    [ServiceFilter(typeof(ApiExceptionFilter))]
    [EnableCors("CorsPolicy")]
    public class HopsController : Controller
    {

        private readonly IngredientsContext _context;
        private ILogger<HopsController> _logger;

        private HopRepository _hopRepo;

        public HopsController(IngredientsContext ctx, ILogger<HopsController> logger, HopRepository hopRepo)
        {
            _logger = logger;
            _context = ctx;

            _hopRepo = hopRepo;
        }

        [HttpGet]
        [Route("api/hops")]
        public async Task<IEnumerable<Hop>> GetAll()
        {
            _logger.LogInformation("GETTING HOPS....");
            return await _context.Hops.ToListAsync();
        }

        [HttpGet("api/hop/{id:int}")]
        public async Task<Hop> GetHop(int id)
        {
            _logger.LogInformation($"GETTING HOP ID {id}");

            return await _hopRepo.Load(id);
            
        }

        [HttpPost("api/hop")]
        public async Task<Hop> SaveHop([FromBody] Hop postedHop)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in to modify data", 401);

            if (!ModelState.IsValid)
                throw new ApiException("Model binding failed.", 500);

            if (!_hopRepo.Validate(postedHop))
                throw new ApiException(_hopRepo.ErrorMessage, 500, _hopRepo.ValidationErrors);

            // this doesn't work for updating the child entities properly
            //if(!await AlbumRepo.SaveAsync(postedAlbum))
            //    throw new ApiException(AlbumRepo.ErrorMessage, 500);

            var hop = await _hopRepo.SaveHop(postedHop);
            if (hop == null)
                throw new ApiException(_hopRepo.ErrorMessage, 500);

            return hop;
        }

        [HttpDelete("api/hop/{id:int}")]
        public async Task<bool> DeleteHop(int id)
        {
            //if (!HttpContext.User.Identity.IsAuthenticated)
            //    throw new ApiException("You have to be logged in to modify data", 401);

            return await _hopRepo.DeleteHop(id);
        }
    }
}