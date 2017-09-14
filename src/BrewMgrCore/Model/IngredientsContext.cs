using Microsoft.EntityFrameworkCore;

namespace BrewMgrCore.Model
{
    public class IngredientsContext : DbContext
    {
        public IngredientsContext(DbContextOptions<IngredientsContext> options)
            : base(options)
        {
        }

        public DbSet<Hop> Hops { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Hop>().HasKey(x => x.Id);
            modelBuilder.Entity<Hop>().Property(x => x.Id).ValueGeneratedNever();
        }

    }
}