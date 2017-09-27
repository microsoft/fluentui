/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-addons-test-utils';

import { MessageBar } from './MessageBar';

describe('MessageBar', () => {
  let noop = () => {
    /* no-op */
  };

  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM: Element = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  describe('dismiss', () => {
    describe('single-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ false } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ false } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });

    describe('multi-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ true } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ true } />);
        let dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });
  });
});
