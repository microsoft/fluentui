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

  const renderComponent: (renderOptions: IRenderOptions) => Promise<Element> =
    (renderOptions: IRenderOptions) => {
      let threwException: boolean = false;

      return new Promise<Element>((resolve, reject) => {
        try {
          const component: JSX.Element = (
            <ScreenReaderAlert
              readingMode={ renderOptions.readingMode }
              indicator={ renderOptions.indicator }
              ref={ (instance) => resolve(instance) }
            >
              { renderOptions.message }
            </ScreenReaderAlert>
          );

          const container: HTMLElement = renderOptions.container || document.createElement('div');
          ReactDOM.render(component, container);
        } catch (e) {
          threwException = true;
        }

        expect(threwException).to.be.false;
      });
    };

  it('should not render the live region when reading mode is DoNotRead', (done) => {
    renderComponent({
      message: 'alert-message-do-not-read',
      readingMode: ReadingMode.DoNotRead
    }).then((screenReaderAlert: Element) => {
      const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert);

      expect(renderedDOM.querySelector('p')).to.be.null;
      expect(renderedDOM.textContent).to.be.empty;
      done();
    });
  });

  it('should assign proper live region attributes when reading mode is ReadAfterOtherContent', (done) => {
    renderComponent({
      message: 'alert-message-read-after-other-content',
      readingMode: ReadingMode.ReadAfterOtherContent
    }).then((screenReaderAlert: Element) => {
      const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert);

      const paragraphElement: HTMLParagraphElement = renderedDOM.querySelector('p');
      expect(paragraphElement).to.not.be.null;
      expect(renderedDOM.textContent).to.contain('alert-message-read-after-other-content');
      expect(paragraphElement.getAttribute('role')).to.be.null;
      expect(paragraphElement.getAttribute('aria-live')).to.equal('polite');
      expect(paragraphElement.getAttribute('aria-atomic')).to.equal('true');
      done();
    });
  });

  it('should assign proper live region attributes when reading mode is ReadImmediately', (done) => {
    renderComponent({
      message: 'alert-message-read-immediately',
      readingMode: ReadingMode.ReadImmediately
    }).then((screenReaderAlert: Element) => {
      const renderedDOM: Element = ReactDOM.findDOMNode(screenReaderAlert);

      const paragraphElement: HTMLParagraphElement = renderedDOM.querySelector('p');
      expect(paragraphElement).to.not.be.null;
      expect(renderedDOM.textContent).to.contain('alert-message-read-immediately');
      expect(paragraphElement.getAttribute('role')).to.equal('alert');
      expect(paragraphElement.getAttribute('aria-live')).to.equal('assertive');
      expect(paragraphElement.getAttribute('aria-atomic')).to.equal('true');
      done();
    });
  });

  it('should not trigger re-render when string is not updated when indicator props keeps same', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');
    let firstParagraphElement: HTMLParagraphElement;

    renderComponent({
      message: 'alert-message-same-message',
      container: divElement
    }).then(() => {
      firstParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-same-message');

      return renderComponent({
        message: 'alert-message-same-message',
        container: divElement
      });
    }).then(() => {
      const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-same-message');

      // If rerendered, the paragraph element will be differnt.
      expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.true;
      done();
    });
  });

  it('should clear the string from DOM after a timeout', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');

    renderComponent({
      message: 'alert-message-clear-string',
      container: divElement
    }).then(() => {
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-clear-string');

      // The timeout for clearing text is 500ms, set 1100ms here to verify the text is removed.
      setTimeout(() => {
        expect(divElement.querySelector('p')).to.be.null;
        expect(divElement.textContent).to.not.contain('alert-message-clear-string');
        done();
      }, 1100);
    });
  });

  it('should trigger re-render when indicator props is changed', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');
    let firstParagraphElement: HTMLParagraphElement;

    renderComponent({
      message: 'alert-message-change-indicator',
      indicator: 0,
      container: divElement
    }).then(() => {
      firstParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-change-indicator');

      return renderComponent({
        message: 'alert-message-change-indicator',
        indicator: 1,
        container: divElement
      });
    }).then(() => {
      const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-change-indicator');

      // If rerendered, the paragraph element will be differnt.
      expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.false;
      done();
    });
  });

  it('should trigger re-render when string is updated', (done) => {
    const divElement: HTMLDivElement = document.createElement('div');
    let firstParagraphElement: HTMLParagraphElement;

    renderComponent({
      message: 'alert-message-first-string',
      container: divElement
    }).then(() => {
      firstParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-first-string');

      return renderComponent({
        message: 'alert-message-second-different-string',
        container: divElement
      });
    }).then(() => {
      const secondParagraphElement: HTMLParagraphElement = divElement.querySelector('p');
      expect(divElement.querySelector('p')).to.not.be.null;
      expect(divElement.textContent).to.contain('alert-message-second-different-string');

      // If rerendered, the paragraph element will be differnt.
      expect(firstParagraphElement.isSameNode(secondParagraphElement)).to.be.false;
      done();
    });
  });
});
