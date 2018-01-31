import * as React from 'react';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Spinner.Basic.Example.scss';

export class SpinnerBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-BasicSpinnersExample'>
        <Label>Extra Small Spinner</Label>
        <Spinner size={ SpinnerSize.xSmall } />

        <Label>Small Spinner</Label>
        <Spinner size={ SpinnerSize.small } />

        <Label>Medium Spinner</Label>
        <Spinner size={ SpinnerSize.medium } />

        <Label>Large Spinner</Label>
        <Spinner size={ SpinnerSize.large } />

        <Label>Spinner With Label</Label>
        <Spinner label='I am definitely loading...' />

        <Label>Large Spinner With Label</Label>
        <Spinner size={ SpinnerSize.large } label='Seriously, still loading...' ariaLive='assertive' />
      </div>
    );
  }
}
