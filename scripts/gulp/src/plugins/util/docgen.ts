/* eslint-disable @typescript-eslint/member-ordering */
import fs from 'fs';
import path from 'path';
import ts, { TypeFlags } from 'typescript';

/**
 * THIS MODULE is largely based on the parser's logic
 * of react-docgen-typescript library: https://github.com/styleguidist/react-docgen-typescript/blob/master/src/parser.ts
 *
 * All the essential parts are moved from there with the following changes applied:
 * - removed support for component methods pasing
 * - extended support for intersection component types
 *
 * The last one served as the main driver for making this split,
 * as, otherwise, there was no possibility to extend component types
 * with static 'create' factory method.
 *
 * This is a reference to the corresponding issue of react-docgen-typescript
 * that haven't been resolved at time this module was introduced:
 * https://github.com/styleguidist/react-docgen-typescript/issues/158
 */

// currentDirectoryName is used to trim parent fileNames
const currentDirectoryPath = process.cwd();
const currentDirectoryParts = currentDirectoryPath.split(path.sep);
const currentDirectoryName = currentDirectoryParts[currentDirectoryParts.length - 1];
export interface StringIndexedObject<T> {
  [key: string]: T;
}

export interface ComponentDoc {
  displayName: string;
  description: string;
  props: Props;
}

export interface Props extends StringIndexedObject<PropItem> {}

export interface PropItem {
  name: string;
  required: boolean;
  type: PropItemType;
  description: string;
  defaultValue: any;
  parent?: ParentType;
  resolvedType?: any;
}

export interface Component {
  name: string;
}

export interface PropItemType {
  name: string;
  value?: any;
}

export interface ParentType {
  name: string;
  fileName: string;
}
export type ResolvedType = {
  type: string;
  name: string;
};

export type RTLiteral = ResolvedType & {
  type: 'StringLiteral' | 'NumberLiteral' | 'BooleanLiteral';
  value: string | number | boolean;
};

export type RTUnion = ResolvedType & {
  type: 'union';
  types: ResolvedType[];
};

export type RTEnum = ResolvedType & {
  type: 'enum';
  values: RTLiteral[]; // these should be just
};

export type RTIntersection = ResolvedType & {
  type: 'intersection';
  types: ResolvedType[];
};

export type RTArray = ResolvedType & {
  type: 'array';
  indexedType: ResolvedType;
};

export type RTObject = ResolvedType & {
  type: 'object';
  props: Record<string, ResolvedType>;
};

export type PropFilter = (props: PropItem, component: Component) => boolean;

export type ComponentNameResolver = (exp: ts.Symbol, source: ts.SourceFile) => string | undefined | null | false;

export interface ParserOptions {
  propFilter?: StaticPropFilter | PropFilter;
  componentNameResolver?: ComponentNameResolver;
}

export interface StaticPropFilter {
  skipPropsWithName?: string[] | string;
  skipPropsWithoutDoc?: boolean;
}

export const defaultParserOpts: ParserOptions = {};

export interface FileParser {
  parse(filePathOrPaths: string | string[]): ComponentDoc[];
  parseWithProgramProvider(filePathOrPaths: string | string[], programProvider?: () => ts.Program): ComponentDoc[];
}

const defaultOptions: ts.CompilerOptions = {
  // eslint-disable-next-line @fluentui/no-global-react
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.Latest,
  allowUnusedLabels: true,
  allowUnreachableCode: true,
};

const reactComponentSymbolNames = [
  'StatelessComponent',
  'Stateless',
  'StyledComponentClass',
  'FunctionComponent',

  // magic for ComponentWithAs
  'ComponentWithAs',
  '__type',
];

type MaybeIntersectType = ts.Type & { types?: ts.Type[] };

/**
 * Parses a file with default TS options
 * @param filePath - component file that should be parsed
 */
export function parse(filePathOrPaths: string | string[], parserOpts: ParserOptions = defaultParserOpts) {
  return withCompilerOptions(defaultOptions, parserOpts).parse(filePathOrPaths);
}

/**
 * Constructs a parser for a default configuration.
 */
