import { Datepicker } from 'src/components/Datepicker/Datepicker';

describe('Datepicker', () => {
  // Currently, we don't run the isConformant test as the component is exported as Unstable_.
  // The isConformant naming convention is not prepared for this (className, constructorName, docBlock descriptions).
  it('filler_test', () => expect(Datepicker.displayName).not.toBeNull());
});
