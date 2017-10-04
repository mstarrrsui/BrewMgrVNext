using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrewMgrCore.Utilities;
using Microsoft.EntityFrameworkCore;

namespace BrewMgrCore.Model
{
    public class HopRepository : EntityFrameworkRepository<IngredientsContext, Hop>
    {
        public HopRepository(IngredientsContext context) : base(context)
        {
        }

        public async Task<Hop> SaveHop(Hop postedHop)
        {
            int id = postedHop.Id;
            Hop hop;

            if (id < 0)
                hop = Create();
            else
            {
                hop = await Load(id);
                if (hop == null)
                    hop = Create();
            }

            DataUtils.CopyObjectData(postedHop, hop);

            //now lets save it all
            if (!await SaveAsync())
                return null;

            return hop;
        }

    /// <summary>
    /// Hop look up by name - used for auto-complete box returns
    /// </summary>
    /// <param name="search"></param>
    /// <returns></returns>
    public async Task<List<Hop>> HopLookup(string search = null)
    {
        if (string.IsNullOrEmpty(search))
            return new List<Hop>();


        var term = search.ToLower();
        return await Context.Hops
            .Where(h => h.Name.ToLower().StartsWith(term))
            .ToListAsync();
    }

        public async Task<bool> DeleteHop(int id)
        {
            using (var tx = Context.Database.BeginTransaction())
            {

                var hop = await Context.Hops
                    .FirstOrDefaultAsync(a => a.Id == id);

                if (hop == null)
                {
                    SetError("Invalid hop id.");
                    return false;
                }

                Context.Hops.Remove(hop);

                var result = await SaveAsync();
                if (result)
                    tx.Commit();

                return result;
            }
        }
    }
}
