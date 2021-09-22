import { Accessibility, tooltipAsLabelBehavior, TooltipBehaviorProps } from '@fluentui/accessibility';
import {
  useAccessibility,
  useAutoControlled,
  useTelemetry,
  useFluentContext,
  useTriggerElement,
  useUnhandledProps,
  useOnIFrameFocus,
} from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  ChildrenComponentProps,
  ContentComponentProps,
  StyledComponentProps,
  commonPropTypes,
  isFromKeyboard,
  setWhatInputSource,
  getOrGenerateIdFromShorthand,
  createShorthandFactory,
} from '../../utils';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  PositioningProps,
  PopperChildrenProps,
  Alignment,
  Position,
  AutoSize,
  AUTOSIZES,
} from '../../utils/positioner';
import { PortalInner } from '../Portal/PortalInner';
import { TooltipContent, TooltipContentProps } from './TooltipContent';

export interface TooltipProps
  extends StyledComponentProps<TooltipProps>,
    ChildrenComponentProps<React.ReactElement>,
    ContentComponentProps<ShorthandValue<TooltipContentProps>>,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tooltipBehavior
   * @available tooltipAsLabelBehavior
   * */
  accessibility?: Accessibility<TooltipBehaviorProps>;

  /** Additional CSS class name(s) to apply.  */
  className?: string;

  /** Initial value for 'open'. */
  defaultOpen?: boolean;

  /** Existing element the tooltip should be bound to. */
  mountNode?: HTMLElement;

  /** Delay in ms for the mouse leave event, before the tooltip will be closed. */
  mouseLeaveDelay?: number;

  /** Defines whether tooltip is displayed. */
  open?: boolean;

  /** Defines wether tooltip is subtle  */
  subtle?: boolean;

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: (e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent, data: TooltipProps) => void;

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean;

  /**
   * DOM element that should be used as tooltip's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement;

  /** Element to be rendered in-place where the tooltip is defined. */
  trigger?: JSX.Element;

  /* Tooltip can close when mouse hover content */
  dismissOnContentMouseEnter?: boolean;

  /** Delay in ms for the mouse enter event, before the tooltip will be open. */
  mouseEnterDelay?: number;
}

export const tooltipClassName = 'ui-tooltip';

/**
 * A Tooltip displays additional non-modal information on top of its target element.
 * Tooltip doesn't receive focus and cannot contain focusable elements.
 *
 * @accessibility
 * Implements [ARIA Tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern.
 */
