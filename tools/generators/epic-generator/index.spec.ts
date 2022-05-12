import { addProjectConfiguration, ProjectType, serializeJson, stripIndents } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { execSync } from 'child_process';
import epicGenerator from './index';
import { readFileSync } from 'fs';

jest.mock('child_process');
// @ts-ignore
const execSyncMock = <jest.Mock<string>>execSync;

jest.mock('fs');
// @ts-ignore
const readFileSyncMock = <jest.Mock<string>>readFileSync;

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
    tree.write(
      `packages/${pckg.name}/package.json`,
      serializeJson({
        name: pckg.name,
        version: pckg.version,
      }),
    );

    // workspace.json initialization
    addProjectConfiguration(tree, pckg.name, {
      root: `packages/${pckg.name}`,
      projectType: pckg.projectType,
    });
  });

  // set mock CODEOWNERS response for readFileSync
  const codeownersContent = packages
    .map(pckg => {
      const rootPath = pckg.projectType === 'application' ? 'apps' : 'packages';

      return `${rootPath}/${pckg.name} ${pckg.owners.join(' ')}`;
    })
    .join('\n');
  readFileSyncMock.mockReturnValueOnce(codeownersContent);

  // set execSync mock calls
  execSyncMock.mockReturnValueOnce('Logged in to github.com.'); // response to 'gh auth'
  execSyncMock.mockReturnValueOnce('epicUrl'); // response to epic creation

  /**
   * Responses for each of the packages created
   * Mimics implementation and adds an "unknown" owner to mock
   * for packages with no owner
   * Only accepts teams as owners (discards owners with no '/')
   */
  packages
    .filter(pckg => pckg.projectType == 'library')
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

  execSyncMock.mockReturnValueOnce('epicUrl'); // response to editing the epic

  return tree;
}

describe('epic-generator', () => {
  describe('validation', () => {
    it('requires a title', () => {
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, {} as any)).toThrowErrorMatchingInlineSnapshot(
        `"Must provide a title for the issue"`,
      );
    });

    it('requires a non-empty title', () => {
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, { title: ' ' })).toThrowErrorMatchingInlineSnapshot(
        `"Must provide a title for the issue"`,
      );
    });

    it('requires a well formatted repository', () => {
      const tree = createTreeWithEmptyWorkspace();

      expect(() =>
        epicGenerator(tree, { title: 'test title', repository: 'invalid_repo' }),
      ).toThrowErrorMatchingInlineSnapshot(
        `"Must provide a valid repository with the format {owner}/{repositoryName}"`,
      );
    });
  });

  describe('authentication', () => {
    it('requires gh to be installed', () => {
      execSyncMock.mockImplementationOnce(() => {
        throw new Error('command not found.');
      });
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, { title: 'test title' })).toThrowErrorMatchingInlineSnapshot(`
        "Error calling GitHub CLI (gh). Please make sure it's installed correctly.
        command not found."
      `);
    });

    it('requires you to have logged in with gh', () => {
      execSyncMock.mockReturnValueOnce('You are not logged into any GitHub hosts. Run gh auth login to authenticate.');
      const tree = createTreeWithEmptyWorkspace();

      expect(() => epicGenerator(tree, { title: 'test title' })).toThrowErrorMatchingInlineSnapshot(
        `"You are not logged into GitHub CLI (gh)."`,
      );
    });
  });

  describe('issue generation', () => {
    it('uses defaults', () => {
      const tree = setupTest([]);

      const effectsCall = epicGenerator(tree, {
        title: 'test title',
      });
      effectsCall();

      expect(execSyncMock).nthCalledWith(
        2,
        'gh issue create --repo "microsoft/fluentui" --title "test title" --body "*Description to be added*"',
      );
    });

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

      // @microsoft/cxe-red issue creation
      expect(execSyncMock).nthCalledWith(
        3,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-red" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-link
        - react-button"`,
      );
      // @microsoft/cxe-prg issue creation
      expect(execSyncMock).nthCalledWith(
        4,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-prg" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-card"`,
      );
      // @microsoft/teams-prg issue creation
      expect(execSyncMock).nthCalledWith(
        5,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/teams-prg" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-menu
        - react-accordion"`,
      );
      // no owner issue creation
      expect(execSyncMock).nthCalledWith(
        6,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - ownerless" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - misterious-unowned-package"`,
      );
      // @microsoft/cxe-coastal issue creation
      expect(execSyncMock).nthCalledWith(
        7,
        stripIndents`gh issue create --repo "cool-company/repository" --title "test title - @microsoft/cxe-coastal" --body "🚧 This is an auto-generated issue to individually track migration progress.

        ### Packages to migrate:
        - react-slider"`,
      );

      // epic edit to add sub-issues
      expect(execSyncMock).nthCalledWith(
        8,
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
