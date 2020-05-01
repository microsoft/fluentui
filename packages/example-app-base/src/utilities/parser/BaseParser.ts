/**
 * Base for a parser - does not actually do any parsing.
 */
export class BaseParser {
  private _currLocation: number = 0;
  private _str: string;
  private _strLength: number;

  public constructor(_str: string) {
    this._str = _str;
    this._strLength = _str.length;
  }

  protected eat(match: string): string | undefined {
    if (this._str.charAt(this._currLocation) === match) {
      return this._str.charAt(this._currLocation++);
    }

    return undefined;
  }

  protected eatSpacesAndNewlines(): string {
    return this.eatWhileRegex(/[ \r\n]/);
  }

  protected eatWhile(match: string): string {
    let i = 0;

    while (this._str.charAt(this._currLocation + i) === match) {
      i++;
      if (i + this._currLocation > this._strLength) {
        break;
      }
    }

    this._currLocation += i;
    return this._str.substr(this._currLocation - i, i);
  }

  protected eatWhileRegex(match: RegExp): string {
    let i = 0;

    while (match.test(this._str.charAt(this._currLocation + i))) {
      i++;
      if (i + this._currLocation > this._strLength) {
        break;
      }
    }

    this._currLocation += i;
    return this._str.substr(this._currLocation - i, i);
  }

  protected eatWord(word: string): string | undefined {
    const len = word.length;

    if (this.peekAhead(len) === word) {
      this._currLocation += len;
      return word;
    }

    return undefined;
  }

  protected eatUntil(match: RegExp): string {
    let i = 0;

    while (!match.test(this._str.charAt(this._currLocation + i))) {
      i++;
      if (i + this._currLocation > this._strLength) {
        break;
      }
    }

    this._currLocation += i;
    return this._str.substr(this._currLocation - i, i);
  }

  protected peek(): string {
    return this._str.charAt(this._currLocation);
  }

  protected peekAhead(by: number): string {
    return this._str.substr(this._currLocation, by);
  }

  protected hasNext(): boolean {
    return this._currLocation < this._strLength - 1;
  }

  /**
   * Advances the stream if possible.
   *
   * @protected
   * @returns {string} The token that was advanced over, or undefined if it wasn't possible to advance.
   */
  protected next(): string | undefined {
    if (this.hasNext()) {
      return this._str.charAt(this._currLocation++);
    }

    return undefined;
  }

  protected reset(): void {
    this._currLocation = 0;
  }
}
