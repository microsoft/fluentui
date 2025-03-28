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
    expect(styles.useStyles.root.tokens).toContainEqual(
      expect.objectContaining({
        property: 'color',
        token: 'tokens.colorNeutralForeground1',
      }),
    );
    expect(styles.useStyles.root.tokens).toContainEqual(
      expect.objectContaining({
        property: 'borderRightColor',
        token: 'tokens.colorNeutralStrokeDisabled',
      }),
    );

    // Verify anotherSlot styles
    expect(styles.useStyles.anotherSlot.tokens).toContainEqual(
      expect.objectContaining({
        property: 'color',
        token: 'tokens.colorNeutralForeground2',
      }),
    );

    // Verify focus function styles
    expect(styles.useStyles.focusIndicator.tokens).toEqual([]);
    const focusStyle = styles.useStyles.focusIndicator.nested?.[':focus'];

    expect(focusStyle?.tokens[0]).toEqual({
      path: [],
      property: 'textDecorationColor',
      token: 'tokens.colorStrokeFocus2',
    });

    // Verify metadata for conditional styles
    expect(metadata.styleConditions['styles.large']).toEqual({
      conditions: ["size === 'large'"],
      slotName: 'root',
    });
    expect(metadata.styleConditions['styles.disabled']).toEqual({
      conditions: ['disabled'],
      slotName: 'root',
    });
    expect(metadata.styleConditions['styles.large'].conditions).toContain("size === 'large'");
  });
});
