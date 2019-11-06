import * as React from 'react';
import {
  DefaultButton,
  Callout,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  getTheme,
  mergeStyleSets,
  FontWeights
} from 'office-ui-fabric-react';

export interface ICalloutCoverExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
}

const DIRECTION_OPTIONS = [
  { key: DirectionalHint.topLeftEdge, text: 'Top Left Edge' },
  { key: DirectionalHint.topCenter, text: 'Top Center' },
  { key: DirectionalHint.topRightEdge, text: 'Top Right Edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top Auto Edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom Left Edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom Center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom Right Edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom Auto Edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left Top Edge' },
  { key: DirectionalHint.leftCenter, text: 'Left Center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left Bottom Edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right Top Edge' },
  { key: DirectionalHint.rightCenter, text: 'Right Center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' }
];

const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32
  },
  configArea: {
    minWidth: '300px',
    display: 'inline-block'
  },
  callout: {
    maxWidth: 300
  },
  header: {
    padding: '18px 24px 12px'
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      color: theme.palette.neutralPrimary,
      fontWeight: FontWeights.semilight
    }
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px'
  }
});

export class CalloutCoverExample extends React.Component<{}, ICalloutCoverExampleState> {
  private _menuButtonElement: HTMLElement | null;

  public constructor(props: {}) {
    super(props);

    this._onDismiss = this._onDismiss.bind(this);
    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onDirectionalChanged = this._onDirectionalChanged.bind(this);

    this.state = {
      isCalloutVisible: false,
      directionalHint: DirectionalHint.bottomLeftEdge
    };
  }

  public render(): JSX.Element {
    const { isCalloutVisible, directionalHint } = this.state;
    // ms-Callout-smallbeak is used in this directional example to reflect all the positions.
    // Large beak will disable some position to avoid beak over the callout edge.
    return (
      <>
        <div className={styles.configArea}>
          <Dropdown
            label="Directional hint"
            selectedKey={directionalHint!}
            options={DIRECTION_OPTIONS}
            onChange={this._onDirectionalChanged}
          />
        </div>
        <div className={styles.buttonArea} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton text={isCalloutVisible ? 'Hide callout' : 'Show callout'} onClick={this._onShowMenuClicked} />
        </div>
        {isCalloutVisible ? (
          <Callout
            className={styles.callout}
            onDismiss={this._onDismiss}
            target={this._menuButtonElement}
            directionalHint={directionalHint}
            coverTarget={true}
            isBeakVisible={false}
            gapSpace={0}
            setInitialFocus={true}
          >
            <div className={styles.header}>
              <p className={styles.title}>I'm covering the target!</p>
            </div>
            <div className={styles.inner}>
              <DefaultButton onClick={this._onShowMenuClicked} text="Click to dismiss" />
            </div>
          </Callout>
        ) : null}
      </>
    );
  }

  private _onDismiss(): void {
    this.setState({ isCalloutVisible: false });
  }

  private _onShowMenuClicked(): void {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible
    });
  }

  private _onDirectionalChanged(event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void {
    this.setState({
      directionalHint: option.key as DirectionalHint
    });
  }
}
