import styled from 'styled-components';
import { Suggestion } from '../../utils';
import { ButtonMinus } from './ButtonMinus';
import { ButtonPlus } from './ButtonPlus';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../api';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useMemo } from 'react';

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  border: 1px solid var(--color-border-light);
`;

export const VotesController = ({
  suggestion,
  noVotesLeft,
}: {
  suggestion: Suggestion;
  noVotesLeft: boolean;
}) => {
  const [user] = useAuthState(auth);

  const me = useMemo(() => user?.email || '', [user]);

  const addVote = async () => {
    if (!user) return;

    if (noVotesLeft) {
      alert('You have no votes left. Please remove some votes first.');
      return;
    }

    if (suggestion.votes.includes(me)) {
      alert('You have already voted on this suggestion.');
      return;
    }

    if (!suggestion.firebaseID) {
      alert('Error: Not Firebase ID found for this suggestion...');
      return;
    }

    // Find the document in the database
    const docRef = doc(db, 'suggestions', suggestion.firebaseID);

    // Add the user's email to the list of votes
    // Update the document in the database

    try {
      await updateDoc(docRef, {
        votes: [...suggestion.votes, user.email],
      });
    } catch (error) {
      console.error('Error adding vote: ', error);
      alert('Connection error while adding vote. Please try again.');
    }
  };

  const removeVote = async () => {
    console.log('remove vote');
    if (!user) return;

    if (!suggestion.votes.includes(me)) {
      alert(
        "You can't remove others' votes. You have to boost the ones that s*ck."
      );
      return;
    }

    if (!suggestion.firebaseID) {
      alert('Error: Not Firebase ID found for this suggestion...');
      return;
    }

    // Find the document in the database
    const docRef = doc(db, 'suggestions', suggestion.firebaseID);

    // Remove the user's email to the list of votes
    const newVotes = suggestion.votes.filter((vote) => vote !== me);

    // Update the document in the database
    try {
      await updateDoc(docRef, {
        votes: newVotes,
      });
    } catch (error) {
      console.error('Error adding vote: ', error);
      alert('Connection error while adding vote. Please try again.');
    }
  };

  return (
    <Styled>
      <ButtonMinus
        onClick={suggestion.votes.length > 0 ? removeVote : () => {}}
      />
      <div className='votes'>{suggestion.votes.length}</div>
      <ButtonPlus onClick={addVote} />
    </Styled>
  );
};
