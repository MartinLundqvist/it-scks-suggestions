import { AddSuggestion } from './AddSuggestion';
import { VoteOnSuggestion } from './VoteOnSuggestion';
import { useState } from 'react';
import { ContentBox } from '../ContentBox';
import styled from 'styled-components';
import { ButtonArrow } from '../ButtonArrow';
import { ButtonDot } from '../ButtonDot';

const MainPage = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const [suggestion, setSuggestion] = useState<string>('');

  return (
    <>
      <ContentBox>
        {page === 1 && (
          <AddSuggestion
            suggestion={suggestion}
            setSuggestion={setSuggestion}
            onSuccess={() => setPage(2)}
          />
        )}
        {page === 2 && <VoteOnSuggestion />}
        <Navigation setPage={setPage} page={page} />
      </ContentBox>
    </>
  );
};

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  gap: 0.5em;
`;

const Navigation = ({
  setPage,
  page,
}: {
  setPage: (page: number) => void;
  page: number;
}): JSX.Element => {
  return (
    <Layout>
      <ButtonArrow direction='left' onClick={() => setPage(1)} />
      <ButtonDot onClick={() => setPage(1)} active={page === 1} />
      <ButtonDot onClick={() => setPage(2)} active={page === 2} />
      <ButtonArrow direction='right' onClick={() => setPage(2)} />
    </Layout>
  );
};

export default MainPage;
