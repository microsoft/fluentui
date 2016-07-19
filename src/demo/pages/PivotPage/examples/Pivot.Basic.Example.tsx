import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem
} from '../../../../index';

export class PivotBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot>
            <PivotItem linkText='My Files'>
              <Label>Pivot #1</Label>
            </PivotItem>
            <PivotItem linkText='Recent'>
              <Label>Pivot #2</Label>
            </PivotItem>
            <PivotItem linkText='Shared with me'>
              <Label>Pivot #3</Label>
            </PivotItem>
        </Pivot>
      </div>
    );
  }
}
