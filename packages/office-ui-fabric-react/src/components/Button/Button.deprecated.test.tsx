import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as ReactTestUtils from 'react-dom/test-utils';
import * as renderer from 'react-test-renderer';
import { CompoundButton } from './CompoundButton/CompoundButton';
import { resetIds, setWarningCallback } from '@uifabric/utilities';

describe('Button', () => {
  beforeAll(() => {
    // Prevent warn deprecations from failing test
    setWarningCallback(() => {
      /* no-op */
    });
  });

  afterAll(() => {
    setWarningCallback();
  });

  beforeEach(() => {
    resetIds();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders CompoundButton correctly', () => {
    const component = renderer.create(<CompoundButton description="You can create a new account here.">Create account</CompoundButton>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('DefaultButton', () => {
    it('applies the correct aria attributes', () => {
      let button: any;
      let renderedDOM: any;

      button = ReactTestUtils.renderIntoDocument<any>(
        <CompoundButton description="Some awesome description" ariaDescription="Description on icon button">
          And this is the label
        </CompoundButton>
      );
      renderedDOM = ReactDOM.findDOMNode(button as React.ReactInstance);
      expect(renderedDOM.getAttribute('aria-label') === null);
      expect(renderedDOM.getAttribute('aria-labelledby') === renderedDOM.querySelector('.ms-Button-label').id);
      expect(renderedDOM.getAttribute('aria-describedby') === renderedDOM.querySelector('.ms-Button-description').id);
    });
  });
});
