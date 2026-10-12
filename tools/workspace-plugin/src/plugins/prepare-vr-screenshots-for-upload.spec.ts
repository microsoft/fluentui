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
