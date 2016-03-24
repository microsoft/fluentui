import * as React from 'react';

import FocusZone from '../../utilities/focus/FocusZone';
import './Nav.scss';

export interface INavLink {
  name: string;
  url: string;
  [propertyName: string]: any;
}

export interface INavLinkGroup {
  name?: string;
  links: INavLink[];
}

export interface INavProps {
  groups: INavLinkGroup[];
  onRenderLink?: Function;
}

export interface INavState {
  isGroupExpanded: boolean[];
}

export default class Nav extends React.Component<INavProps, INavState> {

  constructor() {
    super();

    this.state = {
      isGroupExpanded: []
    };

    this._onGroupHeaderClicked = this._onGroupHeaderClicked.bind(this);
  }

  public static defaultProps: INavProps = {
    groups: null,
    onRenderLink: (link: INavLink) => (<span className='Nav-linkText'>{ link.name }</span>)
  };

  private static isSelected(link: INavLink): boolean {
    return location.hash === link.url || location.href === link.url;
  }

  public render(): React.ReactElement<{}> {
    const groups: INavLinkGroup[] = this.props.groups;
    const onRenderLink: Function = this.props.onRenderLink;

    const groupElements: React.ReactElement<{}>[] = groups.map((group: INavLinkGroup, groupIndex: number) => {
      const isGroupExpanded: boolean = this.state.isGroupExpanded[groupIndex] !== false;

      return (
        <div key={ groupIndex } className={ 'Nav-group' + (isGroupExpanded ? ' is-expanded' : '') }>
          { (group.name ?
          <button
            className='Nav-groupButton'
            data-group-index={ groupIndex }
            onClick={ this._onGroupHeaderClicked }
          >
            <i className='Nav-groupChevron ms-Icon ms-Icon--chevronDown'></i>
            { group.name }
          </button> : null)
          }

          <div className='Nav-groupContent ms-u-slideDownIn20' data-focus-zone-enabled={ isGroupExpanded }>
          { group.links.map((link, linkIndex) => (
            <a
              key={ `${ groupIndex }:${ linkIndex }` }
              className={'Nav-link' + (Nav.isSelected(link) ? ' is-selected' : '')}
              href={ link.url }
            >
              { onRenderLink(link) }
            </a>
          )) }
          </div>
        </div>
      );
    });

    return (
      <FocusZone>
        <nav role='navigation' className='Nav'>
          { groupElements }
        </nav>
      </FocusZone>
    );
  }

  private _onGroupHeaderClicked(ev): void {
    const groupIndex: number = Number(ev.currentTarget.attributes['data-group-index'].value);
    const currentState: boolean = this.state.isGroupExpanded[groupIndex] !== false;

    this.state.isGroupExpanded[groupIndex] = !currentState;
    this.forceUpdate();
  }
}
