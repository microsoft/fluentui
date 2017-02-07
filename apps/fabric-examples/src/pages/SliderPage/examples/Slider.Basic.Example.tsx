import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import './Slider.Basic.Example.scss';

export class SliderBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      value: 0
    };
  }

  public render() {
    return (
      <div className='ms-SliderBasicExample'>

        <Slider
          label='Basic example:'
          min={ 1 }
          max={ 3 }
          step={ 1 }
          defaultValue={ 2 }
          showValue={ true }
          onChange={ (value) => console.log(value) }
        />

        <Slider
          label='Disabled example:'
          min={ 50 }
          max={ 500 }
          step={ 50 }
          defaultValue={ 300 }
          showValue={ true }
          disabled={ true }
        />

        <Slider
          label='Controlled example:'
          max={ 10 }
          value={ this.state.value }
          onChange={ value => this.setState({ value }) }
          showValue={ true }
        />

      </div>
    );
  }

}
