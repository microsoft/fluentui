import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  isConformant({
    Component: Tooltip,
    displayName: 'Tooltip',
    requiredProps: {
      content: 'Tooltip content',
      relationship: 'label',
      children: <button>Trigger</button>,
      visible: true,
    },
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onVisibleChange'],
      },
    },
  });

  it('applies the default visual state and preserves a consumer class', () => {
    const { getByRole } = render(
      <Tooltip content={{ children: 'Tooltip content', className: 'consumer-class' }} relationship="description">
        <button>Trigger</button>
      </Tooltip>,
    );

    const tooltip = getByRole('tooltip', { hidden: true });
    expect(tooltip).toHaveAttribute('data-appearance', 'normal');
    expect(tooltip).toHaveClass('fui-Tooltip__content', 'consumer-class');
  });

  it('applies the inverted appearance', () => {
    const { getByRole } = render(
      <Tooltip appearance="inverted" content="Tooltip content" relationship="description">
        <button>Trigger</button>
      </Tooltip>,
    );

    expect(getByRole('tooltip', { hidden: true })).toHaveAttribute('data-appearance', 'inverted');
  });
});
