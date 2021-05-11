import * as React from 'react';
import {
  Coachmark,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  TeachingBubbleContent,
  mergeStyleSets,
} from '@fluentui/react';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { useBoolean } from '@fluentui/react-hooks';

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
  { key: 'A', text: 'Top left edge', data: DirectionalHint.topLeftEdge },
  { key: 'B', text: 'Top center', data: DirectionalHint.topCenter },
  { key: 'C', text: 'Top right edge', data: DirectionalHint.topRightEdge },
  { key: 'D', text: 'Top auto edge', data: DirectionalHint.topAutoEdge },
  { key: 'E', text: 'Bottom left edge', data: DirectionalHint.bottomLeftEdge },
  { key: 'F', text: 'Bottom center', data: DirectionalHint.bottomCenter },
  { key: 'G', text: 'Bottom right edge', data: DirectionalHint.bottomRightEdge },
  { key: 'H', text: 'Bottom auto edge', data: DirectionalHint.bottomAutoEdge },
  { key: 'I', text: 'Left top edge', data: DirectionalHint.leftTopEdge },
  { key: 'J', text: 'Left center', data: DirectionalHint.leftCenter },
  { key: 'K', text: 'Left bottom edge', data: DirectionalHint.leftBottomEdge },
  { key: 'L', text: 'Right top edge', data: DirectionalHint.rightTopEdge },
  { key: 'M', text: 'Right center', data: DirectionalHint.rightCenter },
  { key: 'N', text: 'Right bottom edge', data: DirectionalHint.rightBottomEdge },
];

export const CoachmarkBasicExample: React.FunctionComponent = () => {
  const targetButton = React.useRef<HTMLDivElement>(null);
  const [isCoachmarkVisible, { setFalse: hideCoachmark, setTrue: showCoachmark }] = useBoolean(false);
  const [coachmarkPosition, setCoachmarkPosition] = React.useState<DirectionalHint>(DirectionalHint.bottomAutoEdge);
  const onDropdownChange = React.useCallback(
    (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
      setCoachmarkPosition(option.data);
    },
    [],
  );

  const positioningContainerProps = React.useMemo(
    () => ({
      directionalHint: coachmarkPosition,
      doNotLayer: false,
    }),
    [coachmarkPosition],
  );

  return (
    <>
      <div className={classNames.dropdownContainer}>
        <Dropdown
          label="Coachmark position"
          defaultSelectedKey="H"
          onFocus={hideCoachmark}
          options={dropdownOptions}
          onChange={onDropdownChange}
        />
      </div>

      <div className={classNames.buttonContainer} ref={targetButton}>
        <DefaultButton onClick={showCoachmark} text={isCoachmarkVisible ? 'Hide coachmark' : 'Show coachmark'} />
      </div>
      {isCoachmarkVisible && (
        <Coachmark
          target={targetButton.current}
          positioningContainerProps={positioningContainerProps}
          ariaAlertText="A coachmark has appeared"
          ariaDescribedBy="coachmark-desc1"
          ariaLabelledBy="coachmark-label1"
          ariaDescribedByText="Press enter or alt + C to open the coachmark notification"
          ariaLabelledByText="Coachmark notification"
        >
          <TeachingBubbleContent
            headline="Example title"
            hasCloseButton
            closeButtonAriaLabel="Close"
            primaryButtonProps={buttonProps}
            secondaryButtonProps={buttonProps2}
            onDismiss={hideCoachmark}
            ariaDescribedBy="example-description1"
            ariaLabelledBy="example-label1"
          >
            Welcome to the land of coachmarks!
          </TeachingBubbleContent>
        </Coachmark>
      )}
    </>
  );
};
