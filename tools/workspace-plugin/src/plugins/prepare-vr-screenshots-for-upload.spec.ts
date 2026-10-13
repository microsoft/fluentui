import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const createProjectGraphMock = jest.fn();
jest.doMock(require.resolve('@nx/devkit', { paths: [join(__dirname, '../../../../.github/scripts')] }), () => ({
  createProjectGraphAsync: createProjectGraphMock,
}));

const collect = require('../../../../.github/scripts/prepare-vr-screenshots-for-upload.js') as (options: {
  config: { projects: string[] };
}) => Promise<string>;
const hostRoot = 'apps/vr-tests-react-components';
const hostProject = 'vr-tests-react-components';

describe('granular VRT workflow project output', () => {
  type Step = {
    id?: string;
    name?: string;
    if?: string;
    env?: Record<string, string>;
    with: { script: string; 'result-encoding'?: string };
  };
  const workflow = require('js-yaml').load(
    readFileSync(join(__dirname, '../../../../.github/workflows/pr-vrt.yml'), 'utf8'),
  ) as { jobs: Record<string, { steps: Step[] }> };
  const steps = workflow.jobs.vrt_granular_pilot.steps;
  const selection = steps.find(step => step.id === 'affected_vrt')!;
  const build = steps.find(step => step.id === 'shared_storybook')!;
  const capture = steps.find(step => step.name === 'Capture affected pilot screenshots')!;
  const collector = steps.find(step => step.id === 'granular_screenshots_root')!;
  const AsyncFunction = Object.getPrototypeOf(async () => undefined).constructor as new (
    ...parameterNames: string[]
  ) => (...parameters: unknown[]) => Promise<unknown>;
  const originalProjects = process.env.VRT_PROJECTS;
  const originalHash = process.env.VRT_STORYBOOK_HASH;

  afterEach(() => {
    for (const [name, value] of [
      ['VRT_PROJECTS', originalProjects],
      ['VRT_STORYBOOK_HASH', originalHash],
    ]) {
      if (value === undefined) {
        delete process.env[name!];
      } else {
        process.env[name!] = value;
      }
    }
  });

  it.each([
    { projects: [] },
    { projects: ['react-spinner-vrt'] },
    { projects: ['react-text-vrt', 'react-spinner-vrt'] },
  ])('passes the action-encoded project list to build, capture and collection: %j', async ({ projects }) => {
    const expected = [...projects].sort();
    const core = { info: jest.fn() };
    const selected = await new AsyncFunction('require', 'core', selection.with.script)(
      () => ({ execFileSync: () => JSON.stringify(projects) }),
      core,
    );
    const encoded = selection.with['result-encoding'] === 'string' ? String(selected) : JSON.stringify(selected);
    expect(JSON.parse(encoded)).toEqual(expected);
    process.env.VRT_PROJECTS = encoded;
    process.env.VRT_STORYBOOK_HASH = 'a'.repeat(64);
    expect(build.if).toBe("${{ steps.affected_vrt.outputs.result != '[]' }}");
    expect(capture.if).toBe(build.if);

    if (projects.length) {
      for (const step of [build, capture]) {
        expect(step.env?.VRT_PROJECTS).toBe('${{ steps.affected_vrt.outputs.result }}');
        const execute = jest.fn();
        const load = (name: string) =>
          name === 'node:child_process'
            ? { execFileSync: execute }
            : { readFileSync: () => JSON.stringify({ hash: process.env.VRT_STORYBOOK_HASH }) };
        await new AsyncFunction('require', 'core', step.with.script)(load, core);
        expect(execute).toHaveBeenCalledWith(
          'yarn',
          expect.arrayContaining([`${step === build ? '--selectedProjects' : '--projects'}=${expected.join(',')}`]),
          { stdio: 'inherit' },
        );
      }
      expect(build.with['result-encoding']).toBe('string');
    } else {
      expect(encoded).toBe('[]');
    }
    const collectProjects = jest.fn().mockResolvedValue('screenshots');
    await new AsyncFunction('require', 'github', 'context', 'core', collector.with.script)(
      () => collectProjects,
      {},
      {},
      core,
    );
    expect(collectProjects).toHaveBeenCalledWith(expect.objectContaining({ config: { projects: expected } }));
    expect(collector.with['result-encoding']).toBe('string');
  });
});

