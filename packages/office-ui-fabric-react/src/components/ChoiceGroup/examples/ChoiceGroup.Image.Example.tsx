import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Interface for ChoiceGroupImageExample state.
 */
export interface IChoiceGroupImageExampleState {
  imageKey: string;
}

export class ChoiceGroupImageExample extends React.Component<any, IChoiceGroupImageExampleState> {
  constructor() {
    super();

    this.state = {
      imageKey: ''
    };

    this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
  }

  public render() {
    return (
      <div>
        <ChoiceGroup
          label='Pick one image'
          options={ [
            {
              key: 'bar',
              checked: this.state.imageKey === 'bar',
              imageSrc: 'dist/choicegroup-bar-unselected.png',
              selectedImageSrc: 'dist/choicegroup-bar-selected.png',
              imageSize: { width: 50, height: 50 },
              text: 'Bar chart'
            },
            {
              key: 'pie',
              checked: this.state.imageKey === 'pie',
              imageSrc: 'dist/choicegroup-pie-unselected.png',
              selectedImageSrc: 'dist/choicegroup-pie-selected.png',
              imageSize: { width: 50, height: 50 },
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
      imageKey: option.key
    });
  }
}
