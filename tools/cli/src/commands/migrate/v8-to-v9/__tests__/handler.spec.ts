import { handler } from '../handler';
import * as annotator from '../utils/annotator';

jest.mock('../utils/annotator');

const mockAnalyzeFiles = annotator.analyzeFiles as jest.MockedFunction<typeof annotator.analyzeFiles>;
const mockWriteAnnotations = annotator.writeAnnotations as jest.MockedFunction<typeof annotator.writeAnnotations>;

describe('migrate v8-to-v9 handler', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.clearAllMocks();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  it('calls analyzeFiles and writeAnnotations with the given path', async () => {
    mockAnalyzeFiles.mockResolvedValue([]);
    mockWriteAnnotations.mockResolvedValue({ filesChanged: 0 });

    await handler({ path: 'src/', dryRun: false, _: [], $0: 'fluentui-cli' });

    expect(mockAnalyzeFiles).toHaveBeenCalledWith('src/');
    expect(mockWriteAnnotations).toHaveBeenCalled();
  });

  it('skips writeAnnotations in dryRun mode', async () => {
    mockAnalyzeFiles.mockResolvedValue([]);

    await handler({ path: 'src/', dryRun: true, _: [], $0: 'fluentui-cli' });

    expect(mockAnalyzeFiles).toHaveBeenCalledWith('src/');
    expect(mockWriteAnnotations).not.toHaveBeenCalled();
  });

  it('prints annotation counts after writing', async () => {
    mockAnalyzeFiles.mockResolvedValue([
      {
        filePath: 'src/Button.tsx',
        annotations: [
          { action: 'auto', codemod: 'import-paths', payload: 'test', line: 1 },
          { action: 'manual', codemod: 'component-rename', payload: 'test', line: 5 },
        ],
        missingDeps: [],
      },
    ]);
    mockWriteAnnotations.mockResolvedValue({ filesChanged: 1 });

    await handler({ path: 'src/', dryRun: false, _: [], $0: 'fluentui-cli' });

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Annotated 1 files'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('auto'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('manual'));
  });

  it('prints [dryRun] preview without writing', async () => {
    mockAnalyzeFiles.mockResolvedValue([
      {
        filePath: 'src/Button.tsx',
        annotations: [{ action: 'scaffold', codemod: 'styles-prop', payload: 'test', line: 3 }],
        missingDeps: [{ name: '@fluentui/react-components', reason: 'core v9 components' }],
      },
    ]);

    await handler({ path: 'src/', dryRun: true, _: [], $0: 'fluentui-cli' });

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[dryRun]'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('@fluentui/react-components'));
    expect(mockWriteAnnotations).not.toHaveBeenCalled();
  });
});
