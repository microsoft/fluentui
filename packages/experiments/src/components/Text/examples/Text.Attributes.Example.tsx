import * as React from 'react';
import { Text } from '../Text';
import { Stack } from '../../Stack/Stack';
import { IPalette, ISemanticColors } from '../../../Styling';
import {
  Slider,
  SwatchColorPicker,
  ChoiceGroup,
  IChoiceGroupOption,
  Checkbox,
  TooltipHost,
  DirectionalHint
} from 'office-ui-fabric-react';

export interface ITextAttributesExampleState {
  size?: string;
  color?: keyof IPalette | keyof ISemanticColors;
  fontFamily?: string;
  weight?: string;
  wrap?: boolean;
}

export class TextAttributesExample extends React.Component<{}, ITextAttributesExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      size: 'medium',
      color: 'black',
      fontFamily: 'default',
      weight: 'regular',
      wrap: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render(): JSX.Element {
    const { size, color, fontFamily, weight, wrap } = this.state;
    const content = `<Text
        size=${size}
        weight=${weight}
        color=${color}
        family=${fontFamily}
        wrap=${wrap}>
        Change This Text's Attributes!
      </Text>`;
    return (
      <div>
        <Stack vertical>
          <Stack vertical maxWidth={300}>
            <Slider
              label="Change the size"
              min={1}
              max={9}
              step={1}
              defaultValue={3}
              showValue={false}
              onChange={this._onChangeSize}
            />
            <Slider
              label="Change the weight"
              min={1}
              max={4}
              step={1}
              defaultValue={2}
              showValue={false}
              onChange={this._onChangeWeight}
            />
          </Stack>
          <Text fontStyle="medium">Change the color</Text>
          <SwatchColorPicker
            columnCount={8}
            cellShape={'circle'}
            colorCells={[
              { id: 'red', label: 'red', color: 'red' },
              { id: 'orange', label: 'orange', color: 'orange' },
              { id: 'yellow', label: 'yellow', color: 'yellow' },
              { id: 'green', label: 'green', color: 'green' },
              { id: 'teal', label: 'teal', color: 'teal' },
              { id: 'blue', label: 'blue', color: 'blue' },
              { id: 'purple', label: 'purple', color: 'purple' },
              { id: 'black', label: 'black', color: 'black' }
            ]}
            onColorChanged={this._onChangePaletteColor}
          />
          <SwatchColorPicker
            columnCount={6}
            cellShape={'circle'}
            colorCells={[
              { id: 'neutralPrimary', label: 'neutralPrimary', color: '#333333' },
              { id: 'neutralPrimaryAlt', label: 'neutralPrimaryAlt', color: '#3c3c3c' },
              { id: 'neutralSecondary', label: 'neutralSecondary', color: '#666666' },
              { id: 'neutralSecondaryAlt', label: 'neutralSecondaryAlt', color: '#767676' },
              { id: 'neutralTertiary', label: 'neutralTertiary', color: '#a6a6a6' },
              { id: 'neutralTertiaryAlt', label: 'neutralTertiaryAlt', color: '#c8c8c8' }
            ]}
            onColorChanged={this._onChangeSemanticColor}
          />
          <Stack.Item gap={10}>
            <ChoiceGroup
              label="Change the font family"
              selectedKey={fontFamily}
              options={[
                {
                  key: 'default',
                  text: 'Default'
                },
                {
                  key: 'monospace',
                  text: 'Monospace'
                }
              ]}
              onChange={this._onChangeFontFamily}
            />
          </Stack.Item>
          <Stack.Item gap={10}>
            <Text fontStyle="medium">Wrap the text</Text>
          </Stack.Item>
          <Stack.Item gap={10}>
            <Checkbox label="Wrap" onChange={this._onCheckboxChange} ariaDescribedBy={'wrap text'} />
          </Stack.Item>
        </Stack>
        <TooltipHost
          content={content}
          id="myID"
          calloutProps={{ gapSpace: 0 }}
          tooltipProps={{ directionalHint: DirectionalHint.bottomCenter }}
        >
          <Text size={size} weight={weight} color={color} family={fontFamily} wrap={wrap}>
            Change This Text's Attributes!
          </Text>
        </TooltipHost>
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
    this.setState({ wrap: isChecked });
  }

  private _onChangeWeight = (value: number): void => {
    switch (value) {
      case 1:
        this.setState({ weight: 'light' });
        break;
      case 2:
        this.setState({ weight: 'regular' });
        break;
      case 3:
        this.setState({ weight: 'semibold' });
        break;
      case 4:
        this.setState({ weight: 'bold' });
        break;
    }
  };

  private _onChangePaletteColor = (value: keyof IPalette): void => {
    this.setState({ color: value });
  };

  private _onChangeSemanticColor = (value: keyof ISemanticColors): void => {
    this.setState({ color: value });
  };

  private _onChangeFontFamily = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void => {
    this.setState({
      fontFamily: option.key
    });
  };

  private _onChangeSize = (value: number): void => {
    switch (value) {
      case 1:
        this.setState({ size: 'tiny' });
        break;
      case 2:
        this.setState({ size: 'xSmall' });
        break;
      case 3:
        this.setState({ size: 'small' });
        break;
      case 4:
        this.setState({ size: 'medium' });
        break;
      case 5:
        this.setState({ size: 'large' });
        break;
      case 6:
        this.setState({ size: 'xLarge' });
        break;
      case 7:
        this.setState({ size: 'xxLarge' });
        break;
      case 8:
        this.setState({ size: 'xxxLarge' });
        break;
      case 9:
        this.setState({ size: 'mega' });
        break;
    }
  };
}
