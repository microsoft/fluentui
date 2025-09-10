import { join } from 'path';
import { createMetadataForReport } from './utils';
describe(`#utils`, () => {
  describe(`#createMetadataForReport`, () => {
    it(`should create report including paths that start at workspace root`, () => {
      const repoRoot = join(__dirname, './__fixtures__/create_metadata');
      const actual = createMetadataForReport({
        repoRoot,
        absolutePaths: {
          actualDir: join(repoRoot, 'proj-a', 'dist/vrt/actual'),
          baselineDir: join(repoRoot, 'proj-a', 'src/__snapshots__'),
          diffDir: join(repoRoot, 'proj-a', 'dist/vrt/diff'),
          outputBaselineDir: join(repoRoot, 'proj-a', 'dist/vrt/baseline'),
          outputPath: join(repoRoot, 'proj-a', 'dist/vrt'),
        },
      });
      const expected: typeof actual = {
        project: {
          name: '@proj/proj-a',
          root: 'proj-a',
        },
        paths: {
          actualDir: 'proj-a/dist/vrt/actual',
          baselineDir: 'proj-a/src/__snapshots__',
          diffDir: 'proj-a/dist/vrt/diff',
          outputBaselineDir: 'proj-a/dist/vrt/baseline',
          outputPath: 'proj-a/dist/vrt',
        },
      };
      expect(actual).toEqual(expected);
    });
  });
});
