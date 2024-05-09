import { ProjectGraph, createProjectGraphAsync, joinPathFragments, readJsonFile, workspaceRoot } from '@nx/devkit';

import { getLatestTag, getNorthstarGroup, getTagPattern } from './utils';

describe(`utils`, () => {
  let graph: ProjectGraph;
  const nxConfig = readJsonFile(joinPathFragments(workspaceRoot, 'nx.json'));

  beforeEach(async () => {
    graph = await createProjectGraphAsync();
  });

  describe(`tags`, () => {
    it(`should get tag latest publish tag for N* release group`, async () => {
      const pattern = getTagPattern(nxConfig);
      expect(pattern).toEqual('@fluentui/react-northstar_v{version}');

      const latestTag = await getLatestTag(pattern);
      expect(latestTag).toEqual({
        extractedVersion: expect.any(String),
        tag: expect.stringContaining('@fluentui/react-northstar_v'),
      });
    });
  });

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
