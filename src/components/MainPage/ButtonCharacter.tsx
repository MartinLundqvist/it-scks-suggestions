import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 1.5em;
  height: 1.5em;
  color: var(--color-text-dark);

  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonCharacter = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Styled onClick={onClick}>
      <div className='char'>{children}</div>
    </Styled>
  );
};
