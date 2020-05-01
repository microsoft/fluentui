import { Customizations } from './Customizations';

describe('Customizations', () => {
  beforeEach(() => {
    Customizations.reset();
  });

  it('can set/get global settings', () => {
    Customizations.applySettings({ a: 'a', b: 'b' });

    expect(Customizations.getSettings(['a', 'b'])).toEqual({
      a: 'a',
      b: 'b',
    });

    expect(Customizations.getSettings(['a'])).toEqual({
      a: 'a',
    });

    expect(Customizations.getSettings(['z'])).toEqual({});
  });

  it('can set/get scoped settings', () => {
    Customizations.applyScopedSettings('Foo', { a: 'a', b: 'b' });

    expect(Customizations.getSettings(['a', 'b'], 'Foo')).toEqual({
      a: 'a',
      b: 'b',
    });

    expect(Customizations.getSettings(['a'], 'Bar')).toEqual({});
  });

  it('can fire changes', () => {
    let counter = 0;
    let incCounter = () => counter++;

    Customizations.observe(incCounter);

    Customizations.applyScopedSettings('Foo', { a: 'a', b: 'b' });
    Customizations.applySettings({ a: 'a', b: 'b' });

    expect(counter).toEqual(2);
    Customizations.unobserve(incCounter);

    Customizations.applySettings({ a: 'a', b: 'b' });
    expect(counter).toEqual(2);
  });
});
