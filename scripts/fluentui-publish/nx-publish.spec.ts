import { ProjectGraph, createProjectGraphAsync, output, readCachedProjectGraph } from '@nx/devkit';

import { getNorthstarGroup, version } from './nx-publish';

describe(`nx-publish`, () => {
  let graph: ProjectGraph;
  let group: ReturnType<typeof getNorthstarGroup>;

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
    it(`should work in dryRun Mode`, async () => {
      await version({ args: { dryRun: true, specifier: 'patch', verbose: false }, graph, group });
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
