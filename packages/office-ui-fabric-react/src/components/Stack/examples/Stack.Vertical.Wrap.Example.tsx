import * as React from 'react';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from '../Stack';
import { IStackStyles, IStackTokens } from '../Stack.types';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';

export interface IExampleState {
  stackHeight: number;
}

export class VerticalStackWrapExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackHeight: 420
    };
  }

  public render(): JSX.Element {
    const { stackHeight } = this.state;

    const stackStyles: IStackStyles = {
      root: {
        background: DefaultPalette.themeTertiary,
        height: stackHeight,
        selectors: {
          '& span': {
            alignItems: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white,
            height: 50,
            display: 'flex',
            justifyContent: 'center',
            width: 50
          }
        }
      }
    };

    const sectionStackTokens: IStackTokens = { childrenGap: 10 };
    const wrapStackTokens: IStackTokens = { childrenGap: 20 };

    return (
      <Stack tokens={sectionStackTokens}>
        <Slider
          label="Change the stack height to see how child items wrap onto multiple columns:"
          min={1}
          max={420}
          step={1}
          defaultValue={420}
          showValue={true}
          onChange={this._onHeightChange}
        />

        <Stack wrap styles={stackStyles} tokens={wrapStackTokens}>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </Stack>
      </Stack>
    );
  }

  private _onHeightChange = (value: number): void => {
    this.setState({ stackHeight: value });
  };
}
