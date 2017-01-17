import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem
} from '../../../../index';

export class PivotIconCountExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot>
          <PivotItem linkText='My Files' itemCount={ 42 } itemIcon='Emoji2'>
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem itemCount={ 23 } itemIcon='Recent'>
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem itemIcon='Globe'>
            <Label>Pivot #3</Label>
          </PivotItem>
          <PivotItem linkText='Shared with me' itemIcon='Ringer' itemCount={ 1 }>
            <Label>Pivot #4</Label>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
