import * as React from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption
} from '../../../../index';

/**
 * Interface for ChoiceGroupBasicExample state.
 */
export interface IChoiceGroupBasicExampleState {
  imageKey: string;
}

export class ChoiceGroupBasicExample extends React.Component<any, IChoiceGroupBasicExampleState> {
  constructor() {
    super();

    this.state = {
      imageKey: ''
    };

    this._onChanged = this._onChanged.bind(this);
    this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
  }

  public render() {
    return (
      <div>
        <ChoiceGroup
          options={ [
            {
              key: 'A',
              text: 'Option A'
            },
            {
              key: 'B',
              text: 'Option B',
              isChecked: true
            },
            {
              key: 'C',
              text: 'Option C',
              disabled: true
            },
            {
              key: 'D',
              text: 'Option D',
              isChecked: true,
              disabled: true
            }
          ] }
          onChanged={ this._onChanged }
          label='Pick one'
          required={ true }
        />
        <ChoiceGroup
          label='Pick one image'
          options={ [
            {
              key: 'bar',
              isChecked: this.state.imageKey === 'bar',
              imageSrc: 'dist/choicegroup-bar-unselected.png',
              selectedImageSrc: 'dist/choicegroup-bar-selected.png',
              imageSize: { width: 50, height: 50 },
              text: 'Bar chart'
            },
            {
              key: 'pie',
              isChecked: this.state.imageKey === 'pie',
              imageSrc: 'dist/choicegroup-pie-unselected.png',
              selectedImageSrc: 'dist/choicegroup-pie-selected.png',
              imageSize: { width: 50, height: 50 },
              text: 'Pie chart'
            }
          ] }
          onChanged={ this._onImageChoiceGroupChange }
        />
      </div>
    );
  }

  private _onChanged() {
    console.log('The option has been changed.');
  }

  private _onImageChoiceGroupChange(option: IChoiceGroupOption, evt?: React.SyntheticEvent<HTMLElement>) {
    this.setState({
      imageKey: option.key
    });
  }
}
