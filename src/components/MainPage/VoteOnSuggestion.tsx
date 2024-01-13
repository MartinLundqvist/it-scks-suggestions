import { auth } from '../../api';
import { useMemo } from 'react';
import { countMyVotes, MAX_VOTES } from '../../utils';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { VotesController } from './VotesController';
import { Badge } from '../Badge';
import { useSuggestions } from '../../contexts/FireStoreProvider';

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

  table {
    width: 100%;
    border-collapse: collapse;
    user-select: none;

    td {
      position: relative;
      padding: 0.5em;
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
          width: 1em;
          height: 1em;
        }
      }

      &.suggestion-cell {
      }

      &.date-cell {
        max-width: 5ch;
      }
      &.status-cell {
        max-width: 3ch;
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
  const [user] = useAuthState(auth);
  const me = useMemo(() => user?.email || '', [user]);
  const { suggestions, loading, error } = useSuggestions();

  const myVotes = useMemo(
    () => countMyVotes(suggestions, me),
    [suggestions, me]
  );

  if (error) return <Layout>Error: {JSON.stringify(error)}</Layout>;
  if (loading) return <Layout>Loading...</Layout>;

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
              <td className='status-cell'>{suggestion.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
