import { addProjectConfiguration, ProjectType, stripIndents, writeJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { execSync, spawnSync, SpawnSyncReturns } from 'child_process';
import { workspacePaths } from '../../utils';
import epicGenerator from './index';

jest.mock('child_process');
const execSyncMock = execSync as unknown as jest.Mock<string>;
const spawnSyncMock = spawnSync as unknown as jest.Mock<Partial<SpawnSyncReturns<string[]>>>;

type Package = {
  name: string;
  version: string;
  projectType: ProjectType;
  owners: string[];
};

function setupTest(packages: Package[]) {
  const tree = createTreeWithEmptyWorkspace();

  // Initialize NX package structure
  packages.forEach(pckg => {
    // package.json initialization
    writeJson(tree, `packages/${pckg.name}/package.json`, {
      name: pckg.name,
      version: pckg.version,
    });

    // workspace.json initialization
    addProjectConfiguration(tree, pckg.name, {
      root: `packages/${pckg.name}`,
      projectType: pckg.projectType,
    });
  });

  // set mock CODEOWNERS file
  const codeownersContent = packages
    .map(pckg => {
      const rootPath = pckg.projectType === 'application' ? 'apps' : 'packages';

      return `${rootPath}/${pckg.name} ${pckg.owners.join(' ')}`;
    })
    .join('\n');
  tree.write(workspacePaths.github.codeowners, codeownersContent);

  // response to 'gh auth'
  spawnSyncMock.mockReturnValueOnce({
    output: [['Logged in to github.com']],
  });

  // response to epic creation
  execSyncMock.mockReturnValueOnce('epicUrl');

  /**
   * Responses for each of the packages created
   * Mimics implementation and adds an "unknown" owner to mock
   * for packages with no owner
   * Only accepts teams as owners (discards owners with no '/')
   */
  packages
    .filter(pckg => pckg.projectType === 'library')
    .flatMap(pckg => (pckg.owners.length > 0 ? pckg.owners : ['unknown']))
    .reduce<string[]>((acc, owner) => {
      if (owner.includes('/') && !acc.includes(owner)) {
        acc.push(owner);
      }

      return acc;
    }, [])
    .forEach(owner => {
      execSyncMock.mockReturnValueOnce(`issueUrl-${owner}`);
    });

  // response to editing the epic
  execSyncMock.mockReturnValueOnce('epicUrl');

  return tree;
}

describe('epic-generator', () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  describe('validation', () => {
    it('requires a non-empty title', () => {
      const tree = createTreeWithEmptyWorkspace();

      expect(() =>
        epicGenerator(tree, { title: ' ', repository: 'microsoft/fluentui' }),
      ).toThrowErrorMatchingInlineSnapshot(`"Must provide a title for the issue"`);
    });

    it('requires a well formatted repository', () => {
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, { title: 'test title', repository: 'invalid_repo' }))
        .toThrowErrorMatchingInlineSnapshot(`
        "You provided \\"invalid_repo\\", which is an invalid repository name.
        Please follow the format {owner}/{repositoryName}."
      `);
    });
  });

  describe('authentication', () => {
    it('requires gh to be installed', () => {
      spawnSyncMock.mockReturnValueOnce({
        error: new Error('command not found.'),
      });
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, { title: 'test title', repository: 'microsoft/fluentui' }))
        .toThrowErrorMatchingInlineSnapshot(`
        "Error calling GitHub CLI (gh). Please make sure it's installed correctly.
        command not found."
      `);
    });

    it('requires you to have logged in with gh', () => {
      spawnSyncMock.mockReturnValueOnce({
        output: [['You are not logged into any GitHub hosts. Run gh auth login to authenticate.']],
      });

      const tree = createTreeWithEmptyWorkspace();

      expect(() =>
        epicGenerator(tree, { title: 'test title', repository: 'microsoft/fluentui' }),
      ).toThrowErrorMatchingInlineSnapshot(`"You are not logged into GitHub CLI (gh)."`);
    });
  });

  describe('issue generation', () => {
    it('handles a real life scenario', () => {
      const packages: Package[] = [
        {
          name: 'public-docsite',
          version: '9.0.0',
          projectType: 'application',
          owners: ['@microsoft/fluentui-v8-website'],
        },
        {
          name: 'react-link',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/cxe-red', '@khmakoto', '@microsoft/cxe-coastal'],
        },
        {
          name: 'react-card',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/cxe-prg'],
        },
        {
          name: 'react',
          version: '8.0.0',
          projectType: 'library',
          owners: ['@microsoft/cxe-red'],
        },
        {
          name: 'react-menu',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/teams-prg'],
        },
        {
          name: 'react-button',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/cxe-red', '@khmakoto'],
        },
        {
          name: 'misterious-unowned-package',
          version: '9.0.0',
          projectType: 'library',
          owners: [],
        },
        {
          name: 'react-slider',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/cxe-coastal', '@micahgodbolt'],
        },
        {
          name: 'vr-tests',
          version: '9.0.0',
          projectType: 'application',
          owners: ['@microsoft/fluentui-react'],
        },
        {
          name: 'react-accordion',
          version: '9.0.0',
          projectType: 'library',
          owners: ['@microsoft/teams-prg', '@microsoft/cxe-coastal'],
        },
      ];
      const tree = setupTest(packages);

      const effectsCall = epicGenerator(tree, {
        title: 'test title',
        repository: 'cool-company/repository',
      });
      effectsCall();

      expect(execSyncMock).nthCalledWith(
        1,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title" --body "*Description to be added*"`,
      );

      // @microsoft/cxe-red issue creation
      expect(execSyncMock).nthCalledWith(
        2,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-red" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-link
        - react-button"`,
      );
      // @microsoft/cxe-prg issue creation
      expect(execSyncMock).nthCalledWith(
        3,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-prg" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-card"`,
      );
      // @microsoft/teams-prg issue creation
      expect(execSyncMock).nthCalledWith(
        4,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/teams-prg" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-menu
        - react-accordion"`,
      );
      // no owner issue creation
      expect(execSyncMock).nthCalledWith(
        5,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - ownerless" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - misterious-unowned-package"`,
      );
      // @microsoft/cxe-coastal issue creation
      expect(execSyncMock).nthCalledWith(
        6,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-coastal" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-slider"`,
      );

      // epic edit to add sub-issues
      expect(execSyncMock).nthCalledWith(
        7,
        stripIndents`gh issue edit epicUrl --body "*Description to be added*

        ### Packages that need migration:
        - [ ] issueUrl-@microsoft/cxe-red
          - react-link
          - react-button
        - [ ] issueUrl-@microsoft/cxe-coastal
          - react-card
        - [ ] issueUrl-@microsoft/cxe-prg
          - react-menu
          - react-accordion
        - [ ] issueUrl-@microsoft/teams-prg
          - misterious-unowned-package
        - [ ] epicUrl
          - react-slider"`,
      );
    });
  });
});
