import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './api';
import { useMemo } from 'react';
import { Layout } from './components/Layout';
import { Authorizations } from './components/Authorizations';
import MainPage from './components/MainPage';

export const App = (): JSX.Element => {
  const [user] = useAuthState(auth);

  const canMakeSuggestions = useMemo(() => user && user.emailVerified, [user]);

  return (
    <Layout>{canMakeSuggestions ? <MainPage /> : <Authorizations />}</Layout>
  );
};

export default App;
