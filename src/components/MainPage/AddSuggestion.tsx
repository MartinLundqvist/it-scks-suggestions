import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../api';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Suggestion, doesNotContainBadWords } from '../../utils';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '../Button';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1em;

  .title {
    font-size: 1.5em;
  }
  .subtitle {
    font-size: 1em;
  }

  textarea {
    -webkit-appearance: none; /* Override default iOS styles */
    appearance: none; /* Override default Android styles */
    font-family: inherit;
    box-sizing: border-box;
    width: 100%;
    height: 10em;
    resize: none;
    border: 1px solid var(--color-border-dark);
    border-radius: 4px;
    padding: 0.5em;
    /* font-size: 1em; */
    font-size: clamp(16px, 2vw, 1em);
  }
`;

export const AddSuggestion = ({
  onSuccess,
}: {
  onSuccess: () => void;
}): JSX.Element => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [user] = useAuthState(auth);
  // const [uid, setUid] = useState<string>('');

  const submit = async () => {
    // console.log('submitting');

    if (!user) {
      alert('invalid email');
      return;
    }

    if (!doesNotContainBadWords(suggestion)) {
      alert('Profanity detected - please mind your language!');
      return;
    }

    if (suggestion.length < 5) {
      alert("That's a bit short. Try again");
      return;
    }

    console.log('valid');

    const data: Suggestion = {
      uuid: nanoid(),
      email: user.email || 'not found',
      suggestion,
      added: new Date(),
      votes: [],
      status: 'New',
    };

    try {
      await addDoc(collection(db, 'suggestions'), data);
      setSuggestion('');
      onSuccess();
    } catch (e) {
      alert("The network isnn't working. That s*cks.");
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
