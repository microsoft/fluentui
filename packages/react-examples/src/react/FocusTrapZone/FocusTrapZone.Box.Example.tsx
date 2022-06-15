import * as React from 'react';
import {
  getNextElement,
  getPreviousElement,
  ActionButton,
  DefaultButton,
  IconButton,
  Modal,
  PrimaryButton,
  IFocusTrapZone,
} from '@fluentui/react';

export const FocusTrapZoneBoxExample: React.FunctionComponent = () => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const focusTrapZoneRef = React.useRef<IFocusTrapZone>(null);
  const [previousElement, setPreviousElement] = React.useState<HTMLElement | null>(null);
  const [nextElement, setNextElement] = React.useState<HTMLElement | null>(null);
  const [firstFocusableTarget, setFirstFocusableTarget] = React.useState<HTMLElement | null>(null);
  const firstFocusableTargetCallback = React.useCallback(() => firstFocusableTarget, [firstFocusableTarget]);
  const iframeRef = React.useCallback(
    (node: HTMLIFrameElement | null) => {
      if (node !== null && modalRef.current) {
        setPreviousElement(getPreviousElement(modalRef.current, node));
        setNextElement(getNextElement(modalRef.current, node));
        console.log(previousElement, nextElement);
      }
    },
    [modalRef, setNextElement, setPreviousElement, previousElement, nextElement],
  );

  const onFocusCapture = (ev: React.FocusEvent<HTMLDivElement>) => {
    if (ev.relatedTarget === null) {
      if (ev.target === previousElement) {
        setFirstFocusableTarget(previousElement);
      } else if (ev.target === nextElement) {
        setFirstFocusableTarget(nextElement);
      }
      setTimeout(() => focusTrapZoneRef.current?.focus(), 1);
    }
  };

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
      focusTrapZoneProps={{
        componentRef: focusTrapZoneRef,
        firstFocusableTarget: firstFocusableTargetCallback,
        focusPreviouslyFocusedInnerElement: false,
        onFocusCapture,
      }}
      isOpen={true}
      containerClassName={`dialogContainer setupWizard-connections`}
      scrollableContentClassName="dialogScrollableContent"
      ref={modalRef}
    >
      <div className={`dialogContent setupWizard-connections`}>
        <div className={'createList-closeBtnContainer'}>
          <IconButton iconProps={{ iconName: 'Cancel' }} onClick={onDismiss} className="closeButton" />
        </div>
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
                <iframe src="https://www.sqlite.org/copyright.html" className="zaIframe" ref={iframeRef} />
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
      </div>
    </Modal>
  );
};
