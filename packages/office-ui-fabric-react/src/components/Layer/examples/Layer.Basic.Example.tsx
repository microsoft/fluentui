import * as React from 'react'; // tslint:disable-line:no-unused-variable
import * as PropTypes from 'prop-types';
import './Layer.Example.scss';
import '../../../common/_exampleStyles.scss';
import { BaseComponent } from '../../../Utilities';
import { Checkbox } from '../../../Checkbox';
import { Layer } from '../Layer';
import { AnimationClassNames } from '../../../Styling';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

export class LayerContentExample extends BaseComponent<{}, {
  time: string
}> {
  public static contextTypes = {
    message: PropTypes.string
  };

  public context: {
    message: string;
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }

  public componentDidMount(): void {
    this._async.setInterval(() => this.setState({ time: new Date().toLocaleTimeString() }), 1000);
  }

  public render(): JSX.Element {
    return (
      <div className={ 'LayerExample-content ' + AnimationClassNames.scaleUpIn100 }>
        <div className='LayerExample-textContent'>{ this.context.message }</div>
        <div>{ this.state.time }</div>
      </div>

    );
  }
}
export class LayerBasicExample extends BaseComponent<{}, {
  showLayer: boolean;
}> {

  public static childContextTypes = {
    message: PropTypes.string
  };

  constructor(props: {}) {
    super(props);
    this.state = {
      showLayer: false
    };
  }

  public getChildContext() {
    return {
      'message': 'Hello world.'
    };
  }

  public render(): JSX.Element {
    const { showLayer } = this.state;

    return (
      <div>

        <Checkbox
          className={ exampleStyles.exampleCheckbox }
          label='Wrap the content box belowed in a Layer'
          checked={ showLayer }
          onChange={ this._onChange }
        />

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

  private _onChange(ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void {
    this.setState({ showLayer: checked });
  }
}
