import keyboardKey from 'keyboard-key';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

import { isBrowser } from '../../utils';

import FiberNavigator from './FiberNavigator';
import DebugRect from './DebugRect';

export type DebugSelectorProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document;
  onSelect: (fiberNav: FiberNavigator) => void;
};

export type DebugSelectorState = {
  fiberNav: FiberNavigator;
  isSelecting: boolean;
};

const INITIAL_STATE: DebugSelectorState = {
  fiberNav: null,
  isSelecting: false
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
    mountDocument: isBrowser() ? window.document : null
  };

  static propTypes = {
    mountDocument: PropTypes.object.isRequired
  };

  debugDOMNode = domNode => {
    let fiberNav = FiberNavigator.fromDOMNode(domNode);

    if (!fiberNav) {
      console.error('No fiber for dom node', domNode);
      return;
    }

    fiberNav = fiberNav.findOwner(fiber => fiber.fluentUIDebug);

    if (fiberNav !== this.state.fiberNav) {
      this.setState({ fiberNav });
    }
  };

  handleKeyDown = e => {
    const code = keyboardKey.getCode(e);

    switch (code) {
      case keyboardKey.Escape:
        this.stopSelecting();
        break;

      case keyboardKey.c:
        if (e.altKey && e.shiftKey) {
          this.startSelecting();
        }
        break;
    }
  };

  handleMouseMove = e => {
    this.debugDOMNode(e.target);
  };

  handleDOMNodeClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props?.onSelect(this.state.fiberNav);
    this.setState({ isSelecting: false });
  };

  startSelecting = () => {
    const isSelecting = !this.state.isSelecting;

    this.setState({
      ...(!isSelecting && INITIAL_STATE),
      isSelecting
    });
  };

  stopSelecting = () => {
    this.setState(INITIAL_STATE);
  };

  close = () => this.setState(INITIAL_STATE);

  render() {
    const { mountDocument } = this.props;
    const { fiberNav, isSelecting } = this.state;

    return (
      <>
        <EventListener listener={this.handleKeyDown} target={mountDocument} type="keydown" />
        {isSelecting && <EventListener listener={this.handleMouseMove} target={mountDocument.body} type="mousemove" />}
        {isSelecting && fiberNav && fiberNav.domNode && (
          <EventListener listener={this.handleDOMNodeClick} target={fiberNav.domNode} type="click" />
        )}
        {isSelecting && fiberNav && <DebugRect fiberNav={fiberNav} />}
      </>
    );
  }
}

export default DebugSelector;
