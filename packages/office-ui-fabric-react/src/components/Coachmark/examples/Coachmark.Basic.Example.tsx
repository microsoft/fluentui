import * as React from 'react';
import {
  Coachmark,
  DefaultButton,
  DirectionalHint,
  Dropdown,
  IButtonProps,
  IDropdownOption,
  TeachingBubbleContent,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

const classNames = mergeStyleSets({
  dropdownContainer: {
    maxWidth: '400px',
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'inline-block',
  },
});

const buttonProps: IButtonProps = {
  text: 'Try it',
};

const buttonProps2: IButtonProps = {
  text: 'Try it again',
};

const dropdownOptions: IDropdownOption[] = [
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
  { key: 'N', text: 'Right Bottom Edge', data: DirectionalHint.rightBottomEdge },
];

export const CoachmarkBasicExample: React.FunctionComponent = () => {
  const targetButton = React.useRef<HTMLDivElement>(null);
  const [isCoachmarkVisible, { setFalse: hideCoachmark, setTrue: showCoachmark }] = useBoolean(false);
  const [coachmarkPosition, setCoachmarkPosition] = React.useState<DirectionalHint>(DirectionalHint.bottomAutoEdge);
  const [dropdownSelectedOptionKey, setDropdownSelectedOptionKey] = React.useState<string | number>('H');

  const onDropdownChange = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setCoachmarkPosition(option.data);
      setDropdownSelectedOptionKey(option.key);
    },
    [],
  );

  return (
    <>
      <div className={classNames.dropdownContainer}>
        <Dropdown
          label="Coachmark position"
          selectedKey={dropdownSelectedOptionKey}
          onFocus={hideCoachmark}
          options={dropdownOptions}
          onChange={onDropdownChange}
        />
      </div>

      <div className={classNames.buttonContainer} ref={targetButton}>
        <DefaultButton onClick={showCoachmark} text={isCoachmarkVisible ? 'Hide Coachmark' : 'Show Coachmark'} />
      </div>
      {isCoachmarkVisible && (
        <Coachmark
          target={targetButton.current}
          positioningContainerProps={{
            directionalHint: coachmarkPosition,
            doNotLayer: false,
          }}
          ariaAlertText="A Coachmark has appeared"
          ariaDescribedBy={'coachmark-desc1'}
          ariaLabelledBy={'coachmark-label1'}
          ariaDescribedByText={'Press enter or alt + C to open the Coachmark notification'}
          ariaLabelledByText={'Coachmark notification'}
        >
          <TeachingBubbleContent
            headline="Example Title"
            hasCloseButton
            closeButtonAriaLabel="Close"
            primaryButtonProps={buttonProps}
            secondaryButtonProps={buttonProps2}
            onDismiss={hideCoachmark}
            ariaDescribedBy={'example-description1'}
            ariaLabelledBy={'example-label1'}
          >
            Welcome to the land of Coachmarks!
          </TeachingBubbleContent>
        </Coachmark>
      )}
    </>
  );
};
