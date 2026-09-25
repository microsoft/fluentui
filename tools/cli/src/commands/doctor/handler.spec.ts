import { inspectCatalogs } from '../../utils/api-query';
import { inspectProjectSetup, type ProjectSetupReport } from '../init/setup';
import { handler } from './handler';

jest.mock('../../utils/api-query', () => ({
  inspectCatalogs: jest.fn(),
}));
jest.mock('../init/setup', () => ({
  inspectProjectSetup: jest.fn(),
}));

describe('doctor handler', () => {
  beforeEach(() => {
    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    process.exitCode = undefined;
    (inspectProjectSetup as jest.Mock).mockReturnValue({
      status: 'complete',
      projectRoot: '/consumer',
      config: { status: 'current', path: '/consumer/fluentui.config.json', inherited: false },
      skill: { status: 'current', path: '/consumer/.agents/skills/fluentui', version: '1' },
      agents: { status: 'current', path: '/consumer/AGENTS.md' },
      extensions: { available: [], approved: [] },
      diagnostics: [],
    } satisfies ProjectSetupReport);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.exitCode = undefined;
  });

  it('emits discovered root provenance', async () => {
    (inspectCatalogs as jest.Mock).mockResolvedValue({
      workspaceRoot: '/consumer',
      roots: [
        {
          package: '@fluentui/example',
          requestedPackage: 'example-alias',
          version: '1.0.0',
          authority: 'metadata',
          apiCoverage: 'complete',
          recordsChecked: 1,
          recordsAdvertised: 1,
          source: 'dependency',
          systems: ['fluent-v9'],
        },
      ],
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

    await handler({ _: ['doctor'], $0: 'fluentui-cli', json: true, deep: true });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.type).toBe('fluentui.doctor');
    expect(output.data.deep).toBe(true);
    expect(output.data.setup.status).toBe('complete');
    expect(output.data.roots[0]).toMatchObject({
      package: '@fluentui/example',
      requestedPackage: 'example-alias',
      source: 'dependency',
    });
    expect(process.exitCode).toBeUndefined();
  });

  it('sets a failing exit code after emitting unavailable health', async () => {
    (inspectCatalogs as jest.Mock).mockResolvedValue({
      workspaceRoot: '/consumer',
      roots: [],
      diagnostics: [],
      coverage: {
        status: 'unavailable',
        selectedRoots: 0,
        metadataRoots: 0,
        declarationFallbackRoots: 0,
        unavailableRoots: 0,
      },
      status: 'unavailable',
    });

    await handler({ _: ['doctor'], $0: 'fluentui-cli', json: true });

    expect(process.exitCode).toBe(1);
  });

  it('reports setup conflicts without changing API coverage status', async () => {
    (inspectCatalogs as jest.Mock).mockResolvedValue({
      workspaceRoot: '/consumer',
      roots: [],
      diagnostics: [],
      coverage: {
        status: 'complete',
        selectedRoots: 0,
        metadataRoots: 0,
        declarationFallbackRoots: 0,
        unavailableRoots: 0,
      },
      status: 'complete',
    });
    (inspectProjectSetup as jest.Mock).mockReturnValue({
      status: 'conflict',
      projectRoot: '/consumer',
      config: { status: 'current', path: '/consumer/fluentui.config.json', inherited: false },
      skill: { status: 'edited', path: '/consumer/.agents/skills/fluentui', version: '1' },
      agents: { status: 'current', path: '/consumer/AGENTS.md' },
      diagnostics: [{ code: 'setup.skillEdited', severity: 'error', message: 'edited' }],
    });

    await handler({ _: ['doctor'], $0: 'fluentui-cli', json: true });

    const output = JSON.parse((process.stdout.write as jest.Mock).mock.calls[0][0]);
    expect(output.status).toBe('complete');
    expect(output.coverage.status).toBe('complete');
    expect(output.data.setup.status).toBe('conflict');
    expect(process.exitCode).toBeUndefined();
  });

  it.each([
    { deep: false, source: 'dependency', selectedVia: 'auto-discovered' },
    { deep: true, source: 'dependency', selectedVia: 'auto-discovered' },
    { deep: false, source: 'config', selectedVia: 'configured' },
    { deep: true, source: 'config', selectedVia: 'configured' },
    { deep: false, source: 'preset', selectedVia: 'built-in preset' },
    { deep: false, source: 'local', selectedVia: 'configured local path' },
    { deep: false, source: 'dependency', selectedVia: 'package selector', package: '@fluentui/example' },
  ])(
    'formats selection and record-check semantics (deep=$deep, selectedVia=$selectedVia)',
    async ({ deep, source, selectedVia, package: packageName }) => {
      (inspectCatalogs as jest.Mock).mockResolvedValue({
        workspaceRoot: '/consumer',
        roots: [
          {
            package: '@fluentui/example',
            requestedPackage: '@fluentui/example',
            version: '1.0.0',
            authority: 'metadata',
            apiCoverage: 'complete',
            status: 'complete',
            recordsChecked: deep ? 2 : 0,
            recordsAdvertised: 2,
            source,
            systems: ['fluent-v9'],
          },
        ],
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
      await handler({ _: ['doctor'], $0: 'fluentui-cli', deep, package: packageName });
      const output = (process.stdout.write as jest.Mock).mock.calls[0][0];
      expect(output).toContain('# Fluent UI catalog doctor');
      expect(output).toContain('## Project setup');
      expect(output).toContain('Setup consistency is reported independently');
      expect(output).toContain(
        '| Package | Authority | API coverage | Health | API records | Selected via | Systems |',
      );
      expect(output).toContain(`| ${selectedVia} | \`fluent-v9\` |`);
      expect(output).toContain('| `@fluentui/example@1.0.0` |');
      expect(output).not.toContain('alias of');
      expect(output).not.toContain('Discovered via');
      expect(output).toContain(deep ? '2/2 checked' : 'Not checked (2 advertised)');
      expect(output).toContain('API coverage is declared by the catalog.');
      expect(output).toContain('Selected via describes how a catalog was selected, not how the package was installed.');
    },
  );

  it.each([false, true])('distinguishes a configured package from an installed npm alias (deep=%s)', async deep => {
    const canonical = {
      package: '@fluentui/react-components',
      requestedPackage: '@fluentui/react-components',
      version: '9.74.7',
      authority: 'metadata',
      apiCoverage: 'complete',
      status: 'complete',
      recordsChecked: deep ? 2 : 0,
      recordsAdvertised: 2,
      source: 'config',
      systems: ['fluent-v9'],
    };
    (inspectCatalogs as jest.Mock).mockResolvedValue({
      workspaceRoot: '/consumer',
      roots: [canonical, { ...canonical, requestedPackage: 'fluent-forum-styled', source: 'dependency' }],
      diagnostics: [],
      coverage: {
        status: 'complete',
        selectedRoots: 2,
        metadataRoots: 2,
        declarationFallbackRoots: 0,
        unavailableRoots: 0,
      },
      status: 'complete',
    });

    await handler({ _: ['doctor'], $0: 'fluentui-cli', deep });

    const output = (process.stdout.write as jest.Mock).mock.calls[0][0];
    const records = deep ? '2/2 checked' : 'Not checked (2 advertised)';
    expect(output).toContain(
      `| \`@fluentui/react-components@9.74.7\` | metadata | complete | complete | ${records} | configured | \`fluent-v9\` |`,
    );
    expect(output).toContain(
      `| \`fluent-forum-styled\` (alias of \`@fluentui/react-components@9.74.7\`) | metadata | complete | complete | ${records} | auto-discovered | \`fluent-v9\` |`,
    );
  });
});
