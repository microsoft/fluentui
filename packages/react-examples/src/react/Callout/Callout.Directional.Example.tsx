import * as React from 'react';
import {
  Callout,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  Toggle,
  Slider,
  mergeStyleSets,
  FontWeights,
  Link,
  Text,
  Stack,
} from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

export const CalloutDirectionalExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const [isBeakVisible, { toggle: toggleIsBeakVisible }] = useBoolean(true);
  const [gapSpace, setGapSpace] = React.useState<number>();
  const [beakWidth, setBeakWidth] = React.useState<number>();
  const [directionalHint, setDirectionalHint] = React.useState<DirectionalHint>(DirectionalHint.bottomLeftEdge);

  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  const onDirectionalChanged = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setDirectionalHint(option.key as DirectionalHint);
  };

  const onGapSliderChange = (value: number): void => {
    setGapSpace(value);
  };
  const onBeakWidthSliderChange = (value: number): void => {
    setBeakWidth(value);
  };

  const onShowBeakChange = () => {
    toggleIsBeakVisible();
    setBeakWidth(10);
  };

  return (
    <>
      <Stack tokens={{ childrenGap: 10 }} className={styles.configArea}>
        {/* eslint-disable react/jsx-no-bind */}
        <Toggle label="Show beak" checked={isBeakVisible} onChange={onShowBeakChange} />

        <Slider max={30} label="Gap space" min={0} defaultValue={0} onChange={onGapSliderChange} />
        {isBeakVisible && (
          <Slider max={50} label="Beak width" min={10} defaultValue={16} onChange={onBeakWidthSliderChange} />
        )}
        <Dropdown
          label="Directional hint"
          selectedKey={directionalHint}
          options={DIRECTION_OPTIONS}
          onChange={onDirectionalChanged}
        />
        {/* eslint-enable react/jsx-no-bind */}
      </Stack>
      <div className={styles.buttonArea}>
        <DefaultButton
          id={buttonId}
          className={styles.button}
          onClick={toggleIsCalloutVisible}
          text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
        />
      </div>
      {isCalloutVisible ? (
        <Callout
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="dialog"
          className={styles.callout}
          gapSpace={gapSpace}
          target={`#${buttonId}`}
          isBeakVisible={isBeakVisible}
          beakWidth={beakWidth}
          onDismiss={toggleIsCalloutVisible}
          directionalHint={directionalHint}
          setInitialFocus
        >
          <Text block variant="xLarge" className={styles.title} id={labelId}>
            Callout title here
          </Text>
          <Text block variant="small" id={descriptionId}>
            Message body is optional. If help documentation is available, consider adding a link to learn more at the
            bottom.
          </Text>
          <Link href="http://microsoft.com" target="_blank" className={styles.link}>
            Sample link
          </Link>
        </Callout>
      ) : null}
    </>
  );
};

const DIRECTION_OPTIONS: IDropdownOption[] = [
  { key: DirectionalHint.topLeftEdge, text: 'Top left edge' },
  { key: DirectionalHint.topCenter, text: 'Top center' },
  { key: DirectionalHint.topRightEdge, text: 'Top right edge' },
  { key: DirectionalHint.topAutoEdge, text: 'Top auto edge' },
  { key: DirectionalHint.bottomLeftEdge, text: 'Bottom left edge' },
  { key: DirectionalHint.bottomCenter, text: 'Bottom center' },
  { key: DirectionalHint.bottomRightEdge, text: 'Bottom right edge' },
  { key: DirectionalHint.bottomAutoEdge, text: 'Bottom auto edge' },
  { key: DirectionalHint.leftTopEdge, text: 'Left top edge' },
  { key: DirectionalHint.leftCenter, text: 'Left center' },
  { key: DirectionalHint.leftBottomEdge, text: 'Left bottom edge' },
  { key: DirectionalHint.rightTopEdge, text: 'Right top edge' },
  { key: DirectionalHint.rightCenter, text: 'Right center' },
  { key: DirectionalHint.rightBottomEdge, text: 'Right bottom edge' },
];

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
    width: 300,
    display: 'inline-block',
  },
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});
