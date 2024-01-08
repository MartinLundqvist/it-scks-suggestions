import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../api';
import { useEffect, useState } from 'react';
import { parseData, Suggestion } from '../../utils';
import styled from 'styled-components';

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

    td {
      padding: 0.5rem;
      border: 1px solid var(--color-border-dark);

      &.votes-cell {
        text-align: center;
      }

      &.suggestion-cell {
        max-width: 25ch;
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

export const SuggestionsTable = (): JSX.Element => {
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

  if (error) return <Layout>Error: {JSON.stringify(error)}</Layout>;
  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      <div className='title'>Vote on suggestions</div>
      <div className='subtitle'>
        You have placed 2 / 5 votes. Your votes are marked with a check mark.
        You can only vote once on any suggestion (including your own)
      </div>
      <table>
        <thead>
          <tr>
            <td className='suggestion-cell'>Suggestion</td>
            <td className='votes-cell'>Votes</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion) => (
            <tr key={suggestion.id}>
              <td className='suggestion-cell'>{suggestion.suggestion}</td>
              <td className='votes-cell'>Votes</td>
              <td>Newly added</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};
