import * as React from 'react';

import Selection from '../../../utilities/selection/Selection';
import SelectionBinding from '../../../utilities/selection/SelectionBinding';
import ISelectionLayout from '../../../utilities/selection/ISelectionLayout';

import './NavBar.css';
import NavBarLink from './NavBarLink';
import NavBarGroup from './NavBarGroup';

export interface INavBarProps {
  groups: {
    name?: string;
    url?: string;

    links?: {
      name?: string;
      url?: string;
    }[];
  }[];
}

export default class NavBar extends React.Component<INavBarProps, any> implements ISelectionLayout {
  private _selectionBinding: SelectionBinding;

  constructor() {
    super();

    this.state = {
      selection: new Selection(this.forceUpdate.bind(this)),
      selectableItems: null,
      isActive: false
    };
  }

  public render() {
    if (!this.state.selectableItems) {
      this.componentWillReceiveProps(this.props);
    }

    let { isActive, selection, selectableItems } = this.state;
    let rootClass = `NavBar${ isActive ? ' NavBar--isActive' : '' }`;

    let groupElements = [];

    selectableItems.forEach(item => {
      if (item.links) {
        let isGroupFocused = selection.getFocusedKey() === item.key;
        let isGroupExpanded = item.isExpanded;
        let groupClass = 'NavBar-group' +
          (isGroupExpanded ? ' NavBar-group--isExpanded' : '');
        let focusedKey = selection.getFocusedKey();

        groupElements.push(
          <div className={ groupClass } key={ item.key }>
            <NavBarGroup
              item={ item }
              isActive={isActive }
              isFocused={ isGroupFocused }
              isExpanded={ isGroupExpanded }
              onToggleExpanded={ item.onToggleExpanded }
            />
            <div className='NavBar-groupContent'>
              {
                item.links.map((link) => (
                  <NavBarLink
                    item={ link }
                    isActive={ isActive }
                    isFocused={ focusedKey === link.key }
                    isSelected={ selection.isKeySelected(link.key) }
                  />
                ))
              }
            </div>
          </div>
        );
      }
    });

    return (
      <div className={ rootClass } ref='root'>
        { groupElements }
      </div>
    );
  }

  public componentWillReceiveProps(nextProps) {
    let { groups } = this.props;
    let { selection } = this.state;
    let selectableItems = this.state.selectableItems = [];

    groups.forEach((group, groupIndex) => {
      let groupState = {
        key: `group-${ groupIndex }`,
        index: selectableItems.length,
        name: group.name,
        isExpanded: true,
        links: [],
        onToggleExpanded: () => {
          groupState.isExpanded = !groupState.isExpanded;
          this.forceUpdate();
        }
      };

      selectableItems.push(groupState);

      group.links.forEach((link, linkIndex) => {
        let linkState = {
          key: `group-${ groupIndex }-link-${ linkIndex }`,
          index: selectableItems.length,
          name: link.name,
          url: link.url,
          parent: groupState
        };
        groupState.links.push(linkState);
        selectableItems.push(linkState);
      });
    });

    selection.setChangeEvents(false);
    selection.setItems(selectableItems);
    selection.setChangeEvents(true, true);
  }

  public componentDidMount() {
    this._selectionBinding = new SelectionBinding(
      (this.refs as any).root,
      this.state.selection,
      this,
      false,
      false,
      (isActive) => {
        this.setState({
          isActive: isActive
        });
      }
    );

  }

  public componentWillUnmount() {
    this._selectionBinding.dispose();
  }

  public getItemIndexAbove(focusIndex: number): number {
    focusIndex = Math.max(0, focusIndex - 1);

    let selectedItem = this.state.selectableItems[focusIndex];

    if (selectedItem.parent && !selectedItem.parent.isExpanded) {
      focusIndex = selectedItem.parent.index;
    }

    return focusIndex;
  }

  public getItemIndexBelow(focusIndex: number): number {
    let { selectableItems } = this.state;
    let currentItem = selectableItems[focusIndex];

    focusIndex = Math.min(selectableItems.length - 1, focusIndex + 1);
    let nextItem = selectableItems[focusIndex];

    if (nextItem.parent && !nextItem.parent.isExpanded) {
      // find the next group. Otherwise, backup.
      let nextGroupIndex = focusIndex + 1;
      while (nextGroupIndex < selectableItems.length && !selectableItems[nextGroupIndex].links) {
        nextGroupIndex++;
      }
      if (nextGroupIndex === selectableItems.length) {
        focusIndex = currentItem.index;
      } else {
        focusIndex = nextGroupIndex;
      }
    }

    return focusIndex;
  }

  public getItemIndexLeft(focusIndex: number): number {
    let selectedItem = this.state.selectableItems[focusIndex];
    let originalFocusIndex = focusIndex;

    while (selectedItem && !selectedItem.links) {
      selectedItem = this.state.selectableItems[--focusIndex];
    }

    if (focusIndex === originalFocusIndex && selectedItem && selectedItem.isExpanded) {
      selectedItem.isExpanded = false;
      this.forceUpdate();
    }

    return focusIndex;
  }

  public getItemIndexRight(focusIndex: number): number {
    let selectedItem = this.state.selectableItems[focusIndex];

    if (selectedItem && selectedItem.links) {
      selectedItem.isExpanded = true;
      this.forceUpdate();
    }
    return focusIndex;
  }

}
