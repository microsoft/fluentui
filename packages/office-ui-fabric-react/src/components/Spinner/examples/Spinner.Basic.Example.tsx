// @codepen
import * as React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import './Spinner.Basic.Example.scss';

export class SpinnerBasicExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div className="ms-BasicSpinnersExample">
        <Label>Extra Small Spinner</Label>
        <Spinner size={SpinnerSize.xSmall} />

        <Label>Small Spinner</Label>
        <Spinner size={SpinnerSize.small} />

        <Label>Medium Spinner</Label>
        <Spinner size={SpinnerSize.medium} />

        <Label>Large Spinner</Label>
        <Spinner size={SpinnerSize.large} />

        <Label>Spinner with Label</Label>
        <Spinner label="I am definitely loading..." />

        <Label>Large Spinner with Label positioned at bottom (default)</Label>
        <Spinner size={SpinnerSize.large} label="Seriously, still loading..." ariaLive="assertive" />

        <Label>Large Spinner with Label positioned above</Label>
        <Spinner size={SpinnerSize.large} label="Sorry, still loading..." ariaLive="assertive" labelPosition="top" />

        <Label>Large Spinner with Label positioned on the right side</Label>
        <Spinner size={SpinnerSize.large} label="Wait, wait..." ariaLive="assertive" labelPosition="right" />

        <Label>Large Spinner with Label positioned on the left side</Label>
        <Spinner size={SpinnerSize.large} label="Nope, still loading..." ariaLive="assertive" labelPosition="left" />
      </div>
    );
  }
}
