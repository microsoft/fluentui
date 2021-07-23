const fetch = jest.fn();
jest.mock('node-fetch', () => ({
  default: fetch,
}));

const sampleReport = require('../../__fixture__/sampleReport');
const getRemoteReport = require('./getRemoteReport');

function noop() {
  /* does nothing */
}

describe('getRemoteReport', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches a remote report', async () => {
    /** @type {Partial<import('node-fetch').Response>} */
    const value = {
      json: () => {
        return Promise.resolve(sampleReport);
      },
    };
    fetch.mockImplementation(() => Promise.resolve(value));

    const { remoteReport } = await getRemoteReport('main');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(remoteReport).toEqual(sampleReport);
  });

  it('retries to fetch a report', async () => {
    /** @type {Partial<import('node-fetch').Response>} */
    const value = {
      json: () => {
        return Promise.resolve(sampleReport);
      },
    };
    fetch
      .mockImplementationOnce(() => Promise.reject(new Error('A fetch error')))
      .mockImplementationOnce(() => Promise.reject(new Error('A fetch error')))
      .mockImplementation(() => Promise.resolve(value));

    jest.spyOn(console, 'log').mockImplementation(noop);

    const { remoteReport } = await getRemoteReport('main');

    expect(fetch).toHaveBeenCalledTimes(3);
    expect(remoteReport).toEqual(sampleReport);
  });
});
