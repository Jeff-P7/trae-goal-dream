import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, BarChart3, Plus } from "lucide-react";
import { useState } from "react";
import { CreateGoalWizard } from "./CreateGoalWizard";
import { CreateTaskModal } from "./CreateTaskModal";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showGoalWizard, setShowGoalWizard] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const isActive = (path: string) => {
    if (path === "/app" && location.pathname === "/app") return true;
    if (path !== "/app" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleFabClick = () => {
    // Show goal wizard if on dashboard, task modal otherwise
    if (location.pathname === "/app") {
      setShowGoalWizard(true);
    } else {
      setShowTaskModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative pb-24">
        <Outlet />

        {/* Floating Action Button */}
        <button
          onClick={handleFabClick}
          className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-40"
        >
          <Plus className="w-6 h-6 text-white" />
        </button>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
          <div className="max-w-md mx-auto px-6 py-3">
            <div className="flex items-center justify-around">
              <button
                onClick={() => navigate("/app")}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/app")
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <Home className="w-6 h-6" />
                <span className="text-xs font-medium">Home</span>
              </button>

              <button
                onClick={() => navigate("/app/analytics")}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive("/app/analytics")
                    ? "text-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <BarChart3 className="w-6 h-6" />
                <span className="text-xs font-medium">Analytics</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Modals */}
        <CreateGoalWizard open={showGoalWizard} onOpenChange={setShowGoalWizard} />
        <CreateTaskModal open={showTaskModal} onOpenChange={setShowTaskModal} />
      </div>
    </div>
  );
}
