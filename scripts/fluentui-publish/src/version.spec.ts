import { Tree, joinPathFragments, readJsonFile, stripIndents, workspaceRoot } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { changelog } from './version';

describe(`version`, () => {
  it.todo('not sure if this is good idea to test on jest level');
});

describe(`changelog`, () => {
  let tree: Tree;
  const nxConfig = readJsonFile(joinPathFragments(workspaceRoot, 'nx.json'));

  beforeEach(() => {
    Date.now = jest.fn(() => 1_707_327_855_635);

    tree = createTreeWithEmptyWorkspace();
    tree.write(
      'packages/fluentui/CHANGELOG.md',
      stripIndents`
# Changelog
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixes
- Do not use defaultProps  @user ([#28725](https://github.com/microsoft/fluentui/pull/28725))

<!--------------------------------[ v0.66.4 ]------------------------------- -->
## [v0.66.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v0.66.4) (2023-03-10)
[Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-northstar_v0.66.3..@fluentui/react-northstar_v0.66.4)

### Fixes
- Datepicker: indicators should be visible in high contrast mode. @ling1726 ([#27107](https://github.com/microsoft/fluentui/pull/27107))
      `,
    );
  });

  it(`should work in dryRun Mode`, async () => {
    await changelog(tree, {
      nxConfig,
      versionData: { workspaceVersion: '0.70.2' },
      group: {
        app: {},
        crossBoundaryProjects: {},
        lib: {
          '@fluentui/react-northstar': { name: '', type: 'lib', data: { root: 'packages/fluentui/react-northstar' } },
        },
      },
    });

    const updatedChangelog = tree.read('packages/fluentui/CHANGELOG.md', 'utf-8');

    expect(updatedChangelog).toMatchInlineSnapshot(`
      "# Changelog
      This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

      ## [Unreleased]

      <!--------------------------------[ v0.70.2 ]------------------------------- -->
      ## [v0.70.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v0.70.2) (07-02-2024)
      [Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-northstar_v0.66.5..@fluentui/react-northstar_v0.70.2)

      ### Fixes
      - Do not use defaultProps  @user ([#28725](https://github.com/microsoft/fluentui/pull/28725))

      <!--------------------------------[ v0.66.4 ]------------------------------- -->
      ## [v0.66.4](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v0.66.4) (2023-03-10)
      [Compare changes](https://github.com/microsoft/fluentui/compare/@fluentui/react-northstar_v0.66.3..@fluentui/react-northstar_v0.66.4)

      ### Fixes
      - Datepicker: indicators should be visible in high contrast mode. @ling1726 ([#27107](https://github.com/microsoft/fluentui/pull/27107))"
    `);
  });
});
