import { BaseParser } from './BaseParser';
import { IEnumProperty } from './interfaces';

/**
 * Supporting enum for the parser, used internally within the parser only.
 */
enum ParseState {
  default,
  comment,
  declaration,
}

/**
 * Helper Parser that parses enums.
 */
export class EnumParserHelper extends BaseParser {
  private _state: ParseState = ParseState.default;

  /**
   * @constructor
   * Helper Parser that parses enums.
   */
  public constructor(str: string) {
    super(str);
  }

  public parse(): IEnumProperty[] {
    let bank: string[] = [];
    let comment = '';
    let identifierName = '';
    const returnResult: IEnumProperty[] = [];
    let noClosingSymbolAsterixPrereq = false;

    this.eatUntil(/\{/);
    this.eat('{');

    do {
      switch (this._state) {
        case ParseState.default:
          this.eatSpacesAndNewlines();

          if (this.eat('/')) {
            if (this.peek() === '*') {
              this._state = ParseState.comment;
            } else {
              // ignore // comments
              this.eatUntil(/[\n]/);
            }
          } else if (this.eat('}')) {
            // closing
            break;
          } else {
            this._state = ParseState.declaration;
          }

          break;

        case ParseState.comment:
          {
            // the initial * are always the first * of a comment, and will be treated as decorative
            const asterisk = this.eatWhile('*');
            if ((noClosingSymbolAsterixPrereq || asterisk.length > 0) && this.eat('/')) {
              // encountered closing comment tag
              comment = bank.join('').trim();
              bank = [];
              this._state = ParseState.default;
              break;
            }
            noClosingSymbolAsterixPrereq = false;

            bank.push(this.eatUntil(/[\n\*]/));
            if (this.peek() === '*') {
              const tmp = this.eatWhile('*');
              if (this.peek() !== '/') {
                // encountered a line like "* This is a comment with asterisks in the middle **** like this."
                bank.push(tmp);
              } else {
                noClosingSymbolAsterixPrereq = true;
              }
            } else if (this.peek() === '\n') {
              // go to next line
              this.eatSpacesAndNewlines();
            }
          }
          break;
        case ParseState.declaration: {
          this.eatSpacesAndNewlines();
          const tmp = this.eatUntil(/[=,\}]/);
          if (this.eat('=')) {
            this.eatUntil(/[0-9]/);
            this.eatUntil(/[,\s]/);
          }

          if (this.peek() !== '}') {
            this.next();
          }

          identifierName = tmp.trim();

          this._state = ParseState.default;
          returnResult.push(<IEnumProperty>{
            description: comment,
            name: identifierName,
          });

          comment = identifierName = '';
          break;
        }
      }
    } while (this.hasNext());
    return returnResult;
  }
}
