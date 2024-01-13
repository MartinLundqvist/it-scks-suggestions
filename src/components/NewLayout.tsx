import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import applogo from '../assets/logo.png';
import userlogo from '../assets/user.svg';
import styled from 'styled-components';
import { auth } from '../api';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  height: 100vh;
  grid-template-rows: 10% auto;
  gap: 10px;
  padding-top: var(--padding-top);

  .header {
    height: 100%;
    padding-bottom: var(--padding-top);
    border-bottom: 1px solid var(--color-border-light);
  }

  .main {
    margin: 0 var(--padding-sides);
    height: 100%;
  }
`;

export const NewLayout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Wrapper>
      <header className='header'>
        <Header />
      </header>
      <section className='main'>{children}</section>
    </Wrapper>
  );
};

const HeaderWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding: 0 var(--padding-sides);

  img {
    max-height: 100%;
    aspect-ratio: 1;
  }

  a.logo {
    display: flex;
    align-items: center;

    height: 100%;
  }

  div.title {
    font-size: var(--font-size-title);
  }

  .login {
    margin-left: auto;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: var(--font-size-text);
    gap: 1em;

    .login-text {
      @media (max-width: 768px) {
        display: none;
      }
    }
    img {
      height: 30%;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
`;

const Header = (): JSX.Element => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const handleSignout = () => {
    if (!user) return;
    if (confirm('Are you sure you want to sign out?')) signOut();
  };

  return (
    <HeaderWrapper>
      <a className='logo' href='https://www.itscks.com'>
        <img src={applogo} />
      </a>
      <div className='title'>Suggest a design that s*cks</div>
      <div className='login'>
        <div className='login-text'>{user ? user.email : 'Not logged in'}</div>
        <img src={userlogo} onClick={handleSignout} />
      </div>
    </HeaderWrapper>
  );
};
