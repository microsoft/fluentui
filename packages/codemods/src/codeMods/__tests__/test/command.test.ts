import { CommandParser, CommandParserResult } from '../../../command';

describe('command parser', () => {
  // TODO add back once we need command parser to do more things
  // describe("help and usage", () => {
  // it("prints a help message when run without arguments", () => {
  // let message = "";
  // const log = (msg: string) => {
  // message = msg;
  // };
  // new CommandParser(log).parseArgs(["node", "foo"]);
  // expect(message).toContain("Usage");
  // });

  // it('prints a help message when run without "--help"', () => {
  // let message = "";
  // const log = (msg: string) => {
  // message = msg;
  // };
  // new CommandParser(log).parseArgs(["node", "foo", "--help"]);
  // expect(message).toContain("Usage");
  // });

  // it("directs the program to exit when run without arguments", () => {
  // const result = new CommandParser(() => {}).parseArgs(["node", "foo"]);
  // expect(result.shouldExit).toBeTruthy();
  // });
  // });

  describe('when called with a single argument', () => {
    let result: CommandParserResult;

    beforeAll(() => {
      result = new CommandParser(() => {}).parseArgs(['node', 'foo', 'bar/baz']);
    });

    it('returns the path when called with a single argument', () => {
      expect(result.path).toEqual('bar/baz');
    });

    it('does not direct the program to exit', () => {
      expect(result.shouldExit).toBeFalsy();
    });
  });
});
