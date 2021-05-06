import * as React from 'react';
import * as _ from 'lodash';
import { Dropdown, Grid, Alignment, Position } from '@fluentui/react-northstar';
import { useSelectKnob, useBooleanKnob } from '@fluentui/docs-components';

const inputItems = ['Robert Tolbert', 'Wanda Howard', 'Tim Deboer'];

const DropdownExamplePosition = () => {
  const [open] = useBooleanKnob({ name: 'open', initialValue: true });
  const [unstable_pinned] = useBooleanKnob({ name: 'unstable_pinned', initialValue: false });

  const [positionAndAlign] = useSelectKnob({
    name: 'position-align',
    initialValue: 'below',
    values: positionAndAlignValues,
  });

  const [position, align] = _.split(positionAndAlign, '-') as [Position, Alignment];

  return (
    <Grid columns={1} variables={{ padding: '140px 0' }} styles={{ justifyItems: 'center' }}>
      <Dropdown
        open={open}
        items={inputItems}
        placeholder={`Opens ${position} trigger${align ? ` aligned to ${align}` : ''}.`}
        align={align}
        position={position}
        unstable_pinned={unstable_pinned}
      />
    </Grid>
  );
};

export default DropdownExamplePosition;

const positionAndAlignValues = ['above', 'below', 'before-top', 'before-bottom', 'after-top', 'after-bottom'];
