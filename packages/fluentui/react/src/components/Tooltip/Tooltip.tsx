import { Accessibility, tooltipAsLabelBehavior } from '@fluentui/accessibility';
import { ReactAccessibilityBehavior } from '@fluentui/react-bindings';
import { Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import {
  applyAccessibilityKeyHandlers,
  childrenExist,
  AutoControlledComponent,
  RenderResultConfig,
  ChildrenComponentProps,
  ContentComponentProps,
  StyledComponentProps,
  commonPropTypes,
  isFromKeyboard,
  setWhatInputSource,
  getOrGenerateIdFromShorthand,
  createShorthandFactory,
  ShorthandFactory
} from '../../utils';
import { ShorthandValue, Props } from '../../types';
import { ALIGNMENTS, POSITIONS, Popper, BasicPositioningProps, PopperChildrenProps } from '../../utils/positioner';
import TooltipContent, { TooltipContentProps } from './TooltipContent';
import PortalInner from '../Portal/PortalInner';

export interface TooltipSlotClassNames {
  content: string;
}

export interface TooltipState {
  open: boolean;
  contentId: string;
}

export interface TooltipProps
  extends StyledComponentProps<TooltipProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<TooltipContentProps>>,
    BasicPositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @default tooltipBehavior
   * @available tooltipAsLabelBehavior
   * */
  accessibility?: Accessibility;

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

  /**
   * TODO: should this be centralized?
   * Offset value to apply to rendered component. Accepts the following units:
   * - px or unit-less, interpreted as pixels
   * - %, percentage relative to the length of the trigger element
   * - %p, percentage relative to the length of the component element
   * - vw, CSS viewport width unit
   * - vh, CSS viewport height unit
   */
  offset?: string;

  /** A tooltip can show a pointer to trigger. */
  pointing?: boolean;

  /**
   * DOM element that should be used as tooltip's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement;

  /** Element to be rendered in-place where the tooltip is defined. */
  trigger?: JSX.Element;
}

/**
 * A Tooltip displays additional non-modal information on top of its target element.
 * Tooltip doesn't receive focus and cannot contain focusable elements.
 *
 * @accessibility
 * Implements [ARIA Tooltip](https://www.w3.org/TR/wai-aria-practices-1.1/#tooltip) design pattern.
 */
export default class Tooltip extends AutoControlledComponent<TooltipProps, TooltipState> {
  static displayName = 'Tooltip';

  static className = 'ui-tooltip';

  static slotClassNames: TooltipSlotClassNames = {
    content: `${Tooltip.className}__content`
  };

  static Content = TooltipContent;

  static propTypes = {
    ...commonPropTypes.createCommon({
      as: false,
      content: false
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    inline: PropTypes.bool,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.string,
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    target: customPropTypes.domNode,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.element]),
    content: customPropTypes.shorthandAllowingChildren
  };

  static defaultProps: TooltipProps = {
    align: 'center',
    position: 'above',
    mouseLeaveDelay: 10,
    pointing: true,
    accessibility: tooltipAsLabelBehavior
  };

  static autoControlledProps = ['open'];

  static create: ShorthandFactory<TooltipProps>;

  contentRef = React.createRef<HTMLElement>();
  pointerTargetRef = React.createRef<HTMLDivElement>();
  triggerRef = React.createRef<HTMLElement>();
  closeTimeoutId;

  actionHandlers = {
    close: e => {
      this.setTooltipOpen(false, e);
      e.stopPropagation();
      e.preventDefault();
    }
  };

  getInitialAutoControlledState(): Partial<TooltipState> {
    return { open: false };
  }

  static getAutoControlledStateFromProps(props: TooltipProps, state: TooltipState): Partial<TooltipState> {
    return {
      contentId: getOrGenerateIdFromShorthand('tooltip-content-', props.content, state.contentId)
    };
  }

