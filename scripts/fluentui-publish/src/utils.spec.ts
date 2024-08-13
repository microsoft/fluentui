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
          "react-migration-v0-v9",
        ]
      `);
      expect(Object.keys(actual.app)).toMatchInlineSnapshot(`
        Array [
          "perf-test-northstar",
          "circulars-test",
          "local-sandbox",
          "projects-test",
          "docs",
          "perf",
          "e2e",
        ]
      `);
      expect(Object.keys(actual.lib)).toMatchInlineSnapshot(`
        Array [
          "react-component-nesting-registry",
          "react-northstar-emotion-renderer",
          "react-northstar-styles-renderer",
          "react-component-event-listener",
          "react-northstar-fela-renderer",
          "react-northstar-prototypes",
          "react-icons-northstar",
          "react-component-ref",
          "ability-attributes",
          "docs-components",
          "react-northstar",
          "react-proptypes",
          "react-telemetry",
          "react-bindings",
          "accessibility",
          "react-builder",
          "code-sandbox",
          "digest",
          "styles",
          "state",
        ]
      `);
    });
  });
});
