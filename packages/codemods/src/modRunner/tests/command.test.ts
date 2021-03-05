import { CommandParser, CommandParserResult, yargsParse } from '../../command';
import { Ok } from '../../helpers/result';

describe('command parser', () => {
  describe('when called with a single argument', () => {
    let result: CommandParserResult;

    beforeAll(() => {
      result = new CommandParser().parseArgs(['node', 'foo', 'bar/baz']);
    });

    it('does not direct the program to exit', () => {
      expect(result.shouldExit).toBeFalsy();
    });
  });
  describe('parses string filters into an array', () => {
    let result: ReturnType<typeof yargsParse>;

    beforeAll(() => {
      result = yargsParse(['node', 'foo', 'bar/baz', '-n', 'one', 'two', '-e']);
    });

    it('has two strings parsed', () => {
      expect(result.modNames!.length).toEqual(2);
    });

    it('first string is one', () => {
      expect(result.modNames![0]).toEqual('one');
    });

    it('exclude is true', () => {
      expect(result.excludeMods).toEqual(true);
    });
  });

  describe('commands parses a filter correctly', () => {
    it('filters to include', () => {
      const result = new CommandParser().parseArgs(['node', 'foo', 'bar/baz', '-n', 'one', 'two']);
      expect(
        result.modsFilter({
          name: 'one',
          run: () => {
            return Ok({ logs: [] });
          },
        }),
      ).toBe(true);
    });
    it('filters to exclude', () => {
      const result = new CommandParser().parseArgs(['node', 'foo', 'bar/baz', '-n', 'one', 'two', '-e']);
      expect(
        result.modsFilter({
          name: 'one',
          run: () => {
            return Ok({ logs: [] });
          },
        }),
      ).toBe(false);
    });
  });
});
