import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react';
import { IStyleableComponentProps, IThemedProps } from '../../Foundation';
import { RefObject } from '../../Utilities';

import { ICollapsibleSectionTitleProps } from './CollapsibleSectionTitle.types';

export interface ICollapsibleSectionProps extends IStyleableComponentProps<ICollapsibleSectionProps, ICollapsibleSectionStyles> {
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

export type ICollapsibleSectionControlledProps = IStyleableComponentProps<ICollapsibleSectionViewProps, ICollapsibleSectionStyles>;

export type ICollapsibleSectionViewProps = Pick<ICollapsibleSectionProps, 'titleAs' | 'titleProps'> &
  Required<Pick<ICollapsibleSectionProps, 'collapsed'>> & {
    /**
     * Optional callback to access the Title element interface. Use this instead of ref for accessing
     * the public methods and properties of the component.
     */
    titleElementRef?: RefObject<HTMLElement>;
    /**
     * Toggle input callback triggered by mouse and keyboard input.
     */
    onToggleCollapse?: () => void;
    /**
     * Key down callback for root element of CollapsibleSection.
     */
    onRootKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
    /**
     * Key down callback for CollapsibleSection title.
     */
    onKeyDown?: (ev: React.KeyboardEvent<Element>) => void;
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
