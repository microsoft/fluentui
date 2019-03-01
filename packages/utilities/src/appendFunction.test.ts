import { appendFunction } from './appendFunction';

describe('appendFunction', () => {
  it('can append 2 functions', () => {
    let counter = 0;
    const function1 = () => counter++;
    const function2 = () => counter++;
    const function3 = appendFunction({}, function1, function2);

    function3();
    expect(counter).toEqual(2);
  });

  it('can deal with falsey values', () => {
    let counter = 0;
    const function1 = () => counter++;
    const function2 = () => counter++;
    const function3 = appendFunction({}, function1, undefined, null, function2);

    function3();
    expect(counter).toEqual(2);
  });
});
