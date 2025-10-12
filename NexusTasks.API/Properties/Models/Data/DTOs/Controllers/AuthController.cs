using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexusTasks.API.Data;
using NexusTasks.API.DTOs;
using NexusTasks.API.Models;
using NexusTasks.API.Services;

namespace NexusTasks.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly AuthService _authService;

        public AuthController(ApplicationDbContext context, AuthService authService)
        {
            _context = context;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
            {
                return BadRequest(new { message = "Username already exists" });
            }

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = _authService.HashPassword(dto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _authService.GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role
                }
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !_authService.VerifyPassword(dto.Password, user.PasswordHash))
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            var token = _authService.GenerateJwtToken(user);

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role
                }
            });
        }
    }
}