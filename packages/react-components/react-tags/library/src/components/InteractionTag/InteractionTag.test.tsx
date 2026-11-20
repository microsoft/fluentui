import * as React from 'react';
import { render } from '@testing-library/react';
import { InteractionTag } from './InteractionTag';
import { isConformant } from '../../testing/isConformant';
import { InteractionTagPrimary } from '../InteractionTagPrimary';
import { InteractionTagSecondary } from '../InteractionTagSecondary';

const requiredProps = {
  children: 'test',
};

describe('InteractionTag', () => {
  isConformant({
    Component: InteractionTag,
    displayName: 'InteractionTag',
    requiredProps,
  });

  it('should set aria-labelledby with ids of InteractionTagPrimary and InteractionTagSecondary', () => {
    const { getByTestId } = render(
      <InteractionTag>
        <InteractionTagPrimary>{'tag'}</InteractionTagPrimary>
        <InteractionTagSecondary data-testid="secondary" aria-label="remove" />
      </InteractionTag>,
    );
    expect(getByTestId('secondary').getAttribute('aria-labelledby')).toMatchInlineSnapshot(
      `"fui-InteractionTagPrimary-_r_f_ fui-InteractionTagSecondary-_r_g_"`,
    );
  });
});

describe('InteractionTag DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container, getByTestId } = render(
      <InteractionTag appearance="brand" disabled selected shape="circular" size="small" value="tag-value">
        <InteractionTagPrimary
          data-testid="primary"
          hasSecondaryAction
          icon="i"
          media="m"
          primaryText="p"
          secondaryText="s"
        />
        <InteractionTagSecondary aria-label="remove" data-testid="secondary" />
      </InteractionTag>,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class', 'id']);
    expect(getByTestId('primary').getAttributeNames().sort()).toEqual(['class', 'data-testid', 'disabled', 'id']);
    expect(getByTestId('secondary').getAttributeNames().sort()).toEqual([
      'aria-label',
      'aria-labelledby',
      'class',
      'data-testid',
      'disabled',
      'id',
      'type',
    ]);
  });
});
