import { Project } from 'ts-morph';
import { analyzeFile } from '../astAnalyzer.js';
import { sampleStyles } from './sample-styles.js';
import * as path from 'path';
import * as fs from 'fs/promises';

describe('Token Analyzer', () => {
  let project: Project;
  let tempFilePath: string;

  beforeAll(async () => {
    // Create temp directory for test files
    const tempDir = path.join(process.cwd(), 'temp-test-files');
    await fs.mkdir(tempDir, { recursive: true });
    tempFilePath = path.join(tempDir, 'test-styles.ts');
    await fs.writeFile(tempFilePath, sampleStyles);

    project = new Project({
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: false,
    });
  });

  afterAll(async () => {
    // Cleanup temp files
    const tempDir = path.join(process.cwd(), 'temp-test-files');
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should analyze styles and find tokens', async () => {
    const analysis = await analyzeFile(tempFilePath, project);

    // Verify the structure matches what we expect
    expect(analysis).toHaveProperty('styles');
    expect(analysis).toHaveProperty('metadata');

    const { styles, metadata } = analysis;

    // Verify root styles
    expect(styles.root.tokens).toContainEqual(
      expect.objectContaining({
        property: 'color',
        token: 'tokens.colorNeutralForeground1',
      }),
    );

    // Verify metadata for conditional styles
    expect(metadata.styleConditions).toHaveProperty('large');
    expect(metadata.styleConditions).toHaveProperty('disabled');
    expect(metadata.styleConditions.large.conditions).toContain("size === 'large'");
  });
});
