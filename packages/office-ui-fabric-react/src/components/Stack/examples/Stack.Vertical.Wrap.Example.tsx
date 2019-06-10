import * as React from 'react';
import { mergeStyleSets, DefaultPalette, Slider, Stack } from 'office-ui-fabric-react';

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

    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        height: stackHeight,
        selectors: {
          '& span': {
            width: 50,
            height: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: DefaultPalette.themePrimary,
            color: DefaultPalette.white
          }
        }
      }
    });

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      wrapStack: {
        childrenGap: 20
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Slider
          label="Change the stack height to see how child items wrap onto multiple columns:"
          min={1}
          max={420}
          step={1}
          defaultValue={420}
          showValue={true}
          onChange={this._onHeightChange}
        />

        <Stack wrap tokens={tokens.wrapStack} className={styles.root}>
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
