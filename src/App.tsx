import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './api';
import { useMemo } from 'react';
// import { Layout } from './components/Layout';
import { Authorizations } from './components/Authorizations';
import MainPage from './components/MainPage';
import { NewLayout } from './components/NewLayout';

export const App = (): JSX.Element => {
  const [user] = useAuthState(auth);

  const canMakeSuggestions = useMemo(() => user && user.emailVerified, [user]);
  // const canMakeSuggestions = false;

  return (
    <NewLayout>
      {canMakeSuggestions ? <MainPage /> : <Authorizations />}
    </NewLayout>
  );
};

export default App;
