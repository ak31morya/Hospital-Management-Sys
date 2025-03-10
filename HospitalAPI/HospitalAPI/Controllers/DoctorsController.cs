using HospitalAPI.Data;
using HospitalAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly HospitalContext _context;
        private readonly IConfiguration _configuration;

        public DoctorsController(HospitalContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // 1) Show all doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        // 2) Search By DoctorId
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctorById(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            return doctor != null ? Ok(doctor) : NotFound("Doctor not found");
        }

        // 3) Search By Specialization
        [HttpGet("specialization/{spec}")]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctorBySpecialization(string spec)
        {
            var doctors = await _context.Doctors.Where(d => d.Speciality == spec).ToListAsync();
            return doctors.Any() ? Ok(doctors) : NotFound("No doctors found with this specialization");
        }

        // 4) Add Doctor
        [HttpPost]
        public async Task<IActionResult> AddDoctor([FromBody] Doctor doctor)
        {
            if (doctor == null) return BadRequest("Invalid Doctor Data");

            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDoctorById), new { id = doctor.DoctorId }, new { message = "Doctor added successfully!" });
        }

        // 5) Update Doctor
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorId)
            {
                return BadRequest();
            }

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // 6) Delete Doctor
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(int id)
        {
            return _context.Doctors.Any(e => e.DoctorId == id);
        }

        // 7) Doctor Login with JWT Authentication
        [HttpPost("login")]
        public async Task<IActionResult> DoctorLogin([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.DoctorUserName) || string.IsNullOrWhiteSpace(request.DoctorPassword))
            {
                return BadRequest("Username and Password are required.");
            }

            var doctor = await _context.Doctors
                .FirstOrDefaultAsync(d => d.DoctorUserName == request.DoctorUserName && d.DoctorPassword == request.DoctorPassword);

            if (doctor == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            // Get JWT settings from appsettings.json
            var jwtSettings = _configuration.GetSection("Jwt");
            var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
            var now = DateTime.UtcNow;
            var expires = now.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationMinutes"]));

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, doctor.DoctorUserName),
                    new Claim(ClaimTypes.Role, "Doctor")
                }),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                Expires = expires,
                NotBefore = now,
                IssuedAt = now,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                message = "Login successful",
                token = tokenString,
                
            });
        }

        // 8) Secure API Example (Requires JWT Authentication)
        [Authorize]
        [HttpGet("secure-data")]
        public IActionResult GetSecureData()
        {
            return Ok("This is a secure Protected Data.");
        }
    }
}
