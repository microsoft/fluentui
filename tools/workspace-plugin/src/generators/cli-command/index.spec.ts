import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import generator from './index';
import { CliCommandGeneratorSchema } from './schema';

describe('cli-command generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    // Seed the tree with a minimal cli.ts that the generator will modify
    tree.write(
      'tools/cli/src/cli.ts',
      [
        "import yargs from 'yargs';",
        '',
        'export async function main(argv: string[]): Promise<void> {',
        '  await yargs(argv)',
        "    .scriptName('fluentui-cli')",
        "    .usage('$0 <command> [options]')",
        "    .demandCommand(1, 'You need to specify a command to run.')",
        '    .help()',
        '    .strict()',
        '    .parse();',
        '}',
        '',
      ].join('\n'),
    );
  });

  it('should generate command files', async () => {
    await generator(tree, { name: 'analyze', description: 'Analyze bundles' });

    expect(tree.exists('tools/cli/src/commands/analyze/index.ts')).toBeTruthy();
    expect(tree.exists('tools/cli/src/commands/analyze/handler.ts')).toBeTruthy();
    expect(tree.exists('tools/cli/src/commands/analyze/handler.spec.ts')).toBeTruthy();
  });

  it('should generate CommandModule with correct name and description', async () => {
    await generator(tree, { name: 'analyze', description: 'Analyze bundles' });

    const content = tree.read('tools/cli/src/commands/analyze/index.ts', 'utf-8')!;

    expect(content).toContain("command: 'analyze'");
    expect(content).toContain("describe: 'Analyze bundles'");
    expect(content).toContain("await import('./handler')");
  });

  it('should generate handler with placeholder implementation', async () => {
    await generator(tree, { name: 'analyze' });

    const content = tree.read('tools/cli/src/commands/analyze/handler.ts', 'utf-8')!;

    expect(content).toContain('TODO: Implement analyze command');
    expect(content).toContain("import type { CommandHandler } from '../../utils/types'");
  });

  it('should register command in cli.ts', async () => {
    await generator(tree, { name: 'analyze' });

    const content = tree.read('tools/cli/src/cli.ts', 'utf-8')!;

    expect(content).toContain("import analyzeCommand from './commands/analyze'");
    expect(content).toContain('.command(analyzeCommand)');
  });

  it('should use default description when not provided', async () => {
    await generator(tree, { name: 'analyze' });

    const content = tree.read('tools/cli/src/commands/analyze/index.ts', 'utf-8')!;

    expect(content).toContain("describe: 'TODO: Add description'");
  });

  it('should throw when command already exists', async () => {
    tree.write('tools/cli/src/commands/analyze/index.ts', 'export default {}');

    await expect(generator(tree, { name: 'analyze' })).rejects.toThrow('Command "analyze" already exists');
  });

  it('should throw when name is empty', async () => {
    await expect(generator(tree, { name: '' })).rejects.toThrow('name is required');
  });

  it('should not duplicate registration if command import already exists', async () => {
    await generator(tree, { name: 'analyze' });
    // Manually remove the generated files so we can re-run (simulating re-registration)
    tree.delete('tools/cli/src/commands/analyze/index.ts');
    tree.delete('tools/cli/src/commands/analyze/handler.ts');
    tree.delete('tools/cli/src/commands/analyze/handler.spec.ts');

    await generator(tree, { name: 'analyze' });

    const content = tree.read('tools/cli/src/cli.ts', 'utf-8')!;
    const importMatches = content.match(/import analyzeCommand/g);

    expect(importMatches).toHaveLength(1);
  });
});

