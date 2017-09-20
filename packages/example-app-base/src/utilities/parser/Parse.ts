/* tslint:disable:no-trailing-whitespace */

import { IEnumProperty, IInterfaceProperty, IProperty, PropertyType } from './interfaces';
import { InterfaceParserHelper } from './InterfaceParserHelper';
import { EnumParserHelper } from './EnumParserHelper';

/**
 * Given some valid, well linted Typescript source code, extracts exported interfaces and enums.
 *
 * Note: requires that the closing '}' of interfaces and enums is the first char on its own line.
 *       It should otherwise be reasonably robust to handle various commenting or even code layout
 *       styles within the interface or enum.
 *
 * To specify default values for interfaces, use the JSDoc @default or @defaultvalue markup.
 * The rest of the line after @default will be captured as the default value.
 *
 * @export
 * @param {string} source Valid, reasonably well linted Typescript source code.
 * @param {string} [propsInterfaceOrEnumName] Name of an interface or enum if you only want to parse said interface or enum.
 * @returns {Array<IProperty>} An array of properties.
 */
export function parse(source: string, propsInterfaceOrEnumName?: string): IProperty[] {
  let props: IProperty[] = [];
  let regex: RegExp | null = null;
  let parseInfo;

  let propertyNameSuffix = (type: string) => type === 'interface' ? ' interface' : ' enum';
  let propertyType = (type: string) => type === 'interface' ? PropertyType.interface : PropertyType.enum;

  if (propsInterfaceOrEnumName) {
    regex = new RegExp(`export (interface|enum) ${propsInterfaceOrEnumName} (?:extends )?(.*?)\\s?(?:<|\\{)(.*[\\r\\n]*)*?\\}`);
    let regexResult = regex.exec(source);
    if (regexResult && regexResult.length > 0) {
      parseInfo = _parseEnumOrInterface(regexResult);
      return [<IProperty>{
        name: _stripBracketText(propsInterfaceOrEnumName),
        propertyName: propsInterfaceOrEnumName + propertyNameSuffix(regexResult[1]),
        propertyType: propertyType(regexResult[1]),
        property: parseInfo,
        extends: _parseExtendedInterfaces(regexResult[2])
      }];
    }
  } else {
    regex = new RegExp(`export (interface|enum) (\\S*?) (?:extends )?(.*?)\\s?(?:\\{)(.*[\\r\\n]*)*?\\}`, 'g');
    let regexResult: RegExpExecArray | null;
    let results: Array<IProperty> = [];
    while ((regexResult = regex.exec(source)) !== null) {
      parseInfo = _parseEnumOrInterface(regexResult);
      results.push(<IProperty>{
        name: _stripBracketText(regexResult[2]),
        propertyName: regexResult[2] + propertyNameSuffix(regexResult[1]),
        propertyType: propertyType(regexResult[1]),
        property: parseInfo,
        extends: _parseExtendedInterfaces(regexResult[3])
      });
    }

    return results;
  }

  return props;
}

function _parseEnumOrInterface(regexResult: RegExpExecArray): IInterfaceProperty[] | IEnumProperty[] {
  let parseInfo: IInterfaceProperty[] | IEnumProperty[];
  if (regexResult[1] === 'interface') {
    let parser = new InterfaceParserHelper(regexResult[0]);
    parseInfo = parser.parse();
  } else {
    let parser = new EnumParserHelper(regexResult[0]);
    parseInfo = parser.parse();
  }
  return parseInfo;
}

/**
 * Split string by commas and strip out text in angle brackets. Returns array of interfaces being extended.
 * @param orignalString String of all interfaces being extended from.
 */
function _parseExtendedInterfaces(orignalString: string): string[] {
  return orignalString.split(', ').map((str: string) => {
    return _stripBracketText(str);
  });
}

/**
 * Returns string stripped of text in angle brackets (generics), or returns original string if it contains no angle brackets
 * @param str String to be stripped of text in brackets
 */
function _stripBracketText(str: string): string {
  let indexOfBracket = str.indexOf('<');
  return indexOfBracket === -1 ? str : str.substring(0, indexOfBracket);
}
