import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Calendar, MoreVertical, ChevronRight } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { mockGoals } from "../data/mockData";
import { useState } from "react";

export function GoalDetail() {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const goal = mockGoals.find(g => g.id === goalId);

  const [tasks, setTasks] = useState(goal?.tasks || []);

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const totalTasks = goal.milestones.reduce((acc, m) => acc + m.tasks.length, 0) + tasks.length;
  const completedTasks = goal.milestones.reduce(
    (acc, m) => acc + m.tasks.filter(t => t.completed).length,
    0
  ) + tasks.filter(t => t.completed).length;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 px-6 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/app")}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
            <MoreVertical className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{goal.icon}</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{goal.title}</h1>
          <p className="text-sm text-gray-600">{goal.description}</p>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#E5E7EB"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#gradient)"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - goal.progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{goal.progress}%</span>
              <span className="text-xs text-gray-600">Complete</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-xs text-gray-600">Target Date</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">Dec 31, 2026</p>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600">Tasks</span>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {completedTasks}/{totalTasks} Done
            </p>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Milestones</h2>
        <div className="space-y-3">
          {goal.milestones.map((milestone) => (
            <button
              key={milestone.id}
              onClick={() => navigate(`/app/goal/${goalId}/milestone/${milestone.id}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Progress value={milestone.progress} className="flex-1 h-2" />
                <span className="text-sm font-semibold text-gray-700">{milestone.progress}%</span>
              </div>
              <p className="text-sm text-gray-600">
                {milestone.tasks.filter(t => t.completed).length}/{milestone.tasks.length} tasks completed
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Direct Tasks */}
      {tasks.length > 0 && (
        <div className="px-6 mt-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Other Tasks</h2>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
