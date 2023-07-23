import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import ThemeToggleWrapper from './ThemeToggle.style';
import { useDashboardContext } from '../../pages/DashboardLayout/';

export const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <ThemeToggleWrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className='toggle-icon' />
      ) : (
        <BsFillMoonFill />
      )}
    </ThemeToggleWrapper>
  );
};