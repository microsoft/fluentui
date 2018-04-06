import * as React from 'react';
import {
  IKeytipTransitionKey,
  KeytipTransitionModifier,
  autobind
} from 'office-ui-fabric-react/lib/Utilities';
import { keytipMap } from './KeytipSetup';
import { DefaultButton, CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SpinButton } from 'office-ui-fabric-react/lib/SpinButton';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';

export interface IKeytipsBasicExampleState {
  showModal: boolean;
  showMessageBar: boolean;
  items: IOverflowSetItemProps[];
  overflowItems: IOverflowSetItemProps[];
}

export class KeytipsBasicExample extends React.Component<{}, IKeytipsBasicExampleState> {
  constructor(props: {}) {
    super(props);

    const overflowItem1Click = () => {
      console.log('first overflow item');
    };

    const overflowItem2Click = () => {
      console.log('second overflow item');
    };

    // Setup initial overflow items
    const initialItems = [
      {
        key: 'item1',
        name: 'Link 1',
        onClick: () => { return; },
        keytipProps: keytipMap.OverflowButton1
      },
      {
        key: 'item2',
        name: 'Link 2',
        onClick: () => { return; },
        keytipProps: keytipMap.OverflowButton2
      },
      {
        key: 'item3',
        name: 'Link 3',
        onClick: () => { return; },
        keytipProps: keytipMap.OverflowButton3
      }
    ];

    const initialOverflowItems = [
      {
        key: 'item5',
        name: 'Overflow Link 1',
        keytipProps: {
          ...keytipMap.OverflowButton5,
          onExecute: (el: HTMLElement | null) => {
            if (el) {
              el.click();
            } else {
              overflowItem1Click();
            }
          }
        },
        onClick: overflowItem1Click
      },
      {
        key: 'item6',
        name: 'Overflow Link 2',
        keytipProps: {
          ...keytipMap.OverflowButton6,
          hasChildrenNodes: true,
          onExecute: (el: HTMLElement | null) => {
            if (el) {
              el.click();
            } else {
              overflowItem2Click();
            }
          }
        },
        onClick: overflowItem2Click,
        subMenuProps: {
          items: [
            {
              key: 'overflowSubMenu1',
              name: 'Overflow Submenu Item 1',
              keytipProps: keytipMap.OverflowSubMenuButton1
            },
            {
              key: 'overflowSubMenu2',
              name: 'Overflow Submenu Item 2'
            }
          ]
        }
      }
    ];

    // Setup state
    this.state = {
      showModal: false,
      showMessageBar: false,
      items: initialItems,
      overflowItems: initialOverflowItems
    };
  }

  /* tslint:disable:jsx-ban-props jsx-no-lambda */
  public render(): JSX.Element {
    return (
      <div>
        <p>Press Alt-Win to enable keytips, Esc to return up a level, and Alt-Win to exit keytip mode</p>
        <Pivot>
          <PivotItem linkText={ 'Fabric Components' } keytipProps={ keytipMap.Pivot1Keytip } style={ { height: 500 } }>
            <Checkbox
              keytipProps={ keytipMap.Checkbox1Pivot1Keytip }
              label={ 'Check Box' }
            />
            <Toggle keytipProps={ keytipMap.Toggle1Pivot1Keytip } onText={ 'Toggle On' } offText={ 'Toggle Off' } />
            <Link keytipProps={ keytipMap.Link1Pivot1Keytip } href={ 'http://www.bing.com' }>This is a link</Link>
            <ComboBox
              label={ 'Combo Box' }
              options={ [
                { key: 'A', text: 'Option 1' },
                { key: 'B', text: 'Option 2' },
                { key: 'C', text: 'Option 3' },
              ] }
              keytipProps={ keytipMap.ComboBox1Pivot1Keytip }
            />
            <Dropdown
              label={ 'Dropdown' }
              keytipProps={ keytipMap.Dropdown1Pivot1Keytip }
              options={ [
                { key: 'A', text: 'Option 1' },
                { key: 'B', text: 'Option 2' },
                { key: 'C', text: 'Option 3' },
              ] }
            />
            <SpinButton label={ 'Spin Button' } keytipProps={ keytipMap.SpinButton1Pivot1Keytip } />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}