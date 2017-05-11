/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent, css, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox'
import {
  OverflowSet
} from 'office-ui-fabric-react/lib/OverflowSet';

import * as stylesImport from './OverflowSet.Example.scss';

const styles: any = stylesImport;

export interface IOverflowSetBasicExampleState {
  hasOverflowItems: boolean;
}

export class OverflowSetBasicExample extends BaseComponent<any, IOverflowSetBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      hasOverflowItems: true
    };
  }

  public render() {
    let { hasOverflowItems } = this.state;
    return (
      <div>
        <OverflowSet
          items={ [
            {
              key: 'item1',
              name: 'Link 1',
              ariaLabel: 'New. Use left and right arrow keys to navigate',
              onClick: () => { return; },
            },
            {
              key: 'item2',
              name: 'Link 2',
              onClick: () => { return; },
            },
            {
              key: 'item3',
              name: 'Link 3',
              onClick: () => { return; }
            }
          ] }
          overflowItems={ hasOverflowItems ? [
            {
              key: 'item4',
              name: 'Overflow Link 1',
              onClick: () => { return; }
            },
            {
              key: 'item5',
              name: 'Overflow Link 2',
              onClick: () => { return; }
            }
          ] : undefined
          }
          onRenderOverflowButton={ (overflowItems) => {
            return (
              <IconButton
                className={ css(styles.overflowButton) }
                iconProps={ { iconName: 'More' } }
                menuIconProps={ null }
                menuProps={ { items: overflowItems } }
              />
            );
          } }
          onRenderItem={ (item) => {
            return (
              <Link
                className={ css(styles.overflowLinks) }
                onClick={ item.onClick }
              >{ item.name }</Link>
            );
          } }
        />

        <Checkbox label='Has Overflow Items' checked={ hasOverflowItems } onChange={ this._onHasOverflowItemsChange } />
      </div>
    );
  }

  @autobind
  private _onHasOverflowItemsChange(ev: React.FormEvent<HTMLElement>, isVisible: boolean) {
    this.setState({
      hasOverflowItems: isVisible
    });
  }
}