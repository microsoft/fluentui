import * as React from 'react'; // tslint:disable-line:no-unused-variable
import * as PropTypes from 'prop-types';
import './Layer.Example.scss';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { AnimationClassNames } from '../../../Styling';

export class LayerContentExample extends BaseComponent<any, any> {
  public static contextTypes = {
    message: PropTypes.string
  };

  public context: {
    message: string;
  };

  constructor() {
    super();
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }

  public componentDidMount() {
    this._async.setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000);
  }

  public render() {
    return (
      <div className={ 'LayerExample-content ' + AnimationClassNames.scaleUpIn100 }>
        <div className='LayerExample-textContent'>{ this.context.message }</div>
        <div>{ this.state.time }</div>
      </div>

    );
  }
}
export class LayerBasicExample extends BaseComponent<any, any> {

  public static childContextTypes = {
    message: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      showLayer: false
    };
  }

  public getChildContext() {
    return {
      'message': 'Hello world.'
    };
  }

  public render() {
    let { showLayer } = this.state;

    return (
      <div>

        <Checkbox
          label='Wrap the content box belowed in a Layer'
          checked={ showLayer }
          onChange={ (ev, checked) => this.setState({ showLayer: checked }) } />

        { showLayer ? (
          <Layer>
            <LayerContentExample />
          </Layer>
        ) : (
            <LayerContentExample />
          ) }

      </div>
    );
  }
}
