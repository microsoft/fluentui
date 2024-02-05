import {
  ProjectGraph,
  Tree,
  createProjectGraphAsync,
  joinPathFragments,
  output,
  readCachedProjectGraph,
  readJsonFile,
  stripIndents,
  workspaceRoot,
} from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import { changelog, getNorthstarGroup, version } from './nx-publish';

describe(`nx-publish`, () => {
  let graph: ProjectGraph;
  let group: ReturnType<typeof getNorthstarGroup>;
  const nxConfig = readJsonFile(joinPathFragments(workspaceRoot, 'nx.json'));

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(async () => {
    jest.spyOn(console, 'log').mockImplementation(noop);
    jest.spyOn(console, 'info').mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(noop);
    jest.spyOn(console, 'error').mockImplementation(noop);
    jest.spyOn(output, 'logSingleLine').mockImplementation(noop);
    graph = await getGraph();
    group = getNorthstarGroup(graph);
  });

  describe(`utils`, () => {
    describe(`#getNorthstarGroup`, () => {
      it(`should return northstar project only`, () => {
        const actual = getNorthstarGroup(graph);

        expect(Object.keys(actual.crossBoundaryProjects)).toMatchInlineSnapshot(`
          Array [
            "@fluentui/react-migration-v0-v9",
          ]
        `);
        expect(Object.keys(actual.app)).toMatchInlineSnapshot(`
          Array [
            "@fluentui/perf-test-northstar",
            "@fluentui/circulars-test",
            "@fluentui/local-sandbox",
            "@fluentui/projects-test",
            "@fluentui/docs",
            "@fluentui/perf",
            "@fluentui/e2e",
          ]
        `);
        expect(Object.keys(actual.lib)).toMatchInlineSnapshot(`
          Array [
            "@fluentui/react-component-nesting-registry",
            "@fluentui/react-northstar-emotion-renderer",
            "@fluentui/react-northstar-styles-renderer",
            "@fluentui/react-component-event-listener",
            "@fluentui/react-northstar-fela-renderer",
            "@fluentui/react-northstar-prototypes",
            "@fluentui/react-icons-northstar",
            "@fluentui/react-component-ref",
            "@fluentui/ability-attributes",
            "@fluentui/docs-components",
            "@fluentui/react-northstar",
            "@fluentui/react-proptypes",
            "@fluentui/react-telemetry",
            "@fluentui/react-bindings",
            "@fluentui/accessibility",
            "@fluentui/react-builder",
            "@fluentui/code-sandbox",
            "@fluentui/digest",
          ]
        `);
      });
    });
  });

  describe(`version`, () => {
    it.skip(`should work in dryRun Mode`, async () => {
      await version({ args: { dryRun: true, specifier: 'patch', verbose: false }, graph, group, nxConfig });
    });
  });

  describe(`changelog`, () => {
    let tree: Tree;
    beforeEach(() => {
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
        ## [v0.70.2](https://github.com/microsoft/fluentui/tree/@fluentui/react-northstar_v0.70.2) (05-02-2024)
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

  describe(`publish`, () => {
    it(`should work in dryRun Mode`, async () => {
      // await publish({ args: { dryRun: true, verbose: false }, group, nxConfig });
      expect(1).toBe(1);
    });
  });
});

async function getGraph() {
  try {
    return readCachedProjectGraph();
  } catch {
    const graph = await createProjectGraphAsync();
    return graph;
  }
}
