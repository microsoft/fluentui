import { useBooleanKnob, useNumberKnob, useSelectKnob } from '@fluentui/docs-components';
import { CalendarIcon, SvgIconSizeValue } from '@fluentui/react-icons-northstar';
import * as React from 'react';

const SvgPlayground: React.FunctionComponent = () => {
  const [bordered] = useBooleanKnob({ name: 'bordered' });
  const [circular] = useBooleanKnob({ name: 'circular' });
  const [outline] = useBooleanKnob({ name: 'outline' });
  const [disabled] = useBooleanKnob({ name: 'disabled' });
  const [rotate] = useNumberKnob({ name: 'rotate' });
  const [size] = useSelectKnob<SvgIconSizeValue>({
    name: 'size',
    initialValue: 'medium',
    values: ['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest'],
  });

  return (
    <CalendarIcon
      bordered={bordered}
      circular={circular}
      outline={outline}
      rotate={rotate}
      disabled={disabled}
      size={size}
    />
  );
};

export default SvgPlayground;
