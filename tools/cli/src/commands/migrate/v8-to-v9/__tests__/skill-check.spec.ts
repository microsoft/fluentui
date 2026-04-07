import { execFileSync } from 'child_process';
import { isSkillInstalled, printSkillHint } from '../utils/skill-check';

jest.mock('child_process');

const mockExecFileSync = execFileSync as jest.MockedFunction<typeof execFileSync>;

describe('skill-check', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isSkillInstalled', () => {
    it('returns true when skills list output contains the skill name', () => {
      mockExecFileSync.mockReturnValue(
        'Project Skills\n\nfluentui-migrate-v8-to-v9 ~/project/skills/fluentui-migrate-v8-to-v9\n  Agents: Claude Code\n',
      );

      expect(isSkillInstalled()).toBe(true);
    });

    it('returns false when skills list output does not contain the skill name', () => {
      mockExecFileSync.mockReturnValue('No project skills found.\nTry listing global skills with -g\n');

      expect(isSkillInstalled()).toBe(false);
    });

    it('returns false when npx skills command fails', () => {
      mockExecFileSync.mockImplementation(() => {
        throw new Error('command not found');
      });

      expect(isSkillInstalled()).toBe(false);
    });
  });

  describe('printSkillHint', () => {
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
      logSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      logSpy.mockRestore();
    });

    it('prints npx skills add command', () => {
      printSkillHint();

      const output = logSpy.mock.calls.map((args: unknown[]) => args[0]).join('\n');
      expect(output).toContain('npx skills add microsoft/fluentui --skill fluentui-migrate-v8-to-v9');
    });
  });
});
