import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { expect } from 'chai';

import { ScreenReaderAlert } from './ScreenReaderAlert';
import { ReadingMode } from './ScreenReaderAlert.Props';

describe('ScreenReaderAlert', () => {
  interface IRenderOptions {
    message: string;
    readingMode?: ReadingMode;
    indicator?: number;
    container?: HTMLElement;
  }

  const renderComponent: (renderOptions: IRenderOptions) => React.ReactInstance =
    (renderOptions: IRenderOptions) => {
      let threwException: boolean = false;
      let screenReaderAlert: React.ReactInstance;

      try {
        const component: JSX.Element = (
          <ScreenReaderAlert readingMode={ renderOptions.readingMode } indicator={ renderOptions.indicator }>
            { renderOptions.message }
          </ScreenReaderAlert>
        );

        const container: HTMLElement = renderOptions.container || document.createElement('div');
        screenReaderAlert = ReactDOM.render(component, container) as React.ReactInstance;
      } catch (e) {
        threwException = true;
      }

      expect(threwException).to.be.false;

      return screenReaderAlert;
    };

  it('should not render the live region when reading mode is DoNotRead', () => {
    const screenReaderAlert: React.ReactInstance = renderComponent({
      message: 'alert-message-do-not-read',
      readingMode: ReadingMode.DoNotRead
    });

    const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

    expect(renderedDOM.querySelector('p')).to.be.null;
    expect(renderedDOM.textContent).to.be.empty;
  });

  it('should assign proper live region attributes when reading mode is ReadAfterOtherContent', () => {
    const screenReaderAlert: React.ReactInstance = renderComponent({
      message: 'alert-message-read-after-other-content',
      readingMode: ReadingMode.ReadAfterOtherContent
    });

    const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

    const paragraphElement: HTMLParagraphElement = renderedDOM.querySelector('p');
    expect(paragraphElement).to.not.be.null;
    expect(renderedDOM.textContent).to.contain('alert-message-read-after-other-content');
    expect(paragraphElement.getAttribute('role')).to.be.null;
    expect(paragraphElement.getAttribute('aria-live')).to.equal('polite');
    expect(paragraphElement.getAttribute('aria-atomic')).to.equal('true');
  });

  it('should assign proper live region attributes when reading mode is ReadImmediately', () => {
    const screenReaderAlert: React.ReactInstance = renderComponent({
      message: 'alert-message-read-immediately',
      readingMode: ReadingMode.ReadImmediately
    });

    const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

    const paragraphElement: HTMLParagraphElement = renderedDOM.querySelector('p');
    expect(paragraphElement).to.not.be.null;
    expect(renderedDOM.textContent).to.contain('alert-message-read-immediately');
    expect(paragraphElement.getAttribute('role')).to.equal('alert');
    expect(paragraphElement.getAttribute('aria-live')).to.equal('assertive');
    expect(paragraphElement.getAttribute('aria-atomic')).to.equal('true');
  });

  it('should not trigger re-render when string is not updated when indicator props keeps same', () => {
    const divElement: HTMLDivElement = document.createElement('div');

    renderComponent({
      message: 'alert-message-same-message',
      container: divElement
    });

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-same-message');

    renderComponent({
      message: 'alert-message-same-message',
      container: divElement
    });

    const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-same-message');

    // If rerendered, the paragraph element will be differnt.
    expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.true;
  });

  it('should clear the string from DOM after a timeout', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');

    const screenReaderAlert: React.ReactInstance = renderComponent({
      message: 'alert-message-clear-string',
      container: divElement
    });

    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-clear-string');

    // The timeout for clearing text is 500ms, set 1100ms here to verify the text is removed.
    setTimeout(() => {
      expect(divElement.querySelector('p')).to.be.null;
      expect(divElement.textContent).to.not.contain('alert-message-clear-string');
      done();
    }, 1100);
  });

  it('should trigger re-render when indicator props is changed', () => {
    const divElement: HTMLDivElement = document.createElement('div');

    renderComponent({
      message: 'alert-message-change-indicator',
      indicator: 0,
      container: divElement
    });

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-change-indicator');

    renderComponent({
      message: 'alert-message-change-indicator',
      indicator: 1,
      container: divElement
    });

    const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-change-indicator');

    // If rerendered, the paragraph element will be differnt.
    expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.false;
  });

  it('should trigger re-render when string is updated', () => {
    const divElement: HTMLDivElement = document.createElement('div');

    renderComponent({
      message: 'alert-message-first-string',
      container: divElement
    });

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-first-string');

    renderComponent({
      message: 'alert-message-second-different-string',
      container: divElement
    });

    const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-second-different-string');

    // If rerendered, the paragraph element will be differnt.
    expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.false;
  });
});