import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Interface for ChoiceGroupImageExample state.
 */
export interface IChoiceGroupImageExampleState {
  selectedKey: string;
}

export class ChoiceGroupImageExample extends React.Component<any, IChoiceGroupImageExampleState> {
  constructor() {
    super();

    this.state = {
      selectedKey: 'bar'
    };

    this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
  }

  public render() {
    let { selectedKey } = this.state;

    return (
      <div>
        <ChoiceGroup
          label='Pick one image'
          selectedKey={ selectedKey }
          options={ [
            {
              key: 'bar',
              imageSrc: './images/choicegroup-bar-unselected.png',
              selectedImageSrc: './images/choicegroup-bar-selected.png',
              imageSize: { width: 32, height: 32 },
              text: 'Bar chart'
            },
            {
              key: 'pie',
              imageSrc: './images/choicegroup-pie-unselected.png',
              selectedImageSrc: './images/choicegroup-pie-selected.png',
              imageSize: { width: 32, height: 32 },
              text: 'Pie chart'
            }
          ] }
          onChange={ this._onImageChoiceGroupChange }
        />
      </div>
    );
  }

  private _onImageChoiceGroupChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
    this.setState({
      selectedKey: option.key
    });
  }
}
