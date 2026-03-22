import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Target, Calendar, Milestone } from "lucide-react";

interface CreateGoalWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateGoalWizard({ open, onOpenChange }: CreateGoalWizardProps) {
  const [step, setStep] = useState(1);
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    targetDate: "",
    icon: "🎯",
    milestones: [""],
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Creating goal:", goalData);
    // Reset and close
    setStep(1);
    setGoalData({
      title: "",
      description: "",
      targetDate: "",
      icon: "🎯",
      milestones: [""],
    });
    onOpenChange(false);
  };

  const addMilestone = () => {
    setGoalData({
      ...goalData,
      milestones: [...goalData.milestones, ""],
    });
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...goalData.milestones];
    newMilestones[index] = value;
    setGoalData({ ...goalData, milestones: newMilestones });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = goalData.milestones.filter((_, i) => i !== index);
    setGoalData({ ...goalData, milestones: newMilestones });
  };

  const emojis = ["🎯", "🚀", "💪", "📚", "🏃", "💼", "🎨", "🌟", "🏆", "💡"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-3xl">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step
                  ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                  : s < step
                  ? "w-2 bg-blue-300"
                  : "w-2 bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">What's Your Goal?</h2>
              <p className="text-sm text-gray-600 mt-1">Give your dream a name</p>
            </div>

            <div>
              <Label htmlFor="goal-title" className="text-sm font-medium text-gray-700">
                Goal Title
              </Label>
              <Input
                id="goal-title"
                value={goalData.title}
                onChange={(e) => setGoalData({ ...goalData, title: e.target.value })}
                placeholder="e.g., Launch My Startup"
                className="mt-1 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="goal-description" className="text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                id="goal-description"
                value={goalData.description}
                onChange={(e) => setGoalData({ ...goalData, description: e.target.value })}
                placeholder="Describe what success looks like..."
                className="mt-1 rounded-xl resize-none"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Choose an Icon
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setGoalData({ ...goalData, icon: emoji })}
                    className={`text-2xl p-3 rounded-xl transition-colors ${
                      goalData.icon === emoji
                        ? "bg-blue-100 ring-2 ring-blue-500"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleNext}
              className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              disabled={!goalData.title}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Timeline */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Set Your Timeline</h2>
              <p className="text-sm text-gray-600 mt-1">When do you want to achieve this?</p>
            </div>

            <div>
              <Label htmlFor="target-date" className="text-sm font-medium text-gray-700">
                Target Date
              </Label>
              <Input
                id="target-date"
                type="date"
                value={goalData.targetDate}
                onChange={(e) => setGoalData({ ...goalData, targetDate: e.target.value })}
                className="mt-1 rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="flex-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                disabled={!goalData.targetDate}
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Milestones */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                <Milestone className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Break It Down</h2>
              <p className="text-sm text-gray-600 mt-1">Add milestones (optional)</p>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {goalData.milestones.map((milestone, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={milestone}
                    onChange={(e) => updateMilestone(index, e.target.value)}
                    placeholder={`Milestone ${index + 1}`}
                    className="rounded-xl"
                  />
                  {goalData.milestones.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMilestone(index)}
                      className="rounded-xl shrink-0"
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addMilestone}
              className="w-full rounded-full"
            >
              + Add Milestone
            </Button>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 rounded-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Create Goal
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
