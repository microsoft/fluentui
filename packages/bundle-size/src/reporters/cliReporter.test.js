const stripAnsi = require('strip-ansi');

const cliReporter = require('./cliReporter');
const sampleComparedReport = require('../../__fixture__/sampleComparedReport');

function noop() {
  /* does nothing */
}

// We are using "chalk" and "cli-table3" in this reporter, they are adding colors to the output via escape codes that
// makes snapshots look ugly.
//
// It could be disabled for "chalk" but "colors" that is used "cli-table3" is not our dependency.
expect.addSnapshotSerializer({
  test(val) {
    return typeof val === 'string';
  },
  print(val) {
    /**
     * test function makes sure that value is the guarded type
     */
    const _val = /** @type {string} */ (val);

    return stripAnsi(_val);
  },
});

describe('cliReporter', () => {
  it('renders a report to CLI output', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(noop);
    await cliReporter(sampleComparedReport);

    expect(log.mock.calls[0][0]).toMatchInlineSnapshot(`
      ┌────────────────────┬────────┬───────────────────────┐
      │ Fixture            │ Before │ After (minified/GZIP) │
      ├────────────────────┼────────┼───────────────────────┤
      │ baz-package        │    0 B │            100%↑ 1 kB │
      │ An entry with diff │    0 B │           100%↑ 100 B │
      ├────────────────────┼────────┼───────────────────────┤
      │ foo-package        │    N/A │            100%↑ 1 kB │
      │ New entry (new)    │    N/A │           100%↑ 100 B │
      └────────────────────┴────────┴───────────────────────┘
    `);
  });
});
