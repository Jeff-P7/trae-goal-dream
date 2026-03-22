import { useNavigate, useParams } from "react-router";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { mockGoals } from "../data/mockData";
import { useState } from "react";

export function MilestoneDetail() {
  const { goalId, milestoneId } = useParams();
  const navigate = useNavigate();
  
  const goal = mockGoals.find(g => g.id === goalId);
  const milestone = goal?.milestones.find(m => m.id === milestoneId);

  const [tasks, setTasks] = useState(milestone?.tasks || []);

  if (!goal || !milestone) {
    return <div>Milestone not found</div>;
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const completedTasks = tasks.filter(t => t.completed).length;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-100 to-emerald-100 px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(`/app/goal/${goalId}`)}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">{goal.title}</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h1>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-lg font-bold text-gray-900">{milestone.progress}%</span>
            </div>
            <Progress value={milestone.progress} className="h-3" />
            <p className="text-sm text-gray-600 mt-2">
              {completedTasks} of {tasks.length} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="px-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Tasks</h2>
          <span className="text-sm text-gray-600">{completedTasks}/{tasks.length}</span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                    {task.title}
                  </p>
                  {task.dueDate && (
                    <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
}
