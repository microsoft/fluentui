import * as React from 'react';
import {
  ChoiceGroup,
  IChoiceGroupOption,
  autobind
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
              checked: true
            },
            {
              key: 'C',
              text: 'Option C',
              disabled: true
            },
            {
              key: 'D',
              text: 'Option D',
              checked: true,
              disabled: true
            }
          ] }
          onChange={ this._onChange }
          label='Pick one'
          required={ true }
          />
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

  @autobind
  private _onChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
    console.dir(option);
  }

  private _onImageChoiceGroupChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) {
    this.setState({
      imageKey: option.key
    });
  }
}
