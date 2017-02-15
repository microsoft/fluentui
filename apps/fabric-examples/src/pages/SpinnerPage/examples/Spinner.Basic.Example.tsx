import * as React from 'react';
import {
  Spinner,
  SpinnerType
} from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Spinner.Basic.Example.scss';

export class SpinnerBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        <Label>Extra Small Spinner</Label>
        <Spinner type={ SpinnerType.xSmall } />

        <Label>Small Spinner</Label>
        <Spinner type={ SpinnerType.small } />

        <Label>Medium Spinner</Label>
        <Spinner />

        <Label>Large Spinner</Label>
        <Spinner type={ SpinnerType.large } />

        <Label>Spinner With Label</Label>
        <Spinner label='I am definitely loading...' />

        <Label>Large Spinner With Label</Label>
        <Spinner type={ SpinnerType.large } label='Seriously, still loading...' />
      </div>
    );
  }
}
