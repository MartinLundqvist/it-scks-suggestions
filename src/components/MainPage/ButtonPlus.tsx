import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 1em;
  height: 1em;
  color: var(--color-border-light);

  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonPlus = ({ onClick }: { onClick: () => void }) => {
  return (
    <Styled onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        fill='none'
        viewBox='0 0 10 10'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z'
          fill='currentColor'
        ></path>
      </svg>
    </Styled>
  );
};
