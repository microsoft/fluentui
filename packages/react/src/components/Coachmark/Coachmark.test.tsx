import * as React from 'react';
import { Coachmark, ICoachmarkProps } from './index';
import { render, within } from '@testing-library/react';
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

    const { container } = render(
      <Coachmark className={'test-className'} target="test-target">
        This is a test
      </Coachmark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders Coachmark (isCollapsed)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    const { container } = render(
      <Coachmark isCollapsed={false} className={'test-className'} target="test-target">
        This is a test
      </Coachmark>,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders Coachmark (color properties)', () => {
    ReactDOM.createPortal = jest.fn(element => element);

    const { container } = render(<Coachmark beaconColorOne="green" beaconColorTwo="blue" color="red" target="test" />);
    expect(container).toMatchSnapshot();
  });

  // Accessibility Tests:
  it('correctly applies (ariaAlertText)', () => {
    const { getByRole } = render(<Coachmark ariaAlertText="aria alert " target="test-target" />);
    expect(getByRole('alert')).toBeTruthy();
  });

  it('correctly applies (ariaLabelBy)', () => {
    const { getByRole } = render(
      <Coachmark
        ariaLabelledBy="aria label"
        ariaLabelledByText="aria text"
        target={document as ICoachmarkProps['target']}
      />,
    );

    //coachmark is hidden since it has a parent wrapper with role=presentation when not in a collapsed state.
    const coachmark = getByRole('dialog', { hidden: true });
    expect(coachmark.getAttribute('aria-labelledby')).toBe('aria label');
    expect(within(coachmark).queryByText('aria text')).toBeTruthy();
  });

  it('correctly applies (ariaDescribedBy)', () => {
    const { getByRole } = render(
      <Coachmark
        ariaDescribedBy="aria description"
        ariaDescribedByText="aria description text"
        target={document as ICoachmarkProps['target']}
      />,
    );

    //coachmark is hidden since it has a parent wrapper with role=presentation when not in a collapsed state.
    const coachmark = getByRole('dialog', { hidden: true });
    expect(coachmark.getAttribute('aria-describedby')).toBe('aria description');
    expect(within(coachmark).queryByText('aria description text')).toBeTruthy();
  });
});