export function withDefaultConfig(parserOpts: ParserOptions = defaultParserOpts): FileParser {
  return withCompilerOptions(defaultOptions, parserOpts);
}

/**
 * Constructs a parser for a specified tsconfig file.
 */
export function withCustomConfig(tsconfigPath: string, parserOpts: ParserOptions): FileParser {
  const basePath = path.dirname(tsconfigPath);
  const { config, error } = ts.readConfigFile(tsconfigPath, filename => fs.readFileSync(filename, 'utf8'));

  if (error !== undefined) {
    const errorText = `Cannot load custom tsconfig.json from provided path: ${tsconfigPath}, with error code: ${error.code}, message: ${error.messageText}`;
    throw new Error(errorText);
  }

  const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, {}, tsconfigPath);

  if (errors && errors.length) {
    throw errors[0];
  }

  return withCompilerOptions(options, parserOpts);
}

/**
 * Constructs a parser for a specified set of TS compiler options.
 */
export function withCompilerOptions(
  compilerOptions: ts.CompilerOptions,
  parserOpts: ParserOptions = defaultParserOpts,
): FileParser {
  return {
    parse(filePathOrPaths: string | string[]): ComponentDoc[] {
      return parseWithProgramProvider(filePathOrPaths, compilerOptions, parserOpts);
    },
    parseWithProgramProvider(filePathOrPaths, programProvider) {
      return parseWithProgramProvider(filePathOrPaths, compilerOptions, parserOpts, programProvider);
    },
  };
}

interface JSDoc {
  description: string;
  fullComment: string;
  tags: StringIndexedObject<string>;
}

const defaultJSDoc: JSDoc = {
  description: '',
  fullComment: '',
  tags: {},
};

const defaultPropFilter: PropFilter = (prop, component) => {
  // skip children property in case it has no custom documentation
  if (prop.name === 'children' && prop.description.length === 0) {
    return false;
  }
  return true;
};

const getComponentSymbolOfType = (type: MaybeIntersectType): ts.Symbol | undefined => {
  if (type.symbol) {
    const symbolName = type.symbol.getName();
    if (reactComponentSymbolNames.indexOf(symbolName) !== -1) {
      return type.symbol;
    }
  }

  if (type.types) {
    for (const innerType of type.types) {
      const componentSymbol = getComponentSymbolOfType(innerType);
      if (componentSymbol) {
        return componentSymbol;
      }
    }
  }
};

export class Parser {
  private checker: ts.TypeChecker;
  private propFilter: PropFilter;

  constructor(program: ts.Program, opts: ParserOptions) {
    this.checker = program.getTypeChecker();
    this.propFilter = defaultPropFilter;
  }

  public getComponentInfo(
    symbolParam: ts.Symbol,
    source: ts.SourceFile,
    componentNameResolver: ComponentNameResolver = () => undefined,
  ): ComponentDoc | null {
    if (!!symbolParam.declarations && symbolParam.declarations.length === 0) {
      return null;
    }

    let exp = symbolParam;

    const type = this.checker.getTypeOfSymbolAtLocation(exp, exp.valueDeclaration || exp.declarations![0]);
    let commentSource = exp;

    if (!exp.valueDeclaration) {
      const componentSymbol = getComponentSymbolOfType(type);

      exp = type.symbol || componentSymbol;
      if (!exp) {
        return null;
      }

      if (componentSymbol) {
        commentSource = this.checker.getAliasedSymbol(commentSource);
      } else {
        commentSource = exp;
      }
    }

    // Skip over PropTypes that are exported
    if (
      type.symbol &&
      (type.symbol.getEscapedName() === 'Requireable' || type.symbol.getEscapedName() === 'Validator')
    ) {
      return null;
    }

    const propsType =
      this.extractPropsFromTypeIfStatelessComponent(type) || this.extractPropsFromTypeIfStatefulComponent(type);

    const resolvedComponentName = componentNameResolver(exp, source);
    const displayName = resolvedComponentName || computeComponentName(exp, source);
    const description = this.findDocComment(commentSource).fullComment;

    if (propsType) {
      const defaultProps = this.extractDefaultPropsFromComponent(exp, source);
      const props = this.getPropsInfo(propsType, defaultProps);

      for (const propName of Object.keys(props)) {
        const prop = props[propName];
        const component: Component = { name: displayName };
        if (!this.propFilter(prop, component)) {
          delete props[propName];
        }
      }

      return {
        description,
        displayName,
        props,
      };
    }

    if (description && displayName) {
      return {
        description,
        displayName,
        props: {},
      };
    }

    return null;
  }

