import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Field,
  makeStyles,
  Slider,
  Switch,
  tokens,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    padding: '12px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
  },
});

export const MotionCustom = (): JSXElement => {
  const classes = useStyles();
  const [duration, setDuration] = React.useState(300);
  const [animateOpacity, setAnimateOpacity] = React.useState(true);

  return (
    <>
      <div className={classes.controls}>
        <Field label={`Duration: ${duration}ms`}>
          <Slider min={100} max={2000} step={50} value={duration} onChange={(_, data) => setDuration(data.value)} />
        </Field>
        <Switch
          label="Animate opacity"
          checked={animateOpacity}
          onChange={(_, data) => setAnimateOpacity(data.checked)}
        />
      </div>

      <Accordion collapsible>
        <AccordionItem value="1">
          <AccordionHeader>Accordion Header 1</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, animateOpacity }}>
            <div>Accordion Panel 1</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionHeader>Accordion Header 2</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, animateOpacity }}>
            <div>Accordion Panel 2</div>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionHeader>Accordion Header 3</AccordionHeader>
          <AccordionPanel collapseMotion={{ duration, animateOpacity }}>
            <div>Accordion Panel 3</div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

MotionCustom.parameters = {
  docs: {
    description: {
      story:
        'The `collapseMotion` slot on `AccordionPanel` is typed with `CollapseParams`, so motion ' +
        'parameters like `duration` and `animateOpacity` can be passed directly as props — ' +
        'no `children` render function needed.',
    },
  },
};
