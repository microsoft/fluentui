import { Accessibility } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import type { BasePlacement as PopperJsBasePlacement, Placement as PopperJsPlacement } from '@popperjs/core';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';

import { getBasePlacement, PopperChildrenProps } from '../../utils/positioner';
import { FluentComponentStaticProps } from '../../types';

export interface TooltipContentProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** An actual placement value from Popper. */
  placement?: PopperChildrenProps['placement'];

  /** Defines whether tooltip is displayed. */
  open?: boolean;

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean;

  /** A ref to a pointer element. */
  pointerRef?: React.Ref<HTMLDivElement>;

  /** Defines wether tooltip is subtle  */
  subtle?: boolean;
}

export type TooltipContentStylesProps = Required<Pick<TooltipContentProps, 'pointing' | 'open' | 'subtle'>> & {
  basePlacement: PopperJsBasePlacement;
};

export const tooltipContentClassName = 'ui-tooltip__content';

/**
 * A TooltipContent contains the content of a Tooltip component.
 */
export const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(TooltipContent.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    children,
    className,
    content,
    design,
    open,
    placement,
    pointing,
    pointerRef,
    styles,
    variables,
    subtle,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: TooltipContent.displayName,
    rtl: context.rtl,
  });
  const { classes } = useStyles<TooltipContentStylesProps>(TooltipContent.displayName, {
    className: tooltipContentClassName,
    mapPropsToStyles: () => ({
      basePlacement: getBasePlacement(placement, context.rtl),
      open,
      pointing,
      subtle,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(TooltipContent.handledProps, props);

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {open && pointing && <div className={classes.pointer} ref={pointerRef} />}

      <div {...getA11Props('content', { className: classes.content })}>
        {childrenExist(children) ? children : content}
      </div>
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, TooltipContentProps> &
  FluentComponentStaticProps<TooltipContentProps>;

TooltipContent.displayName = 'TooltipContent';

TooltipContent.propTypes = {
  ...commonPropTypes.createCommon(),
  placement: PropTypes.oneOf<PopperJsPlacement>([
    'auto-start',
    'auto',
    'auto-end',
    'top-start',
    'top',
    'top-end',
    'right-start',
    'right',
    'right-end',
    'bottom-end',
    'bottom',
    'bottom-start',
    'left-end',
    'left',
    'left-start',
  ]),
  pointing: PropTypes.bool,
  pointerRef: customPropTypes.ref,
  subtle: PropTypes.bool,
};
TooltipContent.handledProps = Object.keys(TooltipContent.propTypes) as any;

TooltipContent.create = createShorthandFactory({ Component: TooltipContent, mappedProp: 'content' });
