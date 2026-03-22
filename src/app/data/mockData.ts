export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

export interface Milestone {
  id: string;
  title: string;
  goalId: string;
  progress: number;
  tasks: Task[];
  color: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  targetDate: string;
  color: string;
  icon: string;
  milestones: Milestone[];
  tasks: Task[];
}

export const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Launch My Startup",
    description: "Build and launch my SaaS product to 100 users",
    progress: 45,
    targetDate: "2026-12-31",
    color: "bg-blue-100",
    icon: "🚀",
    milestones: [
      {
        id: "m1",
        title: "Product Development",
        goalId: "1",
        progress: 75,
        color: "bg-blue-400",
        tasks: [
          { id: "t1", title: "Design wireframes", completed: true },
          { id: "t2", title: "Build MVP", completed: true },
          { id: "t3", title: "User testing", completed: false },
        ],
      },
      {
        id: "m2",
        title: "Marketing Strategy",
        goalId: "1",
        progress: 30,
        color: "bg-blue-400",
        tasks: [
          { id: "t4", title: "Create landing page", completed: true },
          { id: "t5", title: "Social media setup", completed: false },
          { id: "t6", title: "Content calendar", completed: false },
        ],
      },
    ],
    tasks: [
      { id: "t7", title: "Register company", completed: true, dueDate: "2026-03-25" },
      { id: "t8", title: "Open business account", completed: false, dueDate: "2026-03-30" },
    ],
  },
  {
    id: "2",
    title: "Run a Marathon",
    description: "Complete my first 42km marathon",
    progress: 60,
    targetDate: "2026-08-15",
    color: "bg-green-100",
    icon: "🏃",
    milestones: [
      {
        id: "m3",
        title: "Build Endurance",
        goalId: "2",
        progress: 80,
        color: "bg-green-400",
        tasks: [
          { id: "t9", title: "Run 5km 3x/week", completed: true },
          { id: "t10", title: "Run 10km 2x/week", completed: true },
          { id: "t11", title: "Run half marathon", completed: false },
        ],
      },
      {
        id: "m4",
        title: "Nutrition Plan",
        goalId: "2",
        progress: 40,
        color: "bg-green-400",
        tasks: [
          { id: "t12", title: "Consult nutritionist", completed: true },
          { id: "t13", title: "Meal prep routine", completed: false },
        ],
      },
    ],
    tasks: [
      { id: "t14", title: "Buy running shoes", completed: true },
      { id: "t15", title: "Join running club", completed: true },
    ],
  },
  {
    id: "3",
    title: "Learn Spanish",
    description: "Achieve conversational fluency in Spanish",
    progress: 35,
    targetDate: "2026-12-01",
    color: "bg-peach-100",
    icon: "🗣️",
    milestones: [
      {
        id: "m5",
        title: "Foundation",
        goalId: "3",
        progress: 90,
        color: "bg-amber-400",
        tasks: [
          { id: "t16", title: "Complete Duolingo basics", completed: true },
          { id: "t17", title: "Learn 500 words", completed: true },
          { id: "t18", title: "Basic grammar rules", completed: true },
        ],
      },
      {
        id: "m6",
        title: "Conversation Practice",
        goalId: "3",
        progress: 15,
        color: "bg-amber-400",
        tasks: [
          { id: "t19", title: "Find language partner", completed: true },
          { id: "t20", title: "Weekly practice sessions", completed: false },
          { id: "t21", title: "Watch Spanish shows", completed: false },
        ],
      },
    ],
    tasks: [
      { id: "t22", title: "Subscribe to Spanish podcast", completed: true },
    ],
  },
];

export const todayTasks: Task[] = [
  { id: "t3", title: "User testing for MVP", completed: false, dueDate: "2026-03-22" },
  { id: "t8", title: "Open business account", completed: false, dueDate: "2026-03-22" },
  { id: "t11", title: "Run half marathon practice", completed: false, dueDate: "2026-03-22" },
  { id: "t20", title: "Spanish practice session", completed: false, dueDate: "2026-03-22" },
];

export const weeklyProgress = [
  { day: "M", value: 45 },
  { day: "T", value: 60 },
  { day: "W", value: 55 },
  { day: "T", value: 75 },
  { day: "F", value: 90 },
  { day: "S", value: 40 },
  { day: "S", value: 30 },
];
