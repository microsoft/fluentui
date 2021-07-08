const markdownReporter = require('./markdownReporter');
const sampleReport = require('../../__fixture__/sampleReport');

describe('markdownReporter', () => {
  it('renders a report to a file', async () => {
    const writeFile = jest.spyOn(require('fs').promises, 'writeFile').mockImplementation(() => {
      return new Promise(resolve => resolve());
    });

    await markdownReporter(sampleReport, 'commit-hash', true);
    expect(writeFile.mock.calls[0][1]).toMatchSnapshot();
  });
});
