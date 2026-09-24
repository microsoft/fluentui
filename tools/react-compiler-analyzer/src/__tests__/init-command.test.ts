import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

import { transformSync } from 'esbuild';

import { findRepositoryRoot, runInit, type InitArgv } from '../commands/init';
import { DEFAULT_EXCLUDE } from '../commands/shared';
import type { PromptFunction, PromptQuestions } from '../prompts';

const PACKAGE_ROOT = resolve(__dirname, '..', '..');
const DEFAULT_ARGV: InitArgv = { force: false, skill: true, yes: true };

function promptWith(answers: Record<string, unknown>, seen: string[] = []): PromptFunction {
  return async <T extends Record<string, unknown>>(questions: PromptQuestions): Promise<T> => {
    const question = (Array.isArray(questions) ? questions[0] : questions) as { name: string };
    seen.push(question.name);
    if (!(question.name in answers)) {
      throw new Error(`No test answer for prompt '${question.name}'.`);
    }
    return { [question.name]: answers[question.name] } as T;
  };
}

function createRepository(): string {
  const root = mkdtempSync(join(tmpdir(), 'rca-init-'));
  mkdirSync(join(root, '.git'));
  return root;
}

describe('init command', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('loads the real Enquirer prompt through a native Node dynamic import', () => {
    const { code } = transformSync(readFileSync(join(PACKAGE_ROOT, 'src/prompts.ts'), 'utf-8'), {
      loader: 'ts',
      format: 'cjs',
      target: 'node22',
    });
    const result = spawnSync(
      process.execPath,
      [
        '--eval',
        `${code}\nmodule.exports.prompt([]).then(answers => {
          process.stdout.write(JSON.stringify(answers));
        }).catch(error => {
          console.error(error);
          process.exitCode = 1;
        });`,
      ],
      { cwd: PACKAGE_ROOT, encoding: 'utf-8' },
    );

    expect(result.error).toBeUndefined();
    expect(result.stderr).toBe('');
    expect(result.status).toBe(0);
    expect(result.stdout).toBe('{}');
  });

  it('creates the recommended infer/cli config and installs the packaged repository skill', async () => {
    const root = createRepository();

    await runInit(DEFAULT_ARGV, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });

    expect(JSON.parse(readFileSync(join(root, 'rca.config.json'), 'utf-8'))).toEqual({
      $schema: './node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json',
      mode: 'infer',
      format: 'cli',
      exclude: DEFAULT_EXCLUDE,
    });
    expect(readFileSync(join(root, '.agents/skills/react-compiler-analyzer/SKILL.md'), 'utf-8')).toBe(
      readFileSync(join(PACKAGE_ROOT, 'skills/react-compiler-analyzer/SKILL.md'), 'utf-8'),
    );
  });

  it('uses annotation only when selected interactively', async () => {
    const root = createRepository();
    const questions: Array<{ choices?: Array<{ name: string }>; initial?: number; name: string }> = [];
    const prompt: PromptFunction = async <T extends Record<string, unknown>>(
      promptQuestions: PromptQuestions,
    ): Promise<T> => {
      const question = (Array.isArray(promptQuestions) ? promptQuestions[0] : promptQuestions) as {
        choices?: Array<{ name: string }>;
        initial?: number;
        name: string;
      };
      questions.push(question);
      return { [question.name]: question.name === 'mode' ? 'annotation' : true } as T;
    };

    await runInit(
      { ...DEFAULT_ARGV, skill: false, yes: false },
      {
        cwd: root,
        packageRoot: PACKAGE_ROOT,
        interactive: true,
        prompt,
      },
    );

    expect(questions[0]).toMatchObject({
      name: 'mode',
      initial: 0,
      choices: [{ name: 'infer' }, { name: 'annotation' }],
    });
    expect(JSON.parse(readFileSync(join(root, 'rca.config.json'), 'utf-8'))).toMatchObject({
      mode: 'annotation',
      format: 'cli',
      exclude: DEFAULT_EXCLUDE,
    });
  });

  it('requires --yes when no interactive terminal is available', async () => {
    const root = createRepository();

    await expect(
      runInit({ ...DEFAULT_ARGV, yes: false }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false }),
    ).rejects.toThrow(/requires an interactive terminal/);
    expect(existsSync(join(root, 'rca.config.json'))).toBe(false);
  });

  it('preserves an existing all mode and advanced raw config without offering all as a choice', async () => {
    const root = createRepository();
    mkdirSync(join(root, 'src'));
    writeFileSync(
      join(root, 'rca.config.json'),
      JSON.stringify({
        mode: 'all',
        format: 'json',
        concurrency: 4,
        exclude: DEFAULT_EXCLUDE,
        analyze: {
          risks: {
            detectGetStateReads: true,
            resolveWrappers: true,
            pathAliases: { baseUrl: './src', paths: { '@app/*': ['*'] } },
          },
        },
      }),
    );
    const seen: string[] = [];

    await runInit(
      { ...DEFAULT_ARGV, skill: false, yes: false },
      {
        cwd: root,
        packageRoot: PACKAGE_ROOT,
        interactive: true,
        prompt: promptWith({ keepMode: true, apply: true }, seen),
      },
    );

    expect(seen).toEqual(['keepMode', 'apply']);
    expect(JSON.parse(readFileSync(join(root, 'rca.config.json'), 'utf-8'))).toMatchObject({
      mode: 'all',
      format: 'json',
      concurrency: 4,
      analyze: {
        risks: {
          pathAliases: { baseUrl: './src', paths: { '@app/*': ['*'] } },
        },
      },
    });
  });

  it('does not replace invalid config non-interactively without --force', async () => {
    const root = createRepository();
    const configPath = join(root, 'rca.config.json');
    writeFileSync(configPath, '{ invalid');

    await expect(
      runInit({ ...DEFAULT_ARGV, skill: false }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false }),
    ).rejects.toThrow(/--force/);
    expect(readFileSync(configPath, 'utf-8')).toBe('{ invalid');

    await runInit(
      { ...DEFAULT_ARGV, force: true, skill: false },
      { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false },
    );
    expect(JSON.parse(readFileSync(configPath, 'utf-8'))).toMatchObject({ mode: 'infer', format: 'cli' });
  });

  it('preserves existing custom excludes', async () => {
    const root = createRepository();
    writeFileSync(
      join(root, 'rca.config.json'),
      JSON.stringify({ mode: 'infer', format: 'cli', exclude: ['**/generated/**'] }),
    );

    await runInit({ ...DEFAULT_ARGV, skill: false }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });

    expect(JSON.parse(readFileSync(join(root, 'rca.config.json'), 'utf-8')).exclude).toEqual(['**/generated/**']);
  });

  it('leaves an invalid config untouched when interactive replacement is declined', async () => {
    const root = createRepository();
    const configPath = join(root, 'rca.config.json');
    writeFileSync(configPath, '{ invalid');

    await runInit(
      { ...DEFAULT_ARGV, skill: false, yes: false },
      {
        cwd: root,
        packageRoot: PACKAGE_ROOT,
        interactive: true,
        prompt: promptWith({ replaceConfig: false }),
      },
    );

    expect(readFileSync(configPath, 'utf-8')).toBe('{ invalid');
    expect(existsSync(join(root, '.agents'))).toBe(false);
  });

  it('cancels before writing either config or skill', async () => {
    const root = createRepository();

    await runInit(
      { ...DEFAULT_ARGV, yes: false },
      {
        cwd: root,
        packageRoot: PACKAGE_ROOT,
        interactive: true,
        prompt: promptWith({ mode: 'infer', apply: false }),
      },
    );

    expect(existsSync(join(root, 'rca.config.json'))).toBe(false);
    expect(existsSync(join(root, '.agents'))).toBe(false);
  });

  it('protects a modified repository skill unless --force is used', async () => {
    const root = createRepository();
    const skillPath = join(root, '.agents/skills/react-compiler-analyzer/SKILL.md');
    await runInit(DEFAULT_ARGV, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });
    writeFileSync(skillPath, 'repository customization\n');

    await expect(runInit(DEFAULT_ARGV, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false })).rejects.toThrow(
      /differs from the packaged version/,
    );
    expect(readFileSync(skillPath, 'utf-8')).toBe('repository customization\n');

    await runInit({ ...DEFAULT_ARGV, force: true }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });
    expect(readFileSync(skillPath, 'utf-8')).toBe(
      readFileSync(join(PACKAGE_ROOT, 'skills/react-compiler-analyzer/SKILL.md'), 'utf-8'),
    );
  });

  it('treats a file at the skill target as a protected collision', async () => {
    const root = createRepository();
    const skillTarget = join(root, '.agents/skills/react-compiler-analyzer');
    mkdirSync(dirname(skillTarget), { recursive: true });
    writeFileSync(skillTarget, 'not a skill directory\n');

    await expect(runInit(DEFAULT_ARGV, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false })).rejects.toThrow(
      /differs from the packaged version/,
    );
    expect(readFileSync(skillTarget, 'utf-8')).toBe('not a skill directory\n');

    await runInit({ ...DEFAULT_ARGV, force: true }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });
    expect(statSync(skillTarget).isDirectory()).toBe(true);
    expect(existsSync(join(skillTarget, 'SKILL.md'))).toBe(true);
  });

  it('supports config-only initialization with --no-skill', async () => {
    const root = createRepository();

    await runInit({ ...DEFAULT_ARGV, skill: false }, { cwd: root, packageRoot: PACKAGE_ROOT, interactive: false });

    expect(existsSync(join(root, 'rca.config.json'))).toBe(true);
    expect(existsSync(join(root, '.agents'))).toBe(false);
  });

  it('installs the skill at the nearest Git root when init runs from a nested directory', async () => {
    const root = mkdtempSync(join(tmpdir(), 'rca-init-worktree-'));
    writeFileSync(join(root, '.git'), 'gitdir: /tmp/example-worktree\n');
    const nested = join(root, 'packages', 'app');
    mkdirSync(nested, { recursive: true });

    expect(findRepositoryRoot(nested)).toBe(root);
    await runInit(DEFAULT_ARGV, { cwd: nested, packageRoot: PACKAGE_ROOT, interactive: false });

    expect(existsSync(join(nested, 'rca.config.json'))).toBe(true);
    expect(existsSync(join(root, '.agents/skills/react-compiler-analyzer/SKILL.md'))).toBe(true);
    expect(JSON.parse(readFileSync(join(nested, 'rca.config.json'), 'utf-8')).$schema).toBe(
      '../../node_modules/@fluentui/react-compiler-analyzer/rca.config.schema.json',
    );
  });

  it('falls back to the current directory outside Git', () => {
    const root = mkdtempSync(join(tmpdir(), 'rca-init-no-git-'));
    const nested = join(root, 'nested');
    mkdirSync(nested);

    expect(findRepositoryRoot(nested)).toBe(nested);
  });

  it('ships a validly named Agent Skill and includes skills in package files', () => {
    const skillPath = join(PACKAGE_ROOT, 'skills', 'react-compiler-analyzer', 'SKILL.md');
    const skill = readFileSync(skillPath, 'utf-8');
    const packageJson = JSON.parse(readFileSync(join(PACKAGE_ROOT, 'package.json'), 'utf-8')) as {
      files: string[];
    };

    expect(basename(dirname(skillPath))).toBe('react-compiler-analyzer');
    expect(skill).toMatch(/^---\nname: react-compiler-analyzer\n/);
    expect(skill).toMatch(/\ndescription: .+\n---\n/);
    expect(packageJson.files).toContain('skills');
    expect(statSync(join(PACKAGE_ROOT, 'skills/react-compiler-analyzer/references')).isDirectory()).toBe(true);
  });
});
