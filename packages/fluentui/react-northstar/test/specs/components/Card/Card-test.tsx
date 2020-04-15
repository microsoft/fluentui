import * as React from 'react';
import Card from 'src/components/Card/Card';
import { handlesAccessibility, isConformant } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';

describe('Card', () => {
  isConformant(Card, { constructorName: 'Card' });

  describe('accessiblity', () => {
    handlesAccessibility(Card, { defaultRootRole: 'group' });
  });

  describe('onClick', () => {
    test('is called with (e, props) on a click', () => {
      const onClick = jest.fn();
      const card = mountWithProviderAndGetComponent(Card, <Card onClick={onClick} />);

      card.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onClick }),
      );
    });
  });
});
