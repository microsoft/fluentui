import * as React from 'react';
import './DOIcon.scss';

export interface IDOIconProps {
  iconClass: string;
  bgColor: string;
  ariaHidden?: boolean;
}

export class DOIcon extends React.Component<IDOIconProps, {}> {
  public static defaultProps = {
    ariaHidden: true
  };

  public render() {
    return (
      <i
        className={ 'od-Icon od-Icon--' + this.props.iconClass + ' ms-bgColor-' + this.props.bgColor }
        aria-hidden={ this.props.ariaHidden }
      />
    );
  }
}