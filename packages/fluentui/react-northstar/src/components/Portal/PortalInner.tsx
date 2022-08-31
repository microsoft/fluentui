import { useFluentContext, useIsomorphicLayoutEffect } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore "react-portal-compat-context" uses v9 configs via path aliases
import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { isBrowser, ChildrenComponentProps, commonPropTypes } from '../../utils';
import { PortalContext } from '../Provider/portalContext';
import { usePortalBox } from './usePortalBox';

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
  const { children, mountNode } = props;

  const { className } = React.useContext(PortalContext);
  const { target, rtl } = useFluentContext();
  const registerPortalEl = usePortalCompat();

  const box = usePortalBox({ className, target, rtl });
  // PortalInner should render elements even without a context
  // eslint-disable-next-line
  const container: HTMLElement | null = isBrowser() ? mountNode || box || document.body : null;

  useIsomorphicLayoutEffect(() => {
    return registerPortalEl(box);
  }, [box, registerPortalEl]);

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
