import styled from 'styled-components';

const AdminWrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  padding: 0rem 2rem 0rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default AdminWrapper;