import * as React from 'react';
import { Slider } from 'office-ui-fabric-react';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesSliderExample extends React.Component<
  {},
  {
    value: number;
  }
> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: 0
    };
  }
  public render(): JSX.Element {
    return (
      <div className={style.sidebyside}>
        <Slider
          label="Basic example:"
          min={1}
          max={3}
          step={1}
          defaultValue={2}
          showValue={true}
          // tslint:disable-next-line
          onChange={(value: any) => console.log(value)}
        />
        <Slider label="Disabled example:" min={50} max={500} step={50} defaultValue={300} showValue={true} disabled={true} />
        <Slider
          label="Controlled example:"
          max={10}
          value={this.state.value}
          // tslint:disable-next-line
          onChange={(value: any) => this.setState({ value })}
          showValue={true}
        />
      </div>
    );
  }
}
