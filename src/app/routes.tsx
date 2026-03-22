import { createBrowserRouter } from "react-router";
import { Onboarding } from "./screens/Onboarding";
import { Dashboard } from "./screens/Dashboard";
import { GoalDetail } from "./screens/GoalDetail";
import { MilestoneDetail } from "./screens/MilestoneDetail";
import { Analytics } from "./screens/Analytics";
import { Layout } from "./components/Layout";
import DreamCreator from "../pages/DreamCreator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Onboarding />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "goal/:goalId",
        element: <GoalDetail />,
      },
      {
        path: "goal/:goalId/milestone/:milestoneId",
        element: <MilestoneDetail />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "create-dream",
        element: <DreamCreator />,
      },
    ],
  },
]);
