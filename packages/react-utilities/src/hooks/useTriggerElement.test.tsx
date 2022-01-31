import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';

import { useTriggerElement } from './useTriggerElement';

type TestTriggerProps = React.HTMLAttributes<unknown> & {
  children: React.ReactElement;
  onCustom?: () => void;
};

const TestTrigger = React.forwardRef<unknown, TestTriggerProps>((props, ref) => {
  const { children, onCustom, ...rest } = props;
  const element = useTriggerElement({
    children,
    ref,
    outerProps: rest,
    overrideProps: {
      onClick: () => onCustom?.(),
      role: 'button',
    },
  });

  return <>{element}</>;
});

describe('useTriggerElement', () => {
  it('merges refs properly', () => {
    const outerRef = jest.fn();
    const childRef = jest.fn();

    render(
      <TestTrigger ref={outerRef}>
        <div ref={childRef}>test</div>
      </TestTrigger>,
    );

    expect(outerRef).toHaveBeenCalledWith(expect.any(Element));
    expect(childRef).toHaveBeenCalledWith(expect.any(Element));
  });

  describe('callbacks', () => {
    it('merges bubbled callbacks properly', () => {
      const outerOnClick = jest.fn();
      const outerOnCustom = jest.fn();

      const childOnClick = jest.fn();

      const { queryByText } = render(
        <TestTrigger onClick={outerOnClick} onCustom={outerOnCustom}>
          <div onClick={childOnClick}>test</div>
        </TestTrigger>,
      );
      const element = queryByText('test')!;

      fireEvent.click(element);

      expect(outerOnClick).toHaveBeenCalledTimes(1);
      expect(outerOnCustom).toHaveBeenCalledTimes(1);
      expect(childOnClick).toHaveBeenCalledTimes(1);
    });

    it('merges captured callbacks properly', () => {
      const outerOnClickCapture = jest.fn();
      const childOnClickCapture = jest.fn();

      const { queryByText } = render(
        <TestTrigger onClick={outerOnClickCapture}>
          <div onClick={childOnClickCapture}>test</div>
        </TestTrigger>,
      );
      const element = queryByText('test')!;

      fireEvent.click(element);

      expect(outerOnClickCapture).toHaveBeenCalledTimes(1);
      expect(childOnClickCapture).toHaveBeenCalledTimes(1);
    });
  });

  describe('props', () => {
    it('props from child always win', () => {
      const { queryByRole, queryByTitle } = render(
        <TestTrigger role="menu" title="title on a trigger">
          <div role="none" title="title on a child">
            test
          </div>
        </TestTrigger>,
      );

      expect(queryByRole('none')).toBeDefined();
      expect(queryByTitle('title on a child')).toBeDefined();

      expect(queryByRole('menu')).toBeNull();
      expect(queryByTitle('title on a trigger')).toBeNull();
    });

    it('props from overrides win over outer', () => {
      const { queryByRole, queryByTitle } = render(
        <TestTrigger role="menu" title="title on a trigger">
          <div>test</div>
        </TestTrigger>,
      );

      expect(queryByRole('button')).toBeDefined();
      expect(queryByTitle('title on a trigger')).toBeDefined();
    });
  });
});