  renderComponent({ classes, rtl, accessibility }: RenderResultConfig<TooltipProps>): React.ReactNode {
    const { mountNode, children, trigger } = this.props;
    const tooltipContent = this.renderTooltipContent(classes.content, rtl, accessibility);

    const triggerNode = childrenExist(children) ? children : trigger;
    const triggerElement = triggerNode && (React.Children.only(triggerNode) as React.ReactElement);
    const triggerProps = this.getTriggerProps(triggerElement);

    return (
      <>
        {triggerElement && (
          <Ref innerRef={this.triggerRef}>
            {React.cloneElement(triggerElement, {
              ...accessibility.attributes.trigger,
              ...triggerProps,
              ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.trigger, triggerProps)
            })}
          </Ref>
        )}
        <PortalInner mountNode={mountNode}>{tooltipContent}</PortalInner>
      </>
    );
  }

  getTriggerProps(triggerElement) {
    const triggerProps: Props = {};

    triggerProps.onFocus = (e, ...args) => {
      if (isFromKeyboard()) {
        this.trySetOpen(true, e);
      }
      _.invoke(triggerElement, 'props.onFocus', e, ...args);
    };
    triggerProps.onBlur = (e, ...args) => {
      if (!this.shouldStayOpen(e)) {
        this.trySetOpen(false, e);
      }
      _.invoke(triggerElement, 'props.onBlur', e, ...args);
    };

    triggerProps.onMouseEnter = (e, ...args) => {
      this.setTooltipOpen(true, e);
      setWhatInputSource('mouse');
      _.invoke(triggerElement, 'props.onMouseEnter', e, ...args);
    };
    triggerProps.onMouseLeave = (e, ...args) => {
      this.setTooltipOpen(false, e);
      _.invoke(triggerElement, 'props.onMouseLeave', e, ...args);
    };

    return triggerProps;
  }

  getContentProps = (predefinedProps?) => {
    const contentHandlerProps: Props = {};

    contentHandlerProps.onMouseEnter = (e, contentProps) => {
      this.setTooltipOpen(true, e);
      _.invoke(predefinedProps, 'onMouseEnter', e, contentProps);
    };
    contentHandlerProps.onMouseLeave = (e, contentProps) => {
      this.setTooltipOpen(false, e);
      _.invoke(predefinedProps, 'onMouseLeave', e, contentProps);
    };

    return contentHandlerProps;
  };

  shouldStayOpen = e =>
    _.invoke(e, 'currentTarget.contains', e.relatedTarget) || _.invoke(this.contentRef.current, 'contains', e.relatedTarget);

  renderTooltipContent(tooltipPositionClasses: string, rtl: boolean, accessibility: ReactAccessibilityBehavior): JSX.Element {
    const { align, position, target, offset } = this.props;
    const { open } = this.state;

    return (
      <Popper
        pointerTargetRef={this.pointerTargetRef}
        align={align}
        offset={offset}
        position={position}
        enabled={open}
        rtl={rtl}
        targetRef={target || this.triggerRef}
        children={this.renderPopperChildren.bind(this, tooltipPositionClasses, rtl, accessibility)}
      />
    );
  }

  renderPopperChildren = (
    tooltipPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
    { placement }: PopperChildrenProps
  ) => {
    const { content, pointing } = this.props;

    const tooltipContentAttributes = {
      ...(rtl && { dir: 'rtl' }),
      ...accessibility.attributes.tooltip,
      ...accessibility.keyHandlers.tooltip,
      className: tooltipPositionClasses,
      ...this.getContentProps()
    };

    const tooltipContent = Tooltip.Content.create(content, {
      defaultProps: () => ({
        ...tooltipContentAttributes,
        open: this.state.open,
        placement,
        pointing,
        pointerRef: this.pointerTargetRef
      }),
      generateKey: false,
      overrideProps: this.getContentProps
    });

    if (!tooltipContent) return null;

    return <Ref innerRef={this.contentRef}>{tooltipContent}</Ref>;
  };

  trySetOpen(newValue: boolean, eventArgs: any) {
    this.setState({ open: newValue });
    _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } });
  }

  setTooltipOpen(newOpen, e) {
    clearTimeout(this.closeTimeoutId);
    newOpen ? this.trySetOpen(true, e) : this.scheduleTooltipClose(e);
  }

  scheduleTooltipClose = e => {
    const { mouseLeaveDelay } = this.props;

    this.closeTimeoutId = setTimeout(() => {
      this.trySetOpen(false, e);
    }, mouseLeaveDelay);
  };

  close = (e, onClose?: Function) => {
    if (this.state.open) {
      this.trySetOpen(false, e);
      onClose && onClose();
      e.stopPropagation();
    }
  };
}

Tooltip.create = createShorthandFactory({ Component: Tooltip, mappedProp: 'content' });
