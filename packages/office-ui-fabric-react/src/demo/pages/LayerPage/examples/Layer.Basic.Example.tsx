import * as React from 'react'; // tslint:disable-line:no-unused-variable
import './Layer.Example.scss';
import {
  BaseComponent,
  Checkbox,
  Layer
} from '../../../../index';

export class LayerBasicExample extends BaseComponent<any, any> {

  constructor() {
    super();
    this.state = {
      showLayer: false,
      time: new Date().toLocaleTimeString()
    };
  }

  public componentDidMount() {
    this._async.setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000);
  }

  public render() {
    let { showLayer, time } = this.state;
    let content = (
      <div className='LayerExample-content ms-u-scaleUpIn100'>
        <div className='LayerExample-textContent'>This is example layer content.</div>
        <div>{ time }</div>
      </div>
    );

    return (
      <div>

        <Checkbox
          label='Wrap the content box belowed in a Layer'
          checked={ showLayer }
          onChange={ (ev, checked) => this.setState({ showLayer: checked }) } />

        { showLayer ? <Layer>{ content }</Layer> : content }

      </div>
    );
  }
}
