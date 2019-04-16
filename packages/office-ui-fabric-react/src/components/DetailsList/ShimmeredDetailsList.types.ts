import { IDetailsListProps } from './DetailsList.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

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

  /** Custom placeholder renderer to be used when in need to override the default placeholder of a DetailsRow. */
  onRenderCustomPlaceholder?: () => React.ReactNode;

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
};

export interface IShimmeredDetailsListStyles {
  root: IStyle;
}
