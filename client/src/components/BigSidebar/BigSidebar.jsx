import { useDashboardContext } from '../../pages/DashboardLayout';
import { Logo } from '../Logo/Logo';
import { NavLinks } from '../NavLinks/NavLinks';
import BigSidebarWrapper from './BigSidebar.style';

export const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();

  return (
    <BigSidebarWrapper>
       <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </BigSidebarWrapper>
  );
};