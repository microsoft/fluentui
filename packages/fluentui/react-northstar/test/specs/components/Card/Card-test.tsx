import * as React from 'react';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';
import Card from 'src/components/Card/Card';

describe('Card', () => {
  isConformant(Card, { constructorName: 'Card' });

  describe('accessiblity', () => {
    handlesAccessibility(Card, { defaultRootRole: 'group' });
  });

  it('renders as `div`', () => {
    const card = mountWithProviderAndGetComponent(Card, <Card />)
      .find('.ui-card')
      .hostNodes();

    expect(card.is('div')).toBe(true);
  });
});
