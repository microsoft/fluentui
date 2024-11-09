import { Project } from 'ts-morph';
import { promises as fs } from 'fs';
import { relative } from 'path';
import { findStyleFiles } from './fileOperations.js';
import { analyzeFile } from './astAnalyzer.js';
import { formatAnalysis } from './formatter.js';
import { StyleAnalysis, AnalysisResults } from './types.js';

async function analyzeProjectStyles(rootDir: string, outputFile?: string): Promise<AnalysisResults> {
  console.log(`Starting analysis of ${rootDir}`);
  process.stdout.write(`Starting analysis of ${rootDir}`);
  try {
    const styleFiles = await findStyleFiles(rootDir);
    console.log(`Found ${styleFiles.length} style files to analyze`);

    const project = new Project({
      skipAddingFilesFromTsConfig: true,
      skipFileDependencyResolution: false,
    });

    const processedFiles = new Set<string>();
    const results: AnalysisResults = {};

    for (const file of styleFiles) {
      const relativePath = relative(rootDir, file);
      console.log(`Analyzing ${relativePath}...`);

      try {
        const analysis = await analyzeFile(file, project, processedFiles);
        if (Object.keys(analysis).length > 0) {
          results[relativePath] = analysis;
        }
      } catch (err) {
        console.error(`Error analyzing ${relativePath}:`, err);
      }
    }

    if (outputFile) {
      const formattedResults = Object.entries(results).reduce((acc, [file, analysis]) => {
        acc[file] = formatAnalysis(analysis);
        return acc;
      }, {} as Record<string, object>);

      await fs.writeFile(outputFile, JSON.stringify(formattedResults, null, 2), 'utf8');
      console.log(`Analysis written to ${outputFile}`);
    }

    return results;
  } catch (err) {
    console.error('Error during analysis:', err);
    throw err;
  }
}

// CLI execution
const isRunningDirectly = process.argv[1].endsWith('index.ts');
if (isRunningDirectly) {
  const rootDir = process.argv[2] || './src';
  const outputFile = process.argv[3] || './token-analysis.json';

  console.log(`Starting analysis of ${rootDir}`);
  analyzeProjectStyles(rootDir, outputFile)
    .then(results => {
      const totalFiles = Object.keys(results).length;
      const totalTokens = Object.values(results).reduce((sum, analysis) => {
        const countTokens = (obj: StyleAnalysis): number => {
          let count = 0;
          Object.values(obj).forEach(value => {
            count += value.tokens.length;
            if (value.nested) {
              count += countTokens(value.nested);
            }
          });
          return count;
        };
        return sum + countTokens(analysis);
      }, 0);

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
