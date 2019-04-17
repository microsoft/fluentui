import { IDetailsListProps } from './DetailsList.types';
import { IDetailsRowProps } from './DetailsRow.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * ShimmeredDetailsList props interface
 * {@docCategory ShimmeredDetailsList}
 * @deprecated The inheritance from `IDetailsListProps` will be dropped in favor of `detailsListProps` in Fabric 7.0.
 */
export interface IShimmeredDetailsListProps extends IDetailsListProps {
  /**
   * DetailsList props to pass through.
   */
  detailsListProps?: IDetailsListProps;

  /**
   * Boolean flag to control when to render placeholders vs real items.
   * It's up to the consumer app to know when fetching of the data is done to toggle this prop.
   */
  enableShimmer?: boolean;

  /**
   * Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow.
   * Optional argument is passed to leverage the calculated column measurements done by DetailsList.
   */
  onRenderCustomPlaceholder?: (rowProps?: IDetailsRowProps) => React.ReactNode;

  /**
   * Custom styles to override the styles specific to the ShimmeredDetailsList placeholders.
   * To override DetailsList styles use `detailsListProps` instead.
   */
  styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;

  /**
   * Number of shimmer placeholder lines to render.
   * @defaultvalue 10
   */
  shimmerLines?: number;

  /** Theme provided by the Higher Order Component */
  theme?: ITheme;
}

/**
 * Defines props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 * {@docCategory ShimmeredDetailsList}
 */
export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> & {
  /**
   * Class name passed to the root area which then is passed to `List` component.
   * @deprecated Use `IShimmeredDetailsListProps.detailsListProp.listProps` instead. Will be removed in Fabric 7.0.
   */
  className?: string;

  /**
   * Whether the shimmer placeholder is enabled. Used to render a fade-out to bottom overlay over the shimmer placeholders.
   * @deprecated Replacing with the logic with whether to apply the class or not. Will be removed in Fabric 7.0.
   */
  enableShimmer?: boolean;

  /**
   * Whether to move the entire placeholder row to a side when Checkbox is present.
   */
  showCheckbox?: boolean;

  /**
   * Wether the placeholder row should be rendered in compact mode.
   */
  compact?: boolean;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory ShimmeredDetailsList}
 */
export interface IShimmeredDetailsListStyles {
  /** Represents styles passed to the `List` component for creating a fade-out to the bottom overlay. */
  root: IStyle;

  /** Represent the wrapper element of the placeholder row containing the animation. */
  rowPlaceholderWrapper: IStyle;
}
