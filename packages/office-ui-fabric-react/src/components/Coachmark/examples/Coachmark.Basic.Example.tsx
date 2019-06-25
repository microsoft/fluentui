import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  Coachmark,
  DefaultButton,
  DirectionalHint,
  Dropdown,
  IButtonProps,
  IDropdownOption,
  IStyle,
  TeachingBubbleContent
} from 'office-ui-fabric-react';

export interface ICoachmarkBasicExampleState {
  isCoachmarkVisible?: boolean;
  coachmarkPosition: DirectionalHint;
  dropdownSelectedOptionKey: string | number;
}

export interface ICoachmarkBasicExampleStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * The example button container
   */
  buttonContainer: IStyle;

  /**
   * The dropdown component container
   */
  dropdownContainer: IStyle;
}

export class CoachmarkBasicExample extends BaseComponent<{}, ICoachmarkBasicExampleState> {
  private _targetButton = React.createRef<HTMLDivElement>();

  public constructor(props: {}) {
    super(props);

    this.state = {
      isCoachmarkVisible: false,
      coachmarkPosition: DirectionalHint.bottomAutoEdge,
      dropdownSelectedOptionKey: 'H'
    };
  }

  public render(): JSX.Element {
    const { isCoachmarkVisible, dropdownSelectedOptionKey } = this.state;

    const getClassNames = classNamesFunction<{}, ICoachmarkBasicExampleStyles>();
    const classNames = getClassNames(() => {
      return {
        dropdownContainer: {
          maxWidth: '400px'
        },
        buttonContainer: {
          marginTop: '30px',
          display: 'inline-block'
        }
      };
    }, {});

    const buttonProps: IButtonProps = {
      text: 'Try it'
    };

    const buttonProps2: IButtonProps = {
      text: 'Try it again'
    };

    return (
      <div className={classNames.root}>
        <div className={classNames.dropdownContainer}>
          <Dropdown
            label="Coachmark position"
            selectedKey={dropdownSelectedOptionKey}
            onFocus={this._onDismiss}
            options={[
              { key: 'A', text: 'Top Left Edge', data: DirectionalHint.topLeftEdge },
              { key: 'B', text: 'Top Center', data: DirectionalHint.topCenter },
              { key: 'C', text: 'Top Right Edge', data: DirectionalHint.topRightEdge },
              { key: 'D', text: 'Top Auto Edge', data: DirectionalHint.topAutoEdge },
              { key: 'E', text: 'Bottom Left Edge', data: DirectionalHint.bottomLeftEdge },
              { key: 'F', text: 'Bottom Center', data: DirectionalHint.bottomCenter },
              { key: 'G', text: 'Bottom Right Edge', data: DirectionalHint.bottomRightEdge },
              { key: 'H', text: 'Bottom Auto Edge', data: DirectionalHint.bottomAutoEdge },
              { key: 'I', text: 'Left Top Edge', data: DirectionalHint.leftTopEdge },
              { key: 'J', text: 'Left Center', data: DirectionalHint.leftCenter },
              { key: 'K', text: 'Left Bottom Edge', data: DirectionalHint.leftBottomEdge },
              { key: 'L', text: 'Right Top Edge', data: DirectionalHint.rightTopEdge },
              { key: 'M', text: 'Right Center', data: DirectionalHint.rightCenter },
              { key: 'N', text: 'Right Bottom Edge', data: DirectionalHint.rightBottomEdge }
            ]}
            onChange={this._onDropdownChange}
          />
        </div>

        <div className={classNames.buttonContainer} ref={this._targetButton}>
          <DefaultButton onClick={this._onShowMenuClicked} text={isCoachmarkVisible ? 'Hide Coachmark' : 'Show Coachmark'} />
        </div>
        {isCoachmarkVisible && (
          <Coachmark
            target={this._targetButton.current}
            positioningContainerProps={{
              directionalHint: this.state.coachmarkPosition,
              doNotLayer: false
            }}
            ariaAlertText="A Coachmark has appeared"
            ariaDescribedBy={'coachmark-desc1'}
            ariaLabelledBy={'coachmark-label1'}
            ariaDescribedByText={'Press enter or alt + C to open the Coachmark notification'}
            ariaLabelledByText={'Coachmark notification'}
          >
            <TeachingBubbleContent
              headline="Example Title"
              hasCloseIcon={true}
              closeButtonAriaLabel="Close"
              primaryButtonProps={buttonProps}
              secondaryButtonProps={buttonProps2}
              onDismiss={this._onDismiss}
              ariaDescribedBy={'example-description1'}
              ariaLabelledBy={'example-label1'}
            >
              Welcome to the land of Coachmarks!
            </TeachingBubbleContent>
          </Coachmark>
        )}
      </div>
    );
  }

  private _onDismiss = (): void => {
    this.setState({
      isCoachmarkVisible: false
    });
  };

  private _onDropdownChange = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({
      coachmarkPosition: option.data,
      dropdownSelectedOptionKey: option.key
    });
  };

  private _onShowMenuClicked = (): void => {
    this.setState({
      isCoachmarkVisible: !this.state.isCoachmarkVisible
    });
  };
}
