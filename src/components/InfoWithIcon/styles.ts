import styled from "styled-components";

export const InfoWithIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

interface IconContainerProps {
  iconBG: string;
}

export const IconContainer = styled.div<IconContainerProps>`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  background: ${({ iconBG }) => iconBG};
  color: ${({ theme }) => theme.colors["base-white"]};

  display: flex;
  align-items: center;
  justify-content: center;
`;
