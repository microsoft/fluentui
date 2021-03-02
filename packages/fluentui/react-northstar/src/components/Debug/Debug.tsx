import { getCode, keyboardKey } from '@fluentui/accessibility';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

import { isBrowser } from '../../utils';
import { isDebugEnabled } from '@fluentui/styles';

import { DebugPanel } from './DebugPanel';
import { FiberNavigator } from './FiberNavigator';
import { DebugRect } from './DebugRect';

/* eslint-disable no-console */

export type DebugProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document;
};

export type DebugState = {
  debugPanelPosition?: 'left' | 'right';
  fiberNav: FiberNavigator;
  selectedFiberNav: FiberNavigator;
  isSelecting: boolean;
};

const INITIAL_STATE: DebugState = {
  fiberNav: null,
  selectedFiberNav: null,
  isSelecting: false,
};

export class Debug extends React.Component<DebugProps, DebugState> {
  state = INITIAL_STATE;

  static defaultProps = {
    // eslint-disable-next-line no-undef
    mountDocument: isBrowser() ? window.document : null,
  };

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  };

  constructor(p, s) {
    super(p, s);
    if (process.env.NODE_ENV !== 'production' && isDebugEnabled && isBrowser()) {
      // eslint-disable-next-line no-undef
      (window as any).openDebugPanel = () => {
        // eslint-disable-next-line no-undef
        this.debugReactComponent((window as any).$r);
      };
    }
  }

  debugReactComponent = r => {
    if (!r) {
      console.error(
        "No React component selected. Please select a Fluent UI component from the React's Component panel.",
      );
      return;
    }
    if (!r._reactInternalFiber) {
      console.error(
        'React does not provide data for debugging for this component. Try selecting some Fluent UI component.',
      );
      return;
    }
    if (!r.fluentUIDebug) {
      console.error('Not a debuggable component. Try selecting some Fluent UI component.');
      return;
    }

    const fiberNav = FiberNavigator.fromFiber(r._reactInternalFiber);
    this.setState({ fiberNav, isSelecting: false, selectedFiberNav: null });
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
    const code = getCode(e);

    switch (code) {
      case keyboardKey.Escape:
        this.stopSelecting();
        break;

      case keyboardKey.d:
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

    this.setState({ isSelecting: false });
  };

  startSelecting = () => {
    const isSelecting = !this.state.isSelecting;

    this.setState({
      ...(!isSelecting && INITIAL_STATE),
      isSelecting,
    });
  };

  stopSelecting = () => {
    this.setState(INITIAL_STATE);
  };

  selectFiber = selectedFiberNav => this.setState({ selectedFiberNav });

  changeFiber = fiberNav => this.setState({ fiberNav });

  positionRight = () => this.setState({ debugPanelPosition: 'right' });

  positionLeft = () => this.setState({ debugPanelPosition: 'left' });

  close = () => this.setState(INITIAL_STATE);

  render() {
    const { mountDocument } = this.props;
    const { fiberNav, selectedFiberNav, isSelecting, debugPanelPosition } = this.state;

    if (process.env.NODE_ENV !== 'production' && isDebugEnabled) {
      return (
        <>
          <EventListener listener={this.handleKeyDown} target={mountDocument.body} type="keydown" />
          {isSelecting && (
            <EventListener listener={this.handleMouseMove} target={mountDocument.body} type="mousemove" />
          )}
          {isSelecting && fiberNav && fiberNav.domNode && (
            <EventListener listener={this.handleDOMNodeClick} target={fiberNav.domNode} type="click" />
          )}
          {isSelecting && fiberNav && <DebugRect fiberNav={fiberNav} />}
          {selectedFiberNav && <DebugRect fiberNav={selectedFiberNav} />}
          {!isSelecting && fiberNav && fiberNav.instance && (
            <DebugPanel
              fiberNav={fiberNav}
              onActivateDebugSelectorClick={this.startSelecting}
              onClose={this.close}
              // TODO: Integrate CSS in JS Styles for Host Components (DOM nodes)
              // cssStyles={stylesForNode(domNode)}
              debugData={fiberNav.fluentUIDebug}
              position={debugPanelPosition || 'right'}
              onPositionLeft={this.positionLeft}
              onPositionRight={this.positionRight}
              onFiberChanged={this.changeFiber}
              onFiberSelected={this.selectFiber}
            />
          )}
        </>
      );
    }

    return null;
  }
}
