import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';

import { MessageBar } from './MessageBar';

describe('MessageBar', () => {
  const noop = () => {
    /* no-op */
  };

  function renderIntoDocument(element: React.ReactElement<any>): HTMLElement {
    const component = ReactTestUtils.renderIntoDocument(element);
    const renderedDOM = ReactDOM.findDOMNode(component as React.ReactInstance);
    return renderedDOM as HTMLElement;
  }

  it('renders MessageBar correctly', () => {
    const component = renderer.create(<MessageBar>Message</MessageBar>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('dismiss', () => {
    describe('single-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ false } />);
        const dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ false } />);
        const dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });

    describe('multi-line', () => {
      it('is present when onDismiss exists', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar onDismiss={ noop } isMultiline={ true } />);
        const dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).not.toBeNull();
      });

      it('is not present when onDismiss is missing', () => {
        const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ true } />);
        const dismissElement = renderedDOM.querySelector('.ms-MessageBar-dismissal');
        expect(dismissElement).toBeNull();
      });
    });
  });

  describe('truncated', () => {
    it('is present when onDismiss exists', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar truncated={ true } isMultiline={ false } />);
      const expandElement = renderedDOM.querySelector('.ms-MessageBar-expand');
      expect(expandElement).not.toBeNull();
    });

    it('is not present when truncated is missing', () => {
      const renderedDOM: HTMLElement = renderIntoDocument(<MessageBar isMultiline={ false } />);
      const expandElement = renderedDOM.querySelector('.ms-MessageBar-expand');
      expect(expandElement).toBeNull();
    });
  });
});
