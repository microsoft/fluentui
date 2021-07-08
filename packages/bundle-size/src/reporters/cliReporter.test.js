// Mock "chalk" to avoid special characters in output
/** @param {string} val */
function colorNoop(val) {
  return val;
}

jest.mock('chalk', () => ({
  bold: colorNoop,

  cyan: colorNoop,
  green: colorNoop,
  red: colorNoop,
}));

const cliReporter = require('./cliReporter');
const sampleReport = require('./sampleReport');

describe('cliReporter', () => {
  it('renders a report to CLI output', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {
      /* does nothing */
    });
    await cliReporter(sampleReport);

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`
      "┌────────────────────┬────────┬───────────────────────┐
      │ Fixture            │ Before │ After (minified/GZIP) │
      ├────────────────────┼────────┼───────────────────────┤
      │ baz-package        │   2 kB │            100%↑ 1 kB │
      │ An entry with diff │  200 B │           100%↑ 100 B │
      ├────────────────────┼────────┼───────────────────────┤
      │ foo-package        │    N/A │            100%↑ 1 kB │
      │ New entry (new)    │    N/A │           100%↑ 100 B │
      └────────────────────┴────────┴───────────────────────┘"
    `);
  });
});
