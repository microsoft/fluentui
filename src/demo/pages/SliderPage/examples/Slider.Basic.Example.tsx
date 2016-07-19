import * as React from 'react';
import {
  Slider
} from '../../../../index';
import './Slider.Basic.Example.scss';

export class SliderBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ms-SliderBasicExample'>
        <Slider
          label='Basic example:'
          min={ 1 }
          max={ 10 }
          step={ 1 }
          initialValue={ 6 }
          showValue={ true }
        />

        <Slider
          label='Disabled example:'
          min={ 50 }
          max={ 500 }
          step={ 50 }
          initialValue={ 300 }
          showValue={ true }
          isDisabled={ true }
        />
      </div>
    );
  }

}
