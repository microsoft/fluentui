import * as React from 'react';
import {
  Spinner,
  SpinnerType
} from '../../../../Spinner';
import { Label } from '../../../../Label';
import './Spinner.Basic.Example.scss';

export class SpinnerBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        <Label>Normal Spinner</Label>
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
