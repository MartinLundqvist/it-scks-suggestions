import styled from 'styled-components';

const Styled = styled.div`
  cursor: pointer;
  width: 0.75em;
  height: 0.75em;
  border-radius: 50%;
  border: 0.1em solid var(--color-border-light);
  padding: 0;
  display: block;
  background-color: var(--color-background-white);

  &.active {
    background-color: var(--color-background-dark);
  }
  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonDot = ({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}): JSX.Element => {
  return <Styled onClick={onClick} className={active ? 'active' : ''} />;
};
