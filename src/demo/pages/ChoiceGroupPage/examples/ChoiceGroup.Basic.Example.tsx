import * as React from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption
} from '../../../../components/index';

/**
 * Interface for ChoiceGroupBasicExample state.
 */
export interface IChoiceGroupBasicExampleState {
  imageKey: string;
}

export default class ChoiceGroupBasicExample extends React.Component<any, IChoiceGroupBasicExampleState> {
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
              isDisabled: true
            }
          ] }
          onChanged={ this._onChanged }
          label='Pick one'
        />
        <ChoiceGroup
          label='Pick one image'
          options={ [
            {
              key: 'bar',
              isChecked: this.state.imageKey === 'bar',
              imageSrc: 'dist/choicegroup-bar-inactive.png',
              selectedImageSrc: 'dist/choicegroup-bar-active.png',
              imageSize: { width: 70, height: 70 },
              text: 'Bar chart'
            },
            {
              key: 'pie',
              isChecked: this.state.imageKey === 'pie',
              imageSrc: 'dist/choicegroup-pie-inactive.png',
              selectedImageSrc: 'dist/choicegroup-pie-active.png',
              imageSize: { width: 70, height: 70 },
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

  private _onImageChoiceGroupChange(option: IChoiceGroupOption, evt?: React.SyntheticEvent) {
    this.setState({
      imageKey: option.key
    });
  }
}
