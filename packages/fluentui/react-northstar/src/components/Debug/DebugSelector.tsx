import * as PropTypes from 'prop-types';
import * as React from 'react';
import { EventListener } from '@fluentui/react-component-event-listener';

import { isBrowser } from '../../utils';

import { FiberNavigator } from './FiberNavigator';
import { DebugRect } from './DebugRect';

export type DebugSelectorProps = {
  /** Existing document the popup should add listeners. */
  mountDocument?: Document;
  onSelect?: (fiberNav: FiberNavigator) => void;
  onHover?: (fiberNav: FiberNavigator) => void;
  renderLabel?: (fiberNav: FiberNavigator) => string;
  showBackground?: boolean;
  showClassName?: boolean;
  showCropMarks?: boolean;
  showElement?: boolean;
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
export class DebugSelector extends React.Component<DebugSelectorProps, DebugSelectorState> {
  state = INITIAL_STATE;

  static defaultProps = {
    active: false,
    filter: fiberNav => fiberNav,
    // eslint-disable-next-line no-undef
    mountDocument: isBrowser() ? window.document : null,
  };

  static propTypes = {
    mountDocument: PropTypes.object.isRequired,
  };

  debugDOMNode = domNode => {
    let fiberNav = FiberNavigator.fromDOMNode(domNode);

    if (!fiberNav) {
      // eslint-disable-next-line no-console
      console.error('No fiber for dom node', domNode);
      return;
    }

    fiberNav = this.props.filter(fiberNav);

    this.setCurrentFiberNav(fiberNav);
  };

  setCurrentFiberNav = (fiberNav: FiberNavigator | null) => {
    this.setState(prevState => {
      if (fiberNav?.__fiber !== prevState.fiberNav?.__fiber) {
        this.props.onHover?.(fiberNav);
        return { fiberNav };
      }
      return null;
    });
  };

  handleMouseMove = e => {
    this.debugDOMNode(e.target);
  };

  handleMouseLeave = e => {
    this.setCurrentFiberNav(null);
  };

  handleDOMNodeClick = e => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSelect?.(this.state.fiberNav);
  };

  render() {
    const { active, mountDocument, renderLabel, showBackground, showClassName, showCropMarks, showElement } =
      this.props;
    const { fiberNav } = this.state;

    return (
      <>
        {active && <EventListener listener={this.handleMouseMove} target={mountDocument.body} type="mousemove" />}
        {active && <EventListener listener={this.handleMouseLeave} target={mountDocument.body} type="mouseleave" />}
        {active && fiberNav && fiberNav.domNode && (
          <EventListener listener={this.handleDOMNodeClick} target={fiberNav.domNode} type="click" />
        )}
        {active && fiberNav && (
          <DebugRect
            showBackground={showBackground}
            showClassName={showClassName}
            showElement={showElement}
            showCropMarks={showCropMarks}
            fiberNav={fiberNav}
            renderLabel={renderLabel}
          />
        )}
      </>
    );
  }
}
