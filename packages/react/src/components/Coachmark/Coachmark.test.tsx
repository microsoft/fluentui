import * as React from 'react';
import { Coachmark } from './Coachmark';
import { safeCreate, safeMount } from '@fluentui/test-utilities';
import { resetIds } from '@fluentui/utilities';
import { isConformant } from '../../common/isConformant';
import * as path from 'path';

const ReactDOM = require('react-dom');

describe('Coachmark', () => {
  const createPortal = ReactDOM.createPortal;

  beforeEach(() => {
    resetIds();
  });

  afterEach(() => {
    ReactDOM.createPortal = createPortal;
  });

  // Conformance Tests:
  isConformant({
    Component: Coachmark,
    displayName: 'Coachmark',
    componentPath: path.join(__dirname, 'Coachmark.ts'),
    disabledTests: ['component-handles-classname', 'component-has-root-ref', 'component-handles-ref'],
  });

  // Snapshot Tests:
  it('renders Coachmark (correctly)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <Coachmark className={'test-className'} target="test-target">
        This is a test
      </Coachmark>,
      component => {
        const tree = component!.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Coachmark (isCollapsed)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(
      <Coachmark isCollapsed={false} className={'test-className'} target="test-target">
        This is a test
      </Coachmark>,
      component => {
        const tree = component!.toJSON();
        expect(tree).toMatchSnapshot();
      },
    );
  });

  it('renders Coachmark (color properties)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    safeCreate(<Coachmark beaconColorOne="green" beaconColorTwo="blue" color="red" target="test" />, component => {
      const tree = component!.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  // Accessibility Tests:
  it('correctly applies (ariaAlertText)', () => {
    safeMount(<Coachmark ariaAlertText="aria alert " target="test-target" />, component => {
      expect(component.find('[role="alert"]').getDOMNode()).toBeDefined();
    });
  });

  it('correctly applies (ariaLabelBy)', () => {
    safeMount(
      <Coachmark ariaLabelledBy="aria label" ariaLabelledByText="aria text" target="test-target" />,
      component => {
        expect(component.find('[role="dialog"]').getDOMNode().getAttribute('aria-labelledby')).toBe('aria label');
        expect(component.find('[id="aria label"]').text()).toBe('aria text');
      },
    );
  });

  it('correctly applies (ariaDescribedBy)', () => {
    safeMount(
      <Coachmark ariaDescribedBy="aria description" ariaDescribedByText="aria description text" target="test-target" />,
      component => {
        expect(component.find('[role="dialog"]').getDOMNode().getAttribute('aria-describedby')).toBe(
          'aria description',
        );
        expect(component.find('[id="aria description"]').text()).toBe('aria description text');
      },
    );
  });
});
