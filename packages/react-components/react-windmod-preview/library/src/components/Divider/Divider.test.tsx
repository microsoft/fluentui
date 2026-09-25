import * as React from 'react';
import { render } from '@testing-library/react';

import { Divider } from './Divider';
import { isConformant } from '../../testing/isConformant';
import type { DividerState } from './Divider.types';
import { dividerClassNames, useDividerStyles } from './useDividerStyles';

describe('Divider', () => {
  isConformant({
    Component: Divider,
    displayName: 'Divider',
  });

  it('stamps data-align-content and the marker class', () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="default">Default</Divider>
        <Divider data-testid="end" alignContent="end">
          End
        </Divider>
      </>,
    );

    expect(getByTestId('default').getAttribute('data-align-content')).toBe('center');
    expect(getByTestId('end').getAttribute('data-align-content')).toBe('end');
    expect(getByTestId('default').className).toContain(dividerClassNames.root);
    expect(getByTestId('default')).toHaveClass('fui-divider');
    expect(getByTestId('default')).toHaveClass('group/fui-divider');
    expect(getByTestId('default').classList[0]).toBe('fui-divider');
  });

  it('swaps exactly one module class per appearance', () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="default">Default</Divider>
        <Divider data-testid="brand" appearance="brand">
          Brand
        </Divider>
      </>,
    );

    // appearance is the one look prop carried by a module class rather than a data attribute.
    const defaultClasses = getByTestId('default').className.split(' ');
    const brandClasses = getByTestId('brand').className.split(' ');

    expect(brandClasses).toHaveLength(defaultClasses.length);
    expect(brandClasses.filter(name => !defaultClasses.includes(name))).toHaveLength(1);
  });

  it('stamps data-inset only when inset', () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="plain">Plain</Divider>
        <Divider data-testid="inset" inset>
          Inset
        </Divider>
      </>,
    );

    expect(getByTestId('plain').hasAttribute('data-inset')).toBe(false);
    expect(getByTestId('inset').hasAttribute('data-inset')).toBe(true);
  });

  it('stamps data-empty only when children are undefined', () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="empty" />
        <Divider data-testid="withChildren">Content</Divider>
        <Divider data-testid="falsyString">{''}</Divider>
        <Divider data-testid="falsyNumber">{0}</Divider>
      </>,
    );

    expect(getByTestId('empty').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('withChildren').hasAttribute('data-empty')).toBe(false);
    // Falsy-but-defined children (renderDivider's own gate is `=== undefined`, not truthiness).
    expect(getByTestId('falsyString').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('falsyNumber').hasAttribute('data-empty')).toBe(false);
  });

  it('passes vertical through to the headless hook', () => {
    const { getByTestId } = render(
      <>
        <Divider data-testid="horizontal">Horizontal</Divider>
        <Divider data-testid="vertical" vertical>
          Vertical
        </Divider>
      </>,
    );

    expect(getByTestId('horizontal').getAttribute('data-orientation')).toBe('horizontal');
    expect(getByTestId('vertical').getAttribute('data-orientation')).toBe('vertical');
    expect(getByTestId('vertical').getAttribute('aria-orientation')).toBe('vertical');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      alignContent: 'center',
      appearance: 'default',
      components: { root: 'div', wrapper: 'div' },
      inset: true,
      root: { as: 'div', children: 'Content', className: 'consumer' },
      vertical: false,
      wrapper: { as: 'div' },
    } as unknown as DividerState;

    const styled = useDividerStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root).not.toHaveProperty('data-align-content');
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.wrapper).toBe(state.wrapper);
  });
});
