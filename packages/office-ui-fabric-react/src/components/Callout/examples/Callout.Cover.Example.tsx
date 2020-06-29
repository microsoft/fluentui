import * as React from 'react';
import {
  DefaultButton,
  Callout,
  DirectionalHint,
  Dropdown,
  IDropdownOption,
  mergeStyleSets,
  FontWeights,
  Text,
} from 'office-ui-fabric-react';
import { useBoolean } from '@uifabric/react-hooks';

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
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
});

export const CalloutCoverExample: React.FunctionComponent = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] = useBoolean(false);
  const [directionalHint, setDirectionalHint] = React.useState<DirectionalHint>(DirectionalHint.bottomLeftEdge);
  const onDirectionalChanged = (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    setDirectionalHint(option.key as DirectionalHint);
  };

  return (
    <>
      <div className={styles.configArea}>
        <Dropdown
          label="Directional hint"
          selectedKey={directionalHint!}
          options={DIRECTION_OPTIONS}
          onChange={onDirectionalChanged}
        />
      </div>
      <div className={styles.buttonArea}>
        <DefaultButton text={isCalloutVisible ? 'Hide callout' : 'Show callout'} onClick={toggleIsCalloutVisible} />
      </div>
      {isCalloutVisible ? (
        <Callout
          className={styles.callout}
          onDismiss={toggleIsCalloutVisible}
          target={`.${styles.buttonArea}`}
          directionalHint={directionalHint}
          coverTarget
          isBeakVisible={false}
          gapSpace={0}
          setInitialFocus
        >
          <div className={styles.header}>
            <Text className={styles.title}>I'm covering the target!</Text>
          </div>
          <div className={styles.inner}>
            <DefaultButton onClick={toggleIsCalloutVisible} text="Click to dismiss" />
          </div>
        </Callout>
      ) : null}
    </>
  );
};
