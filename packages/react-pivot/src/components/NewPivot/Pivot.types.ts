export interface IPivotClasses {
  root: string;
}

export interface IPivotProps extends React.AllHTMLAttributes<{}> {
  classes?: Partial<IPivotClasses>;
}
