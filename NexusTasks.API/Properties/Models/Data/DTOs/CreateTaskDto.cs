namespace NexusTasks.API.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public string Priority { get; set; } = "Medium";
        public DateTime? DueDate { get; set; }
    }
}