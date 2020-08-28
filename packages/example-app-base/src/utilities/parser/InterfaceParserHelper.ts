import { BaseParser } from './BaseParser';
import { IInterfaceProperty, InterfacePropertyType } from './interfaces';

const JSDOC_DEFAULT = '@default';
const JSDOC_DEFAULTVALUE = '@defaultvalue';
const TSDOC_DEFAULTVALUE = '@defaultValue';
const JSDOC_DEPRECATED = '@deprecated';
/**
 * Supporting enum for the parser, used internally within the parser only.
 */
enum ParseState {
  default,
  comment,
  declaration,
}

/**
 * Helper Parser that parses interfaces.
 */
export class InterfaceParserHelper extends BaseParser {
  private _state: ParseState = ParseState.default;

  /**
   * @constructor
   * Helper Parser that parses interfaces.
   */
  public constructor(str: string) {
    super(str);
  }

  public parse(): IInterfaceProperty[] {
    let bank: (string | undefined)[] = [];
    let comment = '';
    let identifierName = '';
    let type = '';
    const returnResult: IInterfaceProperty[] = [];
    let defaultValue = '';
    let isDeprecated = false;
    let deprecatedMessage = '';
    let noClosingSymbolAsteriskPrereq = false;

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
            if ((noClosingSymbolAsteriskPrereq || asterisk.length > 0) && this.eat('/')) {
              // encountered closing comment tag
              comment = bank.join('').trim();
              bank = [];
              this._state = ParseState.default;
              break;
            }

            noClosingSymbolAsteriskPrereq = false;

            let tmp = this.eatUntil(/[\n\*@]/);
            bank.push(tmp);

            if (this.peek() === '*') {
              tmp = this.eatWhile('*');

              if (this.peek() !== '/') {
                // encountered a line like '* This is a comment with asterisks in the middle **** like this.'
                bank.push(tmp);
              } else {
                // we have already encountered *, and the next symbol is /
                noClosingSymbolAsteriskPrereq = true;
              }
            } else if (this.peek() === '\n') {
              // go to next line
              this.eatSpacesAndNewlines();
            } else if (this.peek() === '@') {
              if (this.eatWord(JSDOC_DEFAULTVALUE) || this.eatWord(TSDOC_DEFAULTVALUE) || this.eatWord(JSDOC_DEFAULT)) {
                // this parser assumes @default values won't have a bunch of asterisks in the middle of it.
                tmp = this.eatUntil(/[\*\n]/);
                defaultValue = tmp;
                this.eatSpacesAndNewlines();
              } else if (this.eatWord(JSDOC_DEPRECATED)) {
                tmp = this.eatUntil(/[\*\n]/);
                isDeprecated = true;
                deprecatedMessage = tmp;
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

            const isOptional = identifierName[identifierName.length - 1] === '?';
            const propType = isDeprecated
              ? InterfacePropertyType.deprecated
              : isOptional
              ? InterfacePropertyType.optional
              : InterfacePropertyType.required;

            if (isOptional) {
              identifierName = identifierName.substr(0, identifierName.length - 1);
            }

            this._state = ParseState.default;
            returnResult.push(<IInterfaceProperty>{
              description: comment,
              name: identifierName,
              type,
              defaultValue: defaultValue,
              interfacePropertyType: propType,
              deprecatedMessage,
            });

            // resets
            comment = identifierName = type = defaultValue = deprecatedMessage = '';
            isDeprecated = false;
          }
          break;
      }
    } while (this.hasNext());

    this.reset();
    return returnResult;
  }
}
