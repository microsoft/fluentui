import * as React from 'react';
import './Breadcrumb.scss';
import { default as FocusZone, FocusZoneDirection } from '../../utilities/focus/FocusZone';
import { IBreadcrumbProps } from './Breadcrumb.Props';
import { ContextualMenu, DirectionalHint } from '../index';
import { getRTL } from '../../utilities/rtl';
import { css } from '../../utilities/css';

export interface IBreadcrumbState {
  isOverflowOpen: boolean;
}

export default class Breadcrumb extends React.Component<IBreadcrumbProps, IBreadcrumbState> {
  public refs: {
    [key: string]: React.ReactInstance;
    overflowAnchor: HTMLElement;
  };

  constructor(props: IBreadcrumbProps) {
    super(props);

    this.state = {
      isOverflowOpen: false
    };
  }

  public render() {
    let { breadcrumbs, maxDisplayedBreadcrumbs } = this.props;
    let { isOverflowOpen } = this.state;

    maxDisplayedBreadcrumbs = maxDisplayedBreadcrumbs ? maxDisplayedBreadcrumbs : breadcrumbs.length;

    return (
      <div className='ms-Breadcrumb'>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          <ul className='ms-Breadcrumb-list'>
          { maxDisplayedBreadcrumbs < breadcrumbs.length ? (
            <li className='ms-Breadcrumb-overflow'>
              <a className='ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis' ref='overflowAnchor' onClick={ this._onOverflowClicked.bind(this) }></a>
              <i className={ css('ms-Breadcrumb-chevron ms-Icon', getRTL() ? 'ms-Icon--chevronLeft' : 'ms-Icon--chevronRight') }></i>
            </li>
          ) : (null) }
          { breadcrumbs.filter(
                (item, index) => (breadcrumbs.length - maxDisplayedBreadcrumbs <= index)
              ).map(
                (item, index) => (
             <li className='ms-Breadcrumb-listItem'>
              <a className='ms-Breadcrumb-itemLink' onClick={ this._onBreadcrumbClicked.bind(this, item) }>{ item.text }</a>
              <i className={ css('ms-Breadcrumb-chevron ms-Icon', getRTL() ? 'ms-Icon--chevronLeft' : 'ms-Icon--chevronRight') }></i>
            </li>
          )) }
          </ul>
        </FocusZone>
        { isOverflowOpen ? (
          <ContextualMenu
            targetElement={ this.refs.overflowAnchor }
            items={ breadcrumbs.filter(
              (item, index) => (breadcrumbs.length - maxDisplayedBreadcrumbs > index)
              ).map(
                (item, index) => ({'name': item.text, 'key': 'Breadcrumb-overflow-' + index, 'onClick': this._onBreadcrumbClicked.bind(this, item)})
              ) }
              directionalHint={ DirectionalHint.bottomLeftEdge }  />
        ) : (null) }
      </div>
    );
  }

  private _onOverflowClicked(ev: MouseEvent) {
    this.setState({
      'isOverflowOpen' : !this.state.isOverflowOpen
    });
  }

  private _onBreadcrumbClicked(item: any, ev: MouseEvent) {
    if (item.onclick) {
      item.onclick(item.key);
    }
    this.setState({
      'isOverflowOpen': false
    });
  }
}
