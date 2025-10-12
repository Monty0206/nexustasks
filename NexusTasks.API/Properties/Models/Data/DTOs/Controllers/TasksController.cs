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
    public class TasksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TasksController(ApplicationDbContext context)
        {
            _context = context;
        }

        private int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var userId = GetUserId();
            var tasks = await _context.Tasks
                .Where(t => t.AssignedToId == userId)
                .Include(t => t.Project)
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var userId = GetUserId();
            var task = await _context.Tasks
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == id && t.AssignedToId == userId);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
        {
            var userId = GetUserId();

            // Verify project exists and user owns it
            var project = await _context.Projects.FirstOrDefaultAsync(p => p.Id == dto.ProjectId && p.OwnerId == userId);
            if (project == null)
            {
                return BadRequest(new { message = "Invalid project" });
            }

            var task = new TaskItem
            {
                Title = dto.Title,
                Description = dto.Description,
                ProjectId = dto.ProjectId,
                Priority = dto.Priority,
                DueDate = dto.DueDate,
                AssignedToId = userId,
                Status = "Todo"
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] CreateTaskDto dto)
        {
            var userId = GetUserId();
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.AssignedToId == userId);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            task.Title = dto.Title;
            task.Description = dto.Description;
            task.Priority = dto.Priority;
            task.DueDate = dto.DueDate;

            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpPatch("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] string status)
        {
            var userId = GetUserId();
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.AssignedToId == userId);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            task.Status = status;
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = GetUserId();
            var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id && t.AssignedToId == userId);

            if (task == null)
            {
                return NotFound(new { message = "Task not found" });
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}