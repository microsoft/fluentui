import { debounce } from './debounce';

describe('debounce', () => {
  const tick = () => new Promise(res => setTimeout(res, 0));

  beforeAll(() => {
    // Remove NODE_ENV = 'test' to properly test debounce feature
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('will only run once per tick', async () => {
    let count = 0;
    const debounced = debounce(() => count++);

    for (let i = 0; i < 1000; i++) {
      debounced();
    }

    await tick();

    expect(count).toBe(1);

    for (let i = 0; i < 1000; i++) {
      debounced();
    }

    await tick();

    expect(count).toBe(2);
  });
});
