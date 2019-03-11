/** @jsx withSlots */
import { withSlots, getSlots } from '../../Foundation';
import { Text } from '../../Text';

import { IMicrofeedbackComponent, IMicrofeedbackProps, IMicrofeedbackSlots } from './Microfeedback.types';

export const MicrofeedbackView: IMicrofeedbackComponent['view'] = props => {
  const Slots = getSlots<IMicrofeedbackProps, IMicrofeedbackSlots>(props, {
    root: 'div',
    text: Text
  });

  return (
    <Slots.root>
      <Slots.text />
      <span>Status: {props.status}</span>
    </Slots.root>
  );
};
