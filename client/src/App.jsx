import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { 
  AddJob, Admin, AllJobs, DashboardLayout, EditJob, Error, HomeLayout, Landing, Login, Profile, Register, Stats 
} from './pages';
import { checkDefaultTheme } from './utils/checkDefaultTheme';
import { ErrorElement } from './components/ErrorElement/ErrorElement';

import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction } from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { loader as editJobLoader } from './pages/EditJob';
import { action as editJobAction } from './pages/EditJob';
import { action as deleteJobAction } from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';

const isDarkThemeEnabled = checkDefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: (
          <DashboardLayout 
            isDarkThemeEnabled={isDarkThemeEnabled} 
            queryClient={queryClient} 
          />
        ),
        loader: dashboardLoader(queryClient),
        children: [
          { index: true,
            element: <AddJob />,
            action: addJobAction,
            errorElement: <ErrorElement />
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader,
            errorElement: <ErrorElement />
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
            errorElement: <ErrorElement />
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
            errorElement: <ErrorElement />
          },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
            errorElement: <ErrorElement />
          },
          {
            path: 'delete-job/:id',
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
