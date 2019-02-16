import { IStyle, ITheme } from '../../Styling';
import { DirectionalHint } from '../../common/DirectionalHint';
import { IRefObject, IPoint, IRectangle, IStyleFunctionOrObject } from '../../Utilities';
import { ICalloutPositionedInfo } from '../../utilities/positioning';
import { ILayerProps } from '../../Layer';

export interface ICallout {}

export interface ICalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICallout interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICallout>;

  /**
   * The target that the Callout should try to position itself based on.
   * It can be either an Element a querySelector string of a valid Element
   * or a MouseEvent. If MouseEvent is given then the origin point of the event will be used.
   */
  target?: Element | string | MouseEvent | IPoint | null;

  /**
   * How the element should be positioned
   * @defaultvalue DirectionalHint.BottomAutoEdge
   */
  directionalHint?: DirectionalHint;

  /**
   * How the element should be positioned in RTL layouts.
   * If not specified, a mirror of `directionalHint` will be used instead
   */
  directionalHintForRTL?: DirectionalHint;

  /**
   * The gap between the Callout and the target
   * @defaultvalue 0
   */
  gapSpace?: number;

  /**
   * The width of the beak.
   * @defaultvalue 16
   */
  beakWidth?: number;

  /**
   * Custom width for callout including borders. If value is 0, no width is applied.
   * @defaultvalue 0
   */
  calloutWidth?: number;

  /**
   * Custom width for callout including borders. If value is 0, no width is applied.
   * @defaultvalue 0
   */
  calloutMaxWidth?: number;

  /**
   * The background color of the Callout in hex format ie. #ffffff.
   * @defaultvalue $ms-color-white
   */
  backgroundColor?: string;

  /**
   * The bounding rectangle for which  the contextual menu can appear in.
   */
  bounds?: IRectangle;

  /**
   * The minimum distance the callout will be away from the edge of the screen.
   *  @defaultvalue 8
   */
  minPagePadding?: number;

  /**
   * If true then the beak is visible. If false it will not be shown.
   * @defaultvalue true
   */
  isBeakVisible?: boolean;

  /**
   * If true then the callout will not dismiss on scroll
   * @defaultvalue false
   */
  preventDismissOnScroll?: boolean;

  /**
   * If true then the callout will not dismiss on resize
   * @defaultvalue false
   */
  preventDismissOnResize?: boolean;

  /**
   * If true then the callout will not dismiss when it loses focus
   * @defaultvalue false
   */
  preventDismissOnLostFocus?: boolean;

  /**
   * If true the position returned will have the menu element cover the target.
   * If false then it will position next to the target;
   * @defaultvalue false
   */
  coverTarget?: boolean;

  /**
   * If true the positioning logic will prefer to flip edges rather than to nudge the rectangle to fit within bounds,
   * thus making sure the element aligns perfectly with target's alignment edge
   */
  alignTargetEdge?: boolean;

  /**
   * Aria role assigned to the callout (Eg. dialog, alertdialog).
   */
  role?: string;

  /**
   * Accessible label text for callout.
   */
  ariaLabel?: string;

  /**
   *  Defines the element id referencing the element containing label text for callout.
   */
  ariaLabelledBy?: string;

  /**
   * Defines the element id referencing the element containing the description for the callout.
   */
  ariaDescribedBy?: string;

  /**
   * CSS class to apply to the callout.
   * @defaultvalue null
   */
  className?: string;

  /**
   * CSS style to apply to the callout.
   */
  style?: React.CSSProperties;

  /**
   * Optional callback when the layer content has mounted.
   */
  onLayerMounted?: () => void;

  /**
   * Optional props to pass to the Layer component hosting the panel.
   */
  layerProps?: ILayerProps;

  /**
   * Optional callback that is called once the callout has been correctly positioned.
   * @param positions - Gives the user information about how the callout is positioned such as the
   * final edge of the target that it positioned against, the beak position, and the beaks relationship to the
   * edges of the callout.
   */
  onPositioned?: (positions?: ICalloutPositionedInfo) => void;

  /**
   * Callback when the Callout tries to close.
   */
  onDismiss?: (ev?: any) => void;

  /**
   * If true do not render on a new layer. If false render on a new layer.
   */
  doNotLayer?: boolean;

  /**
   * If true the position will not change sides in an attempt to fit the callout within bounds.
   * It will still attempt to align it to whatever bounds are given.
   * @defaultvalue false
   */
  directionalHintFixed?: boolean;

  /**
   * Specify the final height of the content.
   * To be used when expanding the content dynamically so that callout can adjust its position.
   */
  finalHeight?: number;

  /**
   * Manually set OverflowYHidden style prop to true on calloutMain element
   * A variety of callout load animations will need this to hide the scollbar that can appear
   */
  hideOverflow?: boolean;

  /**
   * If true then the callout will attempt to focus the first focusable element that it contains.
   * If it doesn't find an element, no focus will be set and the method will return false.
   * This means that it's the contents responsibility to either set focus or have
   * focusable items.
   * @returns True if focus was set, false if it was not.
   */
  setInitialFocus?: boolean;

  /**
   * Set max height of callout
   * When not set the callout will expand with contents up to the bottom of the screen
   */
  calloutMaxHeight?: number;

  /**
   * Callback when the Callout body is scrolled.
   */
  onScroll?: () => void;

  /**
   * Optional theme for component
   */
  theme?: ITheme;

  /**
   * Optional styles for the component.
   */
  styles?: IStyleFunctionOrObject<ICalloutContentStyleProps, ICalloutContentStyles>;

  /**
   * If specified, renders the Callout in a hidden state.
   * Use this flag, rather than rendering a callout conditionally based on visibility,
   * to improve rendering performance when it becomes visible.
   * Note: When callout is hidden its content will not be rendered. It will only render
   * once the callout is visible.
   */
  hidden?: boolean;
}

export interface ICalloutContentStyleProps {
  /**
   * Theme to apply to the calloutContent.
   */
  theme: ITheme;

  /**
   * Width for callout including borders.
   */
  calloutWidth?: number;

  /**
   * CSS class to apply to the callout.
   */
  className?: string;

  /**
   * Callout positioning data
   */
  positions?: ICalloutPositionedInfo;

  /**
   * Whether or not to clip content of the callout,
   * if it overflows vertically.
   */
  overflowYHidden?: boolean;

  /**
   * Background color for the beak and callout.
   */
  backgroundColor?: string;

  /**
   * Width of Callout beak
   */
  beakWidth?: number;

  /**
   * Max width for callout including borders.
   */
  calloutMaxWidth?: number;
}

export interface ICalloutContentStyles {
  /**
   * Style for wrapper of Callout component.
   */
  container: IStyle;

  /**
   * Style for callout container root element.
   */
  root: IStyle;

  /**
   * Style for callout beak.
   */
  beak: IStyle;

  /**
   * Style for callout beak curtain.
   */
  beakCurtain: IStyle;

  /**
   * Style for content component of the callout.
   */
  calloutMain: IStyle;
}
