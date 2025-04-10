import { chopLastCamelCasePart } from './chopLastCamelCasePart';
describe('chopLastCamelCasePart', () => {
  it('Handles removing last camel case (full word)', () => {
    expect(chopLastCamelCasePart('testFunction')).toMatch('test');
  });
  it('Handles removing last camel case (singular letter)', () => {
    expect(chopLastCamelCasePart('shadowWindowInactiveKeyX')).toMatch('shadowWindowInactiveKey');
  });
  it('All lowercase gets deleted', () => {
    expect(chopLastCamelCasePart('test')).toMatch('');
  });
});
