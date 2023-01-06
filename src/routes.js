// Material Dashboard 2 PRO React layouts
import Analytics from "layouts/dashboards/analytics";
import Sales from "layouts/dashboards/sales";

// @mui icons
import Icon from "@mui/material/Icon";
import Cover from "layouts/authentication/sign-in/cover";
import TaskTable from "layouts/tasks/allTasks";
import CreateTask from "layouts/tasks/allTasks/createTask";
import CoverSignUp from "layouts/authentication/sign-up/cover";

const routes = [
  {
    type: "collapse",
    name: "Dashboards",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    collapse: [
      {
        name: "Analytics",
        key: "analytics",
        route: "/dashboards/analytics",
        component: <Analytics />,
      },
      {
        name: "Sales",
        key: "sales",
        route: "/dashboards/sales",
        component: <Sales />,
      },
    ],
  },
  {
    type: "collapse",
    name: "Task",
    key: "task",
    icon: <Icon fontSize="medium">work</Icon>,
    collapse: [
      {
        name: "All Tasks",
        key: "all",
        route: "/task/all",
        component: <TaskTable />,
      },
    ],
  },
  {
    name: "signIn",
    key: "cover",
    route: "/authentication/sign-in/",
    component: <Cover />,
  },
  {
    name: "signUp",
    key: "cover",
    route: "/authentication/sign-up/cover",
    component: <CoverSignUp />,
  },
  {
    name: "createTask",
    key: "task",
    route: "/task/create/",
    component: <CreateTask />,
  },
];

export default routes;
