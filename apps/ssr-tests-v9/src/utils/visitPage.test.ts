import type { Page } from 'puppeteer';
import { visitUrl } from './visitPage';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('visitUrl', () => {
  it('calls .goto() 5 times before a failure', async () => {
    expect.assertions(2);

    jest.spyOn(console, 'warn').mockImplementation(noop);
    jest.spyOn(console, 'error').mockImplementation(noop);

    const pageMock: Partial<Page> = {
      goto: jest.fn().mockImplementation(() => Promise.reject(new Error('page wont open - mock'))),
    };

    await expect(visitUrl(pageMock as Page, 'https://localhost:8080')).rejects.toMatchInlineSnapshot(
      `[Error: page wont open - mock]`,
    );
    expect(pageMock.goto).toHaveBeenCalledTimes(5);
  });

  it('calls .goto once if successful', async () => {
    expect.assertions(2);

    const pageMock: Partial<Page> = {
      goto: jest.fn(),
    };

    await expect(visitUrl(pageMock as Page, 'https://localhost:8080')).resolves.toBeUndefined();
    expect(pageMock.goto).toHaveBeenCalledTimes(1);
  });
});
