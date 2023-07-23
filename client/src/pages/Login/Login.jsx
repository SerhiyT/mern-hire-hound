import { Link, Form } from 'react-router-dom';
import LoginWrapper from './Login.style';
import { FormRow, Logo, SubmitBtn } from '../../components';

export const Login = () => {
  return (
    <LoginWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>login</h4>
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <button type='button' className='btn btn-block' onClick={() => {}}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </LoginWrapper>
  );
};