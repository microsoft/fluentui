import * as React from 'react';
import FocusZone from '../../utilities/focus/FocusZone';
import './ContextualMenu.scss';
import KeyCodes from '../../utilities/KeyCodes';

export interface IContextualMenuItem {
  key: string;
  name: string;
  onClick?: (ev: React.MouseEvent) => void;
}

export interface IContextualMenuProps {
  items: IContextualMenuItem[];
  shouldFocusOnMount?: boolean;
  topBeakStyle?: { [ key: string ]: any };
  onDismiss?: () => void;
}

export default class ContextualMenu extends React.Component<IContextualMenuProps, any> {
  public static defaultProps = {
    shouldFocusOnMount: true
  };

  private _previousActiveElement: HTMLElement;

  constructor() {
    super();
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }

  public dismiss() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  public componentWillMount() {
    this._previousActiveElement = document.activeElement as HTMLElement;
  }

  public componentDidMount() {
    if (this.props.shouldFocusOnMount) {
      let focusZone = this.refs['focusZone'] as FocusZone;

      focusZone.focus();
    }
  }

  public componentWillUnmount() {
    if (this._previousActiveElement) {
      this._previousActiveElement.focus();
    }
  }

  public render() {
    let { items, topBeakStyle } = this.props;

    return (
      <FocusZone className='ms-ContextualMenu is-open ms-u-slideDownIn10' ref='focusZone' onLostFocus={ this._onBlur }>
        <div className='ms-ContextualMenu-beak' style={ topBeakStyle } />
        <ul className='ms-ContextualMenu-list is-open ' onKeyDown={ this._onKeyDown }>
          { items.map(item => (
          <li key={ item.key } className="ms-ContextualMenu-item">
              <button className="ms-ContextualMenu-link" onClick={ (ev) => { this._onClick(ev, item) } }>{ item.name }</button>
          </li>
          )) }
        </ul>
      </FocusZone>
    );
  }

  private _onKeyDown(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.escape) {
      ev.stopPropagation();
      ev.preventDefault();
      this.dismiss();
    }
  }

  private _onClick(ev: React.MouseEvent, item: IContextualMenuItem) {
    if (item.onClick) {
      item.onClick(ev);
    }
    this.dismiss();
  }

  private _onBlur(ev: React.FocusEvent) {
    if (!(ev.currentTarget as HTMLElement).contains(ev.relatedTarget as HTMLElement)) {
      this.dismiss();
    }
  }

}