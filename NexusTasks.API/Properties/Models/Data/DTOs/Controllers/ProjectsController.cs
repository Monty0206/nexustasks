using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NexusTasks.API.Data;
using NexusTasks.API.DTOs;
using NexusTasks.API.Models;
using System.Security.Claims;

namespace NexusTasks.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProjectsController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var userId = GetUserId();
            var projects = await _context.Projects
                .Where(p => p.OwnerId == userId)
                .Include(p => p.Tasks)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Status,
                    p.CreatedAt,
                    p.DueDate,
                    taskCount = p.Tasks.Count,
                    completedTasks = p.Tasks.Count(t => t.Status == "Done")
                })
                .ToListAsync();

            return Ok(projects);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var userId = GetUserId();
            var project = await _context.Projects
                .Include(p => p.Tasks)
                .FirstOrDefaultAsync(p => p.Id == id && p.OwnerId == userId);

            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            return Ok(project);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProjectDto dto)
        {
            var userId = GetUserId();

            var project = new Project
            {
                Name = dto.Name,
                Description = dto.Description,
                DueDate = dto.DueDate,
                OwnerId = userId,
                Status = "Active"
            };

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, [FromBody] CreateProjectDto dto)
        {
            var userId = GetUserId();
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id && p.OwnerId == userId);

            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            project.Name = dto.Name;
            project.Description = dto.Description;
            project.DueDate = dto.DueDate;

            await _context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var userId = GetUserId();
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == id && p.OwnerId == userId);

            if (project == null)
            {
                return NotFound(new { message = "Project not found" });
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}