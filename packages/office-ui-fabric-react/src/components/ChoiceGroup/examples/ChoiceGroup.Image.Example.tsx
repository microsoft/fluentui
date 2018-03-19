import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TestImages } from '../../../common/TestImages';

/**
 * Interface for ChoiceGroupImageExample state.
 */
export interface IChoiceGroupImageExampleState {
  selectedKey: string;
}

export class ChoiceGroupImageExample extends React.Component<{}, IChoiceGroupImageExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedKey: 'bar'
    };

    this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
  }

  public render(): JSX.Element {
    const { selectedKey } = this.state;

    return (
      <div>
        <ChoiceGroup
          label='Pick one image'
          selectedKey={ selectedKey }
          options={ [
            {
              key: 'bar',
              imageSrc: TestImages.choiceGroupBarUnselected,
              imageAlt: 'Bar chart icon',
              selectedImageSrc: TestImages.choiceGroupBarSelected,
              imageSize: { width: 32, height: 32 },
              text: 'Clustered bar chart' // This text is long to show text wrapping.
            },
            {
              key: 'pie',
              imageSrc: TestImages.choiceGroupBarUnselected,
              selectedImageSrc: TestImages.choiceGroupBarSelected,
              imageSize: { width: 32, height: 32 },
              text: 'Pie chart'
            }
          ] }
          onChange={ this._onImageChoiceGroupChange }
        />
      </div>
    );
  }

  private _onImageChoiceGroupChange(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void {
    this.setState({
      selectedKey: option.key
    });
  }
}