describe('prepare-vr-screenshots-for-upload', () => {
  let workspace: string;
  let previousCwd: string;

  const virtualNode = (name: string, screenshotsPath = `${hostRoot}/dist/visual-regression/${name}/screenshots`) => ({
    data: {
      root: `packages/react-components/${name.replace('-vrt', '')}/visual-regression`,
      metadata: { visualRegression: { hostProject, hostRoot, screenshotsPath } },
    },
  });

  const addScreenshot = (folder: string, filename: string) => {
    const path = join(folder, filename);
    mkdirSync(join(path, '..'), { recursive: true });
    writeFileSync(path, filename);
  };

  const report = () => JSON.parse(readFileSync('screenshots/screenshots-report.json', 'utf8'));

  beforeEach(() => {
    previousCwd = process.cwd();
    workspace = mkdtempSync(join(tmpdir(), 'vr-upload-'));
    process.chdir(workspace);
    createProjectGraphMock.mockResolvedValue({
      nodes: {
        [hostProject]: { data: { root: hostRoot } },
        'vr-tests': { data: { root: 'apps/vr-tests' } },
        'vr-tests-web-components': { data: { root: 'apps/vr-tests-web-components' } },
        'react-button-vrt': virtualNode('react-button-vrt'),
        'react-avatar-vrt': virtualNode('react-avatar-vrt'),
        'react-badge-vrt': virtualNode('react-badge-vrt'),
      },
    });
  });

  afterEach(() => {
    process.chdir(previousCwd);
    rmSync(workspace, { recursive: true, force: true });
    jest.clearAllMocks();
  });

  it('keeps legacy host output and report paths unchanged', async () => {
    addScreenshot(`${hostRoot}/dist/screenshots`, 'Button/Default.png');

    expect(await collect({ config: { projects: [hostProject, 'vr-tests', 'vr-tests-web-components'] } })).toBe(
      'screenshots',
    );
    expect(readFileSync(`screenshots/${hostProject}/Button/Default.png`, 'utf8')).toBe('Button/Default.png');
    expect(report()).toEqual({ [hostProject]: { path: hostProject } });
  });

  it('merges only selected virtual outputs under the host key without changing screenshot paths', async () => {
    addScreenshot(`${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`, 'Button/Default.png');
    addScreenshot(`${hostRoot}/dist/visual-regression/react-avatar-vrt/screenshots`, 'Avatar/Default.png');
    addScreenshot(`${hostRoot}/dist/visual-regression/react-badge-vrt/screenshots`, 'Badge/Default.png');

    await collect({ config: { projects: ['react-button-vrt', 'react-avatar-vrt'] } });

    expect(report()).toEqual({ [hostProject]: { path: hostProject } });
    expect(readFileSync(`screenshots/${hostProject}/Button/Default.png`, 'utf8')).toBe('Button/Default.png');
    expect(readFileSync(`screenshots/${hostProject}/Avatar/Default.png`, 'utf8')).toBe('Avatar/Default.png');
    expect(existsSync(`screenshots/${hostProject}/Badge/Default.png`)).toBe(false);
    expect(existsSync('screenshots/react-button-vrt')).toBe(false);
  });

  it('rejects colliding screenshot paths instead of overwriting either group', async () => {
    addScreenshot(`${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`, 'Shared/Default.png');
    addScreenshot(`${hostRoot}/dist/visual-regression/react-avatar-vrt/screenshots`, 'Shared/Default.png');

    await expect(collect({ config: { projects: ['react-button-vrt', 'react-avatar-vrt'] } })).rejects.toThrow(
      /Shared\/Default.png/,
    );
  });

  it('omits absent output folders and writes an empty report', async () => {
    await collect({ config: { projects: ['react-button-vrt', hostProject] } });

    expect(report()).toEqual({});
  });

  it('clears stale uploads from previous invocations without deleting source outputs', async () => {
    addScreenshot(`${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`, 'Button/Default.png');
    await collect({ config: { projects: ['react-button-vrt'] } });

    await collect({ config: { projects: ['react-avatar-vrt'] } });

    expect(report()).toEqual({});
    expect(existsSync(`screenshots/${hostProject}/Button/Default.png`)).toBe(false);
    expect(existsSync(`${hostRoot}/dist/visual-regression/react-button-vrt/screenshots/Button/Default.png`)).toBe(true);
  });

  it('rejects a legacy source inside the upload root before cleaning it', async () => {
    addScreenshot('screenshots/dist/screenshots', 'Existing.png');
    createProjectGraphMock.mockResolvedValue({ nodes: { legacy: { data: { root: 'screenshots' } } } });

    await expect(collect({ config: { projects: ['legacy'] } })).rejects.toThrow();
    expect(existsSync('screenshots/dist/screenshots/Existing.png')).toBe(true);
  });

  it.each([
    {
      hostProject: '../other',
      hostRoot,
      screenshotsPath: `${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`,
    },
    {
      hostProject,
      hostRoot: '../other',
      screenshotsPath: `${hostRoot}/dist/visual-regression/react-button-vrt/screenshots`,
    },
    { hostProject, hostRoot, screenshotsPath: '../outside/screenshots' },
    { hostProject, hostRoot, screenshotsPath: `${hostRoot}/dist/visual-regression/../outside/screenshots` },
  ])('rejects unsafe virtual metadata %j', async metadata => {
    addScreenshot('screenshots/previous', 'Existing.png');
    createProjectGraphMock.mockResolvedValue({
      nodes: { 'react-button-vrt': { data: { metadata: { visualRegression: metadata } } } },
    });

    await expect(collect({ config: { projects: ['react-button-vrt'] } })).rejects.toThrow();
    expect(existsSync('screenshots/other')).toBe(false);
    expect(existsSync('screenshots/previous/Existing.png')).toBe(true);
  });
});
