import * as React from 'react';
import {
  Label,
  Pivot
} from '../../../../components/index';

export default class PivotBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Label>Regular pivot</Label>
        <Pivot
          items={
            [
              { key: 'A', text: 'Item 1' },
              { key: 'B', text: 'Item 2' },
              { key: 'C', text: 'Item 3' },
              { key: 'D', text: 'Item 4' },
              { key: 'E', text: 'Item 5' }
            ]
          }
          initialSelectedIndex={ 2 }
        />
        <Label>Large pivot</Label>
        <Pivot
          largeformat
          items={
            [
              { key: 'A', text: 'Item 1' },
              { key: 'B', text: 'Item 2' },
              { key: 'C', text: 'Item 3' },
              { key: 'D', text: 'Item 4' },
              { key: 'E', text: 'Item 5' }
            ]
          }
          initialSelectedIndex={ 2 }
        />
      </div>
    );
  }

}
