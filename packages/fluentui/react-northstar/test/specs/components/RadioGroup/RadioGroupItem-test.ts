import { isConformant, handlesAccessibility } from 'test/specs/commonTests';

import { RadioGroupItem } from 'src/components/RadioGroup/RadioGroupItem';

describe('RadioGroupItem', () => {
  isConformant(RadioGroupItem, { constructorName: 'RadioGroupItem', autoControlledProps: ['checked'] });

  describe('accessibility', () => {
    handlesAccessibility(RadioGroupItem, {
      defaultRootRole: 'radio',
    });
  });
});
