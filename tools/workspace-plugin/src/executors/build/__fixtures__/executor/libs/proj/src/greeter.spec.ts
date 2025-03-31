import { greeter } from './greeter';

describe('greeter', () => {
  it('should work', () => {
    expect(greeter('Hello', { name: 'Mr Wick' })).toContain('Hello');
  });
});
