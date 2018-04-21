import * as React from 'react';
import {
  BaseComponent,
  DelayedRender,
  css,
  getId
} from '../../Utilities';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
import { IMessageBarProps, MessageBarType } from './MessageBar.types';
import * as stylesImport from './MessageBar.scss';
const styles: any = stylesImport;

export interface IMessageBarState {
  labelId?: string;
  showContent?: boolean;
  expandSingleLine?: boolean;
}

export class MessageBar extends BaseComponent<IMessageBarProps, IMessageBarState> {

  public static defaultProps: IMessageBarProps = {
    messageBarType: MessageBarType.info,
    onDismiss: undefined,
    isMultiline: true,
  };

  private ICON_MAP = {
    [MessageBarType.info]: 'Info',
    [MessageBarType.warning]: 'Info',
    [MessageBarType.error]: 'ErrorBadge',
    [MessageBarType.blocked]: 'Blocked2',
    [MessageBarType.remove]: 'Blocked', // TODO remove deprecated value at >= 1.0.0
    [MessageBarType.severeWarning]: 'Warning',
    [MessageBarType.success]: 'Completed'
  };

  constructor(props: IMessageBarProps) {
    super(props);

    this.state = {
      labelId: getId('MessageBar'),
      showContent: false,
      expandSingleLine: false,
    };
  }

  public render(): JSX.Element {
    const { isMultiline } = this.props;

    return isMultiline ? this._renderMultiLine() : this._renderSingleLine();
  }

  private _getActionsDiv(): JSX.Element | null {
    if (this.props.actions) {
      return (
        <div
          className={ this.props.isMultiline ?
            ('ms-MessageBar-actions ' + styles.actions) :
            ('ms-MessageBar-actionsSingleLine ' + styles.actionsSingleLine) }
        >
          { this.props.actions }
        </div>
      );
    }
    return null;
  }

  private _getClassName(): string {
    return css(this.props.className, 'ms-MessageBar', styles.root, {
      ['ms-MessageBar ' + styles.root]: this.props.messageBarType === MessageBarType.info,
      ['ms-MessageBar--error ' + styles.rootIsError]: this.props.messageBarType === MessageBarType.error,
      ['ms-MessageBar--blocked ' + styles.rootIsBlocked]: (this.props.messageBarType === MessageBarType.blocked) ||
        (this.props.messageBarType === MessageBarType.remove), // TODO remove deprecated value at >= 1.0.0
      ['ms-MessageBar--severeWarning ' + styles.rootIsSevereWarning]: this.props.messageBarType === MessageBarType.severeWarning,
      ['ms-MessageBar--success ' + styles.rootIsSuccess]: this.props.messageBarType === MessageBarType.success,
      ['ms-MessageBar--warning ' + styles.rootIsWarning]: this.props.messageBarType === MessageBarType.warning
    });
  }

  private _getDismissDiv(): JSX.Element | null {
    if (this.props.onDismiss) {
      return (
        <IconButton
          disabled={ false }
          className={ css('ms-MessageBar-dismissal', styles.dismissal) }
          onClick={ this.props.onDismiss }
          iconProps={ { iconName: 'Clear' } }
          ariaLabel={ this.props.dismissButtonAriaLabel }
        />
      );
    }
    return null;
  }

  private _getDismissSingleLine(): JSX.Element | null {
    if (this.props.onDismiss) {
      return (
        <div className={ css('ms-MessageBar-dismissSingleLine', styles.dismissSingleLine) }>
          { this._getDismissDiv() }
        </div>
      );
    }
    return null;
  }

  private _getExpandSingleLine(): JSX.Element | null {
    if (!this.props.actions && this.props.truncated) {
      return (
        <div className={ css('ms-MessageBar-expandSingleLine', styles.expandSingleLine) }>
          <IconButton
            disabled={ false }
            className={ css('ms-MessageBar-expand', styles.expand) }
            onClick={ this._onClick }
            iconProps={ { iconName: this.state.expandSingleLine ? 'DoubleChevronUp' : 'DoubleChevronDown' } }
            ariaLabel={ this.props.overflowButtonAriaLabel }
          />
        </div>
      );
    }
    return null;
  }

  private _getIconSpan(): JSX.Element {
    return (
      <div className={ css('ms-MessageBar-icon', styles.icon) }>
        <Icon iconName={ this.ICON_MAP[this.props.messageBarType!] } />
      </div>
    );
  }

  private _renderMultiLine(): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> {
    return (
      <div
        className={
          css(this._getClassName(),
            'ms-MessageBar-multiline',
            styles.multiLine,
            this.props.onDismiss && styles.dismissalMultiLine
          )
        }
        role='status'
        aria-live={ this._getAnnouncementPriority() }
      >
        <div className={ css(styles.content, 'ms-MessageBar-content') }>
          { this._getIconSpan() }
          { this._renderInnerText() }
          { this._getDismissDiv() }
        </div>
        { this._getActionsDiv() }
      </div >
    );
  }

  private _renderSingleLine(): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> {
    return (
      <div
        className={
          css(this._getClassName(),
            'ms-MessageBar-singleline',
            styles.singleLine,
            this.props.onDismiss && 'ms-MessageBar-dismissalSingleLine',
            this.props.truncated && 'ms-MessageBar-expandingSingleLine',
            this.props.truncated && styles.expandingSingleLine
          )
        }
      >
        <div className={ css(styles.content, 'ms-MessageBar-content') }>
          { this._getIconSpan() }
          { this._renderInnerText() }
          { this._getExpandSingleLine() }
          { this._getActionsDiv() }
          { this._getDismissSingleLine() }
        </div>
      </div >
    );
  }

  private _renderInnerText(): JSX.Element {
    return (
      <div
        className={ css('ms-MessageBar-text', styles.text, this.props.actions && styles.multiLineWithActions, !this.props.onDismiss && styles.noDismissButton, this.state.expandSingleLine && styles.expandSingleLine) }
        id={ this.state.labelId }
      >
        <span
          className={ css('ms-MessageBar-innerText ' + styles.innerText) }
          role='status'
          aria-live={ this._getAnnouncementPriority() }
        >
          <DelayedRender>
            <span>{ this.props.children }</span>
          </DelayedRender>
        </span>
      </div >
    );
  }

  private _getAnnouncementPriority(): 'assertive' | 'polite' {
    switch (this.props.messageBarType) {
      case MessageBarType.blocked:
      case MessageBarType.error:
      case MessageBarType.severeWarning:
        return 'assertive';
    }
    return 'polite';
  }

  private _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    this.setState({ expandSingleLine: !this.state.expandSingleLine });
  }
}