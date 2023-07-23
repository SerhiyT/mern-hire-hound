import { useDashboardContext } from '../../pages/DashboardLayout';
import { FaAlignLeft } from 'react-icons/fa';
import { Logo } from '../Logo/Logo';
import NavBarWrapper from './NavBar.style';
import { LogoutContainer } from '../LogoutContainer';
import { ThemeToggle } from '../ThemeToggle';

export const NavBar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <NavBarWrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </NavBarWrapper>
  );
};
