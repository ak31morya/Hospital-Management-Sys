using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class Doctor
    {
        [Key]
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string Speciality { get; set; } // CARDIO/KIDNEY/LIVER/GENERAL/ENT
        public string Qualification { get; set; }
        public string DoctorUserName { get; set; }
        public string DoctorPassword { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }
    }
}
