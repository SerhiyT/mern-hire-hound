import { Form, redirect, Link } from 'react-router-dom';
import RegisterWrapper from "./Register.style"
import { FormRow, Logo, SubmitBtn } from '../../components';
import customFetch from '../../utils/customFetch';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    return redirect('/login');
  } catch (error) {
    return error;
  }
};

export const Register = () => {
  return (
    <RegisterWrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name' />
        <FormRow type='text' name='lastName' labelText='last name' />
        <FormRow type='text' name='location' />
        <FormRow type='email' name='email' />
        <FormRow type='password' name='password' />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </RegisterWrapper>
  )
};