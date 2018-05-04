import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import './Slider.Basic.Example.scss';

export class SliderBasicExample extends React.Component<{}, {
  value: number
}> {
  constructor(props: {}) {
    super(props);

    this.state = {
      value: 0
    };
  }

  public render(): JSX.Element {
    return (
      <div className='ms-basicSlider'>
        <div className='ms-SliderBasicExample'>

          <Slider
            label='Basic example:'
            min={ 1 }
            max={ 3 }
            step={ 1 }
            defaultValue={ 2 }
            showValue={ true }
            // tslint:disable-next-line:jsx-no-lambda
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
            // tslint:disable-next-line:jsx-no-lambda
            onChange={ value => this.setState({ value }) }
            showValue={ true }
          />
        </div>
        <div className='ms-SliderVertical '>
          <div className='ms-verticalBox'>
            <Slider
              label='Basic example:'
              min={ 1 }
              max={ 3 }
              step={ 1 }
              defaultValue={ 2 }
              showValue={ true }
              vertical={ true }
              // tslint:disable-next-line:jsx-no-lambda
              onChange={ (value) => console.log(value) }
            />
          </div>
          <div className='ms-verticalBox'>
            <Slider
              label='Disabled example:'
              min={ 50 }
              max={ 500 }
              step={ 50 }
              defaultValue={ 300 }
              showValue={ true }
              vertical={ true }
              disabled={ true }
            />
          </div>
          <div className='ms-verticalBox'>
            <Slider
              label='Controlled example:'
              max={ 10 }
              vertical={ true }
              showValue={ true }
            />
          </div>
        </div>
      </div>
    );
  }
}
