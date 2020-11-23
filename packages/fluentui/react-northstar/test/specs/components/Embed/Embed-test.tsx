import * as React from 'react';
import { Embed } from 'src/components/Embed/Embed';
import { isConformant, handlesAccessibility } from 'test/specs/commonTests';
import { mountWithProviderAndGetComponent } from 'test/utils';

describe('Embed', () => {
  isConformant(Embed, { testPath: __filename, constructorName: 'Embed', autoControlledProps: ['active'] });

  describe('accessibility', () => {
    handlesAccessibility(Embed, { defaultRootRole: 'presentation' });
  });

  describe('onClick', () => {
    test('is called with (e, props) on a click', () => {
      const onClick = jest.fn();
      const embed = mountWithProviderAndGetComponent(Embed, <Embed onClick={onClick} />);

      embed.simulate('click');

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onClick, active: true }),
      );
    });
  });

  describe('onActiveChange', () => {
    test('is called with (e, props) on a click', () => {
      const onActiveChange = jest.fn();
      const embed = mountWithProviderAndGetComponent(Embed, <Embed onActiveChange={onActiveChange} />);

      embed.simulate('click');

      expect(onActiveChange).toHaveBeenCalledTimes(1);
      expect(onActiveChange).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'click' }),
        expect.objectContaining({ onActiveChange, active: true }),
      );
    });
  });

  describe('variables', () => {
    it('should be set by default', () => {
      const variables = mountWithProviderAndGetComponent(Embed, <Embed />).prop('variables');
      expect(variables).toEqual({});
    });
  });
});
