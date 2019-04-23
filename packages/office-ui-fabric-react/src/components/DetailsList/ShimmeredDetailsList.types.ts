import { IDetailsListProps } from './DetailsList.types';
import { IDetailsRowProps } from './DetailsRow.types';
import { IStyle } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

/**
 * ShimmeredDetailsList props interface
 * {@docCategory ShimmeredDetailsList}
 */
export interface IShimmeredDetailsListProps extends IDetailsListProps {
  /**
   * DetailsList `styles` to pass through.
   * Due to ShimmeredDetailsList overriding the extended `styles` prop with its own one
   * we reserve this one slot to allow `DetailsList` styles customization.
   */
  detailsListStyles?: IDetailsListProps['styles'];

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
}

/**
 * Defines props needed to construct styles. This represents the simplified set of immutable things which control the class names.
 * {@docCategory ShimmeredDetailsList}
 */
export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> & {
  /**
   * Class name passed to `List` component.
   */
  className?: string;

  /**
   * Whether the shimmer placeholder is enabled. Used to render a fade-out to bottom overlay over the shimmer placeholders.
   */
  enableShimmer?: boolean;
};

/**
 * Represents the stylable areas of the control.
 * {@docCategory ShimmeredDetailsList}
 */
export interface IShimmeredDetailsListStyles {
  /** Represents styles passed to the `List` component for creating a fade-out to the bottom overlay. */
  root: IStyle;
}
