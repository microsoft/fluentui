import * as React from 'react';
import {
  BaseComponent,
  DelayedRender,
  css,
  getId
} from '../../Utilities';
import { IconButton } from '../../Button';
import { Icon } from '../../Icon';
import { IMessageBarProps, MessageBarType } from './MessageBar.Props';
import * as stylesImport from './MessageBar.scss';
const styles: any = stylesImport;

export interface IMessageBarState {
  labelId?: string;
  showContent?: boolean;
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
    [MessageBarType.blocked]: 'Blocked',
    [MessageBarType.remove]: 'Blocked', // TODO remove deprecated value at >= 1.0.0
    [MessageBarType.severeWarning]: 'Warning',
    [MessageBarType.success]: 'Completed'
  };

  constructor(props: IMessageBarProps) {
    super(props);

    this.state = {
      labelId: getId('MessageBar'),
      showContent: false
    };
  }

  public render(): JSX.Element {
    let { isMultiline } = this.props;

    return isMultiline ? this._renderMultiLine() : this._renderSingleLine();
  }

  private _getActionsDiv(): JSX.Element | null {
    if (this.props.actions) {
      return <div className={ this.props.isMultiline ?
        ('ms-MessageBar-actions ' + styles.actions) :
        ('ms-MessageBar-actionsOneline ' + styles.actionsOneline) }>
        { this.props.actions }
      </div>;
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
          iconProps={ { iconName: 'Cancel' } }
          ariaLabel={ this.props.dismissButtonAriaLabel }
        />
      );
    }
    return null;
  }

  private _getDismissOneLine(): JSX.Element | null {
    if (this.props.onDismiss) {
      return (
        <div className={ css('ms-MessageBar-dismissOneline', styles.dismissOneline) }>
          { this._getDismissDiv() }
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

  private _getInnerTextClassName(): string {
    return this.props.onDismiss || this.props.actions ?
      'ms-MessageBar-innerTextPadding ' + styles.innerTextPadding : 'ms-MessageBar-innerText ' + styles.innerText;
  }

  private _renderMultiLine(): React.ReactElement<React.HTMLAttributes<HTMLAreaElement>> {
    return (
      <div
        className={
          css(this._getClassName(),
            'ms-MessageBar-multiline',
            styles.multiline,
            this.props.onDismiss && styles.dismissalMultiline,
            this.props.actions && styles.actionableMultiline
          )
        }
        role='status'
        aria-live={ this._getAnnouncementPriority() }>
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
      <div className={
        css(this._getClassName(),
          'ms-MessageBar-singleline',
          styles.singleline,
          this.props.onDismiss && 'ms-MessageBar-dismissalOneline ' + styles.rootIsOneline,
          this.props.actions && styles.actionableOneline
        )
      } >
        <div className={ css(styles.content, 'ms-MessageBar-content') }>
          { this._getIconSpan() }
          { this._renderInnerText() }
          { this._getDismissOneLine() }
        </div>
        { this._getActionsDiv() }
      </div >
    );
  }

  private _renderInnerText(): JSX.Element {
    return (
      <div className={ css('ms-MessageBar-text', styles.text) } id={ this.state.labelId }>
        <span className={ this._getInnerTextClassName() } role='status' aria-live={ this._getAnnouncementPriority() }>
          <DelayedRender>
            <span>{ this.props.children }</span>
          </DelayedRender>
        </span>
      </div>
    );
  }

  private _getAnnouncementPriority(): string {
    switch (this.props.messageBarType) {
      case MessageBarType.blocked:
      case MessageBarType.error:
      case MessageBarType.severeWarning:
        return 'assertive';
    }
    return 'polite';
  }
}
