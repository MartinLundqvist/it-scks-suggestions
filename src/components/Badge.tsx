import styled from 'styled-components';

const Styled = styled.span`
  background: var(--color-background-dark);
  border-radius: 10%;
  padding: 0.2rem 0.3rem;
  color: var(--color-text-white);
`;

export const Badge = ({ text }: { text: string }): JSX.Element => {
  return <Styled>{text}</Styled>;
};
