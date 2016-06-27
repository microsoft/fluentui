import * as React from 'react';
import './MessageBar.scss';
import { css } from '../../utilities/css';
import { IMessageBarProps, MessageBarType } from './MessageBar.Props';

export interface IMessageBarState {
  labelId?: string;
}

let _instance = 0;

export class MessageBar extends React.Component<IMessageBarProps, IMessageBarState> {

  public static defaultProps: IMessageBarProps = {
    messageBarType: MessageBarType.info
  };

  private ICON_MAP = {
    [MessageBarType.info]:    'infoCircle',
    [MessageBarType.warning]: 'infoCircle',
    [MessageBarType.error]: 'xCircle',
    [MessageBarType.remove]: 'circle',
    [MessageBarType.severeWarning]: 'alert',
    [MessageBarType.success]: 'checkboxCheck ms-Icon--circle'
  };

  constructor(props: IMessageBarProps) {
    super(props);

    this.state = {
      labelId: `MessageBar-${ _instance++ }`,
    };
  }

  public render(): JSX.Element {
    let { messageBarType, children, actions } = this.props;
    let {labelId } = this.state;

    const className = css(this.props.className, 'ms-MessageBar', {
      'ms-MessageBar': messageBarType === MessageBarType.info,
      'ms-MessageBar--error': messageBarType === MessageBarType.error,
      'ms-MessageBar--remove': messageBarType === MessageBarType.remove,
      'ms-MessageBar--severeWarning': messageBarType === MessageBarType.severeWarning,
      'ms-MessageBar--success' : messageBarType === MessageBarType.success,
      'ms-MessageBar--warning' : messageBarType === MessageBarType.warning
    });

    const iconSpan = <div className='ms-MessageBar-icon'><i className={ `ms-Icon ms-Icon--${this.ICON_MAP[messageBarType]}` }></i></div>;

    return (
      <div className={className} role='status' aria-live='polite' tabIndex={ 0 } aria-controls='ms-MessageBar-text'>
        <div className='ms-MessageBar-content'>
          {iconSpan}
          <div className='ms-MessageBar-text' id={ labelId }>
            <div className='ms-MessageBar-actions'>
              { actions }
            </div>
            { children }
          </div>
        </div>
      </div>
    );
  }

}
