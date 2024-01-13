import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    max-width: 786px;
    /* max-height: calc(100vh - 300px); */
    /* border: 1px solid var(--color-border); */
    /* padding: 1rem; */
    overflow: auto;
  }
`;

export const ContentBox = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <Wrapper>
      <div className='content'>{children}</div>
    </Wrapper>
  );
};
