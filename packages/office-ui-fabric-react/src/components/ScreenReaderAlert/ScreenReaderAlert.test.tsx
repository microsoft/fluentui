import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

let { expect } = chai;

import { ScreenReaderAlert } from './ScreenReaderAlert';
import { IScreenReaderAlertProps, ReadingMode } from './ScreenReaderAlert.Props';

describe('ScreenReaderAlert', () => {
  interface IRenderOptions {
    message: string,
    readingMode?: ReadingMode,
    indicator?: number
    container?: HTMLElement
  }

  const renderComponent = (renderOptions: IRenderOptions): React.ReactInstance => {
    const { message, readingMode, indicator, container} = renderOptions;

    let threwException = false;
    let screenReaderAlert;

    try {
      const component: JSX.Element = (
        <ScreenReaderAlert readingMode={ readingMode } indicator={ indicator }>
          { message }
        </ScreenReaderAlert>
      );

      screenReaderAlert = container
        ? screenReaderAlert = ReactDOM.render(component, container)
        : ReactTestUtils.renderIntoDocument<ScreenReaderAlert>(component);
    } catch (e) {
      threwException = true;
    }

    expect(threwException).to.be.false;

    return screenReaderAlert;
  }

  it('should not render the live region when reading mode is DoNotRead', () => {
    const screenReaderAlert = renderComponent({
      message: 'alert-message-do-not-read',
      readingMode: ReadingMode.DoNotRead
    })

    let renderedDOM = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

    expect(renderedDOM.querySelector('p')).to.be.null;
    expect(renderedDOM.textContent).to.be.empty;
  });

  it('should assign proper live region attributes when reading mode is ReadAfterOtherContent', () => {
    const screenReaderAlert = renderComponent({
      message: 'alert-message-read-after-other-content',
      readingMode: ReadingMode.ReadAfterOtherContent
    })

    let renderedDOM = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

    const paragraphElement: HTMLParagraphElement = renderedDOM.querySelector('p');
    expect(paragraphElement).to.not.be.null;
    expect(renderedDOM.textContent).to.contain('alert-message-read-after-other-content');
    expect(paragraphElement.getAttribute('role')).to.be.null;
    expect(paragraphElement.getAttribute('aria-live')).to.equal('polite');
    expect(paragraphElement.getAttribute('aria-atomic')).to.equal('true');
  });

  it('should assign proper live region attributes when reading mode is ReadImmediately', () => {
    const screenReaderAlert = renderComponent({
      message: 'alert-message-read-immediately',
      readingMode: ReadingMode.ReadImmediately
    })

    let renderedDOM = ReactDOM.findDOMNode(screenReaderAlert as React.ReactInstance);

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
    })

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-same-message');

    renderComponent({
      message: 'alert-message-same-message',
      container: divElement
    })

    const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-same-message');

    // If rerendered, the paragraph element will be differnt.
    expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.true;
  });

  it('should clear the string from DOM after a timeout', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');

    const screenReaderAlert = renderComponent({
      message: 'alert-message-clear-string',
      container: divElement
    })

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
    })

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-change-indicator');

    renderComponent({
      message: 'alert-message-change-indicator',
      indicator: 1,
      container: divElement
    })

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
    })

    const firstParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-first-string');

    renderComponent({
      message: 'alert-message-second-different-string',
      container: divElement
    })

    const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
    expect(divElement.querySelector('p')).to.not.be.null;
    expect(divElement.textContent).to.contain('alert-message-second-different-string');

    // If rerendered, the paragraph element will be differnt.
    expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.false;
  });
});