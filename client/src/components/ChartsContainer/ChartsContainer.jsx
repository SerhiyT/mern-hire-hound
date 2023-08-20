import { useState } from 'react';
import ChartsContainerWrapper from './ChartsContainer.style';
import { BarChartComponent } from '../BarChart';
import { AreaChartComponent } from '../AreaChart';

export const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <ChartsContainerWrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
    </ChartsContainerWrapper>
  );
};