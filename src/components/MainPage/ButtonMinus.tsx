import styled from 'styled-components';

const Styled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 1.5em;
  /* aspect-ratio: 1; */
  height: 1.5em;
  color: var(--color-border-dark);

  &:hover {
    transform: scale(1.2);
  }
`;

export const ButtonMinus = ({ onClick }: { onClick: () => void }) => {
  return (
    <Styled onClick={onClick}>
      <div>-</div>
      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        // fill='none'
        viewBox='0 0 10 2'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z'
          fill='currentColor'
        ></path>
      </svg> */}
    </Styled>
  );
};
