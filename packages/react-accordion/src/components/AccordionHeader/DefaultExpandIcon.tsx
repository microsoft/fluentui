import * as React from 'react';
import { useAccordionHeaderContext } from './useAccordionHeaderContext';
import { AccordionHeaderContextValue } from './AccordionHeader.types';

export const DefaultExpandIcon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ children, ...rest }, ref) => {
    const { open, expandIconPosition } = useAccordionHeaderContext();
    return (
      <span {...rest} ref={ref}>
        {children ?? (
          <svg
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 2048 2048"
            transform={`rotate(${mapStateToRotation({ open, expandIconPosition })})`}
          >
            <path d="M515 1955l930-931L515 93l90-90 1022 1021L605 2045l-90-90z" />
          </svg>
        )}
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
