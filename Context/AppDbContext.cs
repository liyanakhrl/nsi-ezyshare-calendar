using ezyshare_calendar.Model;
using Microsoft.EntityFrameworkCore;

namespace ezyshare_calendar.Context
{
  public class AppDbContext : DbContext
  {
    private readonly IConfiguration _configuration;

    public AppDbContext(IConfiguration configuration)
    {
      _configuration = configuration;
    }

   

    public DbSet<Expo> Expo { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseSqlServer("Data Source=misoplatform.database.windows.net; Initial Catalog=ISOERP_PLATFORM_SCLUB2UEXPO_LICENSE;User Id=officemisoplatform;Password=office#misoplatform#123456");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Expo>().HasKey(e => e.Id);
    }
  }
}
