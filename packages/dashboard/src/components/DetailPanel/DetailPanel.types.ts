import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';

export type FlatOrPromise<T> = T | Promise<T>;
export type FunctionCallback<T> = () => FlatOrPromise<T>;

export enum LoadingTheme {
  General,
  OnPageLoad,
  OnRefresh,
  OnL2ContentLoad,
  OnPrimaryButtonClick,
  OnSecondaryButtonClick,
  OnPivotItemLoad
}

export enum LoadingType {
  None,
  Page,
  Workflow,
  Inline,
  Content
}

export enum ConfirmationStatus {
  None,
  Success,
  Warning,
  Failed
}

export interface IQuickAction {
  /**
   * Hide the quick action
   */
  hide?: boolean;

  /**
   * Fabric icon name
   */
  icon: string;

  /**
   * Name of the action
   */
  actionName: string;

  /**
   * Callback on click
   */
  onClick: () => void;
}

export interface IDetailPanelHeaderProps {
  /**
   * Title of the header
   */
  title: string;

  /**
   * Set weather its a Persona type header
   */
  personaHeader?: boolean;

  /**
   * Show status indicator
   */
  statusIndicator?: boolean;

  /**
   * Quick action configuration
   */
  quickActions?: IQuickAction[];

  /**
   * Status string
   */
  status?: string;

  /**
   * Url to the image to use, should be a square aspect ratio and big enough to fit in the image area.
   */
  imageUrl?: string;
  /**
   * Alt text for the image to use. Defaults to an empty string.
   */
  imageAlt?: string;

  /**
   * The user's initials to display in the image area when there is no image.
   * @defaultvalue [Derived from title]
   */
  imageInitials?: string;
}

export interface IDetailPanelLoadingProps {
  /**
   * Loading animation type
   */
  loadingType?: LoadingType;

  /**
   * Message to display under load spiner(only)
   */
  message?: string;
}

export interface IDetailPanelMessageBannerProps {
  /**
   * Type of message bar
   */
  messageType?: MessageBarType;

  /**
   * Message to display
   */
  message?: string;

  /**
   * On dismiss action callback
   */
  onDismissAction?: FunctionCallback<void>;
}

export interface IDetailPanelBaseProps {
  /**
   * Additional setting on the fabric panel
   */
  panelSetting?: IBaseContainerExtendProps;

  /**
   * Callback on detail panel page load before render the header and content
   * Reject with @type {IDetailPanelErrorResult} to set the error state message bar
   */
  onPageLoad?: FunctionCallback<void>;

  /**
   * Callback on detail panel page refresh the content
   * Reject with @type {IDetailPanelErrorResult} to set the error state message bar
   */
  onRefresh?: FunctionCallback<void>;

  /**
   * Call back on getting the customized loading animation to override the default
   * spinner or shimmer
   * if the return vaule is @type {null} or @type {undefined}, a default load animation will be applied
   */
  onGetLoadingAnimation?: (loadingTheme: LoadingTheme, themeId?: string | number) => JSX.Element | null;

  /**
   * Main content header props
   */
  mainHeader: IDetailPanelHeaderProps | JSX.Element;

  /**
   * Content to display in the main area
   * @returns {JSX.Element} for general render
   * @returns {IDetailPanelPivotBodyProps} for Pivot detail panel
   */
  mainContent: JSX.Element | IDetailPanelPivotBodyProps;

  /**
   * Main action bar of the detail panel
   */
  mainActionBar?: IDetailPanelActionBarProps;

  /**
   * Current selected L2 Id
   */
  currentL2Id?: string | number;

  /**
   * On Get the L2 header props
   */
  onGetL2Header?: (l2Id: string | number) => IDetailPanelHeaderProps | JSX.Element;

  /**
   * On Get the L2 content element call back
   * Reject with @type {IDetailPanelErrorResult} to set the error state message bar
   */
  onGetL2Content?: (l2Id: string | number) => FlatOrPromise<JSX.Element>;

  /**
   * Get the current action bar props
   */
  onGetL2ActionBar?: (l2Id: string | number) => IDetailPanelActionBarProps;

  /**
   * On click the back on current L2
   */
  onL2BackClick?: (l2Id: string | number) => void;

  /**
   * Callback on close the detail panel
   */
  onDetailPanelDimiss?: () => void;
}

export interface IBaseContainerExtendProps {
  /**
   * Custom style
   */
  customStyle?: IStyle;

  /**
   * Type of @type {PanelType}
   */
  type?: PanelType;

  /**
   * Custom wideth of the flyout
   */
  customWidth?: string;

  /**
   * Is the flyout open
   */
  isOpen?: boolean;

  /**
   * Is the flyout blocking
   */
  isBlocking?: boolean;

  /**
   * Support light dismiss
   */
  isLightDismiss?: boolean;

  /**
   * On light dimiss callback
   */
  onLightDismiss?: () => void;
}

export interface IBaseContainerProps extends IBaseContainerExtendProps {
  /**
   * Main content header props
   */
  header?: IDetailPanelHeaderProps | JSX.Element;

  /**
   * Message banner settings
   */
  messageBanner?: IDetailPanelMessageBannerProps;

  /**
   * Loading element
   */
  loadingElement?: JSX.Element;

  /**
   * Set the loading element inline
   */
  inlineLoading?: boolean;

  /**
   * Content to display in the main area
   */
  mainContent?: JSX.Element;

