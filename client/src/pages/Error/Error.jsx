import { Link, useRouteError } from 'react-router-dom';
import img from '../../assets/images/not-found.svg';
import ErrorWrapper from './Error.style';

export const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <ErrorWrapper>
        <div>
          <img src={img} alt='not found' />
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </ErrorWrapper>
    );
  }
  return (
    <ErrorWrapper>
      <div>
        <h3>something went wrong</h3>
      </div>
    </ErrorWrapper>
  );
};