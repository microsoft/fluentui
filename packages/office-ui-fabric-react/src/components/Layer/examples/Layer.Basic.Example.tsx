import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import 'office-ui-fabric-react/lib/common/_exampleStyles.scss';
import * as exampleStylesImport from 'office-ui-fabric-react/lib/common/_exampleStyles.scss';
import { Layer } from 'office-ui-fabric-react/lib/Layer';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import './Layer.Example.scss';
const exampleStyles: any = exampleStylesImport;

export interface ILayerContentExampleState {
  time: string;
}

export class LayerContentExample extends BaseComponent<{}, ILayerContentExampleState> {
  public static contextTypes = {
    message: PropTypes.string
  };

  public state = {
    time: new Date().toLocaleTimeString()
  };

  public context: {
    message: string;
  };

  public componentDidMount() {
    this._async.setInterval(() => {
      this.setState({
        time: new Date().toLocaleTimeString()
      });
    }, 1000);
  }

  public render() {
    return (
      <div className={`LayerExample-content ${AnimationClassNames.scaleUpIn100}`}>
        <div className="LayerExample-textContent">{this.context.message}</div>
        <div>{this.state.time}</div>
      </div>
    );
  }
}

export interface ILayerBasicExampleState {
  showLayer: boolean;
}

export class LayerBasicExample extends BaseComponent<{}, ILayerBasicExampleState> {
  public static childContextTypes = {
    message: PropTypes.string
  };

  public state = {
    showLayer: false
  };

  public getChildContext() {
    return {
      message: 'Hello world.'
    };
  }

  public render() {
    const { showLayer } = this.state;
    return (
      <div>
        <Checkbox
          className={exampleStyles.exampleCheckbox}
          label="Wrap the content box belowed in a Layer"
          checked={showLayer}
          onChange={this._onChange}
        />

        {showLayer ? (
          <Layer>
            <LayerContentExample />
          </Layer>
        ) : (
          <LayerContentExample />
        )}
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ showLayer: checked });
  };
}
