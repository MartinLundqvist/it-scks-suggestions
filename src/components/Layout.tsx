import { useAuthState } from 'react-firebase-hooks/auth';
import applogo from '../assets/logo.png';
import userlogo from '../assets/user.svg';
import styled from 'styled-components';
import { auth } from '../api';

const Section = styled.section`
  padding: 20px 50px;
`;

const Header = styled.header`
  /* width: 100%; */
  padding: 20px 50px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(18, 18, 18, 0.08);
  color: var(--color-text-light);
  gap: 30px;
  font-size: 30px;
  padding-bottom: 30px;

  img {
    width: 90px;
    height: 78px;
  }

  .login {
    // Media rule if screen size is less than 900px wide
    @media (max-width: 900px) {
      display: none;
    }
    display: flex;
    align-items: center;
    margin-left: auto;
    font-size: 1rem;
    gap: 1rem;
    img {
      width: 20px;
      height: 20px;
      color: var(--color-text-light);
    }
  }
`;

export const Layout = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Header>
        <img src={applogo} />
        <div>Suggest a design that s*cks</div>
        <div className='login'>
          <div>{user ? user.email : 'Not logged in'}</div>
          <img src={userlogo} />
        </div>
      </Header>

      <Section>{children}</Section>
    </>
  );
};
