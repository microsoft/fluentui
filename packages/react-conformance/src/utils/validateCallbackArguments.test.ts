import { validateCallbackArguments } from './validateCallbackArguments';

describe('validateCallbackArguments', () => {
  it('passes on valid cases', () => {
    expect(() => {
      validateCallbackArguments([
        ['e', undefined],
        ['data', { value: 'string' }],
      ]);
    }).not.toThrow();
    expect(() => {
      validateCallbackArguments([
        ['e', 'React.MouseEvent'],
        ['data', { value: 'string' }],
      ]);
    }).not.toThrow();
    expect(() => {
      validateCallbackArguments([
        ['e', ['React.MouseEvent', 'React.KeyboardEvent']],
        ['data', { value: 'string' }],
      ]);
    }).not.toThrow();
  });

  describe('event param', () => {
    it('throws on "null"', () => {
      expect(() => {
        validateCallbackArguments([
          ['e', null],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
    });

    it('throws on invalid types', () => {
      expect(() => {
        validateCallbackArguments([
          ['e', 'Element'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
      expect(() => {
        validateCallbackArguments([
          ['e', 'string'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
    });

    it('throws on generic params', () => {
      /* eslint-disable @fluentui/max-len */
      expect(() => {
        validateCallbackArguments([
          ['e', 'Event'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument cannot use generic React.SyntheticEvent or Event types. Please use more specific types like React.MouseEvent/MouseEvent"`,
      );
      expect(() => {
        validateCallbackArguments([
          ['e', 'React.SyntheticEvent'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument cannot use generic React.SyntheticEvent or Event types. Please use more specific types like React.MouseEvent/MouseEvent"`,
      );
      /* eslint-enable @fluentui/max-len */
    });
  });

  describe('data param', () => {
    it('throws on invalid types', () => {
      expect(() => {
        validateCallbackArguments([
          ['e', 'Element'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
      expect(() => {
        validateCallbackArguments([
          ['e', 'string'],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
    });

    it('throws on unions', () => {
      expect(() => {
        validateCallbackArguments([
          ['e', ['Number', 'Boolean']],
          ['data', { value: 'string' }],
        ]);
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument may only have type \\"undefined\\", React.*Event or *Event"`,
      );
    });
  });
});
