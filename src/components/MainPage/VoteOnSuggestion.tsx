import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { auth, db } from '../../api';
import { useEffect, useMemo, useState } from 'react';
import { countMyVotes, MAX_VOTES, parseData, Suggestion } from '../../utils';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { VotesController } from './VotesController';
import { Badge } from '../Badge';

// For each suggestion I need to find out:
// 1. How many votes it has
// 2. If the user has voted on it

// So if I store a list of all email addresses that have voted on each suggestion I can accomplish this.

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

  table {
    width: 100%;
    border-collapse: collapse;
    user-select: none;

    td {
      position: relative;
      padding: 0.5rem;
      border: 1px solid var(--color-border-dark);

      &.votes-cell {
        text-align: center;
        max-width: 5ch;

        &.voted::before {
          position: absolute;
          color: green;
          content: '✔️';
          top: 0;
          right: 0;
          width: 1rem;
          height: 1rem;
        }
      }

      &.suggestion-cell {
      }

      &.date-cell {
        max-width: 5ch;
      }
      &.status-cell {
        max-width: 5ch;
      }
    }

    thead {
      tr {
        background-color: var(--color-background-dark);
        color: var(--color-text-white);
      }
    }
  }
`;

export const VoteOnSuggestion = (): JSX.Element => {
  const [value, loading, error] = useCollection(collection(db, 'suggestions'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [user] = useAuthState(auth);
  const me = useMemo(() => user?.email || '', [user]);

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const myVotes = useMemo(
    () => countMyVotes(suggestions, me),
    [suggestions, me]
  );

  useEffect(() => {
    if (value) {
      setSuggestions(value.docs.map((doc) => parseData(doc)));
    }
  }, [value]);

  if (error) return <Layout>Error: {JSON.stringify(error)}</Layout>;
  if (loading || !value) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <div className='title'>Vote on suggestions</div>
      <div className='subtitle'>
        You have placed <Badge text={`${myVotes} / ${MAX_VOTES}`} /> votes. Your
        votes are marked with a check mark. You can only vote once on any
        suggestion (including your own)
      </div>
      <table>
        <thead>
          <tr>
            <td className='date-cell'>Added</td>
            <td className='suggestion-cell'>Suggestion</td>
            <td className='votes-cell'>Votes</td>
            <td className='status-cell'>Status</td>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion) => (
            <tr key={suggestion.uuid}>
              <td className='date-cell'>
                {suggestion.added.toLocaleDateString()}
              </td>
              <td className='suggestion-cell'>{suggestion.suggestion}</td>
              <td
                className={
                  suggestion.votes.includes(me)
                    ? 'votes-cell voted'
                    : 'votes-cell'
                }
              >
                <VotesController
                  suggestion={suggestion}
                  noVotesLeft={myVotes >= MAX_VOTES}
                />
              </td>
              <td className='status-cell'>Newly added</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
