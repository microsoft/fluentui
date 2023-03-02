import { main } from './triage-bot';
import type { GithubScriptsParams } from './types';
describe(`triage bot`, () => {
  function setup(options: { issueBody: string }) {
    const coreSpy = {
      startGroup: jest.fn(),
      endGroup: jest.fn(),
      notice: jest.fn(),
      info: jest.fn(),
    };
    const githubSpy = {
      rest: { issues: { addLabels: jest.fn(), addAssignees: jest.fn() } },
    };
    const contextSpy = {
      payload: { issue: { body: options.issueBody } },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      issue: { number: 1 },
      repo: { owner: 'harold', repo: 'tools' },
    } as GithubScriptsParams['context'];

    return { core: coreSpy, github: githubSpy, context: contextSpy };
  }
  it(`should not do anything if no keyword matches issue content`, async () => {
    const githubApi = setup({ issueBody: 'This is a bug about hello. For sure its wrong' });
    const config = {
      params: [
        {
          keyword: 'kekw',
          labels: ['bug'],
          assignees: [],
        },
      ],
    };

    await main({ ...(githubApi as unknown as GithubScriptsParams), config });

    expect(githubApi.github.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(githubApi.github.rest.issues.addAssignees).not.toHaveBeenCalled();
  });

  it(`should assign label`, async () => {
    const githubApi = setup({ issueBody: 'This is a bug about hello. For sure its wrong' });
    const config = {
      params: [
        {
          keyword: 'hello',
          labels: ['bug'],
          assignees: [],
        },
      ],
    };
    githubApi.github.rest.issues.addLabels.mockReturnValueOnce(Promise.resolve({ status: 200 }));

    await main({ ...(githubApi as unknown as GithubScriptsParams), config });

    expect(formatMockedCalls(githubApi.core.info.mock.calls)).toMatchInlineSnapshot(`"Label set: bug"`);
  });

  it(`should assign label and assignees`, async () => {
    const githubApi = setup({ issueBody: 'This is a bug about hello. For sure its wrong' });
    const config = {
      params: [
        {
          keyword: 'hello',
          labels: ['bug'],
          assignees: ['harold'],
        },
      ],
    };
    githubApi.github.rest.issues.addLabels.mockReturnValueOnce(Promise.resolve({ status: 200 }));
    githubApi.github.rest.issues.addAssignees.mockReturnValueOnce(Promise.resolve({ status: 201 }));
    await main({ ...(githubApi as unknown as GithubScriptsParams), config });

    expect(formatMockedCalls(githubApi.core.info.mock.calls)).toMatchInlineSnapshot(`
      "Label set: bug
      Assignees set: harold"
    `);
  });
});

function formatMockedCalls(values: string[][]) {
  return values
    .flat()
    .map(line => line.trim())
    .join('\n');
}
