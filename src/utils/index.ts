import Filter from 'bad-words';
import { DocumentData } from 'firebase/firestore';

export interface Suggestion {
  id: string;
  uid: string;
  added: Date;
  suggestion: string;
}
export const parseData = (data: DocumentData): Suggestion => {
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
export const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(email);
};
export const doesNotContainBadWords = (suggestion: string): boolean => {
  const filter = new Filter();
  return !filter.isProfane(suggestion);
};
