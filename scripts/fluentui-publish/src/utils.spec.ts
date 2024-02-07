import { ProjectGraph, createProjectGraphAsync, readCachedProjectGraph } from '@nx/devkit';

import { getNorthstarGroup } from './utils';

describe(`utils`, () => {
  let graph: ProjectGraph;

  beforeEach(async () => {
    graph = await getGraph();
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

async function getGraph() {
  try {
    return readCachedProjectGraph();
  } catch {
    const graph = await createProjectGraphAsync();
    return graph;
  }
}
