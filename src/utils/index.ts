import Filter from 'bad-words';
import { QueryDocumentSnapshot } from 'firebase/firestore';

export interface Suggestion {
  firebaseID?: string; // only used for votes controller
  email: string;
  uuid: string;
  added: Date;
  suggestion: string;
  votes: string[];
}

export const MAX_VOTES = 5;

export const parseData = (snapshot: QueryDocumentSnapshot): Suggestion => {
  const data = snapshot.data();

  const uuid: string = data.uuid ? data.uuid : 'not found';
  const email: string = data.email ? data.email : 'not found';
  const added: Date = data.added
    ? new Date(parseInt(data.added.seconds) * 1000)
    : new Date('1970-01-01');
  const suggestion: string = data.suggestion ? data.suggestion : 'not found';
  const votes = data.votes ? data.votes : [];
  const firebaseID = snapshot.id;
  return {
    email,
    uuid,
    added,
    suggestion,
    votes,
    firebaseID,
  };
};

export const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
};
export const doesNotContainBadWords = (suggestion: string): boolean => {
  const filter = new Filter();
  return !filter.isProfane(suggestion);
};

export const countMyVotes = (suggestions: Suggestion[], me: string): number => {
  return suggestions.reduce((acc, curr) => {
    if (curr.votes.includes(me)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};