  /**
   * Footer to display if any
   */
  actionBar?: IDetailPanelActionBarProps;

  /**
   * On dismiss the detail panel
   */
  onDismiss: () => void;

  /**
   * On back action click
   */
  onBack?: () => void;

  /**
   * On refresh click
   */
  onRefresh?: () => void;
}

export interface IDetailPanelBaseCommonAction {
  /**
   * Set loading animation on detail panel
   */
  onSetLoadingAnimation?: (loadingTheme?: LoadingTheme, message?: string, forceInline?: boolean) => void;

  /**
   * Set the message banner display on detail panel
   */
  onSetMessageBanner?: (messageBanner?: IDetailPanelMessageBannerProps) => void;

  /**
   * Set the action bar props
   */
  onSetActionBar?: (actionBar?: IDetailPanelActionBarProps) => void;

  /**
   * On set the final confirmation page
   */
  onSetConfirmationResult?: (props: IDetailPanelConfirmationResultProps) => void;

  /**
   * Call back to get the loading animation element
   */
  onGetLoadingElement?: (loadingTheme: LoadingTheme, themeId?: string | number, message?: string, forceInline?: boolean) => JSX.Element;
}

export interface IDetailPanelErrorResult {
  /**
   * Message bar display setting
   */
  messageBannerSetting: IDetailPanelMessageBannerProps;
}

export interface IDetailPanelActionResult {
  /**
   * Show message banner of result confirmation
   */
  messageBanner?: IDetailPanelMessageBannerProps;

  /**
   * Show a confirmation page template
   */
  confirmationPage?: IDetailPanelConfirmationResultProps;
}

export interface IActionButton {
  /**
   * Button text
   */
  buttonText?: string;

  /**
   * Call back on button click
   */
  onAction?: FunctionCallback<IDetailPanelActionResult | void>;

  /**
   * Use inline spinner on click submitting
   */
  inlineSpinner?: boolean;

  /**
   * Message showing on submitting
   */
  onActionMessage?: string;
}

export interface IDetailPanelActionBarProps {
  /**
   * Primary button props
   * @type {IActionButton}
   */
  primaryButton?: IActionButton;

  /**
   * Secondary button props
   * @type {IActionButton}
   */
  secondaryButton?: IActionButton;

  /**
   * Link props
   * @type {IDetailPanelLinkItem}
   */
  linkButton?: IDetailPanelLinkItem;
}

export interface IDetailInfoTileProps {
  /**
   * Id of the tile
   */
  tileId?: string | number;

  /**
   * Title of the tile
   */
  title: string;

  /**
   * Message line of the tile
   */
  message?: string | JSX.Element;

  /**
   * Action text of the tile
   */
  actionText?: string;

  /**
   * On click action of the tile
   */
  onAction?: (tileId?: string | number) => void;
}

export interface IDetailPanelPivotItemProps {
  /**
   * On pivot content load method
   */
  onContentLoad?: FunctionCallback<JSX.Element | IDetailInfoTileProps[]>;

  /**
   * Content of pivot, if this is assigned @property {onContentLoad} will be ignored
   */
  content?: JSX.Element | IDetailInfoTileProps[];

  /**
   * Current item key
   */
  itemKey?: string;

  /**
   * Action bar setting for current pivot item
   */
  actionBar?: IDetailPanelActionBarProps;
}

export interface IDetailPanelPivotBodyItem extends IDetailPanelPivotItemProps {
  /**
   * Header text of a pivot item
   */
  headerText: string;
}

export interface IDetailPanelPivotBodyProps {
  /**
   * Pivot selected key
   */
  selectedPivotKey?: string;

  /**
   * On pivot link click
   */
  onPivotLinkClick?: (key: string) => void;

  /**
   * Pivot items
   */
  items: IDetailPanelPivotBodyItem[];
}

export interface IDetailPanelConfirmationStatusText {
  /**
   * Status showing on the confirmation page
   */
  status: ConfirmationStatus;

  /**
   * Title of confirmation page
   */
  title: string;

  /**
   * Items of detail
   */
  items?: string[];
}

export interface IDetailPanelLinkItem {
  /**
   * Link text
   */
  linkText: string;

  /**
   * Link action
   */
  linkAction?: () => void;

  /**
   * Link href
   */
  linkHref?: string;

  /**
   * Link target
   */
  linkTarget?: '_self' | '_blank' | '_parent' | '_top';
}

export interface IDetailPanelConfirmationLinks {
  /**
   * Title of the link group
   */
  title: string;

  /**
   * Link details
   */
  links: IDetailPanelLinkItem[];
}

export interface IDetailPanelConfirmationResultProps {
  /**
   * Overall status of the page
   */
  overallStatus?: ConfirmationStatus;

  /**
   * Header text
   */
  headerText: string;

  /**
   * Description text
   */
  descriptionText?: string | JSX.Element;

  /**
   * Status items
   */
  statusItems?: () => IDetailPanelConfirmationStatusText[];

  /**
   * Link list
   */
  linkList?: () => IDetailPanelConfirmationLinks[];

  /**
   * action bar setting
   */
  actionBar?: IDetailPanelActionBarProps;
}

export interface IDetailPanelAnalytics {
  analyticsHandler?: (componentType: string, actionType: string, props: {}, payload?: {}) => void;
}

export interface IDetailPanelProps extends IDetailPanelBaseProps, IDetailPanelAnalytics {}
