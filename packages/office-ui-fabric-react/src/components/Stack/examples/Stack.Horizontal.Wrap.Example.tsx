import * as React from 'react';
import { mergeStyleSets, DefaultPalette, Slider, Stack } from 'office-ui-fabric-react';

export interface IExampleState {
  stackWidth: number;
}

export class HorizontalStackWrapExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      stackWidth: 100
    };
  }

  public render(): JSX.Element {
    const styles = mergeStyleSets({
      root: {
        background: DefaultPalette.themeTertiary,
        width: `${this.state.stackWidth}%`
      },

      item: {
        width: 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white
      }
    });

    const tokens = {
      sectionStack: {
        childrenGap: 10
      },
      wrapStack: {
        childrenGap: 30
      }
    };

    return (
      <Stack tokens={tokens.sectionStack}>
        <Slider
          label="Change the stack width to see how child items wrap onto multiple rows:"
          min={1}
          max={100}
          step={1}
          defaultValue={100}
          showValue={true}
          onChange={this._onWidthChange}
        />

        <Stack horizontal wrap tokens={tokens.wrapStack} className={styles.root}>
          <span className={styles.item}>1</span>
          <span className={styles.item}>2</span>
          <span className={styles.item}>3</span>
          <span className={styles.item}>4</span>
          <span className={styles.item}>5</span>
          <span className={styles.item}>6</span>
          <span className={styles.item}>7</span>
          <span className={styles.item}>8</span>
          <span className={styles.item}>9</span>
          <span className={styles.item}>10</span>
        </Stack>
      </Stack>
    );
  }

  private _onWidthChange = (value: number): void => {
    this.setState({ stackWidth: value });
  };
}
