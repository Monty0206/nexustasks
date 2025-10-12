import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';

export default function TaskCard({ task, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-3 hover:border-blue-500/50 transition-all group"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-5 h-5 text-gray-500" />
        </div>

        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2">{task.title}</h4>
          {task.description && (
            <p className="text-gray-400 text-sm mb-3">{task.description}</p>
          )}
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded border ${priorityColors[task.priority] || priorityColors.Medium}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}