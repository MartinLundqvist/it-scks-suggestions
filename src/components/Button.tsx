import styled from 'styled-components';

const Styled = styled.button`
  background-color: var(--color-background-dark);
  color: var(--color-text-white);
  height: 3em;
  padding: 0 2em;
  border: 1px solid var(--color-background-white);
  /* border-radius: 0.5rem; */
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 1px solid var(--color-border-dark);
  }
`;

export const Button = ({
  title,
  onClick,
  disabled = false,
}: {
  title: string;
  onClick: () => void;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <Styled disabled={disabled} onClick={onClick}>
      {title}
    </Styled>
  );
};
