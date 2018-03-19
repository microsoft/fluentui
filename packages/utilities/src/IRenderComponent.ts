export interface IRenderComponent<TProps> {
  children: (props: TProps) => JSX.Element;
}