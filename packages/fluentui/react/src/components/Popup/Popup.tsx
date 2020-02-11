import { Accessibility, popupBehavior } from '@fluentui/accessibility'
import {
  ReactAccessibilityBehavior,
  AutoFocusZoneProps,
  FocusTrapZoneProps,
} from '@fluentui/react-bindings'
import { EventListener } from '@fluentui/react-component-event-listener'
import { NodeRef, Unstable_NestingAuto } from '@fluentui/react-component-nesting-registry'
import { handleRef, Ref } from '@fluentui/react-component-ref'
import * as customPropTypes from '@fluentui/react-proptypes'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import * as keyboardKey from 'keyboard-key'
import * as _ from 'lodash'

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
  doesNodeContainClick,
  setWhatInputSource,
} from '../../utils'
import { ComponentEventHandler, ShorthandValue } from '../../types'
import {
  ALIGNMENTS,
  POSITIONS,
  Popper,
  PositioningProps,
  PopperChildrenProps,
} from '../../utils/positioner'
import PopupContent, { PopupContentProps } from './PopupContent'

import { createShorthandFactory, ShorthandFactory } from '../../utils/factories'
import createReferenceFromContextClick from './createReferenceFromContextClick'
import isRightClick from '../../utils/isRightClick'
import PortalInner from '../Portal/PortalInner'

export type PopupEvents = 'click' | 'hover' | 'focus' | 'context'
export type RestrictedClickEvents = 'click' | 'focus'
export type RestrictedHoverEvents = 'hover' | 'focus' | 'context'
export type PopupEventsArray = RestrictedClickEvents[] | RestrictedHoverEvents[]

export interface PopupSlotClassNames {
  content: string
}

export interface PopupProps
  extends StyledComponentProps<PopupProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<PopupContentProps>>,
    PositioningProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available dialogBehavior
   */
  accessibility?: Accessibility

  /** Additional CSS class name(s) to apply.  */
  className?: string

  /** Initial value for 'open'. */
  defaultOpen?: boolean

  /** Whether the Popup should be rendered inline with the trigger or in the body. */
  inline?: boolean

  /** Existing element the popup should be bound to. */
  mountNode?: HTMLElement

  /** Delay in ms for the mouse leave event, before the popup will be closed. */
  mouseLeaveDelay?: number

  /** Events triggering the popup. */
  on?: PopupEvents | PopupEventsArray

  /** Defines whether popup is displayed. */
  open?: boolean

  /**
   * Event for request to change 'open' value.
   * @param event - React's original SyntheticEvent.
   * @param data - All props and proposed value.
   */
  onOpenChange?: ComponentEventHandler<PopupProps>

  /** A popup can show a pointer to trigger. */
  pointing?: boolean

  /**
   * Function to render popup content.
   * @param updatePosition - function to request popup position update.
   */
  renderContent?: (updatePosition: Function) => ShorthandValue<PopupContentProps>

  /**
   * DOM element that should be used as popup's target - instead of 'trigger' element that is used by default.
   */
  target?: HTMLElement

  /** Element to be rendered in-place where the popup is defined. */
  trigger?: JSX.Element

  /** Whether the trigger should be tabbable */
  tabbableTrigger?: boolean

  /** Ref for Popup content DOM node. */
  contentRef?: React.Ref<HTMLElement>

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value. */
  trapFocus?: boolean | FocusTrapZoneProps

  /** Controls whether or not auto focus should be applied, using boolean or AutoFocusZoneProps type value. */
  autoFocus?: boolean | AutoFocusZoneProps
}

export interface PopupState {
  open: boolean
  isOpenedByRightClick: boolean
}

/**
 * A Popup displays a non-modal, often rich content, on top of its target element.
 */
export default class Popup extends AutoControlledComponent<PopupProps, PopupState> {
  static displayName = 'Popup'

  static className = 'ui-popup'

  static create: ShorthandFactory<PopupProps>

  static slotClassNames: PopupSlotClassNames = {
    content: `${Popup.className}__content`,
  }

  static Content = PopupContent

  static propTypes = {
    ...commonPropTypes.createCommon({
      as: false,
      content: false,
    }),
    align: PropTypes.oneOf(ALIGNMENTS),
    defaultOpen: PropTypes.bool,
    inline: PropTypes.bool,
    mountNode: customPropTypes.domNode,
    mouseLeaveDelay: PropTypes.number,
    offset: PropTypes.string,
    on: PropTypes.oneOfType([
      PropTypes.oneOf(['hover', 'click', 'focus', 'context']),
      PropTypes.arrayOf(PropTypes.oneOf(['click', 'focus', 'context'])),
      PropTypes.arrayOf(PropTypes.oneOf(['hover', 'focus', 'context'])),
    ]),
    open: PropTypes.bool,
    onOpenChange: PropTypes.func,
    pointing: PropTypes.bool,
    position: PropTypes.oneOf(POSITIONS),
    renderContent: PropTypes.func,
    target: PropTypes.any,
    trigger: customPropTypes.every([customPropTypes.disallow(['children']), PropTypes.any]),
    tabbableTrigger: PropTypes.bool,
    unstable_pinned: PropTypes.bool,
    content: customPropTypes.shorthandAllowingChildren,
    contentRef: customPropTypes.ref,
    trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    autoFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  }