  public extractPropsFromTypeIfStatelessComponent(type: ts.Type): ts.Symbol | null {
    const callSignatures = type.getCallSignatures();

    if (callSignatures.length) {
      // Could be a stateless component.  Is a function, so the props object we're interested
      // in is the (only) parameter.

      for (const sig of callSignatures) {
        const params = sig.getParameters();
        if (params.length === 0) {
          continue;
        }
        // Maybe we could check return type instead,
        // but not sure if Element, ReactElement<T> are all possible values
        const propsParam = params[0];
        if (propsParam.name === 'props' || params.length === 1) {
          return propsParam;
        }
      }
    }

    return null;
  }

  public extractPropsFromTypeIfStatefulComponent(type: ts.Type): ts.Symbol | null {
    const constructSignatures = type.getConstructSignatures();

    if (constructSignatures.length) {
      // React.Component. Is a class, so the props object we're interested
      // in is the type of 'props' property of the object constructed by the class.

      for (const sig of constructSignatures) {
        const instanceType = sig.getReturnType();
        const props = instanceType.getProperty('props');

        if (props) {
          return props;
        }
      }
    }

    return null;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private static isLiteral(type: ResolvedType): boolean {
    return type.type === 'StringLiteral' || type.type === 'NumberLiteral' || type.type === 'BooleanLiteral';
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private customResolveTypeOverride(typeNode: ts.Type, name: string): ResolvedType | undefined {
    // @ts-expect-error ts.Type has no parent property ? ts definition BUG ?
    if (typeNode?.symbol?.parent?.getEscapedName?.() === 'React') {
      const symbolName = typeNode.symbol.getEscapedName?.();
      if (symbolName === 'ReactElement') {
        return {
          type: 'ReactElement',
          name,
        };
      } else if (symbolName === 'ReactPortal') {
        return {
          type: 'ReactPortal',
          name,
        };
      }
    }

    if (
      name === 'ICSSInJSStyle' || // expanding this leads to a single component.info being MBs big
      name === 'Document' || // OOM :-/
      name === 'CSSProperties' ||
      name === 'HTMLElement'
    ) {
      return {
        type: 'object',
        props: {},
        name,
      } as RTObject;
    }

    if (name === 'Document') {
      return {
        type: 'object',
        props: {},
        name,
      } as RTObject;
    }

    return undefined;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private resolveType(typeNode: ts.Type, depth = 0): ResolvedType {
    const name = this.checker.typeToString(typeNode);

    const customType = this.customResolveTypeOverride(typeNode, name);
    if (customType) {
      return customType;
    }

    if (depth > 1) {
      return {
        type: 'MAX_DEPTH',
        name,
      };
    }

    const typeMap = {
      [TypeFlags.Object]: () => {
        // Function
        if (typeNode.getCallSignatures().length > 0) {
          return { type: 'function', name };
        }

        // Array
        const numberIndexedType = typeNode.getNumberIndexType();
        if (numberIndexedType) {
          return {
            type: 'array',
            indexedType: this.resolveType(numberIndexedType, depth + 1),
            name,
          } as RTArray;
        }

        // Object
        const props: RTObject['props'] = {};
        typeNode.getProperties().forEach(prop => {
          const childType = this.checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);

          props[prop.getName()] = this.resolveType(childType, depth + 1);
        });
        return {
          type: 'object',
          props,
          name,
        } as RTObject;
      },
      [TypeFlags.Any]: () => ({ type: 'any', name }),
      [TypeFlags.String]: () => ({ type: 'string', name }),
      [TypeFlags.Number]: () => ({ type: 'number', name }),
      [TypeFlags.Boolean]: () => ({ type: 'boolean', name }),
      [TypeFlags.Enum]: () => ({ type: 'enum', name }), // FIXME
      [TypeFlags.StringLiteral]: () => ({
        type: 'StringLiteral',
        name,
        value: (typeNode as ts.StringLiteralType).value,
      }),
      [TypeFlags.NumberLiteral]: () => ({
        type: 'NumberLiteral',
        name,
        value: (typeNode as ts.NumberLiteralType).value,
      }),
      [TypeFlags.BooleanLiteral]: () => ({ type: 'BooleanLiteral', name, value: name === 'true' }),
    };

    if (typeMap[typeNode.flags as keyof typeof typeMap]) {
      return typeMap[typeNode.flags as keyof typeof typeMap]();
    } else if (typeNode.isIntersection()) {
      return {
        type: 'intersection',
        types: typeNode.types.map(childTypeNode => this.resolveType(childTypeNode, depth + 1)),
        name,
      } as RTIntersection;
    } else if (typeNode.isUnion()) {
      const subTypes = typeNode.types.map(childTypeNode => this.resolveType(childTypeNode, depth + 1));
      const allSubTypesAreLiterals = subTypes.filter(Parser.isLiteral).length === subTypes.length;

      // Convert union to enum
      if (allSubTypesAreLiterals) {
        return (subTypes as RTLiteral[]).map(st => ({ name: 'literal', value: st.value, label: st.name })) as any;
      }

      // Merge boolean literals to boolean type
      const trueBooleanLiteralIndex = subTypes.findIndex(
        subtype => subtype.type === 'BooleanLiteral' && (subtype as RTLiteral).value === true,
      );
      const falseBooleanLiteralIndex = subTypes.findIndex(
        subtype => subtype.type === 'BooleanLiteral' && (subtype as RTLiteral).value === false,
      );
      if (trueBooleanLiteralIndex >= 0 && falseBooleanLiteralIndex >= 0) {
        // to keep the order, replace `true` and delete `false` instead of appending
        subTypes[trueBooleanLiteralIndex] = { type: 'boolean', name: 'boolean' };
        subTypes.splice(falseBooleanLiteralIndex, 1);
      }

      return {
        type: 'union',
        types: subTypes,
        name,
      } as RTUnion;
    }

    return { type: 'unknown', name };
  }

  public getPropsInfo(propsObj: ts.Symbol, defaultProps: StringIndexedObject<string> = {}): Props {
    if (!propsObj.valueDeclaration) {
      return {};
    }
    const propsType = this.checker.getTypeOfSymbolAtLocation(propsObj, propsObj.valueDeclaration);
    const propertiesOfProps = propsType.getProperties();

    const result: Props = {};

    propertiesOfProps.forEach(prop => {
      const propName = prop.getName();

      // Find type of prop by looking in context of the props object itself.
      const propType = this.checker.getTypeOfSymbolAtLocation(prop, propsObj.valueDeclaration!);

      const propTypeString = this.checker.typeToString(propType);

      // eslint-disable-next-line no-bitwise
      const isOptional = (prop.getFlags() & ts.SymbolFlags.Optional) !== 0;

      const jsDocComment = this.findDocComment(prop);

      let defaultValue = null;

      if (defaultProps[propName] !== undefined) {
        defaultValue = { value: defaultProps[propName] };
      } else if (jsDocComment.tags.default) {
        defaultValue = { value: jsDocComment.tags.default };
      }

      const resolvedType = this.resolveType(propType);

      const parent = getParentType(prop);

      result[propName] = {
        defaultValue,
        description: jsDocComment.fullComment,
        name: propName,
        parent,
        required: !isOptional,
        type: { name: propTypeString },
        resolvedType,
      };
    });

    return result;
  }

  public findDocComment(symbol: ts.Symbol): JSDoc {
    const comment = this.getFullJsDocComment(symbol);
    if (comment.fullComment) {
      return comment;
    }

    const rootSymbols = this.checker.getRootSymbols(symbol);
    const commentsOnRootSymbols = rootSymbols
      .filter(x => x !== symbol)
      .map(x => this.getFullJsDocComment(x))
      .filter(x => !!x.fullComment);

    if (commentsOnRootSymbols.length) {
      return commentsOnRootSymbols[0];
    }

    return defaultJSDoc;
  }

  /**
   * Extracts a full JsDoc comment from a symbol, even
   * though TypeScript has broken down the JsDoc comment into plain
   * text and JsDoc tags.
   */
  public getFullJsDocComment(symbol: ts.Symbol): JSDoc {
    // in some cases this can be undefined (Pick<Type, 'prop1'|'prop2'>)
    if (symbol.getDocumentationComment === undefined) {
      return defaultJSDoc;
    }

    let mainComment = ts.displayPartsToString(symbol.getDocumentationComment(this.checker));

    if (mainComment) {
      mainComment = mainComment.replace('\r\n', '\n');
    }

    const tags = symbol.getJsDocTags() || [];

    const tagComments: string[] = [];
    const tagMap: StringIndexedObject<string> = {};

    tags.forEach(tag => {
      const trimmedText = ts.displayPartsToString(tag.text).trim();
      const currentValue = tagMap[tag.name];
      tagMap[tag.name] = currentValue ? `${currentValue}\n${trimmedText}` : trimmedText;

      if (tag.name !== 'default') {
        tagComments.push(formatTag(tag));
      }
    });

    return {
      description: mainComment,
      fullComment: `${mainComment}\n${tagComments.join('\n')}`.trim(),
      tags: tagMap,
    };
  }

  public extractDefaultPropsFromComponent(symbol: ts.Symbol, source: ts.SourceFile) {
    let possibleStatements = source.statements
      // ensure that name property is available
      .filter(stmt => !!(stmt as ts.ClassDeclaration).name)
      .filter(stmt => this.checker.getSymbolAtLocation((stmt as ts.ClassDeclaration).name!) === symbol);

    if (!possibleStatements.length) {
      // if no class declaration is found, try to find a
      // expression statement used in a React.StatelessComponent
      possibleStatements = source.statements.filter(stmt => ts.isExpressionStatement(stmt));
    }

    if (!possibleStatements.length) {
      return {};
    }

    const statement = possibleStatements[0];

    if (statementIsClassDeclaration(statement) && statement.members.length) {
      const possibleDefaultProps = statement.members.filter(
        member => member.name && getPropertyName(member.name) === 'defaultProps',
      );

      if (!possibleDefaultProps.length) {
        return {};
      }

      const defaultProps = possibleDefaultProps[0];
      let initializer = (defaultProps as ts.PropertyDeclaration).initializer;
      let properties = (initializer as ts.ObjectLiteralExpression).properties;

      while (ts.isIdentifier(initializer as ts.Identifier)) {
        const defaultPropsReference = this.checker.getSymbolAtLocation(initializer as ts.Node);
        if (defaultPropsReference) {
          const declarations = defaultPropsReference.getDeclarations();

          if (declarations) {
            initializer = (declarations[0] as ts.VariableDeclaration).initializer;
            properties = (initializer as ts.ObjectLiteralExpression).properties;
          }
        }
      }

      let propMap = {};

      if (properties) {
        propMap = this.getPropMap(properties as ts.NodeArray<ts.PropertyAssignment>);
      }

      return propMap;
    }

    if (statementIsStateless(statement)) {
      let propMap = {};
      const expressionStatement = statement as ts.ExpressionStatement;

      expressionStatement.getChildren().forEach(child => {
        const { right } = child as ts.BinaryExpression;
        if (right) {
          const { properties } = right as ts.ObjectLiteralExpression;
          if (properties) {
            propMap = this.getPropMap(properties as ts.NodeArray<ts.PropertyAssignment>);
          }
        }
      });
      return propMap;
    }
    return {};
  }

  public getLiteralValueFromPropertyAssignment(property: ts.PropertyAssignment): string | null {
    let { initializer } = property;

    // Shorthand properties, so inflect their actual value
    if (!initializer) {
      if (ts.isShorthandPropertyAssignment(property)) {
        const symbol = this.checker.getShorthandAssignmentValueSymbol(property);
        const decl = symbol && (symbol.valueDeclaration as ts.VariableDeclaration);

        if (decl && decl.initializer) {
          initializer = decl.initializer!;
        }
      }
    }

    if (!initializer) {
      return null;
    }

    // Literal values
    switch (initializer.kind) {
      case ts.SyntaxKind.PropertyAccessExpression:
        return initializer.getText();
      case ts.SyntaxKind.FalseKeyword:
        return 'false';
      case ts.SyntaxKind.TrueKeyword:
        return 'true';
      case ts.SyntaxKind.StringLiteral:
        return (initializer as ts.StringLiteral).text.trim();
      case ts.SyntaxKind.PrefixUnaryExpression:
        return initializer.getFullText().trim();
      case ts.SyntaxKind.NumericLiteral:
        return `${(initializer as ts.NumericLiteral).text}`;
      case ts.SyntaxKind.NullKeyword:
        return 'null';
      case ts.SyntaxKind.Identifier:
        // can potentially find other identifiers in the source and map those in the future
        return (initializer as ts.Identifier).text === 'undefined' ? 'undefined' : null;
      case ts.SyntaxKind.ObjectLiteralExpression:
        // return the source text for an object literal
        return (initializer as ts.ObjectLiteralExpression).getText();
      default:
        return null;
    }
  }

  public getPropMap(properties: ts.NodeArray<ts.PropertyAssignment>): StringIndexedObject<string> {
    const propMap = properties.reduce((acc, property) => {
      if (ts.isSpreadAssignment(property) || !property.name) {
        return acc;
      }

      const literalValue = this.getLiteralValueFromPropertyAssignment(property);
      const propertyName = getPropertyName(property.name);

      if (typeof literalValue === 'string' && propertyName !== null) {
        acc[propertyName] = literalValue;
      }

      return acc;
    }, {} as StringIndexedObject<string>);
    return propMap;
  }
}

function statementIsClassDeclaration(statement: ts.Statement): statement is ts.ClassDeclaration {
  return !!(statement as ts.ClassDeclaration).members;
}

function statementIsStateless(statement: ts.Statement): boolean {
  const children = (statement as ts.ExpressionStatement).getChildren();
  for (const child of children) {
    const { left } = child as ts.BinaryExpression;
    if (left) {
      const { name } = left as ts.PropertyAccessExpression;
      if (name.escapedText === 'defaultProps') {
        return true;
      }
    }
  }
  return false;
}

function getPropertyName(name: ts.PropertyName): string | null {
  switch (name.kind) {
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.Identifier:
      return name.text;
    case ts.SyntaxKind.ComputedPropertyName:
      return name.getText();
    default:
      return null;
  }
}

function formatTag(tag: ts.JSDocTagInfo) {
  let result = `@${tag.name}`;
  if (tag.text) {
    result += ` ${ts.displayPartsToString(tag.text)}`;
  }
  return result;
}

function getTextValueOfClassMember(classDeclaration: ts.ClassDeclaration, memberName: string): string {
  const [textValue] = classDeclaration.members
    .filter(member => ts.isPropertyDeclaration(member))
    .filter(member => {
      const name = ts.getNameOfDeclaration(member) as ts.Identifier;
      return name && name.text === memberName;
    })
    .map(member => {
      const property = member as ts.PropertyDeclaration;
      return property.initializer && (property.initializer as ts.Identifier).text;
    });

  return textValue || '';
}

function getTextValueOfFunctionProperty(exp: ts.Symbol, source: ts.SourceFile, propertyName: string) {
  const [textValue] = source.statements
    .filter(statement => ts.isExpressionStatement(statement))
    .filter(statement => {
      const expr = (statement as ts.ExpressionStatement).expression as ts.BinaryExpression;
      return (
        expr.left &&
        (expr.left as ts.PropertyAccessExpression).name &&
        (expr.left as ts.PropertyAccessExpression).name.escapedText === propertyName
      );
    })
    .filter(statement => {
      const expr = (statement as ts.ExpressionStatement).expression as ts.BinaryExpression;

      return ((expr.left as ts.PropertyAccessExpression).expression as ts.Identifier).escapedText === exp.getName();
    })
    .filter(statement => {
      return ts.isStringLiteral(((statement as ts.ExpressionStatement).expression as ts.BinaryExpression).right);
    })
    .map(statement => {
      return (((statement as ts.ExpressionStatement).expression as ts.BinaryExpression).right as ts.Identifier).text;
    });

  return textValue || '';
}

function computeComponentName(exp: ts.Symbol, source: ts.SourceFile) {
  const exportName = exp.getName();

  const statelessDisplayName = getTextValueOfFunctionProperty(exp, source, 'displayName');

  const statefulDisplayName =
    exp.valueDeclaration &&
    ts.isClassDeclaration(exp.valueDeclaration) &&
    getTextValueOfClassMember(exp.valueDeclaration, 'displayName');

  if (statelessDisplayName || statefulDisplayName) {
    return statelessDisplayName || statefulDisplayName || '';
  }

  if (exportName === 'default' || exportName === '__function' || reactComponentSymbolNames.indexOf(exportName) !== -1) {
    return getDefaultExportForFile(source);
  }

  return exportName;
}

// Default export for a file: named after file
export function getDefaultExportForFile(source: ts.SourceFile) {
  const name = path.basename(source.fileName, path.extname(source.fileName));
  const filename = name === 'index' ? path.basename(path.dirname(source.fileName)) : name;

  // JS identifiers must starts with a letter, and contain letters and/or numbers
  // So, you could not take filename as is
  const identifier = filename.replace(/^[^A-Z]*/gi, '').replace(/[^A-Z0-9]*/gi, '');

  return identifier.length ? identifier : 'DefaultName';
}

function getParentType(prop: ts.Symbol): ParentType | undefined {
  const declarations = prop.getDeclarations();

  // eslint-disable-next-line eqeqeq
  if (declarations == null || declarations.length === 0) {
    return undefined;
  }

  // Props can be declared only in one place
  const { parent } = declarations[0];

  if (!isInterfaceOrTypeAliasDeclaration(parent)) {
    return undefined;
  }

  const parentName = parent.name.text;
  const { fileName } = parent.getSourceFile();

  const fileNameParts = fileName.split(path.sep);
  const trimmedFileNameParts = fileNameParts.slice();

  while (trimmedFileNameParts.length) {
    if (trimmedFileNameParts[0] === currentDirectoryName) {
      break;
    }
    trimmedFileNameParts.splice(0, 1);
  }
  let trimmedFileName;
  if (trimmedFileNameParts.length) {
    trimmedFileName = trimmedFileNameParts.join(path.sep);
  } else {
    trimmedFileName = fileName;
  }

  return {
    fileName: trimmedFileName,
    name: parentName,
  };
}

function isInterfaceOrTypeAliasDeclaration(node: ts.Node): node is ts.InterfaceDeclaration | ts.TypeAliasDeclaration {
  return node.kind === ts.SyntaxKind.InterfaceDeclaration || node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}

export function parseWithProgramProvider(
  filePathOrPaths: string | string[],
  compilerOptions: ts.CompilerOptions,
  parserOpts: ParserOptions,
  programProvider?: () => ts.Program,
): ComponentDoc[] {
  const filePaths = Array.isArray(filePathOrPaths) ? filePathOrPaths : [filePathOrPaths];

  const program = programProvider ? programProvider() : ts.createProgram(filePaths, compilerOptions);

  const parser = new Parser(program, parserOpts);

  const checker = program.getTypeChecker();

  return filePaths
    .map(filePath => program.getSourceFile(filePath))
    .filter((sourceFile): sourceFile is ts.SourceFile => typeof sourceFile !== 'undefined')
    .reduce<ComponentDoc[]>((docs, sourceFile) => {
      const moduleSymbol = checker.getSymbolAtLocation(sourceFile);

      if (!moduleSymbol) {
        return docs;
      }

      Array.prototype.push.apply(
        docs,
        checker
          .getExportsOfModule(moduleSymbol)
          .map(exp => parser.getComponentInfo(exp, sourceFile, parserOpts.componentNameResolver))
          .filter((comp): comp is ComponentDoc => comp !== null)
          .filter((comp, index, comps) =>
            comps.slice(index + 1).every(innerComp => innerComp!.displayName !== comp!.displayName),
          ),
      );

      return docs;
    }, []);
}
