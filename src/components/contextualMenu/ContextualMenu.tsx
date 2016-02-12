import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';

export interface IContextualMenuItem {
  key: string;
  name: string;
  onClick?: (ev: any) => void
}

export interface IContextualMenuProps {
  items: IContextualMenuItem[];  
}

export default class ContextualMenu extends React.Component<IContextualMenuProps, any> {
  public render() {
    return (
      <FocusZone>
        <ul className="ms-ContextualMenu is-open">
          { this.props.items.map(item => (
          <li className="ms-ContextualMenu-item">
              <a className="ms-ContextualMenu-link" onClick={ (item.onClick ? item.onClick : null) }>{ item.name }</a>
          </li>          
          )) }
        </ul>
      </FocusZone>
    );
  }
}