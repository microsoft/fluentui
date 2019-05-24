import { CliParser } from './../cli/cli';

describe('CLI', () => {
  describe('parsing', () => {
    const parser = new CliParser();
    it('understands "-h"', () => {
      const result = parser.parse(['-h']);
      expect(result.help).toBeTruthy();
    });

    it('understands "--help"', () => {
      const result = parser.parse(['--help']);
      expect(result.help).toBeTruthy();
    });

    it("doesn't report help when passed a version", () => {
      const result = parser.parse(['9999']);
      expect(result.help).toBeFalsy();
    });

    it('understands simple migration version', () => {
      const result = parser.parse(['9999']);
      expect(result.version).toEqual('9999');
      expect(result.writeResults).toBeFalsy();
    });

    it('understands "-w"', () => {
      const result = parser.parse(['-w', '9999']);
      expect(result.version).toEqual('9999');
      expect(result.writeResults).toBeTruthy();
    });

    it('understands "--write"', () => {
      const result = parser.parse(['--write', '9999']);
      expect(result.version).toEqual('9999');
      expect(result.writeResults).toBeTruthy();
    });

    it('activates help with run with no arguments', () => {
      const result = parser.parse([]);
      expect(result.help).toBeTruthy();
    });
  });
});
