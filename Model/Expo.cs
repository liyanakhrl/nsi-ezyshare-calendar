using System.Numerics;

namespace ezyshare_calendar.Model
{
  public class Expo
  {

    public Int64 Id { get; set; }

    public string organizer_code { get; set; }
    public string Expocode { get; set; }
    public string Exponame { get; set; }

    private string _expodesc;
    public string Expodesc
    {
      get => _expodesc;
      set => _expodesc = value ?? string.Empty; // Assign an empty string if the value is NULL
    }
    public string Fromdate { get; set; }
    public string Todate { get; set; }
    public string Banner { get; set; } 
    public bool DeleteInd { get; set; }
    public double Lat { get; set; }
    public double Long { get; set; }
    public string Venue { get; set; }
    public string CountryCode { get; set; }
    public string ExpoBannerPath { get; set; }
    public string ExpoBannerFilename { get; set; }
    public string Createdt { get; set; }
    public bool Chargeable { get; set; }
    public string Tbcdate { get; set; }
    public string AboutExpoBannerPath { get; set; }
    public string AboutExpoBannerFilename { get; set; }
  }
}
