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
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 1em;
  }

  .email-sent {
    font-style: italic;
    text-align: center;
    margin-top: 1em;
  }
`;

export const Authorizations = (): JSX.Element => {
  // TODO: AUTH Refactor
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
  gap: 1em;

  .sub-title {
    font-size: 1rem;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  input {
    -webkit-appearance: none; /* Override default iOS styles */
    appearance: none; /* Override default Android styles */
    font-family: inherit;
    box-sizing: border-box;
    border: 1px solid var(--color-border-dark);
    padding: 0.5em;
    font-size: 1em;
    width: 100%;
    border-radius: 4px;
    font-size: clamp(16px, 2vw, 1em);
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

// TODO: AUth Refactor
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
      alert('That email address is malformed.');
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (!result) {
        alert('Wrong password OR you need to register.');
      }
      console.log('result', result);
    } catch (e) {
      console.log(e);
    }
  };
  const register = async () => {
    if (!isValidEmail(email)) {
      alert('That email address is malformed.');
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (!result) {
        alert('Failed to register. Perhaps you already have an account?');
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
          type='email'
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
