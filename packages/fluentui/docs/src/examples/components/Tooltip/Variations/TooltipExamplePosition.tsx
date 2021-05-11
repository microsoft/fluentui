import * as React from 'react';
import * as _ from 'lodash';
import { Button, Grid, Tooltip, Alignment, Position } from '@fluentui/react-northstar';
import { useSelectKnob } from '@fluentui/docs-components';
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@fluentui/react-icons-northstar';

const TooltipExamplePosition = () => {
  const [positionAndAlign] = useSelectKnob({
    name: 'position-align',
    initialValue: 'above-start',
    values: positionAndAlignValues,
  });

  const [position, align] = _.split(positionAndAlign, '-') as [Position, Alignment];
  const buttonStyles = { padding: paddings[positionAndAlign], height: '38px', minWidth: '64px' };

  return (
    <Grid columns="1" variables={{ padding: '100px 0' }} styles={{ justifyItems: 'center' }}>
      <Tooltip
        open
        align={align}
        position={position}
        content={`The tooltip is rendered ${position} the trigger, aligned to the ${align}.`}
      >
        <Button icon={icons[position]} styles={buttonStyles} />
      </Tooltip>
    </Grid>
  );
};

export default TooltipExamplePosition;

const positionAndAlignValues = [
  'above-start',
  'above-center',
  'above-end',
  'below-start',
  'below-center',
  'below-end',
  'before-top',
  'before-center',
  'before-bottom',
  'after-top',
  'after-center',
  'after-bottom',
];

const icons: Record<Position, React.ReactNode> = {
  above: <ArrowUpIcon circular bordered />,
  below: <ArrowDownIcon circular bordered />,
  before: <ArrowLeftIcon circular bordered />,
  after: <ArrowRightIcon circular bordered />,
};

const paddings: Record<string, React.CSSProperties['padding']> = {
  'above-start': '5px 42px 18px 5px',
  'above-center': '5px 5px 18px 5px',
  'above-end': '5px 5px 18px 42px',
  'below-start': '18px 42px 5px 5px',
  'below-center': '18px 5px 5px 5px',
  'below-end': '18px 5px 5px 42px',
  'before-top': '5px 42px 18px 5px',
  'before-center': '5px 42px 5px 5px',
  'before-bottom': '18px 42px 5px 5px',
  'after-top': '5px 5px 18px 42px',
  'after-center': '5px 5px 5px 42px',
  'after-bottom': '18px 5px 5px 42px',
};
