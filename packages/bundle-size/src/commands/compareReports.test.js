const getRemoteReport = jest.fn();
const collectLocalReport = jest.fn();
const compareResultsInReports = jest.fn();
const cliReporter = jest.fn();

jest.mock('../reporters/cliReporter', () => cliReporter);
jest.mock('../utils/collectLocalReport', () => collectLocalReport);
jest.mock('../utils/compareResultsInReports', () => ({ compareResultsInReports }));
jest.mock('../utils/getRemoteReport', () => getRemoteReport);

const sampleReport = require('../../__fixture__/sampleReport');
const sampleComparedReport = require('../../__fixture__/sampleComparedReport');
const { handler } = require('./compareReports');

describe('compareReports', () => {
  it('fetches remote report and compares it with a local data', async () => {
    const branchName = 'master';

    getRemoteReport.mockImplementation(() => ({ commitSHA: 'test', remoteReport: sampleReport }));
    collectLocalReport.mockImplementation(() => sampleReport);
    compareResultsInReports.mockImplementation(() => sampleComparedReport);

    await handler({ quiet: true, branch: branchName, output: 'cli' });

    expect(getRemoteReport).toHaveBeenCalledWith(branchName);
    expect(compareResultsInReports).toHaveBeenCalledWith(sampleReport, sampleReport);
    expect(cliReporter).toHaveBeenCalledWith(sampleComparedReport);
  });
});
