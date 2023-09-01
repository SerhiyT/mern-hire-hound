import { Outlet, redirect, useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { BigSidebar, SmallSidebar, NavBar, Loading } from "../../components";
import DashboardLayoutWrapper from "./DashboardLayout.style";
import { createContext, useState, useContext } from "react";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

const DashboardContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch('/users/current-user');
    return data;
  } catch (error) {
    return redirect('/');
  }
};

export const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { user } = useLoaderData();
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const isPageLoading = navigation.state === 'loading';

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/');
    await customFetch.get('/auth/logout');
    toast.success('Logging out...');
  };

  
  return (
    <DashboardContext.Provider value={{ user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}>
      <DashboardLayoutWrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className='dashboard-page'>
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
             </div>
          </div>
        </main>
      </DashboardLayoutWrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);