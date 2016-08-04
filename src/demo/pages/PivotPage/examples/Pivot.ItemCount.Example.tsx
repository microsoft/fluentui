import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem,
  PivotLinkSize
} from '../../../../index';

export class PivotItemCountExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkSize={ PivotLinkSize.large }>
            <PivotItem linkText='My Files' itemCount={ 5 }>
              <Label>Pivot #1</Label>
            </PivotItem>
            <PivotItem linkText='Recent' itemCount={ 0 }>
              <Label>Pivot #2</Label>
            </PivotItem>
            <PivotItem linkText='Shared with me' itemCount={ 22 }>
              <Label>Pivot #3</Label>
            </PivotItem>
        </Pivot>
      </div>
    );
  }

}
