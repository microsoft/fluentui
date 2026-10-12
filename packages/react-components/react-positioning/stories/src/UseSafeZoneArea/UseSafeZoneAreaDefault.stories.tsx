import {
  Field,
  Portal,
  Radio,
  RadioGroup,
  Switch,
  makeStyles,
  mergeClasses,
  type PositioningShorthandValue,
  resolvePositioningShorthand,
  tokens,
  useMergedRefs,
  usePositioning,
  useSafeZoneArea,
  type UseSafeZoneOptions,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

const useClasses = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  controls: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    alignItems: 'center',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    minHeight: '400px',
  },
  cardAbove: {
    justifyContent: 'end',
  },
  cardBelow: {
    justifyContent: 'start',
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    width: '300px',
    height: '300px',
    color: tokens.colorPaletteBerryForeground2,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorPaletteBerryBorderActive}`,
    backgroundColor: tokens.colorPaletteBerryBackground2,
  },
  target: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    width: '300px',
    height: '50px',
    color: tokens.colorPaletteBlueForeground2,
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorPaletteBlueBorderActive}`,
    backgroundColor: tokens.colorPaletteBlueBackground2,
  },
  targetSmall: {
    fontSize: tokens.fontSizeBase100,
    width: '100px',
  },
  targetLarge: {
    width: '600px',
  },
});

export const UseSafeZoneAreaDefault = (props: UseSafeZoneOptions): JSXElement => {
  const classes = useClasses();

  const [debug, setDebug] = React.useState(true);
  const [includeOffset, setIncludeOffset] = React.useState(false);
  const [position, setPosition] = React.useState<NonNullable<PositioningShorthandValue>>('above');
  const [targetWidth, setTargetWidth] = React.useState<'small' | 'medium' | 'large'>('large');

  const safeZoneArea = useSafeZoneArea({
    debug: true,
    timeout: 100000,
  });
  const positioning = usePositioning({
    ...resolvePositioningShorthand(position),
    offset: includeOffset ? { mainAxis: 20 } : undefined,
    pinned: true,
  });

  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <div>
          <Field>
            <Switch checked={debug} onChange={() => setDebug(!debug)} label="Debug mode" />
          </Field>
          <Field>
            <Switch
              checked={includeOffset}
              onChange={() => setIncludeOffset(!includeOffset)}
              label="Include offset in positioning"
            />
          </Field>

          <Field label="Target width">
            <RadioGroup
              layout="horizontal-stacked"
              value={targetWidth}
              onChange={(_, data) => setTargetWidth(data.value as 'small' | 'medium' | 'large')}
            >
              <Radio value="small" label="Small" />
              <Radio value="medium" label="Medium" />
              <Radio value="large" label="Large" />
            </RadioGroup>
          </Field>
        </div>

        <div>
          <Field label="Container position">
            <RadioGroup
              layout="horizontal-stacked"
              value={position}
              onChange={(_, data) => setPosition(data.value as PositioningShorthandValue)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
              }}
            >
              <Radio value="above-start" label="above-start" />
              <Radio value="above" label="above" />
              <Radio value="above-end" label="above-end" />

              <Radio value="before-top" label="before-top" />
              <div />
              <Radio value="after-top" label="after-top" />

              <Radio value="before" label="before" />
              <div />
              <Radio value="after" label="after" />

              <Radio value="before-bottom" label="before-bottom" />
              <div />
              <Radio value="after-bottom" label="after-bottom" />

              <Radio value="below-start" label="below-start" />
              <Radio value="below" label="below" />
              <Radio value="below-end" label="below-end" />
            </RadioGroup>
          </Field>
        </div>
      </div>

      <div
        className={mergeClasses(
          classes.card,
          (position.startsWith('above') || position.endsWith('bottom')) && classes.cardAbove,
          (position.startsWith('below') || position.endsWith('top')) && classes.cardBelow,
        )}
      >
        <div
          className={mergeClasses(
            classes.target,
            targetWidth === 'small' && classes.targetSmall,
            targetWidth === 'large' && classes.targetLarge,
          )}
          ref={useMergedRefs(safeZoneArea.targetRef, positioning.targetRef)}
        >
          A target element
        </div>
      </div>

      <Portal>
        <div className={classes.container} ref={useMergedRefs(safeZoneArea.containerRef, positioning.containerRef)}>
          A container element
        </div>

        {safeZoneArea.elementToRender}
      </Portal>
    </div>
  );
};
