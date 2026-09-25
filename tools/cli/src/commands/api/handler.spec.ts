import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { queryApi, type ApiQueryResult, type ApiSymbolDetail } from '../../utils/api-query';
import { handler } from './handler';

jest.mock('../../utils/api-query', () => ({
  queryApi: jest.fn(),
}));

describe('api handler', () => {
  beforeEach(() => {
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('emits a versioned JSON API index', async () => {
    (queryApi as jest.Mock).mockResolvedValue({
      kind: 'index',
      workspaceRoot: '/consumer',
      data: [],
      diagnostics: [],
      coverage: {
        status: 'complete',
        selectedRoots: 1,
        metadataRoots: 1,
        declarationFallbackRoots: 0,
        unavailableRoots: 0,
      },
      status: 'complete',
    });

    await handler({ _: ['api'], $0: 'fluentui-cli', json: true, cwd: '/consumer', from: '@fluentui/example/button' });

    expect(queryApi).toHaveBeenCalledWith(
      expect.objectContaining({ cwd: '/consumer', metadataMode: undefined, from: '@fluentui/example/button' }),
    );
    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output).toEqual(
      expect.objectContaining({
        apiVersion: '1',
        type: 'fluentui.api-index',
        status: 'complete',
      }),
    );
  });

  it.each(['index', 'detail'] as const)(
    'uses an explicit dense %s response and preserves full JSON and diagnostics',
    async kind => {
      const detail: ApiSymbolDetail = {
        name: 'MissingDetail',
        package: '@fluentui/example',
        version: '1.0.0',
        recommendedImport: null,
        importStatus: 'unavailable',
        importCandidates: [],
        routes: [],
        resolvedPackages: [
          { package: '@fluentui/example', version: '1.0.0', packageRoot: '/consumer/node_modules/@fluentui/example' },
        ],
      };
      const query: ApiQueryResult = {
        kind,
        data: kind === 'index' ? [] : detail,
        workspaceRoot: '/consumer',
        diagnostics: [
          { code: 'reader.dependencyInputUnavailable', severity: 'warning', message: 'Dependency changed' },
        ],
        coverage: {
          status: 'partial',
          selectedRoots: 1,
          metadataRoots: 1,
          declarationFallbackRoots: 0,
          unavailableRoots: 0,
        },
        status: 'partial',
      };
      (queryApi as jest.Mock).mockResolvedValue(query);
      const before = JSON.stringify(query);
      await handler({ _: ['api'], $0: 'fluentui-cli', json: true, dense: true });
      const dense = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
      expect(dense).toMatchObject({
        apiVersion: '1',
        type: `fluentui.api-${kind}.dense`,
        status: query.status,
        coverage: query.coverage,
        diagnostics: query.diagnostics,
      });
      expect(dense.data.workspaceRoot).toBeUndefined();
      if (kind === 'detail') {
        expect(dense.data.result).toMatchObject({ detailStatus: 'unavailable', recommendedImport: null });
        expect(dense.data.result.resolvedPackages).toBeUndefined();
      }
      await handler({ _: ['api'], $0: 'fluentui-cli', json: true });
      const full = JSON.parse((process.stdout.write as jest.Mock).mock.calls[1][0]);
      expect(full.type).toBe(`fluentui.api-${kind}`);
      expect(full.data).toEqual({ workspaceRoot: query.workspaceRoot, result: query.data });
      expect(JSON.stringify(query)).toBe(before);

      const directory = mkdtempSync(path.join(os.tmpdir(), 'fluentui-dense-'));
      try {
        const output = path.join(directory, 'api.json');
        await handler({ _: ['api'], $0: 'fluentui-cli', json: true, dense: true, output });
        expect(readFileSync(output, 'utf8')).toBe((process.stdout.write as jest.Mock).mock.calls[0][0]);
        expect(process.stdout.write).toHaveBeenCalledTimes(2);
      } finally {
        rmSync(directory, { recursive: true, force: true });
      }
      await handler({ _: ['api'], $0: 'fluentui-cli', dense: true });
      await handler({ _: ['api'], $0: 'fluentui-cli' });
      expect((process.stdout.write as jest.Mock).mock.calls[2][0]).toBe(
        (process.stdout.write as jest.Mock).mock.calls[3][0],
      );
    },
  );
});
