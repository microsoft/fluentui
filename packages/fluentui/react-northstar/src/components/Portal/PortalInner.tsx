import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../utils';
import { PortalBoxContext } from '../Provider/usePortalBox';
import * as customPropTypes from '@fluentui/react-proptypes';
import { useIsomorphicLayoutEffect } from '@fluentui/react-bindings';

export interface PortalInnerProps extends ChildrenComponentProps {
  /** Existing element the portal should be bound to. */
  mountNode?: HTMLElement;

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param data - All props.
   */
  onMount?: (props: PortalInnerProps) => void;

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param data - All props.
   */
  onUnmount?: (props: PortalInnerProps) => void;
}

/**
 * A PortalInner is a container for Portal's content.
 */
export const PortalInner: React.FC<PortalInnerProps> = props => {
  const context = React.useContext(PortalBoxContext);
  const { children, mountNode } = props;

  // PortalInner should render elements even without a context
  // eslint-disable-next-line
  const target: HTMLElement | null = isBrowser() ? context || document.body : null;
  const container: HTMLElement | null = mountNode || target;
  useIsomorphicLayoutEffect(() => {
    _.invoke(props, 'onMount', props);

    return () => _.invoke(props, 'onUnmount', props);
  }, []);
  return container && ReactDOM.createPortal(children, container);
};

PortalInner.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    as: false,
    className: false,
    content: false,
    styled: false,
  }),
  mountNode: customPropTypes.domNode,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
};
