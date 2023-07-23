import { useDashboardContext } from '../../pages/DashboardLayout';
import { Logo } from '../Logo/Logo';
import { NavLinks } from '../NavLinks/NavLinks';
import SmallSidebarWrapper from './SmallSidebar.style';
import { FaTimes } from 'react-icons/fa';

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();

  return (
    <SmallSidebarWrapper>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </SmallSidebarWrapper>
  );
};