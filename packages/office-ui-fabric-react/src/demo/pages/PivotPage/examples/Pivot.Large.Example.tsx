import * as React from 'react';
import { Label } from '../../../../Label';
import {
  Pivot,
  PivotItem,
  PivotLinkSize
} from '../../../../Pivot';

export class PivotLargeExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkSize={ PivotLinkSize.large }>
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
