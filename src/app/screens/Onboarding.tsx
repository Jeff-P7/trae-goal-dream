import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Sparkles, Target, TrendingUp } from "lucide-react";
import onboardingImage from "../../assets/onboarding-hero.svg";

export function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img 
            src={onboardingImage} 
            alt="Person achieving goals" 
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Turn Dreams into Reality
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Break down your biggest goals into actionable steps and track your progress every day.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-full bg-blue-100">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Set Clear Goals</h3>
              <p className="text-sm text-gray-600">Define what success looks like</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-full bg-green-100">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Track Progress</h3>
              <p className="text-sm text-gray-600">See your growth over time</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-1 p-2 rounded-full bg-purple-100">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Stay Motivated</h3>
              <p className="text-sm text-gray-600">Celebrate every milestone</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full h-12 text-base font-semibold shadow-lg"
            onClick={() => navigate("/app")}
          >
            Get Started
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full rounded-full h-12 text-base"
            onClick={() => navigate("/app")}
          >
            Already have an account? Log in
          </Button>
        </div>
      </div>
    </div>
  );
}
