import * as React from 'react';
import {
  BaseComponent,
  autobind,
  buttonProperties,
  anchorProperties,
  css,
  divProperties,
  getId,
  getNativeProps
} from '../../Utilities';

import { ICommandBar, ICommandBarProps } from './CommandBar.Props';

import { CommandButton } from '../../Button';
import { OverflowSet } from '../../OverflowSet';
import { ResizeGroup } from '../../ResizeGroup';

import * as stylesImport from './CommandBar.scss';
const styles: any = stylesImport;




export class CommandBar extends BaseComponent<ICommandBarProps, any> implements ICommandBar {
  public static defaultProps = {
    items: [],
    overflowItems: [],
    farItems: []
  };

  private _id: string;

  constructor(props: ICommandBarProps) {
    super(props);
    this._id = getId('CommandBar');
  }

  public render() {
    const { isSearchBoxVisible, searchPlaceholderText, className, items, overflowItems, farItems } = this.props;

    const data = {
      primary: items,
      overflow: overflowItems || [],
      farItems: farItems || []
    }
    return (
      <ResizeGroup
        data={ data }
        onReduceData={ (currentdata) => {
          let overflow = currentdata.overflow.concat(currentdata.primary.slice(-1));
          let primary = currentdata.primary.slice(0, -1);
          return { primary, overflow, farItems };
        } }
        onRenderData={ (data) => {
          return (
            <div className={ css('ms-CommandBar', styles.root) }>
              <OverflowSet
                className={ css(styles.primarySet) }
                items={ data.primary }
                overflowItems={ data.overflow.length ? data.overflow : null }
                onRenderItem={ (item) => {
                  return (
                    <CommandButton
                      text={ item.name }
                      iconProps={ { iconName: item.icon } }
                      onClick={ item.onClick }
                      menuProps={ item.subMenuProps }
                    />
                  );
                } }
                onRenderOverflowButton={ (overflowItems) => {
                  return (
                    <CommandButton
                      className={ css(styles.overflowButton) }
                      menuProps={ { items: overflowItems } }
                    />
                  );
                } }
              />
              <OverflowSet
                className={ css(styles.secondarySet) }
                items={ data.farItems }
                onRenderItem={ (item) => {
                  return (
                    <CommandButton
                      text={ item.name }
                      iconProps={ { iconName: item.icon } }
                      onClick={ item.onClick }
                    />
                  );
                } }
                onRenderOverflowButton={ (overflowItems) => {
                  return (
                    null
                  );
                } }
              />
            </div>
          );
        } }
      />
    );
  }

  public focus() {
    // this.refs.focusZone.focus();
  }
}
