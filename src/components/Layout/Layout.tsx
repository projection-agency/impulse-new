import { FC, ReactNode } from "react";
import s from "./Layout.module.css";

interface LayoutPropTypes {
  children: ReactNode;
  className?: string;
}

export const Layout: FC<LayoutPropTypes> = ({ children, className }) => {
  return <div className={`${s.layout} ${className}`}>{children}</div>;
};
