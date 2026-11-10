import type { JSXElement } from './jsx';

/**
 * An interface representing a component that will not output any DOM, will just render its children and
 * pass through items to modify the children.
 *
 * {@docCategory IRenderComponent}
 */
export interface IRenderComponent<TProps> {
  /**
   * JSXElement to return in this component's render() function.
   */
  children: (props: TProps) => JSXElement;
}
