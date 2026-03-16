import * as React from 'react';
import { render } from '@testing-library/react';
import { getBySelector } from '../../../common/testUtilities';
import { Stack } from '../Stack';

describe('Stack Item', () => {
  it('allows className from child component to be rendered', () => {
    const { container } = render(
      <Stack>
        <div className="test" />
      </Stack>,
    );

    expect(getBySelector(container, 'div.test')).toBeTruthy();
  });

  it('can handle having a class in a child of an explicit Stack.Item component', () => {
    const { container } = render(
      <Stack>
        <Stack.Item>
          <div className="test" />
        </Stack.Item>
      </Stack>,
    );

    expect(getBySelector(container, 'div.test')).toBeTruthy();
  });

  it('can handle not having a class', () => {
    const { container } = render(
      <Stack>
        <Stack.Item>
          <div />
        </Stack.Item>
      </Stack>,
    );

    expect(container.querySelector('.test')).toBeNull();
  });

  it('can handle having no children', () => {
    const createEmptyStackItem = () => {
      render(
        <Stack>
          <Stack.Item />
        </Stack>,
      );
    };

    expect(createEmptyStackItem).not.toThrow();
  });

  it('includes the classNames on both a StackItem and its child', () => {
    const stackItemClassName = 'stackItemClass';
    const childClassName = 'childClass';

    const { container } = render(
      <Stack>
        <Stack.Item className={stackItemClassName}>
          <span className={childClassName} />
        </Stack.Item>
      </Stack>,
    );

    const stack = container.querySelectorAll('div')[1];
    const stackClass = stack?.className;
    const child = container.querySelector('span');
    const childClass = child?.className;

    expect(stackClass).toContain(stackItemClassName);
    expect(childClass).toContain(childClassName);
  });
});
