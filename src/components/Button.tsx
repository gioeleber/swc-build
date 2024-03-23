import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Button({ children }: Props) {
  return <button className="bg-slate-500">{children}</button>;
}
