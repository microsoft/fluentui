import * as React from 'react';
import {
  Dropdown,
  IDropdownOption,
  IFacepilePersona,
  IFacepileProps,
  Facepile
} from '../../../../index';
import { facepilePersonas } from './FacepileExampleData';

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  overflowButtonProps: {
    onClick: (ev: React.MouseEvent) =>
      alert('overflow icon clicked')
  }
};

export interface IFacepileOverflowExampleState {
  maxDisplayablePersonas: any;
}

export class FacepileOverflowExample extends React.Component<any, IFacepileOverflowExampleState> {
  public constructor() {
    super();

    this.state = {
      maxDisplayablePersonas: 5
    };
  }

  public render() {
    let { maxDisplayablePersonas } = this.state;
    facepileProps.maxDisplayablePersonas = maxDisplayablePersonas;

    return (
      <div>
        <Facepile {...facepileProps} />
        <Dropdown
          label='Max Personas Allowed:'
          options={
            [
              { key: 1, text: '1' },
              { key: 2, text: '2' },
              { key: 3, text: '3' },
              { key: 4, text: '4' },
              { key: 5, text: '5' },
              { key: 6, text: '6' },
              { key: 7, text: '7' },
              { key: 8, text: '8' }
            ]
          }
          selectedKey={this.state.maxDisplayablePersonas}
          onChanged={this._onDropdownChanged.bind(this)}
          />
      </div>
    );
  }

  private _onDropdownChanged(option: IDropdownOption) {
    this.setState({
      maxDisplayablePersonas: option.key
    });
  }
}