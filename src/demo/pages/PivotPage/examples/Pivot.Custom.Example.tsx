/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Pivot,
  css
} from '../../../../index';

let _samplePivotItems = [
  {
    key: 'my-files',
    name: 'My files',
    children: <div>All of your items</div>
  },
  {
    key: 'recent',
    name: 'Recent',
    children: <div>All of your recent items</div>
  },
  {
    key: 'shared',
    name: 'Shared with me',
    children: <div>All of your shared items</div>
  }
];

export const PivotCustomExample = () => (
  <div>
    <Pivot
      onRenderPivotTitle={ (props, defaultRender) => (
        <div>
          { <i className={ css('ms-Icon', props.isSelected ? 'ms-Icon--check' : 'ms-Icon--x') } /> }
          { defaultRender(props) }
        </div>
      ) }
      items={ _samplePivotItems }
      />
  </div>
);
