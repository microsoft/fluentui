import { IStyle } from 'office-ui-fabric-react';

import { ISubwayNavNodeProps } from './SubwayNode.types';

export interface ISubwayNavProps {
  /**
   * Steps to render.
   */
  steps: ISubwayNavNodeProps[];

  /**
   * Wizard complete flag
   */
  wizardComplete?: boolean;

  /**
   * Optional classname to append to root list.
   */
  styles?: ISubwayNavStyles;

  /**
   * Option function to override rendering of steps
   */
  onRenderSteps?: (props: ISubwayNavProps) => JSX.Element[];
}

export interface ISubwayNavStyles {
  /**
   * The root of the subway nav
   */
  root: IStyle;
}

export interface ISubwayNavStyleProps {
  /**
   * Steps to render.
   */
  steps: ISubwayNavNodeProps[];

  /**
   * Wizard complete flag
   */
  wizardComplete?: boolean;
}
