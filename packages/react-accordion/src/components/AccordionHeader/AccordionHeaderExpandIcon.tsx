import * as React from 'react';
import { useAccordionHeaderContext } from './AccordionHeaderContext';
import type { AccordionHeaderContextValue } from './AccordionHeader.types';
import type { ForwardRefComponent, IntrinsicShorthandProps } from '@fluentui/react-utilities';
import { ChevronRightRegular } from '@fluentui/react-icons';

export type AccordionHeaderExpandIconProps = IntrinsicShorthandProps<'span'>;

export const AccordionHeaderExpandIcon: ForwardRefComponent<AccordionHeaderExpandIconProps> = React.forwardRef(
  ({ children, ...rest }, ref) => {
    const { open, expandIconPosition } = useAccordionHeaderContext();
    return (
      <span {...rest} ref={ref}>
        {children ?? <ChevronRightRegular transform={`rotate(${mapStateToRotation({ open, expandIconPosition })})`} />}
      </span>
    );
  },
);

function mapStateToRotation({
  open,
  expandIconPosition,
}: Pick<AccordionHeaderContextValue, 'open' | 'expandIconPosition'>) {
  if (open && expandIconPosition === 'end') {
    return '-90';
  }
  if ((!open && expandIconPosition === 'end') || (open && expandIconPosition === 'start')) {
    return '90';
  }
  return '0';
}
