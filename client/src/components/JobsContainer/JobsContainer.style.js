import styled from 'styled-components';

const JobsContainerWrapper = styled.section`
  width: 90%;
  margin-top: 4rem;
  margin: 0 auto;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin: 1.5rem 0;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
export default JobsContainerWrapper;