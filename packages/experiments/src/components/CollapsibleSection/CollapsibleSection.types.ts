import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react';
import { IStyleableComponent, IStyleableComponentProps, IThemedProps } from '../../Foundation';
import { RefObject } from '../../Utilities';

import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

export interface ICollapsibleSectionProps
  extends IStyleableComponent<ICollapsibleSectionProps, ICollapsibleSectionStyles> {
  /**
   * Additional class name to provide on the root element.
   */
  className?: string;

  /**
   * Default and initial collapsed state if collapsed prop is not provided.
   * @default true
   */
  defaultCollapsed?: boolean;

  /**
   * Collapsed state. If provided, component is controlled.
   * @default defaultCollapsed
   */
  collapsed?: boolean;

  /**
   * Component to use for CollapsibleSection title.
   */
  titleAs?: React.ReactType<ICollapsibleSectionTitleProps>;

  /**
   * Optional title props to pass onto title component.
   */
  titleProps?: ICollapsibleSectionTitleProps;
}

export type ICollapsibleSectionControlledProps = IStyleableComponentProps<
  ICollapsibleSectionViewProps,
  ICollapsibleSectionStyles
>;

export type ICollapsibleSectionViewProps = Pick<ICollapsibleSectionProps, 'titleAs' | 'titleProps'> &
  Required<Pick<ICollapsibleSectionProps, 'collapsed'>> & {
    titleElementRef?: RefObject<HTMLElement>;
    onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
    // TODO: redundant with titleProps version? reconcile
    onToggleCollapse?: () => void;
    onRootKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
  };

export type ICollapsibleSectionStyleProps = IThemedProps<ICollapsibleSectionViewProps>;

export interface ICollapsibleSectionStyles {
  /**
   * Styling for the root element.
   */
  root: IStyle;
  /**
   * Styling for the body content.
   */
  body: IStyle;
}
