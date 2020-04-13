import * as React from 'react';
import {
  DefaultButton,
  Callout,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  Checkbox,
  Slider,
  getTheme,
  mergeStyleSets,
  FontWeights,
  Link,
  getId,
  ICheckboxStyles,
} from 'office-ui-fabric-react';

export interface ICalloutDirectionalExampleState {
  isCalloutVisible?: boolean;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
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
  { key: DirectionalHint.rightBottomEdge, text: 'Right Bottom Edge' },
];

const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 100px',
    minWidth: 130,
    height: 32,
  },
  configArea: {
    minWidth: '300px',
    display: 'inline-block',
  },
  callout: {
    maxWidth: 300,
  },
  calloutExampleButton: {
    width: '100%',
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
});

const checkboxStyles: Partial<ICheckboxStyles> = { root: { margin: '10px 0' } };

export class CalloutDirectionalExample extends React.Component<{}, ICalloutDirectionalExampleState> {
  private _menuButtonElement: HTMLElement | null;

  // Use getId() to ensure that the callout label and description IDs are unique on the page.
  // It's also okay, though not recommended, to use plain strings without getId() and manually ensure their uniqueness.
  private _labelId: string = getId('callout-label');
  private _descriptionId: string = getId('callout-description');

  public constructor(props: {}) {
    super(props);

    this.state = {
      isCalloutVisible: false,
      isBeakVisible: true,
      directionalHint: DirectionalHint.bottomLeftEdge,
    };
  }

  public render(): JSX.Element {
    const { isCalloutVisible, isBeakVisible, directionalHint, gapSpace, beakWidth } = this.state;
    //  ms-Callout-smallbeak is used in this directional example to reflect all the positions.
    //  Large beak will disable some position to avoid beak over the callout edge.
    return (
      <>
        <div className={styles.configArea}>
          <Checkbox
            styles={checkboxStyles}
            label="Show beak"
            checked={isBeakVisible}
            onChange={this._onShowBeakChange}
          />
          <Slider max={30} label="Gap Space" min={0} defaultValue={0} onChange={this._onGapSlider} />
          {isBeakVisible && (
            <Slider max={50} label="Beak Width" min={10} defaultValue={16} onChange={this._onBeakWidthSlider} />
          )}
          <Dropdown
            label="Directional hint"
            selectedKey={directionalHint!}
            options={DIRECTION_OPTIONS}
            onChange={this._onDirectionalChanged}
          />
        </div>
        <div className={styles.buttonArea} ref={menuButton => (this._menuButtonElement = menuButton)}>
          <DefaultButton
            className={styles.calloutExampleButton}
            onClick={this._onShowMenuClicked}
            text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
          />
        </div>
        {isCalloutVisible ? (
          <Callout
            ariaLabelledBy={this._labelId}
            ariaDescribedBy={this._descriptionId}
            className={styles.callout}
            gapSpace={gapSpace}
            target={this._menuButtonElement}
            isBeakVisible={isBeakVisible}
            beakWidth={beakWidth}
            onDismiss={this._onCalloutDismiss}
            directionalHint={directionalHint}
            setInitialFocus={true}
          >
            <div className={styles.header}>
              <p className={styles.title} id={this._labelId}>
                All of your favorite people
              </p>
            </div>
            <div className={styles.inner}>
              <p className={styles.subtext} id={this._descriptionId}>
                Message body is optional. If help documentation is available, consider adding a link to learn more at
                the bottom.
              </p>
              <div className={styles.actions}>
                <Link className={styles.link} href="http://microsoft.com" target="_blank">
                  Go to Microsoft
                </Link>
              </div>
            </div>
          </Callout>
        ) : null}
      </>
    );
  }

  private _onCalloutDismiss = (): void => {
    this.setState({
      isCalloutVisible: false,
    });
  };

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCalloutVisible: !this.state.isCalloutVisible,
    });
  };

  private _onShowBeakChange = (ev: React.FormEvent<HTMLElement>, isVisible: boolean): void => {
    this.setState({
      isBeakVisible: isVisible,
      beakWidth: 10,
    });
  };

  private _onDirectionalChanged = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({
      directionalHint: option.key as DirectionalHint,
    });
  };

  private _onGapSlider = (value: number): void => {
    this.setState({
      gapSpace: value,
    });
  };

  private _onBeakWidthSlider = (value: number): void => {
    this.setState({
      beakWidth: value,
    });
  };
}
