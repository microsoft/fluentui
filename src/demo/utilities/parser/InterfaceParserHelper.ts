import BaseParser from './BaseParser';
import { IInterfaceProperty } from '../../components/index';

const JSDOC_DEFAULT = '@default';
const JSDOC_DEFAULTVALUE = '@defaultvalue';

/**
 * Supporting enum for the parser, used internally within the parser only.
 */
enum ParseState {
  default, comment, declaration
};

/**
 * Helper Parser that parses interfaces.
 */
export default class InterfaceParserHelper extends BaseParser {
  private _state: ParseState = ParseState.default;

  /**
   * @constructor
   * Helper Parser that parses interfaces.
   */
  public constructor(str: string) {
    super(str);
  }

  public parse(): Array<IInterfaceProperty> {
    let bank: Array<string> = [];
    let comment = '';
    let identifierName = '';
    let type = '';
    let returnResult = [];
    let defaultValue = '';
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
          }else {
            this._state = ParseState.declaration;
          }

          break;
        case ParseState.comment:
          {
            // the initial * are always the first * of a comment, and will be treated as decorative
            let asterix = this.eatWhile('*');
            if ((noClosingSymbolAsterixPrereq || asterix.length > 0) && this.eat('/')) {
              // encountered closing comment tag
              comment = bank.join('').trim();
              bank = [];
              this._state = ParseState.default;
              break;
            }

            noClosingSymbolAsterixPrereq = false;

            let tmp = this.eatUntil(/[\n\*@]/);
            bank.push(tmp.trim());

            if (this.peek() === '*') {
              let tmp = this.eatWhile('*');
              if (this.peek() !== '/') {
                // encountered a line like '* This is a comment with asterisks in the middle **** like this.'
                bank.push(tmp);
              } else {
                // we have already encountered *, and the next symbol is /
                noClosingSymbolAsterixPrereq = true;
              }
            } else if (this.peek() === '\n') {
              // go to next line
              this.eatSpacesAndNewlines();
            } else if (this.peek() === '@') {
              if (this.eatWord(JSDOC_DEFAULTVALUE) || this.eatWord(JSDOC_DEFAULT)) {
                // this parser assumes @default values won't have a bunch of asterisks in the middle of it.
                let tmp = this.eatUntil(/[\*\n]/);
                defaultValue = tmp;
                this.eatSpacesAndNewlines();
              } else {
                bank.push(this.eat('@'));
              }
            }
          }
          break;
        case ParseState.declaration:
          {
            this.eatSpacesAndNewlines();
            let tmp = this.eatUntil(/[\:\;=]/);
            identifierName = tmp.trim();
            if (this.eat(':')) {
              tmp = this.eatUntil(/\;/);
              type = tmp;

            } else {
              // encountered semicolon or =
              type = 'unspecified';
            }

            this.eat(';'); // actually eat the semicolon
            this._state = ParseState.default;
            returnResult.push(<IInterfaceProperty>{
              description: comment,
              name: identifierName,
              type: type,
              defaultValue: defaultValue
            });

            comment = identifierName = type = defaultValue = '';
          }
          break;
      }
    } while (this.hasNext());

    this.reset();
    return returnResult;
  }
}