export const Tooltip: React.FC<TooltipProps> &
  FluentComponentStaticProps<TooltipProps> & {
    Content: typeof TooltipContent;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Tooltip.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    align,
    content,
    flipBoundary,
    mountNode,
    mouseLeaveDelay,
    offset,
    overflowBoundary,
    pointing,
    popperRef,
    position,
    positionFixed,
    target,
    trigger,
    unstable_disableTether,
    unstable_pinned,
    autoSize,
    subtle,
    dismissOnContentMouseEnter,
    mouseEnterDelay,
  } = props;

  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,
    initialValue: false,
  });

  const triggerElement = useTriggerElement(props);

  const unhandledProps = useUnhandledProps(Tooltip.handledProps, props);

  useOnIFrameFocus(open, context.target, (e: Event) => {
    setOpen(__ => {
      _.invoke(props, 'onOpenChange', e, { ...props, ...{ open: false } });
      return false;
    });
  });

  const contentRef = React.useRef<HTMLElement>();
  const pointerTargetRef = React.useRef<HTMLDivElement>();
  const triggerRef = React.useRef<HTMLElement>();

  const closeTimeoutId = React.useRef<number>();
  const openTimeoutId = React.useRef<number>();
  // TODO: Consider `getOrGenerateIdFromShorthand()` as hook and make it SSR safe
  const contentId = React.useRef<string>();
  contentId.current = getOrGenerateIdFromShorthand('tooltip-content-', content, contentId.current);

  const getA11Props = useAccessibility(accessibility, {
    actionHandlers: {
      close: e => {
        setTooltipOpen(false, e);
        e.stopPropagation();
        e.preventDefault();
      },
    },
    mapPropsToBehavior: () => ({
      'aria-describedby': props['aria-describedby'],
      'aria-label': props['aria-label'],
      'aria-labelledby': props['aria-labelledby'],
      contentId: contentId.current,
      triggerAriaLabel: trigger && trigger.props['aria-label'],
      open,
    }),
  });

  const getContentOverrideProps = (
    predefinedProps: TooltipContentProps,
  ): TooltipContentProps & Pick<React.DOMAttributes<HTMLDivElement>, 'onMouseEnter' | 'onMouseLeave'> => ({
    onMouseEnter: (e: React.MouseEvent) => {
      if (!dismissOnContentMouseEnter) {
        setTooltipOpen(true, e);
      }
      _.invoke(predefinedProps, 'onMouseEnter', e);
    },
    onMouseLeave: (e: React.MouseEvent) => {
      setTooltipOpen(false, e);
      _.invoke(predefinedProps, 'onMouseLeave', e);
    },
  });

  const renderPopperChildren = (popperProps: PopperChildrenProps) => {
    const tooltipContent = TooltipContent.create(content, {
      defaultProps: () =>
        getA11Props('tooltip', {
          open,
          placement: popperProps.placement,
          pointing,
          pointerRef: pointerTargetRef,
          subtle,
        }),
      generateKey: false,
      overrideProps: getContentOverrideProps,
    });

    return tooltipContent ? <Ref innerRef={contentRef}>{tooltipContent}</Ref> : null;
  };

  const shouldStayOpen = (e: React.FocusEvent) =>
    _.invoke(e, 'currentTarget.contains', e.relatedTarget) || _.invoke(contentRef.current, 'contains', e.relatedTarget);

  const trySetOpen = (newValue: boolean, e: React.MouseEvent | React.FocusEvent | React.KeyboardEvent) => {
    setOpen(newValue);
    _.invoke(props, 'onOpenChange', e, { ...props, ...{ open: newValue } });
  };

  const setTooltipOpen = (newOpen: boolean, e: React.MouseEvent | React.KeyboardEvent) => {
    context.target.defaultView.clearTimeout(closeTimeoutId.current);
    context.target.defaultView.clearTimeout(openTimeoutId.current);

    if (newOpen) {
      if (mouseEnterDelay !== 0) {
        openTimeoutId.current = context.target.defaultView.setTimeout(() => {
          trySetOpen(true, e);
        }, mouseEnterDelay);
      } else {
        trySetOpen(true, e);
      }
    } else {
      closeTimeoutId.current = context.target.defaultView.setTimeout(() => {
        trySetOpen(false, e);
      }, mouseLeaveDelay);
    }
  };

  const triggerProps: React.HTMLAttributes<HTMLElement> = {
    onFocus: (e, ...args) => {
      if (isFromKeyboard()) {
        trySetOpen(true, e);
      }
      _.invoke(triggerElement, 'props.onFocus', e, ...args);
    },
    onBlur: (e, ...args) => {
      if (!shouldStayOpen(e)) {
        trySetOpen(false, e);
      }
      _.invoke(triggerElement, 'props.onBlur', e, ...args);
    },
    onMouseEnter: (e, ...args) => {
      setTooltipOpen(true, e);
      setWhatInputSource(context.target, 'mouse');
      _.invoke(triggerElement, 'props.onMouseEnter', e, ...args);
    },
    onMouseLeave: (e, ...args) => {
      setTooltipOpen(false, e);
      _.invoke(triggerElement, 'props.onMouseLeave', e, ...args);
    },
  };

  const element = (
    <>
      {triggerElement && (
        <Ref innerRef={triggerRef}>
          {React.cloneElement(
            triggerElement,
            getA11Props('trigger', { ...unhandledProps, ...triggerElement.props, ...triggerProps }),
          )}
        </Ref>
      )}
      <PortalInner mountNode={mountNode}>
        <Popper
          align={align}
          flipBoundary={flipBoundary}
          offset={offset}
          overflowBoundary={overflowBoundary}
          pointerTargetRef={pointerTargetRef}
          popperRef={popperRef}
          position={position}
          positionFixed={positionFixed}
          enabled={open}
          rtl={context.rtl}
          targetRef={target || triggerRef}
          children={renderPopperChildren}
          unstable_disableTether={unstable_disableTether}
          autoSize={autoSize}
          unstable_pinned={unstable_pinned}
        />
      </PortalInner>
    </>
  );
  setEnd();

  return element;
};

Tooltip.displayName = 'Tooltip';

Tooltip.defaultProps = {
  align: 'center',
  position: 'above',
  mouseLeaveDelay: 10,
  mouseEnterDelay: 0,
  subtle: true,
  accessibility: tooltipAsLabelBehavior,
  offset: [4, 4],
};
Tooltip.propTypes = {
  ...commonPropTypes.createCommon({
    as: false,
    content: false,
  }),
  dismissOnContentMouseEnter: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  align: PropTypes.oneOf<Alignment>(ALIGNMENTS),
  subtle: PropTypes.bool,
  children: PropTypes.element,
  defaultOpen: PropTypes.bool,
  mountNode: customPropTypes.domNode,
  mouseLeaveDelay: PropTypes.number,
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
  ]),
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  pointing: PropTypes.bool,
  position: PropTypes.oneOf<Position>(POSITIONS),
  positionFixed: PropTypes.bool,
  target: customPropTypes.domNode,
  trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.element]),
  content: customPropTypes.shorthandAllowingChildren,
  unstable_disableTether: PropTypes.oneOf([true, false, 'all']),
  unstable_pinned: PropTypes.bool,
  autoSize: PropTypes.oneOf<AutoSize>(AUTOSIZES),
  popperRef: customPropTypes.ref,
  flipBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
  overflowBoundary: PropTypes.oneOfType([
    PropTypes.object as PropTypes.Requireable<HTMLElement>,
    PropTypes.arrayOf(PropTypes.object) as PropTypes.Requireable<HTMLElement[]>,
    PropTypes.oneOf<'clippingParents' | 'window' | 'scrollParent'>(['clippingParents', 'window', 'scrollParent']),
  ]),
};
Tooltip.handledProps = Object.keys(Tooltip.propTypes) as any;

Tooltip.Content = TooltipContent;

Tooltip.create = createShorthandFactory({ Component: Tooltip, mappedProp: 'content' });
