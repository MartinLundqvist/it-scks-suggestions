import './App.css';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSendEmailVerification,
} from 'react-firebase-hooks/auth';
import { DocumentData, addDoc, collection } from 'firebase/firestore';
import { db, auth } from './api';
import { useEffect, useState } from 'react';
import Filter from 'bad-words';
import { nanoid } from 'nanoid';

interface Suggestion {
  id: string;
  uid: string;
  added: Date;
  suggestion: string;
}

const parseData = (data: DocumentData): Suggestion => {
  const id: string = data.id ? data.id : 'not found';
  const uid: string = data.uid ? data.uid : 'not found';
  const added: Date = data.added
    ? new Date(parseInt(data.added.seconds) * 1000)
    : new Date('1970-01-01');
  const suggestion: string = data.suggestion ? data.suggestion : 'not found';
  return {
    id,
    uid,
    added,
    suggestion,
  };
};

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Authorizations />
      <h1>Testing</h1>
      {user && user.emailVerified && (
        <>
          <AddSuggestion />
          <SuggestionsTable />
        </>
      )}
    </>
  );
}

const Authorizations = (): JSX.Element => {
  const [sendEmailVerification] = useSendEmailVerification(auth);
  const [user] = useAuthState(auth);
  console.log('user', user);

  const sendVerification = async () => {
    const response = await sendEmailVerification();

    if (!response) {
      console.log('email not sent');
      return;
    }
    console.log('email sent');
  };

  return (
    <>
      {user && !user.emailVerified && (
        <>
          <div>
            We need to verify your e-mail address. We know. That also s*cks.
          </div>
          <button onClick={sendVerification}>Verify email</button>
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

    // try {
    //   if (newUser) {
    //     await createUserWithEmailAndPassword(auth, email, password);
    //   } else {
    //     await signInWithEmailAndPassword(auth, email, password);
    //   }
    // } catch (e) {
    //   console.error('Error signing in or creating new user ', e);
    // }
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
        type='text'
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

const SuggestionsTable = (): JSX.Element => {
  const [value, loading, error] = useCollectionData(
    collection(db, 'suggestions'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (value) {
      setSuggestions(value.map((doc) => parseData(doc)));
    }
  }, [value]);

  return (
    <>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <span>
          Collection:
          {suggestions.map((suggestion) => (
            <div key={suggestion.id}>
              {suggestion.id} - {suggestion.uid} -{' '}
              {suggestion.added.toISOString()} - {suggestion.suggestion}
            </div>
          ))}
        </span>
      )}
    </>
  );
};

const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
};

const doesNotContainBadWords = (suggestion: string): boolean => {
  const filter = new Filter();
  return !filter.isProfane(suggestion);
};

const AddSuggestion = (): JSX.Element => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [uid, setUid] = useState<string>('');

  const submit = async () => {
    console.log('submitting');

    if (!isValidEmail(uid)) {
      console.log('invalid email');
      return;
    }

    if (!doesNotContainBadWords(suggestion)) {
      console.log('profanity detected');
      return;
    }

    console.log('valid');

    const data = {
      id: nanoid(),
      uid,
      suggestion,
      added: new Date(),
    };

    try {
      await addDoc(collection(db, 'suggestions'), data);
      console.log('Document written');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <>
      <label htmlFor='suggestion'>Suggestion</label>
      <input
        type='text'
        id='suggestion'
        name='suggestion'
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
      />
      <label htmlFor='uid'>EMail</label>
      <input
        type='text'
        id='uid'
        name='uid'
        value={uid}
        onChange={(e) => setUid(e.target.value)}
      />
      <button type='submit' onClick={submit}>
        Submit
      </button>
    </>
  );
};

export default App;
