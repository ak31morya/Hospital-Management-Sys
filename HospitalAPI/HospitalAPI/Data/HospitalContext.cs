using HospitalAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Numerics;

namespace HospitalAPI.Data
{
    public class HospitalContext : DbContext
    {
        public HospitalContext(DbContextOptions<HospitalContext> options) : base(options) { }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
    }
}
