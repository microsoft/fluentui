import * as React from 'react';
import { Button, Header, Portal } from '@fluentui/react-northstar';

class PortalExamplePortal extends React.Component {
  state = { open: false };

  openPortal = () => {
    this.setState({ open: true });
  };

  closePortal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const btnContent = open ? 'Close Portal' : 'Open Portal';

    return (
      <div>
        <Button content={btnContent} onClick={this.openPortal} />
        <Portal
          open={open}
          trapFocus={{
            // When 'false', all clicks outside the Portal will be caught and not handled.
            // 'true' by default.
            isClickableOutsideFocusTrap: false,
            // Indicates whether to focus element which triggered FTZ on outside click
            // 'false' by default
            // note: if isClickableOutsideFocusTrap === 'false', focusTriggerOnOutsideClick will not be taken into account.
            focusTriggerOnOutsideClick: false,
            // Allows to pass element which you want to be focused after Portal is closed.
            // 'null' by default, so the trigger element would be focused on close.
            elementToFocusOnDismiss: null,
            // Indicates whether to force focus inside a Portal, if the 'focus' event was invoked at any place.
            // 'false' by default.
            forceFocusInsideTrapOnOutsideFocus: false,
            // Ignore focusing element which activated Portal after it was closed.
            // 'false' by default.
            ignoreExternalFocusing: false,
            // Do not focus first focusable element of Portal when opened.
            // 'false' by default.
            disableFirstFocus: false,
            // Indicates an element to focus after Portal has opened.
            // 'null' by default. The first focusable element of Portal will be focused.
            firstFocusableSelector: null,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              position: 'fixed',
              left: '40%',
              top: '45%',
              zIndex: 1000,
              padding: '15px',
              boxShadow: 'rgb(187, 187, 187) 0px 2px 8px',
              border: '1px solid rgba(34,36,38,.15)',
              borderRadius: '5px',
            }}
          >
            <Header>This portal traps focus on appearance</Header>
            <p tabIndex={0}>Portal doesn't close on outside click. See passed focus trap props.</p>
            <p tabIndex={0}>To close, simply click the close button</p>
            <Button content="Do nothing" />
            <Button content="Close popup" onClick={this.closePortal} />
          </div>
        </Portal>
      </div>
    );
  }
}

export default PortalExamplePortal;
