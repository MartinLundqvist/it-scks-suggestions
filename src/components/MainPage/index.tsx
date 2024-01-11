import { AddSuggestion } from './AddSuggestion';
import { VoteOnSuggestion } from './VoteOnSuggestion';
import { useState } from 'react';
import { ContentBox } from '../ContentBox';
import styled from 'styled-components';
import { ButtonArrow } from '../ButtonArrow';
import { ButtonDot } from '../ButtonDot';

const MainPage = (): JSX.Element => {
  const [page, setPage] = useState(1);

  return (
    <>
      <ContentBox>
        {page === 1 && <AddSuggestion onSuccess={() => setPage(2)} />}
        {page === 2 && <VoteOnSuggestion />}
      </ContentBox>
      <Navigation setPage={setPage} page={page} />
    </>
  );
};

const Layout = styled.div`
  padding: 1em;
  display: flex;
  gap: 0.5em;
  align-items: center;
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
