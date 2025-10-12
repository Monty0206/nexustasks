namespace NexusTasks.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        public string Status { get; set; } = "Active"; // Active, Completed, Archived
        
        // Foreign Key
        public int OwnerId { get; set; }
        public User Owner { get; set; } = null!;
        
        // Navigation properties
        public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}