import * as React from 'react';
import { AccordionHeaderExpandIconProps } from './AccordionHeader.types';

const ChevronRightIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 2048 2048" ref={ref} {...props}>
    <path d="M515 1955l930-931L515 93l90-90 1022 1021L605 2045l-90-90z" />
  </svg>
));

ChevronRightIcon.displayName = 'ChevronRightIcon';

const ChevronDownIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 2048 2048" ref={ref} {...props}>
    <path d="M1939 467l90 90-1005 1005L19 557l90-90 915 915 915-915z" />
  </svg>
));

ChevronDownIcon.displayName = 'ChevronDownIcon';

const ChevronUpIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 2048 2048" ref={ref} {...props}>
    <path d="M1955 1533l-931-930-931 930-90-90L1024 421l1021 1022-90 90z" />
  </svg>
));

ChevronUpIcon.displayName = 'ChevronUpIcon';

export const DefaultExpandIcon = React.forwardRef<HTMLSpanElement, AccordionHeaderExpandIconProps>(
  ({ open, expandIconPosition, children, ...rest }, ref) => (
    <span {...rest} ref={ref}>
      {children ?? React.useMemo(() => mapStateToIcon({ open, expandIconPosition }), [open, expandIconPosition])}
    </span>
  ),
);

function mapStateToIcon({
  open,
  expandIconPosition,
}: Pick<AccordionHeaderExpandIconProps, 'open' | 'expandIconPosition'>) {
  switch (`${open}-${expandIconPosition}`) {
    case 'false-start':
      return <ChevronRightIcon />;
    case 'true-end':
      return <ChevronUpIcon />;
    case 'true-start':
    case 'false-end':
      return <ChevronDownIcon />;
    default:
      return null;
  }
}
