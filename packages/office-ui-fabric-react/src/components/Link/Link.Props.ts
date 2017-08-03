/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from './Link';

export interface ILink {
  /** Sets focus to the link. */
  focus(): void;
}

export interface ILinkProps extends React.AllHTMLAttributes<HTMLAnchorElement | HTMLButtonElement | HTMLElement | Link> {
  /**
   * Optional callback to access the ILink interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ILink) => void;

  /**
   * Whether the link is disabled
   */
  disabled?: boolean;

}
