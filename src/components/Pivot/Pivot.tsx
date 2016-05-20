import * as React from 'react';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import KeyCodes from '../../utilities/KeyCodes';
import { PivotItem } from './PivotItem';
import { IPivotProps } from './Pivot.Props';
import { PivotLinkFormat } from './Pivot.Props';
import { PivotLinkSize } from './Pivot.Props';

import './Pivot.scss';
import { css } from '../../utilities/css';

/**
 *  Usage:
 *
 *   <Pivot>
 *     <PivotItem linkText="Foo">
 *       <Label>Pivot #1</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bar">
 *       <Label>Pivot #2</Label>
 *     </PivotItem>
 *     <PivotItem linkText="Bas">
 *     <Label>Pivot #3</Label>
 *     </PivotItem>
 *   </Pivot>
 */

export interface IPivotState {
  selectedIndex: number;
}

interface IPivotLink {
  linkText: string;
}

export default class Pivot extends React.Component<IPivotProps, IPivotState> {

  constructor(props?: IPivotProps) {
    super(props);
    this.state = this._getStateFromProps(props);
  }

  public componentWillReceiveProps(newProps: IPivotProps) {
    this.state = this._getStateFromProps(newProps);
  }

  public render() {
    return (
      <div>
        {this._renderPivotLinks()}
        {this._renderPivotItem()}
      </div>
    );
  }

  /**
   * Renders the set of links to route between pivots
   */
  private _renderPivotLinks() {
    const links: IPivotLink[] = this.getPivotLinks();
    return (
      <FocusZone direction={ FocusZoneDirection.horizontal }>
        <ul className={ css('ms-Pivot',
                     { 'ms-Pivot--large': this.props.linkSize === PivotLinkSize.large },
                     { 'ms-Pivot--tabs': this.props.linkFormat === PivotLinkFormat.tabs })}>
        {links.map(this._renderLink.bind(this))}
      </ul>
      </FocusZone>
    );
  }

  /**
   * Renders a pivot link
   */
  private _renderLink(link: IPivotLink, index: number, links: IPivotLink[]) {
    return (
      <li key={index}
          className={ css('ms-Pivot-link', {
                      'is-selected': this.state.selectedIndex === index })}>
          <a onClick={this._onLinkClick.bind(this, index)}
             onKeyPress={this._onKeyPress.bind(this, index)}
             role='link'>
            {link.linkText}
          </a>
      </li>
    );
  }

  /**
   * Renders the current Pivot Item
   */
  private _renderPivotItem() {
    let index = this.state.selectedIndex;
    if (!index) {
      index = 0;
    }

    let item: PivotItem = this.props.children[index];
    return (
      <div className='pivotItem'>
        {item}
      </div>
    );
  }

  /**
   * Gets the set of PivotLinks as arrary of IPivotLink
   * The set of Links is determined by child components of type PivotItem
   */
  private getPivotLinks(): IPivotLink[] {
    let links: IPivotLink[] = [];

    React.Children.map(this.props.children, (child: any, index: number) => {
      if (typeof child === 'object' && child.type === PivotItem) {
        const pivotItem = child as PivotItem;
        links.push({
          linkText: pivotItem.props.linkText
        });
      }
    });

    return links;
  }

  /**
   * Handles the onClick event on PivotLinks
   */
  private _onLinkClick(index: number, ev: React.MouseEvent) {
      ev.preventDefault();
      this._updateSelectedItem(index, ev);
    }

  /**
   * Handle the onKeyPress eventon the PivotLinks
   */
  private _onKeyPress(index: number, ev: React.KeyboardEvent) {
      ev.preventDefault();
      if (ev.which === KeyCodes.enter) {
        this._updateSelectedItem(index);
      }
  }

  /**
   * Updates the state with the new selected index
   */
  private _updateSelectedItem(index: number, ev?: React.MouseEvent ) {
      this.setState({
        selectedIndex: index
      });

      if (this.props.onLinkClick) {
        this.props.onLinkClick(this.props.children[index], ev);
      }
  }

  /**
   * returns new state state based on the provided Props
   */
  private _getStateFromProps(newProps: IPivotProps): IPivotState {
    let newState: IPivotState;
    let index: number;
    if (newProps.initialSelectedIndex) {
      index = newProps.initialSelectedIndex;
    } else {
      index = 0;
    }

    newState = {
      selectedIndex: index
    };

    return newState;
  }
}
