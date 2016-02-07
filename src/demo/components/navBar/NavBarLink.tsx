import * as React from 'react';
import './NavBarLink.css';

export interface INavBarLinkProps {
  item: {
    key: string;
    url: string;
    name: string;
  };
  isActive: boolean;
  isFocused: boolean;
  isSelected: boolean;
}

export default class NavBarLink extends React.Component<INavBarLinkProps, any> {

  public static contextTypes = {
    router: React.PropTypes.object
  };

  public render() {
    let { item, isActive, isFocused } = this.props;

    let isSelected = location.hash === item.url;

    let rootClass = 'NavBarLink' +
      (isFocused ? ' NavBarLink--isFocused' : '') +
      (isSelected ? ' NavBarLink--isSelected' : '') +
      (isActive ? ' NavBarLink--isActive' : '');

    return (
      <a
        ref='root'
        data-selection-key={ item.key }
        className={ rootClass }
        tabIndex={ isFocused ? 0 : -1 }
        href={ item.url }
      >{ item.name }</a>
    );
  }

  public componentDidUpdate(prevProps) {
    let { isFocused, isActive } = this.props;

    if (isFocused && isActive && isFocused !== prevProps.isFocused) {
      (this.refs as any).root.focus();
    }
  }

}
