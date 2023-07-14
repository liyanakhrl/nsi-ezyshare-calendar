using ezyshare_calendar.Context;  
using Microsoft.EntityFrameworkCore; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();


// Add services to the container.
builder.Services.AddRazorPages();

// Add your AppDbContext service registration here
var connectionString = "Data Source=misoplatform.database.windows.net;Initial Catalog=ISOERP_PLATFORM_SCLUB2UEXPO_LICENSE;User Id=officemisoplatform;Password=office#misoplatform#123456;";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
