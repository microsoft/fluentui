import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
  Facepile,
  IFacepileProps
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';

export interface IFacepileBasicExampleState {
  numberOfFaces: any;
}

export class FacepileBasicExample extends React.Component<any, IFacepileBasicExampleState> {
  public constructor() {
    super();

    this.state = {
      numberOfFaces: 1
    };
  }

  public render() {
    let { numberOfFaces } = this.state;
    let facepileProps: IFacepileProps = {
      personas: facepilePersonas.slice(0, numberOfFaces)
    };

    return (
      <div>
        <Facepile {...facepileProps} />
        <Dropdown
          label='Number of Personas:'
          options={
            [
              { key: 1, text: '1' },
              { key: 2, text: '2' },
              { key: 3, text: '3' },
              { key: 4, text: '4' },
              { key: 5, text: '5' },
              { key: 6, text: '6' }
            ]
          }
          selectedKey={this.state.numberOfFaces}
          onChanged={this._onDropdownChanged.bind(this)}
          />
      </div>
    );
  }

  private _onDropdownChanged(option: IDropdownOption) {
    this.setState({
      numberOfFaces: option.key
    });
  }
}
