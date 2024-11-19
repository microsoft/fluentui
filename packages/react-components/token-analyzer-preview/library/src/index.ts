/* eslint-disable no-console */
import { Project } from 'ts-morph';
import { promises as fs } from 'fs';
import { relative } from 'path';
import { findStyleFiles } from './fileOperations.js';
import { analyzeFile } from './astAnalyzer.js';
import { formatAnalysis } from './formatter.js';
import { EnhancedStyleAnalysis, StyleAnalysis } from './types.js';
import { configure, log, error, measureAsync } from './debugUtils.js';

async function analyzeProjectStyles(
  rootDir: string,
  outputFile?: string,
  options: { debug?: boolean; perf?: boolean } = {},
): Promise<EnhancedStyleAnalysis> {
  // Configure debug utilities
  configure({
    debug: options.debug || false,
    perf: options.perf || false,
  });

  log(`Starting analysis of ${rootDir}`);
  const results: EnhancedStyleAnalysis = {
    styles: {},
    metadata: {
      styleConditions: {},
    },
  };

  try {
    const styleFiles = await measureAsync('find style files', () => findStyleFiles(rootDir));
    console.log(`Found ${styleFiles.length} style files to analyze`);

    const project = new Project({
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: false,
    });

    for (const file of styleFiles) {
      const relativePath = relative(rootDir, file);
      console.log(`Analyzing ${relativePath}...`);

      try {
        const analysis = await analyzeFile(file, project);
        if (Object.keys(analysis.styles).length > 0) {
          // Merge the style analysis
          results.styles[relativePath] = analysis.styles[relativePath];
          // Merge the metadata
          results.metadata.styleConditions = {
            ...results.metadata.styleConditions,
            ...analysis.metadata.styleConditions,
          };
        }
      } catch (err) {
        error(`Error analyzing ${relativePath}:`, err);
      }
    }

    if (outputFile) {
      await measureAsync('write output file', async () => {
        const formattedResults = formatAnalysis(results);
        await fs.writeFile(outputFile, JSON.stringify(formattedResults, null, 2), 'utf8');
        console.log(`Analysis written to ${outputFile}`);
      });
    }

    return results;
  } catch (err) {
    error('Error during analysis:', err);
    throw err;
  }
}

function countTokens(analysis: StyleAnalysis): number {
  let count = 0;
  Object.values(analysis).forEach(value => {
    count += value.tokens.length;
    if (value.nested) {
      count += countTokens(value.nested);
    }
  });
  return count;
}

// CLI execution
const isRunningDirectly = process.argv[1].endsWith('index.ts');
if (isRunningDirectly) {
  const rootDir = process.argv[2] || './src';
  const outputFile = process.argv[3] || './token-analysis.json';
  const debug = process.argv.includes('--debug');
  const perf = process.argv.includes('--perf');

  console.log(`Starting analysis of ${rootDir}`);
  analyzeProjectStyles(rootDir, outputFile, { debug, perf })
    .then(results => {
      const totalFiles = Object.keys(results.styles).length;
      let totalTokens = 0;
      totalTokens += countTokens(results.styles);

      console.log('\nAnalysis complete!');
      console.log(`Processed ${totalFiles} files containing styles`);
      console.log(`Found ${totalTokens} token references`);
    })
    .catch(err => {
      console.error('Analysis failed:', err);
      process.exit(1);
    });
}

export { analyzeProjectStyles };
