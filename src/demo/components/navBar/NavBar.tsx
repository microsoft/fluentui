import * as React from 'react';

import FocusZone from '../../../utilities/focus/FocusZone';
import KeyCodes from '../../../utilities/KeyCodes';
import './NavBar.scss';
import { ExampleStatus } from '../app/AppState';

export interface INavBarProps {
  groups: {
    name?: string;
    url?: string;

    links?: {
      name?: string;
      url?: string;
      status?: ExampleStatus
    }[];
  }[];
}

export interface INavBarState {
  isGroupExpanded: boolean[]
}

export default class NavBar extends React.Component<INavBarProps, INavBarState> {

  constructor() {
    super();

    this.state = {
      isGroupExpanded: []
    };

    this._onGroupHeaderClicked = this._onGroupHeaderClicked.bind(this);
  }

  public render() {
    let { groups } = this.props;

    let groupElements = groups.map((group, groupIndex) => {
    let isGroupExpanded = this.state.isGroupExpanded[groupIndex] !== false;

    return (
      <div key={ groupIndex } className={ 'NavBar-group' + (isGroupExpanded ? ' is-expanded' : '') }>
        <button
          className='NavBar-groupButton'
          data-group-index={ groupIndex }
          onClick={ this._onGroupHeaderClicked }
        >
          <i className='NavBar-groupChevron ms-Icon ms-Icon--chevronDown'/>
          { group.name }
        </button>

        <div className='NavBar-groupContent ms-u-slideDownIn20' data-focus-zone-enabled={ isGroupExpanded }>
        { group.links.map((link, linkIndex) => (
          <a
            key={ `${ groupIndex }:${ linkIndex }` }
            className={'NavBar-link' + (this._isSelected(link) ? ' is-selected' : '')}
            href={ link.url }
          >
            <span className='NavBar-linkText'>{ link.name }</span>
            { link.status !== undefined ? (
            <span className={ 'NavBar-linkFlair ' + 'is-state' + link.status } >{ ExampleStatus[link.status] }</span>
            ) : ( null ) }
          </a>
        )) }
        </div>
      </div>
    )});

    return (
      <FocusZone>
        <div className='NavBar' onKeyPress={ this._onKeyPress }>
          { groupElements }
        </div>
      </FocusZone>
    );
  }
  private _onGroupHeaderClicked(ev) {
    let groupIndex = Number(ev.currentTarget.attributes['data-group-index'].value);
    let currentState = this.state.isGroupExpanded[groupIndex] !== false;

    this.state.isGroupExpanded[groupIndex] = !currentState;
    this.forceUpdate();
  }

  private _onKeyPress(ev) {

  }

  private _isSelected(link) {
    return (location.hash === link.url);
  }
}
