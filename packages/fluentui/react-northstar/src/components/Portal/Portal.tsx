import { AccessibilityAttributes } from '@fluentui/accessibility';
import { AccessibilityHandlerProps, FocusTrapZone, FocusTrapZoneProps } from '@fluentui/react-bindings';
import { EventListener } from '@fluentui/react-component-event-listener';
import { handleRef, Ref } from '@fluentui/react-component-ref';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  AutoControlledComponent,
  doesNodeContainClick,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
import PortalInner from './PortalInner';

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

export interface PortalState {
  open?: boolean;
}

/**
 * A Portal allows to render children outside of their parent.
 */
class Portal extends AutoControlledComponent<PortalProps, PortalState> {
  portalNode: HTMLElement;
  triggerNode: HTMLElement;

  static autoControlledProps = ['open'];

  static propTypes = {
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
    trigger: PropTypes.node,
    triggerRef: customPropTypes.ref,
    triggerAccessibility: PropTypes.object,
    onTriggerClick: PropTypes.func,
    onOutsideClick: PropTypes.func,
    trapFocus: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  };

  static defaultProps: PortalProps = {
    triggerAccessibility: {},
  };

  renderComponent(): React.ReactNode {
    return (
      <React.Fragment>
        {this.renderPortal()}
        {this.renderTrigger()}
      </React.Fragment>
    );
  }

  renderPortal(): JSX.Element | undefined {
    const { children, content, trapFocus } = this.props;
    const { open } = this.state;

    const contentToRender = childrenExist(children) ? children : content;
    const focusTrapZoneProps = (_.keys(trapFocus).length && trapFocus) || {};

    return (
      open && (
        <Ref innerRef={this.handlePortalRef}>
          <PortalInner
            onMount={this.handleMount}
            onUnmount={this.handleUnmount}
            {...rtlTextContainer.getAttributes({ forElements: [contentToRender] })}
          >
            {trapFocus ? <FocusTrapZone {...focusTrapZoneProps}>{contentToRender}</FocusTrapZone> : contentToRender}
            <EventListener listener={this.handleDocumentClick} target={this.context.target} type="click" />
          </PortalInner>
        </Ref>
      )
    );
  }

  renderTrigger(): JSX.Element | undefined {
    const { trigger, triggerAccessibility } = this.props;

    return (
      trigger && (
        <Ref innerRef={this.handleTriggerRef}>
          {React.cloneElement(trigger, {
            onClick: this.handleTriggerClick,
            ...triggerAccessibility.attributes,
            ...triggerAccessibility.keyHandlers,
          })}
        </Ref>
      )
    );
  }
  handleMount = () => {
    _.invoke(this.props, 'onMount', this.props);
  };

  handleUnmount = () => {
    _.invoke(this.props, 'onUnmount', this.props);
  };

  handlePortalRef = (portalNode: HTMLElement) => {
    this.portalNode = portalNode;
  };

  handleTriggerRef = (triggerNode: HTMLElement) => {
    this.triggerNode = triggerNode;
    handleRef(this.props.triggerRef, triggerNode);
  };

  handleTriggerClick = (e: React.MouseEvent, ...unhandledProps) => {
    const { trigger } = this.props;

    _.invoke(this.props, 'onTriggerClick', e); // Call handler from parent component
    _.invoke(trigger, 'props.onClick', e, ...unhandledProps); // Call original event handler
    this.setState({ open: !this.state.open });
  };

  handleDocumentClick = (e: MouseEvent) => {
    if (
      !this.portalNode || // no portal
      doesNodeContainClick(this.triggerNode, e, this.context.target) || // event happened in trigger (delegate to trigger handlers)
      doesNodeContainClick(this.portalNode, e, this.context.target) // event happened in the portal
    ) {
      return; // ignore the click
    }
    _.invoke(this.props, 'onOutsideClick', e);
    this.setState({ open: false });
  };
}

export default Portal;
