import styled from 'styled-components';

const Styled = styled.div`
  cursor: pointer;
  width: 1em;

  @media (max-height: 500px), (max-width: 768px) {
    font-size: 0.5em;
  }
  &.left {
    transform: rotate(90deg);
    &:hover {
      transform: rotate(90deg) scale(1.2);
    }
  }
  &.right {
    transform: rotate(270deg);
  }
  &:hover {
    transform: rotate(270deg) scale(1.2);
  }
`;

export const ButtonArrow = ({
  onClick,
  direction,
}: {
  onClick: () => void;
  direction: 'left' | 'right';
}) => {
  return (
    <Styled className={direction} onClick={onClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        aria-hidden='true'
        focusable='false'
        className='icon'
        viewBox='0 0 10 6'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z'
          fill='currentColor'
        ></path>
      </svg>
    </Styled>
  );
};
