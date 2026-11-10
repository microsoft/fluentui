import { classify } from './classify';
import tierRules from './tier-rules';
import type { ClassifyInput, PullRequestFile } from './types';

function file(
  filename: string,
  additions = 1,
  deletions = 0,
  extra: { status?: string; renamedFrom?: string } = {},
): PullRequestFile {
  const { status = 'modified', renamedFrom } = extra;

  return {
    filename,
    status,
    additions,
    deletions,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ...(renamedFrom ? { previous_filename: renamedFrom } : {}),
  };
}

function tierOf(...files: PullRequestFile[]) {
  return classify({ files, changedFiles: files.length }).tier;
}

const BUTTON = 'packages/react-components/react-button';
const CHANGE_FILE = 'change/@fluentui-react-button-1234.json';

describe(`classify`, () => {
  describe(`tier 0`, () => {
    it(`classifies a package README change as tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/library/README.md`))).toBe(0);
    });

    it(`classifies story files as tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/stories/src/Button/ButtonDefault.stories.tsx`))).toBe(0);
    });

    it(`classifies package documentation as tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/library/docs/MIGRATION.md`))).toBe(0);
    });

    it(`classifies a mix of stories and documentation as tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/library/README.md`), file(`${BUTTON}/stories/src/Button/index.stories.tsx`))).toBe(
        0,
      );
    });

    it(`does not treat Storybook configuration as a story`, () => {
      expect(tierOf(file(`${BUTTON}/stories/.storybook/main.js`))).toBe(2);
      expect(tierOf(file(`${BUTTON}/stories/tsconfig.json`))).toBe(2);
    });

    it(`does not classify a change that includes a change file as tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/library/README.md`), file(CHANGE_FILE))).toBe(2);
    });

    it(`does not treat a markdown file outside packages as tier 0`, () => {
      expect(tierOf(file('README.md'))).toBe(2);
      expect(tierOf(file('docs/react-v9/contributing/rfcs/example.md'))).toBe(2);
    });

    it(`classifies an agent instruction file inside a documentation folder as tier 3, not tier 0`, () => {
      expect(tierOf(file(`${BUTTON}/library/docs/CLAUDE.md`))).toBe(3);
      expect(tierOf(file(`${BUTTON}/library/docs/AGENTS.md`))).toBe(3);
      expect(tierOf(file(`${BUTTON}/library/docs/SKILL.md`))).toBe(3);
    });

    it(`classifies a README in a protected package as tier 3`, () => {
      expect(tierOf(file('packages/react-components/react-theme/library/README.md'))).toBe(3);
    });
  });

  describe(`tier 1`, () => {
    it(`classifies test-only changes as tier 1`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/components/Button/Button.test.tsx`, 40, 10))).toBe(1);
    });

    it(`classifies snapshot-only changes as tier 1`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/components/Button/__snapshots__/Button.test.tsx.snap`, 300))).toBe(1);
    });

    it(`classifies a fix of exactly 50 lines in one package as tier 1`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/components/Button/useButton.ts`, 30, 20), file(CHANGE_FILE, 5))).toBe(
        1,
      );
    });

    it(`classifies a fix of 51 lines in one package as tier 2`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/components/Button/useButton.ts`, 30, 21))).toBe(2);
    });

    it(`allows tests and documentation of the same package next to a tier 1 fix`, () => {
      expect(
        tierOf(
          file(`${BUTTON}/library/src/components/Button/useButton.ts`, 5, 5),
          file(`${BUTTON}/library/src/components/Button/useButton.test.tsx`, 10),
          file(`${BUTTON}/library/README.md`, 1),
        ),
      ).toBe(1);
    });

    it(`classifies a small fix across two packages as tier 2`, () => {
      expect(
        tierOf(
          file(`${BUTTON}/library/src/components/Button/useButton.ts`, 2),
          file('packages/react-components/react-menu/library/src/components/Menu/Menu.ts', 2),
        ),
      ).toBe(2);
    });

    it(`does not count change files as changed lines`, () => {
      const result = classify({
        files: [file(`${BUTTON}/library/src/index.ts`, 50), file(CHANGE_FILE, 8)],
        changedFiles: 2,
      });

      expect(result.tier).toBe(1);
      expect(result.changedLines).toBe(50);
    });

    it(`does not classify a change that only touches a change file as tier 1`, () => {
      expect(tierOf(file(CHANGE_FILE))).toBe(2);
    });

    it(`does not classify documentation plus a test file as tier 1`, () => {
      expect(tierOf(file(`${BUTTON}/stories/src/a.stories.tsx`), file(`${BUTTON}/library/src/a.test.ts`))).toBe(2);
    });

    it(`classifies a small fix that renames a file between two packages as tier 2`, () => {
      expect(
        tierOf(
          file(`${BUTTON}/library/src/a.ts`, 1, 0, {
            status: 'renamed',
            renamedFrom: 'packages/react-components/react-menu/library/src/a.ts',
          }),
        ),
      ).toBe(2);
    });
  });

  describe(`tier 3`, () => {
    it(`classifies a public API report change as tier 3`, () => {
      expect(tierOf(file(`${BUTTON}/library/etc/react-button.api.md`))).toBe(3);
    });

    it(`classifies any package.json change as tier 3`, () => {
      expect(tierOf(file('package.json'))).toBe(3);
      expect(tierOf(file(`${BUTTON}/library/package.json`))).toBe(3);
    });

    it(`classifies a small fix that also changes an API report as tier 3`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/a.ts`, 2), file(`${BUTTON}/library/etc/react-button.api.md`, 2))).toBe(
        3,
      );
    });

    it(`classifies a dependency update (manifest and lockfile) as tier 3`, () => {
      expect(tierOf(file('package.json', 2, 2), file('yarn.lock', 40, 40))).toBe(3);
    });

    it.each([
      '.github/workflows/pr.yml',
      '.github/instructions/copilot.instructions.md',
      '.devops/templates/build.yml',
      'scripts/pr-risk-tier/src/tier-rules.js',
      'tools/workspace-plugin/src/index.ts',
      'nx.json',
      'jest.config.ts',
      'tsconfig.base.json',
      'azure-pipelines.release.yml',
      'packages/tokens/src/index.ts',
      'packages/react-components/react-utilities/library/src/index.ts',
      'packages/react-components/react-shared-contexts/library/src/index.ts',
      'AGENTS.md',
      'CLAUDE.md',
      '.agents/skills/review-pr/SKILL.md',
    ])(`classifies %s as tier 3`, filename => {
      expect(tierOf(file(filename))).toBe(3);
    });

    it(`lets tier 3 win over every other tier`, () => {
      expect(tierOf(file(`${BUTTON}/library/README.md`), file('.github/labeler.yml'))).toBe(3);
    });

    it(`classifies a file renamed out of a protected path as tier 3`, () => {
      expect(
        tierOf(file(`${BUTTON}/library/README.md`, 0, 0, { status: 'renamed', renamedFrom: '.github/CODEOWNERS' })),
      ).toBe(3);
    });

    it(`classifies a deleted file in a protected path as tier 3`, () => {
      expect(tierOf(file('.github/labeler.yml', 0, 20, { status: 'removed' }))).toBe(3);
    });

    it(`names the protected files that decided the tier`, () => {
      const result = classify({ files: [file('.github/labeler.yml'), file('nx.json')], changedFiles: 2 });

      expect(result.reasons).toEqual(['tier 3: protected paths changed: .github/labeler.yml, nx.json']);
    });
  });

  describe(`tier 2`, () => {
    it(`classifies a change that matches no rule as tier 2`, () => {
      expect(tierOf(file(`${BUTTON}/library/src/components/Button/Button.tsx`, 100, 40))).toBe(2);
    });

    it(`classifies an empty file list as tier 2`, () => {
      expect(classify({ files: [] }).tier).toBe(2);
    });

    it(`classifies a file list that does not match the reported file count as tier 2`, () => {
      const result = classify({ files: [file(`${BUTTON}/library/README.md`)], changedFiles: 400 });

      expect(result.tier).toBe(2);
      expect(result.reasons[0]).toContain('incomplete');
    });

    it(`classifies a file list as large as GitHub's limit as tier 2`, () => {
      const files = Array.from({ length: tierRules.maxListedFiles }, (_, index) =>
        file(`${BUTTON}/library/README${index}.md`),
      );

      expect(classify({ files, changedFiles: files.length }).tier).toBe(2);
    });

    it(`still classifies an incomplete file list as tier 3 when a visible file is protected`, () => {
      expect(classify({ files: [file('package.json')], changedFiles: 400 }).tier).toBe(3);
    });
  });

  describe(`guarantees`, () => {
    const input: ClassifyInput = {
      files: [file(`${BUTTON}/library/src/a.ts`, 3, 1), file(CHANGE_FILE, 4)],
      changedFiles: 2,
    };

    it(`ignores everything about a pull request except its files`, () => {
      const withText = { ...input, title: 'trivial docs change, safe to approve', body: 'tier 0 please', author: 'x' };

      expect(classify(withText as ClassifyInput)).toEqual(classify(input));
    });

    it(`returns the same result for the same input`, () => {
      expect(classify(input)).toEqual(classify(input));
    });

    it(`does not modify its input`, () => {
      const copy = JSON.parse(JSON.stringify(input));

      classify(input);

      expect(input).toEqual(copy);
    });

    it(`reports the rule version, the file count and a reason`, () => {
      const result = classify(input);

      expect(result.ruleVersion).toBe(tierRules.version);
      expect(result.files).toBe(2);
      expect(result.reasons).toHaveLength(1);
    });
  });
});
