using ezyshare_calendar.Context;
using ezyshare_calendar.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Reflection.PortableExecutable;

namespace ezyshare_calendar.Pages;
 
public class IndexModel : PageModel
{
  public List<Expo> Expo { get; set; }

  private readonly IConfiguration _configuration;
  private readonly AppDbContext _dbContext;

  public IndexModel(IConfiguration configuration)
  {
    _configuration = configuration;
    _dbContext = new AppDbContext(_configuration);
  }

  public void OnGet()
  {
    var query = "SELECT TOP (1000) * FROM [dbo].[tb_expo] WHERE organizer_code = 'OUNYZV' AND deleteind <> 'X'";
    query = query.Replace(Environment.NewLine, "").Replace("\r", "").Replace("\n", ""); // Remove line breaks

    using (var command = _dbContext.Database.GetDbConnection().CreateCommand())
    {
      command.CommandText = query;
      command.CommandType = CommandType.Text;

      _dbContext.Database.OpenConnection();

      using (var reader = command.ExecuteReader())
      {
        Expo = new List<Expo>();

        while (reader.Read())
        {
          var expo = new Expo();

          expo.Id = reader.GetInt64(reader.GetOrdinal("Id"));
          expo.Exponame = reader.GetString(reader.GetOrdinal("exponame"));
          expo.Venue = reader.GetString(reader.GetOrdinal("venue"));
          expo.Expocode = reader.GetString(reader.GetOrdinal("expocode"));
          // Retrieve the DateTime value
          var fromDateValue = reader.GetDateTime(reader.GetOrdinal("fromdate"));
          var toDateValue = reader.GetDateTime(reader.GetOrdinal("todate"));

          // Convert the DateTime to string if needed
          expo.Fromdate = fromDateValue.ToString("yyyy-MM-dd");
          expo.Todate = toDateValue.ToString("yyyy-MM-dd");

          if (reader.IsDBNull(reader.GetOrdinal("organizer_code")))
          {
            expo.organizer_code = string.Empty; // Or handle it as desired
          }
          else
          {
            expo.organizer_code = reader.GetString(reader.GetOrdinal("organizer_code"));
          }

          Expo.Add(expo);
        }
      }
    }
  }

  /*
  public void OnGet()
  {
    var query = "SELECT TOP (1000) * FROM [dbo].[tb_expo] WHERE organizer_code = 'OUNYZV' AND deleteind <> 'X' AND todate BETWEEN GETDATE() AND DATEADD(MONTH, 1, GETDATE())";
    query = query.Replace(Environment.NewLine, "").Replace("\r", "").Replace("\n", ""); // Remove line breaks
    Expo = _dbContext.Expo.FromSqlRaw(query).ToList();
  }*/
}
