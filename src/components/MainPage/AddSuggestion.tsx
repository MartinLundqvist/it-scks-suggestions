import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../api';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { doesNotContainBadWords } from '../../utils';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../Button';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  .title {
    font-size: 1.5rem;
  }
  .subtitle {
    font-size: 1rem;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 10rem;
    resize: none;
    border: 1px solid var(--color-border-dark);
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

export const AddSuggestion = (): JSX.Element => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [user] = useAuthState(auth);
  // const [uid, setUid] = useState<string>('');

  const submit = async () => {
    console.log('submitting');

    if (!user) {
      alert('invalid email');
      return;
    }

    if (!doesNotContainBadWords(suggestion)) {
      alert('Profanity detected - please mind your language!');
      return;
    }

    console.log('valid');

    const data = {
      id: nanoid(),
      uid: user.email,
      suggestion,
      added: new Date(),
    };

    try {
      await addDoc(collection(db, 'suggestions'), data);
      console.log('Document written');
      setSuggestion('');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <Layout>
      <div className='title'>Make a suggestion</div>
      <div className='subtitle'>
        If your suggestion gets enough votes (s*cks enough), we will make a sock
        out of it - and you will get three of ‘em for free. Now that really
        s*cks!
      </div>
      <textarea
        id='suggestion'
        name='suggestion'
        value={suggestion}
        onChange={(e) => setSuggestion(e.target.value)}
      />
      <Button onClick={submit} title='Suggest' />
    </Layout>
  );
};