  static defaultProps: PopupProps = {
    accessibility: popupBehavior,
    align: 'start',
    position: 'above',
    on: 'click',
    mouseLeaveDelay: 500,
    tabbableTrigger: true,
  }

  static autoControlledProps = ['open']

  pointerTargetRef = React.createRef<HTMLElement>()
  triggerRef = React.createRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  // focusable element which has triggered Popup, can be either triggerDomElement or the element inside it
  triggerFocusableDomElement = null
  popupDomElement = null
  rightClickReferenceObject = null

  closeTimeoutId

  actionHandlers = {
    closeAndFocusTrigger: e => {
      e.preventDefault()
      this.close(e, () => _.invoke(this.triggerFocusableDomElement, 'focus'))
    },
    close: e => {
      this.close(e)
    },
    toggle: e => {
      e.preventDefault()
      this.trySetOpen(!this.state.open, e)
    },
    open: e => {
      e.preventDefault()
      this.setPopupOpen(true, e)
    },
    preventScroll: e => {
      e.preventDefault()
    },
  }

  componentDidMount() {
    const { inline, trapFocus, autoFocus, open } = this.props

    if (open) {
      // when new state 'open' === 'true', save the last focused element
      this.updateTriggerFocusableDomElement()
    }

    if (process.env.NODE_ENV !== 'production') {
      if (inline && trapFocus) {
        console.warn(
          'Using "trapFocus" in inline popup leads to broken behavior for screen reader users.',
        )
      }
      if (!inline && autoFocus) {
        console.warn(
          'Beware, "autoFocus" prop will just grab focus at the moment of mount and will not trap it. As user is able to TAB out from popup, better use "inline" prop to keep correct tab order.',
        )
      }
    }
  }

  componentDidUpdate({ open }) {
    if (open) {
      // when new state 'open' === 'true', save the last focused element
      this.updateTriggerFocusableDomElement()
    }
  }

  renderComponent({
    classes,
    rtl,
    accessibility,
  }: RenderResultConfig<PopupProps>): React.ReactNode {
    const { inline, mountNode } = this.props
    const { open } = this.state
    const popupContent = open && this.renderPopupContent(classes.popup, rtl, accessibility)

    return (
      <>
        {this.renderTrigger(accessibility)}
        {open &&
          (inline ? popupContent : <PortalInner mountNode={mountNode}>{popupContent}</PortalInner>)}
      </>
    )
  }

  handleDocumentClick = (getRefs: Function) => e => {
    if (this.state.isOpenedByRightClick && this.isOutsidePopupElement(getRefs(), e)) {
      this.trySetOpen(false, e)
      return
    }

    if (this.isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      this.trySetOpen(false, e)
    }
  }

  handleDocumentKeyDown = (getRefs: Function) => (e: KeyboardEvent) => {
    const keyCode = keyboardKey.getCode(e)
    const isMatchingKey = keyCode === keyboardKey.Enter || keyCode === keyboardKey.Spacebar

    if (isMatchingKey && this.isOutsidePopupElementAndOutsideTriggerElement(getRefs(), e)) {
      this.trySetOpen(false, e)
    }

    // if focus was lost from Popup and moved to body, for e.g. when click on popup content
    // and ESC is pressed, the last opened Popup should get closed and the trigger should get focus
    const lastContentRef = getRefs().pop()
    const isLastOpenedPopup: boolean =
      lastContentRef && lastContentRef.current === this.popupDomElement

    const activeDocument: HTMLDocument = this.context.target
    const bodyHasFocus: boolean = activeDocument.activeElement === activeDocument.body

    if (keyCode === keyboardKey.Escape && bodyHasFocus && isLastOpenedPopup) {
      this.close(e, () => _.invoke(this.triggerFocusableDomElement, 'focus'))
    }
  }

  isOutsidePopupElementAndOutsideTriggerElement(refs: NodeRef[], e) {
    const isOutsidePopupElement = this.isOutsidePopupElement(refs, e)
    const isInsideTriggerElement =
      this.triggerRef.current &&
      doesNodeContainClick(this.triggerRef.current, e, this.context.target)

    return isOutsidePopupElement && !isInsideTriggerElement
  }

