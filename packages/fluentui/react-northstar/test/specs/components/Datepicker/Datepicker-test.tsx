import { Unstable_Datepicker } from 'src/components/Datepicker/Unstable_Datepicker';

describe('Datepicker', () => {
  // Currently, we don't run the isConformant test as the component is exported as Unstable_.
  // The isConformant naming convention is not prepared for this (className, constructorName, docBlock descriptions).
  it('filler_test', () => expect(Unstable_Datepicker.displayName).not.toBeNull());
});
