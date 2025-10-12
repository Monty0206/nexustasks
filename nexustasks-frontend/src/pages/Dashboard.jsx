import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, LogOut, Trash2 } from 'lucide-react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '', dueDate: '' });
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    projectId: '',
    dueDate: '',
  });

  const token = localStorage.getItem('token');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProjects();
    fetchTasks();
  }, [user]);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5121/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5121/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5121/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        fetchProjects();
        setShowProjectModal(false);
        setNewProject({ name: '', description: '', dueDate: '' });
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5121/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        fetchTasks();
        setShowTaskModal(false);
        setNewTask({
          title: '',
          description: '',
          priority: 'Medium',
          status: 'To Do',
          projectId: '',
          dueDate: '',
        });
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`http://localhost:5121/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchProjects();
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      const response = await fetch(`http://localhost:5121/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    try {
      const response = await fetch(`http://localhost:5121/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...task,
          status: newStatus,
        }),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
        );
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getTasksByStatus = (status) => tasks.filter((task) => task.status === status);

  const stats = {
    projects: projects.length,
    todo: getTasksByStatus('To Do').length,
    inProgress: getTasksByStatus('In Progress').length,
    completed: getTasksByStatus('Done').length,
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s',
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-bold text-2xl"></span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">NexusTasks</h1>
                <p className="text-gray-400">Welcome, {user?.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowProjectModal(true)}
                style={{ ...buttonStyle, backgroundColor: '#2563eb', color: '#ffffff' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
              >
                <Plus size={20} />
                <span>New Project</span>
              </button>
              <button
                onClick={() => setShowTaskModal(true)}
                style={{ ...buttonStyle, backgroundColor: '#9333ea', color: '#ffffff' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#7c3aed'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#9333ea'}
              >
                <Plus size={20} />
                <span>New Task</span>
              </button>
              <button
                onClick={handleLogout}
                style={{ ...buttonStyle, backgroundColor: '#dc2626', color: '#ffffff' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-white mb-2">{stats.projects}</div>
            <div className="text-gray-400">Projects</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-blue-400 mb-2">{stats.todo}</div>
            <div className="text-gray-400">To Do</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-yellow-400 mb-2">{stats.inProgress}</div>
            <div className="text-gray-400">In Progress</div>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
            <div className="text-4xl font-bold text-green-400 mb-2">{stats.completed}</div>
            <div className="text-gray-400">Completed</div>
          </div>
        </div>

        {/* Projects */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{project.name}</h3>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="text-sm text-gray-500">
                  {project.taskCount} tasks • {project.completedTasks}/{project.taskCount} done
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Board with Drag & Drop */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Task Board - Drag & Drop Enabled</h2>
          <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['To Do', 'In Progress', 'Done'].map((status) => {
                const statusTasks = getTasksByStatus(status);
                const taskIds = statusTasks.map((t) => t.id);
                
                return (
                  <div key={status} className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">{status}</h3>
                      <span className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {statusTasks.length}
                      </span>
                    </div>
                    <SortableContext items={taskIds} strategy={verticalListSortingStrategy} id={status}>
                      <div className="space-y-3 min-h-[200px]">
                        {statusTasks.map((task) => (
                          <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                );
              })}
            </div>
          </DndContext>
        </div>
      </div>

      {/* Create Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full mx-4 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Project</h2>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Project Name</label>
                <input
                  type="text"
                  required
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newProject.dueDate}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  style={{ flex: 1, backgroundColor: '#1f2937', color: '#ffffff', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#2563eb', color: '#ffffff', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full mx-4 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Task Title</label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Project</label>
                <select
                  required
                  value={newTask.projectId}
                  onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                >
                  <option value="" style={{ backgroundColor: '#1f2937', color: '#9ca3af' }}>Select a project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id} style={{ backgroundColor: '#1f2937', color: '#ffffff' }}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                  >
                    <option style={{ backgroundColor: '#1f2937' }}>Low</option>
                    <option style={{ backgroundColor: '#1f2937' }}>Medium</option>
                    <option style={{ backgroundColor: '#1f2937' }}>High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Status</label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                  >
                    <option style={{ backgroundColor: '#1f2937' }}>To Do</option>
                    <option style={{ backgroundColor: '#1f2937' }}>In Progress</option>
                    <option style={{ backgroundColor: '#1f2937' }}>Done</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  style={{ width: '100%', backgroundColor: '#1f2937', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', border: '1px solid #374151', outline: 'none' }}
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  style={{ flex: 1, backgroundColor: '#1f2937', color: '#ffffff', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, backgroundColor: '#9333ea', color: '#ffffff', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}