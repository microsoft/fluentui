import * as React from 'react';

export interface IMessageBarProps extends React.HTMLProps<HTMLElement> {

  /**
   * The type of MessageBar to render.
   * @defaultvalue MessageBarType.info
   */
  messageBarType?: MessageBarType;

  /**
   * The actions you want to show on the other side.
   */
  actions?: JSX.Element;

  /**
   * A description of the messageBar for the benefit of screen readers.
   */
  ariaLabel?: string;
}

export enum MessageBarType {
  /** Info styled MessageBar */
  info,
  /** Error styled MessageBar */
  error,
  /** Remove styled MessageBar */
  remove,
  /** SeverWarning styled MessageBar */
  severeWarning,
  /** Success styled MessageBar */
  success,
  /** Warning styled MessageBar */
  warning
}
