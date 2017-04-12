/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import {
  OverflowSet
} from '../index';
import { ResizeGroup } from '../../ResizeGroup';

/*
const instructions = [
  { key: 'A', action: Actions.reduceToIcon},
  { key: 'B', action: Actions.appendToOverflow, transform: (itemProps) => : ItemProps},
  [
    {},
    {}
  ]
];


updateOverflowState(prevState, props) => {
if (!prevState) {}
  return {
    instructionsIndex: 0,
    items: [],
    overflowItems: []
  };
}


  let items = prevState.items.concat([]);
  let overflowItems = prevState.overflowItems.concat([]);
  let inst = instructions[prevState.index];
  if (inst) {
  applyInstruction(items, overflowItems, inst);
 }
  for (let i = 0; i < items.length; i++) {
    if (items[i].key === inst.key) {
      overflowItems.concat(items.splice(i, 1));
      break;
    }
  }
  return {
    index: index + 1,
    items,
    overflowItems
  };
}

<VisualResizer
  onReduceProps={ lastReducedProps, props => {
    state.items // [ overflowSetProps1, overflowSetProps2, etc  ]
  }}
  onRender={ props => (
    <div>
      { props.items.map(item => (
        <OverflowSet items={item.items} overflowItems={items.overflowItems} />
      )) }
    </div>
  ) }
/>


*/
export class OverflowSetBasicExample extends BaseComponent<any, any> {

  public render() {
    return (
      <OverflowSet
        items={ [
          {
            key: 'search',
            'onRender': () => {
              return (
                <SearchBox
                  onChange={ (newValue) => console.log('SearchBox onChange fired: ' + newValue) }
                  onSearch={ (newValue) => console.log('SearchBox onSearch fired: ' + newValue) }
                />
              );
            }
          },
          {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => { return; },
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail',
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ],
            },
          },
          {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: () => { return; },
          },
          {
            key: 'share',
            name: 'Share',
            icon: 'Share',
            onClick: () => { return; }
          }
        ] }
        overflowItems={ [
          {
            key: 'newItem',
            name: 'New',
            icon: 'Add',
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => { return; },
            subMenuProps: {
              items: [
                {
                  key: 'emailMessage',
                  name: 'Email message',
                  icon: 'Mail',
                },
                {
                  key: 'calendarEvent',
                  name: 'Calendar event',
                  icon: 'Calendar'
                }
              ],
            },
          },
          {
            key: 'upload',
            name: 'Upload',
            icon: 'Upload',
            onClick: () => { return; },
          },
          {
            key: 'share',
            name: 'Share',
            icon: 'Share',
            onClick: () => { return; }
          }
        ]
        }
        onRenderItem={ (item, i) => {
          return (
            <DefaultButton
              icon={ item.icon }
              menuProps={ item.subMenuProps }
              text={ item.small ? null : item.name }
            >  </DefaultButton>
          );
        } }
      />
    );
  }
}