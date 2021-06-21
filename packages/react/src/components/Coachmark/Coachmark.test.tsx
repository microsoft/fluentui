import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';
import { ReactTestRenderer } from 'react-test-renderer';
import { create } from '@fluentui/utilities/lib/test';
import { mount, ReactWrapper } from 'enzyme';
import { safeCreate } from '@fluentui/test-utilities';

import { Coachmark } from './Coachmark';
import * as path from 'path';
import { isConformant } from '../../common/isConformant';
import { IRefObject, resetIds } from '@fluentui/utilities';
import { ICoachmark } from './Coachmark.types';

const ReactDOM = require('react-dom');

describe('Coachmark', () => {
  // Conformance Tests:
  isConformant({
    Component: Coachmark,
    displayName: 'Coachmark',
    componentPath: path.join(__dirname, 'Coachmark.ts'),
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });

  // Render Tests:
  it('renders Coachmark (correctly)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders Coachmark (className)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark className={'myClassName'} target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders Coachmark (isCollapsed)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark isCollapsed={false} target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders Coachmark (color)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark color="red" target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders Coachmark (beaconColorOne and beaconColorTwo)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark beaconColorOne="red" beaconColorTwo="blue" target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
      ReactDOM.createPortal = createPortal;
    });
  });

  it('renders Coachmark (children)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <Coachmark target="test">
        <div className="test">Test</div>
      </Coachmark>,
      component => {
        const tree = component!.toJSON();
        expect(tree).toMatchSnapshot();
        ReactDOM.createPortal = createPortal;
      },
    );
  });

  it('renders Coachmark (aria)', () => {
    const createPortal = ReactDOM.createPortal;
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <Coachmark
        ariaAlertText="Test: ariaAlertText"
        ariaLabelledBy="Test: ariaLabelledBy"
        ariaLabelledByText="Test: ariaLabelledByText"
        ariaDescribedBy="Test: ariaDescribedBy"
        ariaDescribedByText="Test: ariaDescribedBy"
        target="test"
      />,
      component => {
        const tree = component!.toJSON();
        expect(tree).toMatchSnapshot();
        ReactDOM.createPortal = createPortal;
      },
    );
  });
});
