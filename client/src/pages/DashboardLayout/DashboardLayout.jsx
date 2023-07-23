import { Outlet } from "react-router-dom";
import { BigSidebar, SmallSidebar, NavBar } from "../../components";
import DashboardLayoutWrapper from "./DashboardLayout.style";
import { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export const DashboardLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: 'serh'};
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

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
    console.log('%cqqq: user logout', 'color: green;')
  };

  return (
    <DashboardContext.Provider value={{ user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser }}>
      <DashboardLayoutWrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <NavBar />
            <div className="dashboard-page" />
            <Outlet />
          </div>
        </main>
      </DashboardLayoutWrapper>
    </DashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(DashboardContext);