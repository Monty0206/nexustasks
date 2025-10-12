namespace NexusTasks.API.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = "Todo"; // Todo, InProgress, Done
        public string Priority { get; set; } = "Medium"; // Low, Medium, High
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        
        // Foreign Keys
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
        
        public int AssignedToId { get; set; }
        public User AssignedTo { get; set; } = null!;
    }
}