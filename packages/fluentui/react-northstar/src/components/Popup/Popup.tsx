import { Accessibility, popupBehavior, PopupBehaviorProps } from '@fluentui/accessibility';
import {
  AutoFocusZoneProps,
  FocusTrapZoneProps,
  useAccessibility,
  useAutoControlled,
  useTelemetry,
  useFluentContext,
  useTriggerElement,
} from '@fluentui/react-bindings';
import { EventListener } from '@fluentui/react-component-event-listener';
import { NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PopperJs from '@popperjs/core';
import { getCode, keyboardKey, SpacebarKey } from '@fluentui/keyboard-key';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  ChildrenComponentProps,
  ContentComponentProps,
  StyledComponentProps,
  commonPropTypes,
  isFromKeyboard,
  doesNodeContainClick,
  setWhatInputSource,
} from '../../utils';
import { ComponentEventHandler, FluentComponentStaticProps, ShorthandValue } from '../../types';
import { ALIGNMENTS, POSITIONS, Popper, PositioningProps, PopperChildrenProps } from '../../utils/positioner';
import { PopupContent, PopupContentProps } from './PopupContent';

import { createShorthandFactory } from '../../utils/factories';
import { createReferenceFromContextClick } from './createReferenceFromContextClick';
import { isRightClick } from '../../utils/isRightClick';
import { PortalInner } from '../Portal/PortalInner';
import { Animation } from '../Animation/Animation';

export type PopupEvents = 'click' | 'hover' | 'focus' | 'context';
export type RestrictedClickEvents = 'click' | 'focus';
export type RestrictedHoverEvents = 'hover' | 'focus' | 'context';
export type PopupEventsArray = RestrictedClickEvents[] | RestrictedHoverEvents[];

export interface PopupProps
  extends StyledComponentProps<PopupProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<PopupContentProps>>,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available dialogBehavior
   */
  accessibility?: Accessibility<PopupBehaviorProps>;

  /** Additional CSS class name(s) to apply.  */
  className?: string;

  /** Initial value for 'open'. */
  defaultOpen?: boolean;

  /** Whether the Popup should be rendered inline with the trigger or in the body. */
  inline?: boolean;

  /** Existing element the popup should be bound to. */
  mountNode?: HTMLElement;

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number;

  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray;

  /** Defines whether popup is displayed. */
  open?: boolean;

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>;

  /** A popup can show a pointer to trigger. */
  pointing?: boolean;

  /**
   * Function to render popup content.
   * @deprecated Please use `popperRef` to get an imperative handle to Popper's APIs.
   * @param updatePosition - function to request popup position update.
   */
  renderContent?: (updatePosition: Function) => ShorthandValue<PopupContentProps>;

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement;

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: React.ReactNode;

  /** Whether the trigger should be tabbable */
  tabbableTrigger?: boolean;

  /** Ref for Popup content DOM node. */
  contentRef?: React.Ref<HTMLElement>;

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: boolean | FocusTrapZoneProps;

  /** Controls whether or not auto focus should be applied, using boolean or AutoFocusZoneProps type value. */
  autoFocus?: boolean | AutoFocusZoneProps;
}

export const popupClassName = 'ui-popup';

/**
 * A Popup displays a non-modal, often rich content, on top of its target element.
 */
