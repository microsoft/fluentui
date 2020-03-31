import { mergeAriaAttributeValues } from './aria';

interface IMergeTestCase {
  args: (string | undefined)[];
  expected: string | undefined;
}

interface IMergeTest {
  description: string;
  cases: IMergeTestCase[];
}

describe('aria utils tests', () => {
  describe('mergeAriaAttributeValues tests', () => {
    const mergeTestCases: IMergeTest[] = [
      {
        description: 'returns undefined when given no args',
        cases: [
          {
            args: [],
            expected: undefined,
          },
        ],
      },
      {
        description: 'returns undefined when given undefined and empty args',
        cases: [
          {
            args: [undefined],
            expected: undefined,
          },
          {
            args: [undefined, undefined],
            expected: undefined,
          },
          {
            args: [''],
            expected: undefined,
          },
          {
            args: [undefined, ''],
            expected: undefined,
          },
        ],
      },
      {
        description: 'returns arg when given one valid arg',
        cases: [
          {
            args: ['arg1'],
            expected: 'arg1',
          },
          {
            args: ['arg1', undefined],
            expected: 'arg1',
          },
          {
            args: [undefined, 'arg1', undefined],
            expected: 'arg1',
          },
          {
            args: ['', 'arg1', ''],
            expected: 'arg1',
          },
        ],
      },
      {
        description: 'returns merged args when given multiple valid args',
        cases: [
          {
            args: ['arg1', 'arg2'],
            expected: 'arg1 arg2',
          },
          {
            args: ['arg1', undefined],
            expected: 'arg1',
          },
          {
            args: [undefined, 'arg1', undefined],
            expected: 'arg1',
          },
          {
            args: ['', 'arg1', ''],
            expected: 'arg1',
          },
          {
            args: ['', 'arg1', 'arg2 '],
            expected: 'arg1 arg2',
          },
          {
            args: ['', ''],
            expected: undefined,
          },
          {
            args: [' ', ' '],
            expected: undefined,
          },
        ],
      },
    ];

    mergeTestCases.forEach((test: IMergeTest) => {
      test.cases.forEach((testCase: IMergeTestCase, index: number) => {
        it(test.description + ', case #' + index, () => {
          const merged = mergeAriaAttributeValues(...testCase.args);
          expect(merged).toEqual(testCase.expected);
        });
      });
    });
  });
});
