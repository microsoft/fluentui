import Unstable_Datepicker from 'src/components/Datepicker/Datepicker';

describe('Datepicker', () => {
  // Currently, we don't run the isConformant test as the component is exported as Unstable_.
  // The isConformant naming convention is not prepared for this.
  it('filler_test', () => expect(Unstable_Datepicker.displayName).not.toBeNull());
});
