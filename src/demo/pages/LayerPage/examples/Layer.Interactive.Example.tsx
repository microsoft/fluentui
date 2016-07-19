import * as React from 'react';
import './Layer.Interactive.Example.scss';
import {
  ChoiceGroup,
  IChoiceGroupOption,
  Layer
} from '../../../../index';

export interface ILayerInteractiveExampleState {
  contentType: string;
}

export class LayerInteractiveExample extends React.Component<any, ILayerInteractiveExampleState> {
  constructor() {
    super();

    this.state = {
      contentType: 'A'
    };

    this._onChanged = this._onChanged.bind(this);
  }

  public render() {
    let {
      contentType
    } = this.state;

    let content: JSX.Element;

    switch (contentType) {
      case 'A':
        content = this._getContentA();
        break;
      case 'B':
        content = this._getContentB();
        break;
      case 'C':
        content = this._getContentC();
        break;
    }

    return (
      <div>
        <ChoiceGroup options={ [
          {
            key: 'A',
            text: 'Content A',
            isChecked: contentType === 'A'
          },
          {
            key: 'B',
            text: 'Content B'
          },
          {
            key: 'C',
            text: 'Content C'
          }
        ] }
          onChanged={ this._onChanged }
        />

        <Layer>
          <div className='ms-LayerInteractiveExample-content'>
            { content }
          </div>
        </Layer>
      </div>
    );
  }

  private _onChanged(option: IChoiceGroupOption) {
    this.setState({
      contentType: option.key
    });
  }

  private _getContentA() {
    return (
      <span>Content A</span>
    );
  }

  private _getContentB() {
    return (
      <strong>Content B</strong>
    );
  }

  private _getContentC() {
    return (
      <em>Content C</em>
    );
  }
}
