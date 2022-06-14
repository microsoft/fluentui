import * as React from 'react';
import { ActionButton, DefaultButton, IconButton, Modal, PrimaryButton } from '@fluentui/react';

const onBlurCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
  setTimeout(() => {}, 100);
};

export const FocusTrapZoneBoxExample: React.FunctionComponent = () => {
  const onDismiss = () => {
    window.alert('Dismissed!');
  };
  const onNextClick = () => {
    window.alert('Next clicked!');
  };
  const onPreviousClick = () => {
    window.alert('Back clicked!');
  };

  return (
    <Modal
      isBlocking={true}
      onDismiss={onDismiss}
      isOpen={true}
      containerClassName={`dialogContainer setupWizard-connections`}
      scrollableContentClassName="dialogScrollableContent"
    >
      <div className={`dialogContent setupWizard-connections`}>
        <div className="dialogHeader">
          <span role="heading" aria-level={1}>
            Checking connections
          </span>
        </div>
        <div className={`dialogContent`}>
          <div className="dialogContentInner">
            <div className="solutionSetupStep">
              <div>These features require sign-in to the following services.</div>
              <div className="solutionSetupWidget">
                <iframe src="https://www.sqlite.org/copyright.html" className="zaIframe" />
              </div>
            </div>
          </div>
          <div className="dialogFooter">
            <div>
              <ActionButton
                iconProps={{ iconName: 'ChevronLeft' }}
                onClick={onPreviousClick}
                className={'actionButton'}
                text="Back"
              />
            </div>
            <div className="sideContainer">
              <PrimaryButton onClick={onNextClick} text="Next" />
              <DefaultButton className={'dismissalButton'} onClick={onDismiss} text="Cancel" />
            </div>
          </div>
        </div>
        <div className={'createList-closeBtnContainer'}>
          <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onDismiss} className="closeButton" />
        </div>
      </div>
    </Modal>
  );
};
