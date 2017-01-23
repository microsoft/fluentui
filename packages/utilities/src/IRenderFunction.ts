export interface IRenderFunction<P> {
  (props?: P, defaultRender?: (props?: P) => JSX.Element): JSX.Element;
}
