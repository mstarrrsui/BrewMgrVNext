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

            if (id < 1)
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
