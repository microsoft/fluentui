import {
  Field,
  Portal,
  Radio,
  RadioGroup,
  Switch,
  type PositioningShorthandValue,
  resolvePositioningShorthand,
  useMergedRefs,
  usePositioning,
  useSafeZoneArea,
  type UseSafeZoneOptions,
} from '@fluentui/react-components';
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import styles from './UseSafeZoneAreaDefault.module.css';

const useClasses = () => styles;

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
        className={[
          classes.card,
          (position.startsWith('above') || position.endsWith('bottom')) && classes.cardAbove,
          (position.startsWith('below') || position.endsWith('top')) && classes.cardBelow,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div
          className={[
            classes.target,
            targetWidth === 'small' && classes.targetSmall,
            targetWidth === 'large' && classes.targetLarge,
          ]
            .filter(Boolean)
            .join(' ')}
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
