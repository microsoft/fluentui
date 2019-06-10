import { IDetailsListProps } from './DetailsList.types';
import { IDetailsRowProps } from './DetailsRow.types';
import { IStyle } from '../../Styling';
import { IStyleFunctionOrObject, Omit } from '../../Utilities';

/**
 * ShimmeredDetailsList props interface
 * {@docCategory DetailsList}
 */
export interface IShimmeredDetailsListProps extends Omit<IDetailsListProps, 'styles'> {
  /**
   * DetailsList `styles` to pass through.
   * Due to ShimmeredDetailsList overriding the extended `styles` prop with its own one
   * we temporary introduce this one slot to allow `DetailsList` styles customization.
   * @deprecated Will be removed in Fabric 7.0 in favor of `styles` prop that will have its typing adjusted
   */
  detailsListStyles?: IDetailsListProps['styles'];

  /**
   * Boolean flag to control when to render placeholders vs real items.
   * It's up to the consumer app to know when fetching of the data is done to toggle this prop.
   */
  enableShimmer?: boolean;

  /**
   * Determines whether to remove a fading out to bottom overlay over the shimmering items
   * used to further emphasize the unknown number of items that will be fetched.
   */
  removeFadingOverlay?: boolean;

  /**
   * Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow.
   * An argument is passed to leverage the calculated column measurements done by DetailsList.
   */
  onRenderCustomPlaceholder?: (rowProps: IDetailsRowProps) => React.ReactNode;

  /**
   * Custom styles to override the styles specific to the ShimmeredDetailsList root area.
   * To override DetailsList styles, temporary use `detailsListStyles` prop instead.
   * @deprecated Types will be adjusted in Fabric 7.0 to allow direct pass through of `DetailsList` styles.
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
 * {@docCategory DetailsList}
 */
export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> & {
  /**
   * Class name passed to `List` component.
   * @deprecated In Fabric 7.0 a different logic will be applied to pass the className to `List`.
   */
  className?: string;

  /**
   * Whether the shimmer placeholder is enabled. Used to render a fade-out to bottom overlay over the shimmer placeholders.
   * @deprecated In Fabric 7.0 a different logic will be applied to control the application of the overlay.
   */
  enableShimmer?: boolean;
};

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
