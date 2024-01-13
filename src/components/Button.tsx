import styled from 'styled-components';

const Styled = styled.button`
  background-color: var(--color-background-dark);
  color: var(--color-text-white);
  height: 3em;
  width: 100%;
  padding: 0 2em;
  border: 1px solid var(--color-background-white);
  /* border-radius: 0.5rem; */
  font-size: var(--font-size-text);
  cursor: pointer;

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
