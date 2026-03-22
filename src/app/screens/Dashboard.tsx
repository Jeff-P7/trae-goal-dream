import { useNavigate } from "react-router";
import { Bell, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Progress } from "../components/ui/progress";
import { Checkbox } from "../components/ui/checkbox";
import { mockGoals, todayTasks, weeklyProgress } from "../data/mockData";
import { useState } from "react";

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(3);
  const [tasks, setTasks] = useState(todayTasks);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const completedToday = tasks.filter(t => t.completed).length;
  const totalToday = tasks.length;

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 px-6 pt-8 pb-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-lg">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hello, Monika</h1>
              <p className="text-sm text-gray-600">Let's make today count!</p>
            </div>
          </div>
          <button className="relative p-2 hover:bg-white/50 rounded-full transition-colors">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="font-semibold text-gray-900">Mar 2025</span>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium">
                {day}
              </div>
            ))}
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-colors ${
                  day === selectedDate
                    ? "bg-blue-500 text-white"
                    : day === 3
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Progress */}
      <div className="px-6 mt-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Today's Progress</h3>
            </div>
            <span className="text-sm font-semibold text-green-600">
              {completedToday}/{totalToday}
            </span>
          </div>
          <Progress value={(completedToday / totalToday) * 100} className="h-2" />
        </div>
      </div>

      {/* Active Goals */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Active Goals</h2>
        <div className="space-y-3">
          {mockGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => navigate(`/app/goal/${goal.id}`)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{goal.icon}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">{goal.description}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={goal.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold text-gray-700">{goal.progress}%</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="px-6 mt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Today's Tasks</h2>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="px-6 mt-6 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Weekly Activity</h3>
            <span className="text-sm text-gray-600">1288 pts</span>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyProgress.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-full relative overflow-hidden">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-full transition-all duration-300"
                    style={{ height: `${item.value}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
