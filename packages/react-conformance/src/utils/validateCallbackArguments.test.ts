import { validateCallbackArguments } from './validateCallbackArguments';

describe('validateCallbackArguments', () => {
  it('passes on valid cases', () => {
    expect(() => {
      validateCallbackArguments({ e: undefined, data: { value: 'string' } });
      validateCallbackArguments({ e: 'React.MouseEvent', data: { value: 'string' } });
      validateCallbackArguments({ e: ['React.MouseEvent', 'React.KeyboardEvent'], data: { value: 'string' } });
    }).not.toThrow();
  });

  describe('event param', () => {
    it('throws on "null"', () => {
      expect(() => {
        validateCallbackArguments({ e: null, data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
    });

    it('throws on invalid types', () => {
      expect(() => {
        validateCallbackArguments({ e: 'Element', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
      expect(() => {
        validateCallbackArguments({ e: 'string', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
    });

    it('throws on generic params', () => {
      /* eslint-disable @fluentui/max-len */
      expect(() => {
        validateCallbackArguments({ e: 'Event', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument cannot use generic React.SyntheticEvent or Event types. Please use less generic types like React.MouseEvent/MouseEvent"`,
      );
      expect(() => {
        validateCallbackArguments({ e: 'React.SyntheticEvent', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument cannot use generic React.SyntheticEvent or Event types. Please use less generic types like React.MouseEvent/MouseEvent"`,
      );
      /* eslint-enable @fluentui/max-len */
    });
  });

  describe('data param', () => {
    it('throws on invalid types', () => {
      expect(() => {
        validateCallbackArguments({ e: 'Element', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
      expect(() => {
        validateCallbackArguments({ e: 'string', data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
    });

    it('throws on unions', () => {
      expect(() => {
        validateCallbackArguments({ e: ['Number', 'Boolean'], data: { value: 'string' } });
      }).toThrowErrorMatchingInlineSnapshot(
        `"A first (event) argument could be have only \\"undefined\\", React.*Event or *Event types"`,
      );
    });
  });
});