  isOutsidePopupElement(refs: NodeRef[], e) {
    const isInsideNested = _.some(refs, (childRef: NodeRef) => {
      return doesNodeContainClick(childRef.current as HTMLElement, e, this.context.target)
    })

    const isOutsidePopupElement = this.popupDomElement && !isInsideNested
    return isOutsidePopupElement
  }

  getTriggerProps(triggerElement) {
    const triggerProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus, blur and click event (always opening on click)
     * If focus and context are provided, there is no need to add onClick
     */
    if (_.includes(normalizedOn, 'focus')) {
      triggerProps.onFocus = (e, ...args) => {
        if (isFromKeyboard()) {
          this.trySetOpen(true, e)
        }
        _.invoke(triggerElement, 'props.onFocus', e, ...args)
      }
      triggerProps.onBlur = (e, ...args) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args)
      }
      if (!_.includes(normalizedOn, 'context')) {
        triggerProps.onClick = (e, ...args) => {
          this.setPopupOpen(true, e)
          _.invoke(triggerElement, 'props.onClick', e, ...args)
        }
      }
    }

    /**
     * The click is toggling the open state of the popup
     */
    if (_.includes(normalizedOn, 'click')) {
      triggerProps.onClick = (e, ...args) => {
        this.trySetOpen(!this.state.open, e)
        _.invoke(triggerElement, 'props.onClick', e, ...args)
      }
    }

    /**
     * The context is opening the popup
     */
    if (_.includes(normalizedOn, 'context')) {
      triggerProps.onContextMenu = (e, ...args) => {
        this.setPopupOpen(!this.state.open, e)
        _.invoke(triggerElement, 'props.onContextMenu', e, ...args)
        e.preventDefault()
      }
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave, blur and click event (always opening on click)
     * If hover and context are provided, there is no need to add onClick
     */
    if (_.includes(normalizedOn, 'hover')) {
      triggerProps.onMouseEnter = (e, ...args) => {
        this.setPopupOpen(true, e)
        setWhatInputSource('mouse')
        _.invoke(triggerElement, 'props.onMouseEnter', e, ...args)
      }
      triggerProps.onMouseLeave = (e, ...args) => {
        this.setPopupOpen(false, e)
        _.invoke(triggerElement, 'props.onMouseLeave', e, ...args)
      }
      if (!_.includes(normalizedOn, 'context')) {
        triggerProps.onClick = (e, ...args) => {
          this.setPopupOpen(true, e)
          _.invoke(triggerElement, 'props.onClick', e, ...args)
        }
      }
      triggerProps.onBlur = (e, ...args) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        _.invoke(triggerElement, 'props.onBlur', e, ...args)
      }
    }

    return triggerProps
  }

  getContentProps = (predefinedProps?) => {
    const contentHandlerProps: any = {}

    const { on } = this.props
    const normalizedOn = _.isArray(on) ? on : [on]

    /**
     * The focus is adding the focus and blur events on the content
     */
    if (_.includes(normalizedOn, 'focus')) {
      contentHandlerProps.onFocus = (e, contentProps) => {
        this.trySetOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onFocus', e, contentProps)
      }
      contentHandlerProps.onBlur = (e, contentProps) => {
        if (this.shouldBlurClose(e)) {
          this.trySetOpen(false, e)
        }
        predefinedProps && _.invoke(predefinedProps, 'onBlur', e, contentProps)
      }
    }

    /**
     * The hover is adding the mouseEnter, mouseLeave and click event (always opening on click)
     */
    if (_.includes(normalizedOn, 'hover')) {
      contentHandlerProps.onMouseEnter = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseEnter', e, contentProps)
      }
      contentHandlerProps.onMouseLeave = (e, contentProps) => {
        this.setPopupOpen(false, e)
        predefinedProps && _.invoke(predefinedProps, 'onMouseLeave', e, contentProps)
      }
      contentHandlerProps.onClick = (e, contentProps) => {
        this.setPopupOpen(true, e)
        predefinedProps && _.invoke(predefinedProps, 'onClick', e, contentProps)
      }
    }

    return contentHandlerProps
  }

  shouldBlurClose = e => {
    return (
      !e.currentTarget ||
      !this.popupDomElement ||
      (!e.currentTarget.contains(e.relatedTarget) &&
        !this.popupDomElement.contains(e.relatedTarget))
    )
  }

  renderTrigger(accessibility) {
    const { children, trigger } = this.props
    const triggerElement = childrenExist(children) ? children : (trigger as any)
    const triggerProps = this.getTriggerProps(triggerElement)
    return (
      triggerElement && (
        <Ref innerRef={this.triggerRef}>
          {React.cloneElement(triggerElement, {
            ...accessibility.attributes.trigger,
            ...triggerProps,
            ...applyAccessibilityKeyHandlers(accessibility.keyHandlers.trigger, triggerProps),
          })}
        </Ref>
      )
    )
  }

  renderPopupContent(
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
  ): JSX.Element {
    const { align, position, offset, target, unstable_pinned } = this.props

    return (
      <Popper
        pointerTargetRef={this.pointerTargetRef}
        align={align}
        position={position}
        offset={offset}
        rtl={rtl}
        unstable_pinned={unstable_pinned}
        targetRef={this.rightClickReferenceObject || target || this.triggerRef}
        children={this.renderPopperChildren.bind(this, popupPositionClasses, rtl, accessibility)}
      />
    )
  }

  renderPopperChildren = (
    popupPositionClasses: string,
    rtl: boolean,
    accessibility: ReactAccessibilityBehavior,
    { placement, scheduleUpdate }: PopperChildrenProps,
  ) => {
    const {
      content: propsContent,
      renderContent,
      contentRef,
      pointing,
      trapFocus,
      autoFocus,
    } = this.props

    const content = renderContent ? renderContent(scheduleUpdate) : propsContent
    const popupContent = Popup.Content.create(content || {}, {
      defaultProps: () => ({
        ...(rtl && { dir: 'rtl' }),
        ...accessibility.attributes.popup,
        ...accessibility.keyHandlers.popup,
        className: popupPositionClasses,
        ...this.getContentProps(),
        placement,
        pointing,
        pointerRef: this.pointerTargetRef,
        trapFocus,
        autoFocus,
      }),
      overrideProps: this.getContentProps,
    })

    return (
      <Unstable_NestingAuto>
        {(getRefs, nestingRef) => (
          <>
            <Ref
              innerRef={domElement => {
                this.popupDomElement = domElement
                handleRef(contentRef, domElement)
                nestingRef.current = domElement
              }}
            >
              {popupContent}
            </Ref>

            <EventListener
              listener={this.handleDocumentClick(getRefs)}
              target={this.context.target}
              type="click"
              capture
            />
            <EventListener
              listener={this.handleDocumentClick(getRefs)}
              target={this.context.target}
              type="contextmenu"
              capture
            />
            <EventListener
              listener={this.handleDocumentKeyDown(getRefs)}
              target={this.context.target}
              type="keydown"
              capture
            />

            {this.state.isOpenedByRightClick && (
              <>
                <EventListener
                  listener={this.dismissOnScroll}
                  target={this.context.target}
                  type="wheel"
                  capture
                />
                <EventListener
                  listener={this.dismissOnScroll}
                  target={this.context.target}
                  type="touchmove"
                  capture
                />
              </>
            )}
          </>
        )}
      </Unstable_NestingAuto>
    )
  }

  dismissOnScroll = (e: Event) => {
    this.trySetOpen(false, e)
  }

  trySetOpen(newValue: boolean, eventArgs: any) {
    const isOpenedByRightClick = newValue && isRightClick(eventArgs)

    // when new state 'open' === 'true', save the last focused element
    if (newValue) {
      this.updateTriggerFocusableDomElement()
      this.updateContextPosition(isOpenedByRightClick && eventArgs.nativeEvent)
    }
    this.setState({ open: newValue, isOpenedByRightClick })
    _.invoke(this.props, 'onOpenChange', eventArgs, { ...this.props, ...{ open: newValue } })
  }

  setPopupOpen(newOpen, e) {
    clearTimeout(this.closeTimeoutId)
    newOpen ? this.trySetOpen(true, e) : this.schedulePopupClose(e)
  }

  schedulePopupClose = e => {
    const { mouseLeaveDelay } = this.props

    this.closeTimeoutId = setTimeout(() => {
      this.trySetOpen(false, e)
    }, mouseLeaveDelay)
  }

  close = (e, onClose?: Function) => {
    if (this.state.open) {
      this.trySetOpen(false, e)
      onClose && onClose()
      e.stopPropagation()
    }
  }

  /**
   * Save DOM element which had focus before Popup opens.
   * Can be either trigger DOM element itself or the element inside it.
   */
  updateTriggerFocusableDomElement() {
    const activeDocument: HTMLDocument = this.context.target
    const activeElement = activeDocument.activeElement

    this.triggerFocusableDomElement =
      this.triggerRef.current && this.triggerRef.current.contains(activeElement)
        ? activeElement
        : this.triggerRef.current
  }

  updateContextPosition(nativeEvent: MouseEvent) {
    this.rightClickReferenceObject = nativeEvent && createReferenceFromContextClick(nativeEvent)
  }
}

Popup.create = createShorthandFactory({ Component: Popup, mappedProp: 'content' })
