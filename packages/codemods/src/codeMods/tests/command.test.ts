import { CommandParser, CommandParserResult } from '../../command';

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
    let result: CommandParserResult;

    beforeAll(() => {
      result = new CommandParser().parseArgs(['node', 'foo', 'bar/baz', '--sf', 'one', 'two']);
    });

    it('has two strings parsed', () => {
      expect(result.stringFilter.orElse([]).length).toEqual(2);
    });

    it('first string is one', () => {
      expect(result.stringFilter.then(v => v[0]).orElse('')).toEqual('one');
    });
  });
});
