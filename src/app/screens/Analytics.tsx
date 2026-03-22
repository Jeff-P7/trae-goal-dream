import { ArrowLeft, TrendingUp, Target, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { mockGoals } from "../data/mockData";

export function Analytics() {
  const navigate = useNavigate();

  const weeklyData = [
    { day: "Mon", tasks: 12 },
    { day: "Tue", tasks: 15 },
    { day: "Wed", tasks: 10 },
    { day: "Thu", tasks: 18 },
    { day: "Fri", tasks: 20 },
    { day: "Sat", tasks: 8 },
    { day: "Sun", tasks: 6 },
  ];

  const goalDistribution = mockGoals.map(goal => ({
    name: goal.title,
    value: goal.progress,
    color: goal.color === "bg-blue-100" ? "#3B82F6" : 
           goal.color === "bg-green-100" ? "#10B981" : "#F59E0B",
  }));

  const totalGoals = mockGoals.length;
  const avgProgress = Math.round(mockGoals.reduce((acc, g) => acc + g.progress, 0) / totalGoals);
  const totalTasks = mockGoals.reduce((acc, g) => {
    const milestoneTasks = g.milestones.reduce((sum, m) => sum + m.tasks.length, 0);
    return acc + milestoneTasks + g.tasks.length;
  }, 0);
  const completedTasks = mockGoals.reduce((acc, g) => {
    const milestoneTasks = g.milestones.reduce(
      (sum, m) => sum + m.tasks.filter(t => t.completed).length,
      0
    );
    return acc + milestoneTasks + g.tasks.filter(t => t.completed).length;
  }, 0);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-100 to-pink-100 px-6 pt-6 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/app")}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-500 rounded-full">
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalGoals}</p>
            <p className="text-sm text-gray-600">Active Goals</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-500 rounded-full">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{avgProgress}%</p>
            <p className="text-sm text-gray-600">Avg Progress</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-500 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
            <p className="text-sm text-gray-600">Tasks Done</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-amber-500 rounded-full">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{totalTasks - completedTasks}</p>
            <p className="text-sm text-gray-600">Remaining</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="day" 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <Bar 
                dataKey="tasks" 
                fill="url(#barGradient)" 
                radius={[8, 8, 0, 0]}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Goal Distribution */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Goal Progress Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={goalDistribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {goalDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {goalDistribution.map((goal, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: goal.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{goal.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{goal.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Overview */}
      <div className="px-6 mt-6 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Milestones Overview</h3>
          <div className="space-y-3">
            {mockGoals.map(goal => (
              <div key={goal.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{goal.icon} {goal.title}</span>
                  <span className="text-sm text-gray-600">{goal.milestones.length} milestones</span>
                </div>
                <div className="space-y-1">
                  {goal.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${milestone.color} transition-all duration-300`}
                          style={{ width: `${milestone.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-10 text-right">{milestone.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
