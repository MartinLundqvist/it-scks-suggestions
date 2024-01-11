import styled from 'styled-components';

export const ContentBox = styled.div`
  max-width: 786px;
  max-height: calc(100vh - 300px);
  border: 1px solid var(--color-border);
  padding: 1rem;
  overflow: auto;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;
