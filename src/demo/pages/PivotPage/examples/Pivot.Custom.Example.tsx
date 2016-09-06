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
    name: 'My files'
  },
  {
    key: 'recent',
    name: 'Recent'
  },
  {
    key: 'shared',
    name: 'Shared with me'
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
