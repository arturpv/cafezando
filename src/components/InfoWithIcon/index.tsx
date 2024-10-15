import { ReactNode } from "react";
import { IconContainer, InfoWithIconContainer } from "./styles";

interface InfoWithIconProps {
  icon: ReactNode;
  text: string | ReactNode;
  iconBG: string;
}

export function InfoWithIcon({ icon, text, iconBG }: InfoWithIconProps) {
  return (
    <InfoWithIconContainer>
      <IconContainer iconBG={iconBG}>{icon}</IconContainer>
      {typeof text === "string" ? <p>{text}</p> : text}
    </InfoWithIconContainer>
  );
}
