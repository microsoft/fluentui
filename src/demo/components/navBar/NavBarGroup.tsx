import * as React from 'react';
import './NavBarGroup.css';

export interface INavBarGroupProps {
  item: {
    name: string;
    key: string;
  };
  isActive: boolean;
  isFocused: boolean;
  isExpanded: boolean;
  onToggleExpanded?: (isExpanded: boolean) => void;
}

export default class NavBarGroup extends React.Component<INavBarGroupProps, any> {

  constructor() {
    super();

    this._handleClick = this._handleClick.bind(this);
  }

  public render() {
    let { item, isActive, isFocused, isExpanded } = this.props;
    let rootClass = 'NavBarGroup ms-font-xs ms-fontColor-neutralTertiary' +
      (isFocused ? ' NavBarGroup--isFocused' : '') +
      (isActive ? ' NavBarGroup--isActive' : '') +
      (isExpanded ? ' NavBarGroup--isExpanded' : '');

    return (
      <div
        ref='root'
        className={ rootClass }
        data-selection-key={ item.key }
        tabIndex={ isFocused ? 0 : -1 }
        onClick={ this._handleClick }
      >
        <i className='NavBarGroup-chevron ms-Icon ms-Icon--chevronDown'/>
        { item.name }
      </div>
    );
  }

  public componentDidUpdate(prevProps) {
    let { isFocused, isActive } = this.props;

    if (isFocused && isActive && isFocused !== prevProps.isFocused) {
      (this.refs as any).root.focus();
    }
  }

  private _handleClick() {
    let { onToggleExpanded, isExpanded } = this.props;

    if (onToggleExpanded) {
      onToggleExpanded(!isExpanded);
    }
  }
}
