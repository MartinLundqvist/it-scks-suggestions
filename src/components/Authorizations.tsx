import {
  useAuthState,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import { auth } from '../api';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { isValidEmail } from '../utils';

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
    <>
      {user && !user.emailVerified && (
        <>
          <div>
            We need to verify your e-mail address. We know. That also s*cks.
          </div>
          <button disabled={emailSent} onClick={sendVerification}>
            Verify email
          </button>
          {emailSent && (
            <div>
              Email sent. Check your mailbox, click the link. Then refresh this
              page.
            </div>
          )}
        </>
      )}
      {!user && (
        <>
          <div>
            You need to login or register to add suggestions. We know. That
            s*cks.
          </div>
          <LoginOrRegister />
        </>
      )}
    </>
  );
};

const LoginOrRegister = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const [newUser, setNewUser] = useState<boolean>(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  // console.log('user', user);
  const submit = () => {
    if (!isValidEmail(email)) {
      console.log('invalid email');
      return;
    }

    createUserWithEmailAndPassword(email, password);
  };

  return (
    <>
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id='email'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type='submit' onClick={submit}>
        Submit
      </button>
    </>
  );
};
