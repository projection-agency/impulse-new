import { FC, ReactNode } from "react";
import s from "./Layout.module.css";

interface LayoutPropTypes {
  children: ReactNode;
}

export const Layout: FC<LayoutPropTypes> = ({ children }) => {
  return <div className={s.layout}>{children}</div>;
};
