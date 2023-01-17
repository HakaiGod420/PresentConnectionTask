using System.ComponentModel.DataAnnotations;

namespace BackEnd.Data.Dtos.Game
{
    public record CreateGameDtos(
        [Required]
        [StringLength(100, ErrorMessage = "The GameName value cannot exceed 100 characters. ")]
        string GameName, 
        [Required]
        [StringLength(100, ErrorMessage = "The CompanyName value cannot exceed 100 characters. ")]
        string CompanyName, 
        [Required]
        double? Price, 
        [Required]
        [StringLength(1000, ErrorMessage = "The Summary value cannot exceed 1000 characters. ")]
        string Summary, 
        [Required] DateTime? ReleaseDate);
}
