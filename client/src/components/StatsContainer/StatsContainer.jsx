import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StatsContainerWrapper from './StatsContainer.style';
import { StatItem } from '../StatItem';

export const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#f59e0b',
      bcg: '#fef3c7',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];
  return (
    <StatsContainerWrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </StatsContainerWrapper>
  );
};