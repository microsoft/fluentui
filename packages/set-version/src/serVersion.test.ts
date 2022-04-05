import { setVersion } from './setVersion';

describe('setVersion', () => {
  it('should only insert packageversion once for a bundle', () => {
    setVersion('a', '1');
    setVersion('a', '1');
    setVersion('a', '1');
    setVersion('a', '1');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((window as any).__packages__.a.length).toBe(1);
  });
});
