import { Pivot, PivotItem } from './index';
import { Label } from '../Label';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class PivotVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <div>  <Pivot>
        <PivotItem linkText='My Files'>
          <Label>Pivot #1</Label>
        </PivotItem>
        <PivotItem linkText='Recent'>
          <Label>Pivot #2</Label>
        </PivotItem>
        <PivotItem linkText='Shared with me'>
          <Label>Pivot #3</Label>
        </PivotItem>
      </Pivot></div>&nbsp;

    </div>;
  }
}