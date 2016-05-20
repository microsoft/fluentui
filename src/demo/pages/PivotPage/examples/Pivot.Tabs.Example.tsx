import * as React from 'react';
import {
  Label,
  Pivot,
  PivotItem,
  PivotLinkFormat
} from '../../../../index';

export default class PivotTabsExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Pivot linkFormat={ PivotLinkFormat.tabs }>
            <PivotItem linkText='Foo'>
              <Label>Pivot #1</Label>
            </PivotItem>
            <PivotItem linkText='Bar'>
              <Label>Pivot #2</Label>
            </PivotItem>
            <PivotItem linkText='Bas'>
              <Label>Pivot #3</Label>
            </PivotItem>
            <PivotItem linkText='Biz'>
              <Label>Pivot #4</Label>
            </PivotItem>
        </Pivot>
      </div>
    );
  }

}
