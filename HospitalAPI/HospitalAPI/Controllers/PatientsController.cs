using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalAPI.Data;
using HospitalAPI.Models;

namespace HospitalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly HospitalContext _context;

        public PatientsController(HospitalContext context)
        {
            _context = context;
        }

        // 1) Show all patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _context.Patients.ToListAsync();
        }

        // 2) Search By PatientId
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatientById(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            return patient != null ? Ok(patient) : NotFound("Patient not found");
        }

        // 3) Search Patient By HealthProblem
        [HttpGet("problem/{problem}")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientByHealthProblem(string problem)
        {
            var patients = await _context.Patients.Where(p => p.HealthProblem.Contains(problem)).ToListAsync();
            return patients.Any() ? Ok(patients) : NotFound("No patients found with this health problem");
        }

        // 4) Search Patients by DoctorId
        [HttpGet("doctor/{id}")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatientsByDoctor(int id)
        {
            var patients = await _context.Patients.Where(p => p.DoctorId == id).ToListAsync();
            return patients.Any() ? Ok(patients) : NotFound("No patients found for this doctor");
        }

        // 5) Add Patient
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient([FromBody] Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPatientById), new { id = patient.PatientId }, patient);
        }

        // 6) Update Patient
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, [FromBody] Patient patient)
        {
            if (id != patient.PatientId)
            {
                return BadRequest();
            }

            _context.Entry(patient).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // 7) Delete Patient
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PatientExists(int id)
        {
            return _context.Patients.Any(e => e.PatientId == id);
        }
    }
}
