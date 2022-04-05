import * as React from 'react';
import type { IDetailsListProps } from './DetailsList.types';
import type { IDetailsRowProps } from './DetailsRow.types';
import type { IStyle } from '../../Styling';
import type { IStyleFunctionOrObject } from '../../Utilities';

/**
 * ShimmeredDetailsList props interface
 * {@docCategory DetailsList}
 */
export interface IShimmeredDetailsListProps extends Omit<IDetailsListProps, 'styles'> {
  /**
   * DetailsList styles to pass through.
   */
  detailsListStyles?: IDetailsListProps['styles'];

  /**
   * Boolean flag to control when to render placeholders vs real items.
   * It's up to the consumer app to know when fetching of the data is done to toggle this prop.
   */
  enableShimmer?: boolean;

  /**
   * Aria label for shimmer. Set on grid while shimmer is enabled.
   */
  ariaLabelForShimmer?: string;

  /**
   * Determines whether to remove a fading out to bottom overlay over the shimmering items
   * used to further emphasize the unknown number of items that will be fetched.
   */
  removeFadingOverlay?: boolean;

  /**
   * Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow.
   * `rowProps` argument is passed to leverage the calculated column measurements done by DetailsList
   * or you can use the optional arguments of item `index` and `defaultRender` to execute additional
   * logic before rendering the default placeholder.
   */
  onRenderCustomPlaceholder?: (
    rowProps: IDetailsRowProps,
    index?: number,
    defaultRender?: (props: IDetailsRowProps) => React.ReactNode,
  ) => React.ReactNode;

  /**
   * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
   * @deprecated Use `styles` prop instead. Any value provided will be ignored.
   */
  shimmerOverlayStyles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;

  /**
   * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
   */
  styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;

  /**
   * Number of shimmer placeholder lines to render.
   * @defaultvalue 10
   */
  shimmerLines?: number;
}

/**
 * Defines props needed to construct styles.
 * This represents the simplified set of immutable things which control the class names.
 * {@docCategory DetailsList}
 */
export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>>;

/**
 * Represents the stylable areas of the control.
 * {@docCategory DetailsList}
 */
export interface IShimmeredDetailsListStyles {
  /**
   * Represents styles passed to the `List` component for creating a fade-out to the bottom overlay.
   */
  root: IStyle;
}
