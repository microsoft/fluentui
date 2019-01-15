import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

export type FlatOrPromise<T> = T | Promise<T>;
export type FunctionCallback<T> = () => FlatOrPromise<T>;

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
  hide?: boolean;
  icon: string;
  actionName: string;
  onClick: () => void;
}

export interface IDetailPanelHeaderProps {
  title: string;
  personaHeader?: boolean;
  statusIndicator?: boolean;
  quickActions?: IQuickAction[];
  status?: string;
}

export interface IDetailPanelMessageBannerProps {
  /**
   * Override page title on initial load or L2 content load fail
   */
  pageTitle?: string;

  /**
   * Type of message bar
   */
  messageType: MessageBarType;

  /**
   * Message to display
   */
  message?: string;

  /**
   * On dismiss action callback
   */
  onDismissAction?: () => FunctionCallback<void>;
}

export interface IDetailPanelMainBodyProps {
  /**
   * Function to return the target element to render
   * if the return is a promise, a loading mechanism will be applied
   */
  onElementRender: FunctionCallback<JSX.Element>;

  /**
   * Assign a customer shimmer for loadfing
   */
  shimmer?: JSX.Element;
}
