import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

import { isBrowser } from '../../utils';

import FiberNavigator from './FiberNavigator';
import DebugRect from './DebugRect';

export type DebugSelectorProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document;
  onSelect?: (fiberNav: FiberNavigator) => void;
  filter?: (fiberNav: FiberNavigator) => FiberNavigator | null;
  active?: boolean;
};

export type DebugSelectorState = {
  fiberNav: FiberNavigator;
};

const INITIAL_STATE: DebugSelectorState = {
  fiberNav: null,
};

// TODO: This is a copy and trim-down of Debug.tsx
//       Cleanup and use in Debug.tsx before merge:
//         - Make hotkey invocation generic, or take prop for active state
//           since Debug uses ctrl + 'd' and DebugSelector uses ctrl + 'c' in react-builder
//
class DebugSelector extends React.Component<DebugSelectorProps, DebugSelectorState> {
  state = INITIAL_STATE;

  static defaultProps = {
    // eslint-disable-next-line no-undef
    mountDocument: isBrowser() ? window.document : null,
    active: false,
    filter: fiberNav => fiberNav,
  };

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  };

  debugDOMNode = domNode => {
    let fiberNav = FiberNavigator.fromDOMNode(domNode);

    if (!fiberNav) {
      console.error('No fiber for dom node', domNode);
      return;
    }

    fiberNav = this.props.filter(fiberNav);

    if (fiberNav !== this.state.fiberNav) {
      this.setState({ fiberNav });
    }
  };

  handleMouseMove = e => {
    this.debugDOMNode(e.target);
  };

  handleMouseLeave = e => {
    this.setState({ fiberNav: null });
  };

  handleDOMNodeClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props?.onSelect(this.state.fiberNav);
  };

  render() {
    const { active, mountDocument } = this.props;
    const { fiberNav } = this.state;

    return (
      <>
        {active && <EventListener listener={this.handleMouseMove} target={mountDocument.body} type="mousemove" />}
        {active && <EventListener listener={this.handleMouseLeave} target={mountDocument.body} type="mouseleave" />}
        {active && fiberNav && fiberNav.domNode && (
          <EventListener listener={this.handleDOMNodeClick} target={fiberNav.domNode} type="click" />
        )}
        {active && fiberNav && <DebugRect fiberNav={fiberNav} />}
      </>
    );
  }
}

export default DebugSelector;
