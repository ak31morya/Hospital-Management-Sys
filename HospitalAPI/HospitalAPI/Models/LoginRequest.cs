using System.ComponentModel.DataAnnotations;

namespace HospitalAPI.Models
{
    public class LoginRequest
    {
        [Key]
        public string DoctorUserName { get; set; }
        public string DoctorPassword { get; set; }
    }
}