export const Popup: React.FC<PopupProps> &
  FluentComponentStaticProps<PopupProps> & {
    Content: typeof PopupContent;
  } = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Popup.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    align,
    autoFocus,
    inline,
    contentRef,
    flipBoundary,
    on,
    mountNode,
    mouseLeaveDelay,
    offset,
    overflowBoundary,
    pointing,
    popperRef,
    position,
    positionFixed,
    renderContent,
    tabbableTrigger,
    target,
    trapFocus,
    trigger,
    unstable_pinned,
    initialPositionFixed,
  } = props;

  const [open, setOpen] = useAutoControlled({
    initialValue: false,
    defaultValue: props.defaultOpen,
    value: props.open,
  });
  const [isOpenedByRightClick, setIsOpenedByRightClick] = React.useState(false);

  const closeTimeoutId = React.useRef<number | undefined>();

  const popupContentRef = React.useRef<HTMLElement>();
  const pointerTargetRef = React.useRef<HTMLElement>();
  const triggerRef = React.useRef<HTMLElement>();
  // focusable element which has triggered Popup, can be either triggerDomElement or the element inside it
  const triggerFocusableRef = React.useRef<HTMLElement>();
  const rightClickReferenceObject = React.useRef<PopperJs.VirtualElement | null>();

  const getA11yProps = useAccessibility(accessibility, {
    debugName: Popup.displayName,
    actionHandlers: {
      closeAndFocusTrigger: e => {
        e.preventDefault();
        close(e, () => _.invoke(triggerFocusableRef.current, 'focus'));
      },
      close: e => {
        close(e);
      },
      toggle: e => {
        e.preventDefault();
        trySetOpen(!open, e);
      },
      open: e => {
        e.preventDefault();
        setPopupOpen(true, e);
      },
      click: e => {
        _.invoke(triggerRef.current, 'click');
      },
      preventScroll: e => {
        e.preventDefault();
      },
      stopPropagation: e => {
        e.stopPropagation();
      },
    },
    mapPropsToBehavior: () => ({
      disabled: false, // definition has this prop, but `Popup` doesn't support it
      isOpenedByRightClick,
      on,
      trapFocus,
      tabbableTrigger,
      trigger: trigger as any,
    }),
    rtl: context.rtl,
  });

  const handleDocumentClick = (getRefs: Function) => (e: MouseEvent) => {
    if (isOpenedByRightClick && isOutsidePopupElement(getRefs(), e)) {
      trySetOpen(false, e);
      return;
    }

    if (isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      trySetOpen(false, e);
    }
  };

  const handleDocumentKeyDown = (getRefs: Function) => (e: KeyboardEvent) => {
    const keyCode = getCode(e);
    const isMatchingKey = keyCode === keyboardKey.Enter || keyCode === SpacebarKey;

    if (isMatchingKey && isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      trySetOpen(false, e);
    }

    // if focus was lost from Popup and moved to body, for e.g. when click on popup content
    // and ESC is pressed, the last opened Popup should get closed and the trigger should get focus
    const lastContentRef = getRefs().pop();
    const isLastOpenedPopup: boolean = lastContentRef && lastContentRef.current === popupContentRef.current;

    const activeDocument: HTMLDocument = context.target;
    const bodyHasFocus: boolean = activeDocument.activeElement === activeDocument.body;

    if (keyCode === keyboardKey.Escape && bodyHasFocus && isLastOpenedPopup) {
      close(e, () => _.invoke(triggerFocusableRef.current, 'focus'));
    }
  };

  const isOutsidePopupElementAndOutsideTriggerElement = (refs: NodeRef[], e: KeyboardEvent | MouseEvent) => {
    const isOutsidePopup = isOutsidePopupElement(refs, e);
    const isInsideTrigger =
      triggerRef.current && doesNodeContainClick(triggerRef.current, e as MouseEvent, context.target);

    return isOutsidePopup && !isInsideTrigger;
  };

  const isOutsidePopupElement = (refs: NodeRef[], e) => {
    const isInsideNested = _.some(refs, (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current as HTMLElement, e, context.target);
    });
    const isOutsidePopup = popupContentRef.current && !isInsideNested;

    return isOutsidePopup;
  };

  const getTriggerProps = triggerElement => {
    const triggerProps: any = {};
    const normalizedOn = _.isArray(on) ? on : [on];

    /**
     * The focus is adding the focus, blur and click event (always opening on click)
     * If focus and context are provided, there is no need to add onClick
     */
    if (_.includes(normalizedOn, 'focus')) {
      triggerProps.onFocus = (e, ...args) => {
        if (isFromKeyboard()) {
          trySetOpen(true, e);
        }
        _.invoke(triggerElement, 'props.onFocus', e, ...args);
      };
      triggerProps.onBlur = (e, ...args) => {
        if (shouldBlurClose(e)) {
          trySetOpen(false, e);
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args);
      };
      if (!_.includes(normalizedOn, 'context')) {
        triggerProps.onClick = (e, ...args) => {
          setPopupOpen(true, e);
          _.invoke(triggerElement, 'props.onClick', e, ...args);
        };
      }
    }

    /**
     * The click is toggling the open state of the popup
     */
    if (_.includes(normalizedOn, 'click')) {
      triggerProps.onClick = (e, ...args) => {
        trySetOpen(!open, e);
        _.invoke(triggerElement, 'props.onClick', e, ...args);
      };
    }

    /**
     * The context is opening the popup
     */
    if (_.includes(normalizedOn, 'context')) {
      triggerProps.onContextMenu = (e, ...args) => {
        setPopupOpen(!open, e);
        _.invoke(triggerElement, 'props.onContextMenu', e, ...args);
        e.preventDefault();
      };
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave, blur and click event (always opening on click)
     * If hover and context are provided, there is no need to add onClick
     */
    if (_.includes(normalizedOn, 'hover')) {
      triggerProps.onMouseEnter = (e, ...args) => {
        setPopupOpen(true, e);
        setWhatInputSource(context.target, 'mouse');
        _.invoke(triggerElement, 'props.onMouseEnter', e, ...args);
      };
      triggerProps.onMouseLeave = (e, ...args) => {
        setPopupOpen(false, e);
        _.invoke(triggerElement, 'props.onMouseLeave', e, ...args);
      };
      triggerProps.onClick = (e, ...args) => {
        setPopupOpen(true, e);
        _.invoke(triggerElement, 'props.onClick', e, ...args);
      };
      triggerProps.onBlur = (e, ...args) => {
        if (shouldBlurClose(e)) {
          trySetOpen(false, e);
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args);
      };
    }

    return triggerProps;
  };

  const getContentProps = (predefinedProps?) => {
    const contentHandlerProps: any = {};
    const normalizedOn = _.isArray(on) ? on : [on];

    /**
     * The focus is adding the focus and blur events on the content
     */
    if (_.includes(normalizedOn, 'focus')) {
      contentHandlerProps.onFocus = (e, contentProps) => {
        trySetOpen(true, e);
        predefinedProps && _.invoke(predefinedProps, 'onFocus', e, contentProps);
      };
      contentHandlerProps.onBlur = (e, contentProps) => {
        if (shouldBlurClose(e)) {
          trySetOpen(false, e);
        }
        predefinedProps && _.invoke(predefinedProps, 'onBlur', e, contentProps);
      };
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave
     */
    if (_.includes(normalizedOn, 'hover')) {
      contentHandlerProps.onMouseEnter = (e, contentProps) => {
        setPopupOpen(true, e);
        predefinedProps && _.invoke(predefinedProps, 'onMouseEnter', e, contentProps);
      };
      contentHandlerProps.onMouseLeave = (e, contentProps) => {
        setPopupOpen(false, e);
        predefinedProps && _.invoke(predefinedProps, 'onMouseLeave', e, contentProps);
      };
    }

    return contentHandlerProps;
  };

  const shouldBlurClose = e => {
    return (
      !e.currentTarget ||
      !popupContentRef.current ||
      (!e.currentTarget.contains(e.relatedTarget) && !popupContentRef.current.contains(e.relatedTarget))
    );
  };

  const renderPopperChildren = classes => ({ placement, scheduleUpdate }: PopperChildrenProps) => {
    const content = renderContent ? renderContent(scheduleUpdate) : props.content;
    const popupContent = Popup.Content.create(content || {}, {
      defaultProps: () =>
        getA11yProps('popup', {
          ...getContentProps(),
          placement,
          pointing,
          pointerRef: pointerTargetRef,
          trapFocus,
          autoFocus,
          className: classes,
        }),
      overrideProps: getContentProps,
    });

    return (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={domElement => {
                popupContentRef.current = domElement;
                handleRef(contentRef, domElement);
                nestingRef.current = domElement;
              }}
            >
              {popupContent}
            </Ref>

            <EventListener listener={handleDocumentClick(getRefs)} target={context.target} type="click" capture />
            <EventListener listener={handleDocumentClick(getRefs)} target={context.target} type="contextmenu" capture />
            <EventListener listener={handleDocumentKeyDown(getRefs)} target={context.target} type="keydown" capture />

            {isOpenedByRightClick && (
              <>
                <EventListener listener={dismissOnScroll} target={context.target} type="wheel" capture />
                <EventListener listener={dismissOnScroll} target={context.target} type="touchmove" capture />
              </>
            )}
          </>
        )}
      </Unstable_NestingAuto>
    );
  };

  const dismissOnScroll = (e: TouchEvent | WheelEvent) => {
    trySetOpen(false, e);
  };

  const trySetOpen = (
    newValue: boolean,
    event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent | MouseEvent | TouchEvent | WheelEvent,
  ) => {
    const isOpenedByRightClick = newValue && isRightClick(event as React.MouseEvent);

    // when new state 'open' === 'true', save the last focused element
    if (newValue) {
      updateTriggerFocusableRef();
      updateContextPosition(isOpenedByRightClick && (event as React.MouseEvent).nativeEvent);
    }

    setOpen(newValue);
    setIsOpenedByRightClick(isOpenedByRightClick);

    _.invoke(props, 'onOpenChange', event, { ...props, ...{ open: newValue } });
  };

  const setPopupOpen = (newOpen: boolean, e: React.KeyboardEvent) => {
    clearTimeout(closeTimeoutId.current);
    newOpen ? trySetOpen(true, e) : schedulePopupClose(e);
  };

  const schedulePopupClose = (e: React.KeyboardEvent) => {
    closeTimeoutId.current = setTimeout(() => {
      trySetOpen(false, e);
    }, mouseLeaveDelay) as any;
  };

  const close = (e, onClose?: Function) => {
    if (open) {
      trySetOpen(false, e);
      onClose && onClose();
      e.stopPropagation();
    }
  };

  /**
   * Save DOM element which had focus before Popup opens.
   * Can be either trigger DOM element itself or the element inside it.
   */
  const updateTriggerFocusableRef = () => {
    const activeDocument: HTMLDocument = context.target;
    const activeElement = activeDocument.activeElement;

    triggerFocusableRef.current =
      triggerRef.current && triggerRef.current.contains(activeElement)
        ? (activeElement as HTMLElement)
        : triggerRef.current;
  };

  const updateContextPosition = (nativeEvent: MouseEvent) => {
    rightClickReferenceObject.current = nativeEvent ? createReferenceFromContextClick(nativeEvent) : null;
  };

  if (process.env.NODE_ENV !== 'production') {
    // This is fine to violate there conditional rule as environment variables will never change during component
    // lifecycle
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (inline && trapFocus) {
        // eslint-disable-next-line no-console
        console.warn('Using "trapFocus" in inline popup leads to broken behavior for screen reader users.');
      }
      if (!inline && autoFocus) {
        // eslint-disable-next-line no-console
        console.warn(
          'Beware, "autoFocus" prop will just grab focus at the moment of mount and will not trap it. As user is able to TAB out from popup, better use "inline" prop to keep correct tab order.',
        );
      }
    }, [autoFocus, inline, trapFocus]);
  }

  React.useEffect(() => {
    if (open) {
      // when new state 'open' === 'true', save the last focused element
      updateTriggerFocusableRef();
    }
  });

  const triggerNode = useTriggerElement(props);
  const triggerProps = getTriggerProps(triggerNode);

  const contentElement = (
    <Animation mountOnEnter unmountOnExit visible={open} name={open ? 'popup-show' : 'popup-hide'}>
      {({ classes }) => (
        <Popper
          pointerTargetRef={pointerTargetRef}
          align={align}
          flipBoundary={flipBoundary}
          popperRef={popperRef}
          position={position}
          positionFixed={positionFixed}
          initialPositionFixed={initialPositionFixed}
          offset={offset}
          overflowBoundary={overflowBoundary}
          rtl={context.rtl}
          unstable_pinned={unstable_pinned}
          targetRef={rightClickReferenceObject.current || target || triggerRef}
        >
          {renderPopperChildren(classes)}
        </Popper>
      )}
    </Animation>
  );
  const triggerElement = triggerNode && (
    <Ref innerRef={triggerRef}>
      {React.cloneElement(triggerNode as React.ReactElement, getA11yProps('trigger', triggerProps))}
    </Ref>
  );

  const element = (
    <>
      {triggerElement}
      {inline ? contentElement : <PortalInner mountNode={mountNode}>{contentElement}</PortalInner>}
    </>
  );
  setEnd();

  return element;
};

