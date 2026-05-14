import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './Spinner';
import { isConformant } from '../../testing/isConformant';
import { spinnerClassNames, spinnerTailArcClassNames } from './useSpinnerStyles.styles';

describe('Spinner', () => {
  isConformant({
    Component: Spinner,
    displayName: 'Spinner',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            label: 'Test Label',
          },
        },
      ],
    },
  });

  it('has role progressbar', () => {
    const result = render(<Spinner label="Default Spinner" />);
    expect(result.queryByRole('progressbar')).toBeDefined();
  });

  it('renders Spinner with a label', () => {
    const result = render(<Spinner label="Loading" />);
    expect(result.getByText('Loading')).toBeDefined();
    expect(result.getByRole('progressbar')).toBeDefined();
  });

  it('doesnt render svg when slot is null', () => {
    const result = render(<Spinner spinner={null} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
  });

  it('doesnt render svg when spinner styles is overridden', () => {
    const testId = 'test-id';
    const result = render(<Spinner id={testId} spinner={{ style: { visibility: 'hidden' } }} />);
    expect(result.getByRole('progressbar').getAttribute('id')).toEqual('test-id');
  });

  it('doesnt render Spinner or its label instantaneously when delay is added', () => {
    const result = render(<Spinner delay={1000} />);
    expect(result.container.getElementsByClassName('fui-Spinner__Progressbar')).toBeNull;
    expect(result.container.getElementsByClassName('fui-Spinner__label')).toBeNull;
  });

  it('renders span as a root slot tag', () => {
    const result = render(<Spinner as="span" />);
    expect(result.getByRole('progressbar').tagName).toBe('SPAN');
  });

  describe('motion slots', () => {
    it('renders spinner with default motion slots', () => {
      const result = render(<Spinner />);
      const spinnerEl = result.container.querySelector(`.${spinnerClassNames.spinner}`);
      const spinnerTail = result.container.querySelector(`.${spinnerClassNames.spinnerTail}`);

      expect(spinnerEl).not.toBeNull();
      expect(spinnerTail).not.toBeNull();
    });

    it('renders arc span elements inside spinnerTail', () => {
      const result = render(<Spinner />);
      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);

      // Two arc spans: one for leadArc and one for trailArc
      expect(arcElements).toHaveLength(2);
    });

    it('renders correctly when rotationMotion is null', () => {
      const result = render(<Spinner rotationMotion={null} />);

      // Spinner should still render its structure
      const spinnerEl = result.container.querySelector(`.${spinnerClassNames.spinner}`);
      expect(spinnerEl).not.toBeNull();

      const spinnerTail = result.container.querySelector(`.${spinnerClassNames.spinnerTail}`);
      expect(spinnerTail).not.toBeNull();
    });

    it('renders correctly when tailMotion is null', () => {
      const result = render(<Spinner tailMotion={null} />);

      const spinnerTail = result.container.querySelector(`.${spinnerClassNames.spinnerTail}`);
      expect(spinnerTail).not.toBeNull();

      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);
      expect(arcElements).toHaveLength(2);
    });

    it('renders correctly when leadArcMotion is null', () => {
      const result = render(<Spinner leadArcMotion={null} />);

      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);
      expect(arcElements).toHaveLength(2);
    });

    it('renders correctly when trailArcMotion is null', () => {
      const result = render(<Spinner trailArcMotion={null} />);

      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);
      expect(arcElements).toHaveLength(2);
    });

    it('renders correctly when all motion slots are null', () => {
      const result = render(
        <Spinner rotationMotion={null} tailMotion={null} leadArcMotion={null} trailArcMotion={null} />,
      );

      const spinnerEl = result.container.querySelector(`.${spinnerClassNames.spinner}`);
      expect(spinnerEl).not.toBeNull();

      const spinnerTail = result.container.querySelector(`.${spinnerClassNames.spinnerTail}`);
      expect(spinnerTail).not.toBeNull();

      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);
      expect(arcElements).toHaveLength(2);
    });

    it('does not render motion content when shouldRenderSpinner is false (delay)', () => {
      const result = render(<Spinner delay={5000} />);

      const spinnerEl = result.container.querySelector(`.${spinnerClassNames.spinner}`);
      expect(spinnerEl).toBeNull();

      const arcElements = result.container.querySelectorAll(`.${spinnerTailArcClassNames.arc}`);
      expect(arcElements).toHaveLength(0);
    });
  });
});
