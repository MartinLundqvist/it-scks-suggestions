import styled from 'styled-components';
import { AddSuggestion } from './AddSuggestion';
import { SuggestionsTable } from './SuggestionsTable';

const Layout = styled.div`
  display: flex;

  .divider {
    width: 1px;
    background-color: var(--color-border);
    margin: 0 1rem;
  }

  // If screen size is smaller than 900px then column layout
  @media (max-width: 900px) {
    flex-direction: column;

    .divider {
      height: 1px;
      width: inherit;
      margin: 1rem 0;
    }
  }
`;

const MainPage = (): JSX.Element => {
  return (
    <Layout>
      <AddSuggestion />
      <div className='divider' />
      <SuggestionsTable />
    </Layout>
  );
};

export default MainPage;
