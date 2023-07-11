import { AccessibilityAttributes } from '@fluentui/accessibility';
import {
  AccessibilityHandlerProps,
  FocusTrapZone,
  FocusTrapZoneProps,
  useFluentContext,
  useTelemetry,
  useAutoControlled,
} from '@fluentui/react-bindings';
import { EventListener } from '@fluentui/react-component-event-listener';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';
import { FluentComponentStaticProps } from '../../types';
import {
  childrenExist,
  doesNodeContainClick,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
  createShorthandFactory,
} from '../../utils';
import { PortalInner } from './PortalInner';

export type TriggerAccessibility = {
  attributes?: AccessibilityAttributes;
  keyHandlers?: AccessibilityHandlerProps;
};

export interface PortalProps extends ChildrenComponentProps, ContentComponentProps {
  /** Initial value of open. */
  defaultOpen?: boolean;

  /**
   * Called when the portal is mounted on the DOM.
   *
   * @param data - All props.
   */
  onMount?: (props: PortalProps) => void;

  /**
   * Called when the portal is unmounted from the DOM.
   *
   * @param data - All props.
   */
  onUnmount?: (props: PortalProps) => void;

  /** Controls whether or not the portal is displayed. */
  open?: boolean;

  /** Element to be rendered in-place where the portal is defined. */
  trigger?: JSX.Element;

  /** Controls whether or not focus trap should be applied, using boolean or FocusTrapZoneProps type value */
  trapFocus?: FocusTrapZoneProps | boolean;

  /** Accessibility behavior object to apply on trigger node. */
  triggerAccessibility?: TriggerAccessibility;

  /** Sets trigger node to passed ref. */
  triggerRef?: React.Ref<any>;

  /**
   * Called when trigger node was clicked.
   *
   * @param data - All props.
   */
  onTriggerClick?: (e: React.MouseEvent) => void;

  /**
   * Called when `click` event was invoked outside portal or trigger nodes.
   *
   * @param data - All props.
   */
  onOutsideClick?: (e: React.MouseEvent) => void;
}

/**
 * (DEPRECATED) A Portal allows to render children outside of their parent.
 *
 * @deprecated Please use "Popup" or "Dialog" components instead.
 */
export const Portal: React.FC<PortalProps> & FluentComponentStaticProps<PortalProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Portal.displayName, context.telemetry);
  setStart();
  const { children, content, trapFocus, trigger, triggerAccessibility } = props;
  const portalRef = React.useRef<HTMLElement>();
  const triggerRef = React.useRef<HTMLElement>();

  const [open, setOpen] = useAutoControlled({
    defaultValue: props.defaultOpen,
    value: props.open,
    initialValue: false,
  });

  const renderPortal = (): JSX.Element | undefined => {
    const contentToRender = childrenExist(children) ? children : content;
    const focusTrapZoneProps = typeof trapFocus === 'boolean' ? {} : trapFocus;
    return (
      open && (
        <Ref innerRef={portalRef}>
          <PortalInner
            onMount={handleMount}
            onUnmount={handleUnmount}
            {...rtlTextContainer.getAttributes({ forElements: [contentToRender] })}
          >
            {trapFocus ? <FocusTrapZone {...focusTrapZoneProps}>{contentToRender}</FocusTrapZone> : contentToRender}
            <EventListener listener={handleDocumentClick} target={context.target} type="click" />
          </PortalInner>
        </Ref>
      )
    );
  };

  const renderTrigger = (): JSX.Element | undefined => {
    return (
      trigger && (
        <Ref innerRef={handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: handleTriggerClick,
            ...triggerAccessibility.attributes,
            ...triggerAccessibility.keyHandlers,
          })}
        </Ref>
      )
    );
  };

  const handleMount = () => {
    _.invoke(props, 'onMount', props);
  };

  const handleUnmount = () => {
    _.invoke(props, 'onUnmount', props);
  };

  const handleTriggerRef = (node: HTMLElement) => {
    triggerRef.current = node;
    handleRef(props.triggerRef, node);
  };

  const handleTriggerClick = (e: React.MouseEvent, ...unhandledProps) => {
    _.invoke(props, 'onTriggerClick', e); // Call handler from parent component
    _.invoke(trigger, 'props.onClick', e, ...unhandledProps); // Call original event handler
    setOpen(isOpen => !isOpen);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      !portalRef || // no portal
      doesNodeContainClick(triggerRef.current, e, context.target) || // event happened in trigger (delegate to trigger handlers)
      doesNodeContainClick(portalRef.current, e, context.target) // event happened in the portal
    ) {
      return; // ignore the click
    }
    _.invoke(props, 'onOutsideClick', e);
    setOpen(false);
  };

  const element = (
    <>
      {renderPortal()}
      {renderTrigger()}
    </>
  );
  setEnd();
  return element;
};

Portal.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    as: false,
    className: false,
    styled: false,
  }),
  defaultOpen: PropTypes.bool,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  open: PropTypes.bool,
  trigger: PropTypes.element,
  triggerRef: customPropTypes.ref,
  triggerAccessibility: PropTypes.object,
  onTriggerClick: PropTypes.func,
  onOutsideClick: PropTypes.func,
  trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

Portal.handledProps = Object.keys(Portal.propTypes) as any;

Portal.create = createShorthandFactory({
  Component: Portal,
});

Portal.defaultProps = {
  triggerAccessibility: {},
};
