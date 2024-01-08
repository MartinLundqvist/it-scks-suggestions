import styled from 'styled-components';

const Styled = styled.button`
  background-color: var(--color-background-dark);
  color: var(--color-text-white);
  height: 3rem;
  padding: 0 2rem;
  border: 1px solid var(--color-background-white);
  /* border-radius: 0.5rem; */
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--color-border-dark);
  }
`;

export const Button = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}): JSX.Element => {
  return <Styled onClick={onClick}>{title}</Styled>;
};