Popup.displayName = 'Popup';

Popup.propTypes = {
  ...commonPropTypes.createCommon({
    as: false,
    content: false,
  }),
  align: PropTypes.oneOf(ALIGNMENTS),
  defaultOpen: PropTypes.bool,
  inline: PropTypes.bool,
  mountNode: customPropTypes.domNode,
  mouseLeaveDelay: PropTypes.number,
  offset: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.arrayOf(PropTypes.number) as PropTypes.Requireable<[number, number]>,
  ]),
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
  on: PropTypes.oneOfType([
    PropTypes.oneOf(['hover', 'click', 'focus', 'context']),
    PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus', 'context'])),
    PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'context'])),
  ]) as any,
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  pointing: PropTypes.bool,
  position: PropTypes.oneOf(POSITIONS),
  positionFixed: PropTypes.bool,
  renderContent: PropTypes.func,
  target: PropTypes.any,
  trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
  tabbableTrigger: PropTypes.bool,
  unstable_pinned: PropTypes.bool,
  content: customPropTypes.shorthandAllowingChildren,
  contentRef: customPropTypes.ref,
  trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  autoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};
Popup.defaultProps = {
  accessibility: popupBehavior,
  align: 'start',
  position: 'above',
  on: 'click',
  mouseLeaveDelay: 500,
  tabbableTrigger: true,
};
Popup.handledProps = Object.keys(Popup.propTypes) as any;

Popup.Content = PopupContent;

Popup.create = createShorthandFactory({ Component: Popup, mappedProp: 'content' });
Popup.shorthandConfig = {
  mappedProp: 'content',
};
