import { Slider } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class SliderVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { width: '300px' } }>
      <div> <Slider
        className='Slider'
        label='Basic Slider:'
        min={ 1 }
        max={ 3 }
        step={ 1 }
        defaultValue={ 2 }
        showValue={ true }
        onChange={ (value) => console.log(value) }
      /></div>&nbsp;
      <div>
        <Slider
          className='Slider'
          label='Basic Slider:'
          disabled={ true }
          min={ 1 }
          max={ 3 }
          step={ 1 }
          defaultValue={ 2 }
          showValue={ true }
          onChange={ (value) => console.log(value) }
        /></div>&nbsp;
    </div>;
  }
}
