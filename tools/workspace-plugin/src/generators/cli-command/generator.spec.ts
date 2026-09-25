import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree } from '@nx/devkit';

import generator from './generator';
import { CliCommandGeneratorSchema } from './schema';

describe('cli-command generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    tree.write(
      'tools/cli/src/utils/command-spec.ts',
      [
        'export interface CliCommandSpec {',
        '  command: string;',
        '  description: string;',
        '  options: Record<string, unknown>;',
        '  responses: readonly string[];',
        '  exits: Readonly<Record<number, string>>;',
        '}',
        '',
        'export const COMMAND_SPECS: readonly CliCommandSpec[] = [',
        '];',
      ].join('\n'),
    );
    tree.write(
      'tools/cli/src/commands/registry.ts',
      [
        "import type { CommandModule } from 'yargs';",
        '',
        'import {',
        "} from '../utils/command-spec';",
        "import reportCommand from './report';",
        '',
        'export interface RegisteredCommand {',
        '  module: CommandModule;',
        '  spec: CliCommandSpec;',
        '}',
        '',
        'export const REGISTERED_COMMANDS: readonly RegisteredCommand[] = [',
        '];',
        '',
      ].join('\n'),
    );
  });

  it('should generate command files', async () => {
    const options: CliCommandGeneratorSchema = { name: 'analyze', description: 'Analyze bundles' };
    await generator(tree, options);

    expect(tree.exists('tools/cli/src/commands/analyze/index.ts')).toBeTruthy();
    expect(tree.exists('tools/cli/src/commands/analyze/handler.ts')).toBeTruthy();
    expect(tree.exists('tools/cli/src/commands/analyze/handler.spec.ts')).toBeTruthy();
  });

  it('should generate CommandModule with correct name and description', async () => {
    const options: CliCommandGeneratorSchema = { name: 'analyze', description: 'Analyze bundles' };
    await generator(tree, options);

    const content = tree.read('tools/cli/src/commands/analyze/index.ts', 'utf-8')!;

    expect(content).toContain('command: ANALYZE_COMMAND_SPEC.command');
    expect(content).toContain('describe: ANALYZE_COMMAND_SPEC.description');
    expect(content).toContain('applyCommandOptions(yargs, ANALYZE_COMMAND_SPEC)');
    expect(content).toContain("await import('./handler')");
  });

  it('should generate handler with placeholder implementation', async () => {
    const options: CliCommandGeneratorSchema = { name: 'analyze', description: 'Analyze bundles' };
    await generator(tree, options);

    const content = tree.read('tools/cli/src/commands/analyze/handler.ts', 'utf-8')!;

    expect(content).toContain('TODO: Implement analyze command');
    expect(content).toContain("import type { CommandHandler } from '../../utils/types'");
  });

  it('should register command through the command spec and registry', async () => {
    const options: CliCommandGeneratorSchema = { name: 'analyze', description: 'Analyze bundles' };
    await generator(tree, options);

    const spec = tree.read('tools/cli/src/utils/command-spec.ts', 'utf-8')!;
    const registry = tree.read('tools/cli/src/commands/registry.ts', 'utf-8')!;

    expect(spec).toContain('export const ANALYZE_COMMAND_SPEC: CliCommandSpec');
    expect(spec).toContain("description: 'Analyze bundles'");
    expect(spec).toContain('COMMAND_SPECS: readonly CliCommandSpec[] = [ANALYZE_COMMAND_SPEC]');
    expect(registry).toContain('ANALYZE_COMMAND_SPEC');
    expect(registry).toContain("import analyzeCommand from './analyze'");
    expect(registry).toContain('{ module: analyzeCommand, spec: ANALYZE_COMMAND_SPEC }');
  });

  it('should use default description when not provided', async () => {
    const options: CliCommandGeneratorSchema = { name: 'analyze' };
    await generator(tree, options);

    const content = tree.read('tools/cli/src/utils/command-spec.ts', 'utf-8')!;

    expect(content).toContain("description: 'TODO: Add description'");
  });

  it('should throw when command already exists', async () => {
    tree.write('tools/cli/src/commands/analyze/index.ts', 'export default {}');

    await expect(generator(tree, { name: 'analyze' })).rejects.toThrow('Command "analyze" already exists');
  });

  it('should throw when name is empty', async () => {
    await expect(generator(tree, { name: '' })).rejects.toThrow('name is required');
  });

  it('should not duplicate registry or spec entries', async () => {
    await generator(tree, { name: 'analyze' });
    // Manually remove the generated files so we can re-run (simulating re-registration)
    tree.delete('tools/cli/src/commands/analyze/index.ts');
    tree.delete('tools/cli/src/commands/analyze/handler.ts');
    tree.delete('tools/cli/src/commands/analyze/handler.spec.ts');

    await generator(tree, { name: 'analyze' });

    const registry = tree.read('tools/cli/src/commands/registry.ts', 'utf-8')!;
    const spec = tree.read('tools/cli/src/utils/command-spec.ts', 'utf-8')!;

    expect(registry.match(/import analyzeCommand/g)).toHaveLength(1);
    expect(registry.match(/\{ module: analyzeCommand, spec: ANALYZE_COMMAND_SPEC \}/g)).toHaveLength(1);
    expect(spec.match(/export const ANALYZE_COMMAND_SPEC/g)).toHaveLength(1);
  });

  it('should register a command whose name is a prefix of an existing command', async () => {
    await generator(tree, { name: 'report', skipFormat: true });
    await generator(tree, { name: 'rep', skipFormat: true });

    const content = tree.read('tools/cli/src/commands/registry.ts', 'utf-8')!;

    expect(content).toContain("import reportCommand from './report'");
    expect(content).toContain("import repCommand from './rep'");
    expect(content).toContain('{ module: reportCommand, spec: REPORT_COMMAND_SPEC }');
    expect(content).toContain('{ module: repCommand, spec: REP_COMMAND_SPEC }');
  });
});
