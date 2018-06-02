import * as React from 'react';
import { DOIcon, IDOIconProps } from '../DOIcon/DOIcon';
import './DONavigationLink.scss';

export interface IDONavigationLinkProps {
  label: string;
  href: string;
  role?: string;
  icon?: IDOIconProps;
}

export interface IDONavigationLinkState {}

export class DONavigationLink extends React.Component<IDONavigationLinkProps, IDONavigationLinkState> {
  public static defaultProps = {
    role: 'menuitem'
  };

  public render(): JSX.Element {
    return (
      <a className="od-Navigation-subMenuItem" href={this.props.href} role={this.props.role}>
        {this._getIcon()}
        {this.props.label}
      </a>
    );
  }

  private _getIcon() {
    if (this.props.icon) {
      return <DOIcon iconClass={this.props.icon.iconClass} bgColor={this.props.icon.bgColor} />;
    }
  }
}
