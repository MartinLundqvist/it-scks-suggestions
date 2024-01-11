import {
  useAuthState,
  useSendEmailVerification,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';
import { auth } from '../api';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { isValidEmail } from '../utils';
import styled from 'styled-components';
import { ContentBox } from './ContentBox';
import { Button } from './Button';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 1.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .email-sent {
    font-style: italic;
    text-align: center;
    margin-top: 1rem;
  }
`;

export const Authorizations = (): JSX.Element => {
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [user] = useAuthState(auth);
  // console.log('user', user);
  const sendVerification = async () => {
    const response = await sendEmailVerification();

    if (!response) {
      console.log('email not sent');
      return;
    }
    console.log('email sent');
    setEmailSent(true);
  };

  return (
    <ContentBox>
      <Layout>
        {user && !user.emailVerified && (
          <>
            <div className='title'>
              We need to verify your e-mail address. <div /> We know. That also
              s*cks.
            </div>
            <Button
              disabled={emailSent}
              onClick={sendVerification}
              title='Send email'
            />
            {emailSent && (
              <div className='email-sent'>
                Email sent. Check your mailbox, click the link. <div /> Then
                refresh this page.
              </div>
            )}
          </>
        )}
        {!user && (
          <>
            <div className='title'>
              You need to login or register to add suggestions. <div /> We know.
              That s*cks.
            </div>
            <LoginOrRegister />
          </>
        )}
      </Layout>
    </ContentBox>
  );
};

const LoginGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .sub-title {
    font-size: 1rem;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    border: 1px solid var(--color-border-dark);
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
  }

  .register {
    font-style: italic;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: var(--color-text-dark);
    }
  }
`;

const LoginOrRegister = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [newUser, setNewUser] = useState<boolean>(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  // console.log('user', user);
  const login = async () => {
    if (!isValidEmail(email)) {
      alert('Not a valid email address!');
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (!result) {
        alert('User not found or wrong credentials.');
      }
      console.log('result', result);
    } catch (e) {
      console.log(e);
    }
  };
  const register = async () => {
    if (!isValidEmail(email)) {
      alert('Not a valid email address!');
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (!result) {
        alert('User may already exist. Please try logging in.');
      }
      console.log('result', result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LoginGroup>
      <div className='column'>
        <label htmlFor='email' className='subtitle'>
          Email
        </label>
        <input
          type='text'
          id='email'
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='column'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={login} title='Login' />
      <div className='register' onClick={register}>
        Register
      </div>
    </LoginGroup>
  );
};
