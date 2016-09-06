/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import {
  Pivot
} from '../../../../index';

export const sampleItems = [
  {
    key: 'my-files',
    name: 'My files',
    buttonProps: {
      ['data-automation-id']: 'files-pivot'
    },
    children: <div>Pivot #1</div>
  },
  {
    key: 'recent',
    name: 'Recent',
    children: <div>Pivot #2</div>
  },
  {
    key: 'disabled',
    name: 'Disabled example',
    disabled: true,
    children: <div>Pivot #3</div>
  },
  {
    key: 'shared',
    name: 'Shared with me',
    children: <div>Pivot #4</div>
  }
];

export const PivotBasicExample = () => (
  <Pivot
    items={ sampleItems }
    onChange={ (item, index) => console.log(`Selected ${ item.name } tab`) }
    />
);
