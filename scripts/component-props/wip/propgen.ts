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

type InterfaceOrTypeAliasDeclaration = ts.TypeAliasDeclaration | ts.InterfaceDeclaration;
interface StringIndexedObject<T> {
  [key: string]: T;
}

interface TypeOrInterface {
  name: string;
  props: Props;
}

interface Props extends StringIndexedObject<PropItem> {}

interface PropItem {
  name: string;
  required: boolean;
  type: PropItemType;
  description: string;
  defaultValue: any;
  parent?: ParentType;
  resolvedType?: PropItemType;
  declarations?: ParentType[];
  tags?: {};
}

interface PropItemType {
  name: string;
  value?: any;
  raw?: string;
}

interface ParentType {
  name: string;
  fileName: string;
}
type ResolvedType = {
  type: string;
  name: string;
};

type RTLiteral = ResolvedType & {
  type: 'StringLiteral' | 'NumberLiteral' | 'BooleanLiteral';
  value: string | number | boolean;
};

type RTUnion = ResolvedType & {
  type: 'union';
  types: ResolvedType[];
};

type RTIntersection = ResolvedType & {
  type: 'intersection';
  types: ResolvedType[];
};

type RTArray = ResolvedType & {
  type: 'array';
  indexedType: ResolvedType;
};

type RTObject = ResolvedType & {
  type: 'object';
  props: Record<string, ResolvedType>;
};

type PropFilter = (props: PropItem) => boolean;

interface ParserOptions {
  propFilter?: PropFilter;
}

/** max # of members to expand in a union type (could be made configurable if needed) */
const MAX_UNION_MEMBERS = 16;

export interface FileParser {
  parse(filePathOrPaths: string | string[]): TypeOrInterface[];
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

  return {
    parse(filePathOrPaths: string | string[]): TypeOrInterface[] {
      return parseWithProgramProvider(filePathOrPaths, options, parserOpts);
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

const defaultPropFilter = prop => {
  // skip children property in case it has no custom documentation
  if (prop.name === 'children' && prop.description.length === 0) {
    return false;
  }
  return true;
};

class Parser {
  private checker: ts.TypeChecker;
  private propFilter: PropFilter;

  constructor(program: ts.Program, opts: ParserOptions) {
    this.checker = program.getTypeChecker();
    this.propFilter = opts.propFilter || defaultPropFilter;
  }

  /**
   * @param symbolParam symbol of an export from a props file
   */
  public getTypeOrInterfaceInfo(symbolParam: ts.Symbol, source: ts.SourceFile): TypeOrInterface | null {
    if (!!symbolParam.declarations && symbolParam.declarations.length === 0) {
      return null;
    }

    let exp = this.getComponentFromExpression(symbolParam);

    const type = this.checker.getTypeOfSymbolAtLocation(exp, exp.valueDeclaration || exp.declarations![0]);
    let commentSource = exp;
    const typeSymbol = type.symbol; // || type.aliasSymbol;
    const filePath = source.fileName;

    if (!exp.valueDeclaration) {
      const componentSymbol = getComponentSymbolOfType(type);

      exp = typeSymbol || componentSymbol;
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
    if (typeSymbol && (typeSymbol.getEscapedName() === 'Requireable' || typeSymbol.getEscapedName() === 'Validator')) {
      return null;
    }

    const propsType =
      this.extractPropsFromTypeIfStatelessComponent(type) || this.extractPropsFromTypeIfStatefulComponent(type);

    const resolvedComponentName = componentNameResolver(exp, source);
    const displayName = resolvedComponentName || computeComponentName(exp, source);
    const { fullComment: description, tags } = this.findDocComment(commentSource);

    if (propsType) {
      if (!commentSource.valueDeclaration) {
        return null;
      }
      const defaultProps = this.extractDefaultPropsFromComponent(
        commentSource,
        commentSource.valueDeclaration.getSourceFile(),
      );
      const props = this.getPropsInfo(propsType, defaultProps);
      const parents = new Set<string>();
      const component: Component = { name: displayName };

      for (const propName of Object.keys(props)) {
        const prop = props[propName];
        if (prop.parent) {
          parents.add(prop.parent.name);
        }
        if (!this.propFilter(prop, component)) {
          delete props[propName];
        }
      }

      return {
        tags,
        filePath,
        description,
        displayName,
        props,
        parents: [...parents].filter(p => p !== `${displayName}Props`),
      };
    }

    if (description && displayName) {
      return {
        tags,
        filePath,
        description,
        displayName,
        props: {},
      };
    }

    return null;
  }

  private static isLiteral(type: ResolvedType): boolean {
    return type.type === 'StringLiteral' || type.type === 'NumberLiteral' || type.type === 'BooleanLiteral';
  }

  private customResolveTypeOverride(typeNode: ts.Type, name: string): ResolvedType | undefined {
    if (((typeNode?.symbol as any)?.parent as ts.Symbol | undefined)?.getEscapedName?.() === 'React') {
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
      /^HTML(\w+)?Element$/.test(name) // very large, not useful to expand
    ) {
      return {
        type: 'object',
        props: {},
        name,
      } as RTObject;
    }

    return undefined;
  }

  private resolveType(typeNode: ts.Type, prop: ts.Symbol | undefined, depth = 0): ResolvedType | RTIntersection {
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
            indexedType: this.resolveType(numberIndexedType, undefined, depth + 1),
            name,
          } as RTArray;
        }

        // Object
        const props: RTObject['props'] = {};
        typeNode.getProperties().forEach(prop => {
          const childType = this.checker.getTypeOfSymbolAtLocation(prop, prop.valueDeclaration!);

          props[prop.getName()] = this.resolveType(childType, undefined, depth + 1);
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
      [TypeFlags.StringLiteral]: () => ({ type: 'StringLiteral', name, value: (typeNode as ts.LiteralType).value }),
      [TypeFlags.NumberLiteral]: () => ({ type: 'NumberLiteral', name, value: (typeNode as ts.LiteralType).value }),
      [TypeFlags.BooleanLiteral]: () => ({ type: 'BooleanLiteral', name, value: name === 'true' }),
    };

    if (typeMap[typeNode.flags]) {
      return typeMap[typeNode.flags]();
    } else if (typeNode.isIntersection()) {
      return {
        type: 'intersection',
        types: typeNode.types.map(childTypeNode => this.resolveType(childTypeNode, undefined, depth + 1)),
        name,
      };
    } else if (typeNode.isUnion()) {
      if (typeNode.types.length > MAX_UNION_MEMBERS) {
        return {
          type: 'MAX_DEPTH',
          name: prop
            ? (prop.declarations as ts.PropertyDeclaration[]).map(decl => decl.type.getFullText().trim()).join(' | ')
            : name,
        };
      }

      const subTypes = typeNode.types.map(childTypeNode => this.resolveType(childTypeNode, undefined, depth + 1));
      const allSubTypesAreLiterals = subTypes.every(Parser.isLiteral);

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

  private getPropsInfo(propsObj: ts.Symbol, defaultProps: StringIndexedObject<string> = {}): Props {
    if (!propsObj.valueDeclaration) {
      return {};
    }
    const propsType = this.checker.getTypeOfSymbolAtLocation(propsObj, propsObj.valueDeclaration);
    // const propertiesOfProps = propsType.getProperties();
    const baseProps = propsType.getApparentProperties();
    let propertiesOfProps = baseProps;

    if (propsType.isUnionOrIntersection()) {
      propertiesOfProps = [
        // Resolve extra properties in the union/intersection
        ...(propertiesOfProps = (this.checker as any).getAllPossiblePropertiesOfTypes(propsType.types)),
        // But props we already have override those as they are already correct.
        ...baseProps,
      ];

      if (!propertiesOfProps.length) {
        const subTypes = (this.checker as any).getAllPossiblePropertiesOfTypes(
          propsType.types.reduce<ts.Type[]>(
            (all, t) => [...all, ...((t as ts.UnionOrIntersectionType).types || [])],
            [],
          ),
        );

        propertiesOfProps = [...subTypes, ...baseProps];
      }
    }

    const result: Props = {};

    propertiesOfProps.forEach(prop => {
      const propName = prop.getName();

      // Find type of prop by looking in context of the props object itself.
      const propType = this.checker.getTypeOfSymbolAtLocation(prop, propsObj.valueDeclaration!);

      const propTypeString = this.checker.typeToString(propType);

      const jsDocComment = this.findDocComment(prop);
      const hasCodeBasedDefault = defaultProps[propName] !== undefined;

      let defaultValue: { value: any } | null = null;

      if (hasCodeBasedDefault) {
        defaultValue = { value: defaultProps[propName] };
      } else if (jsDocComment.tags.default) {
        defaultValue = { value: jsDocComment.tags.default };
      } else if (jsDocComment.tags.defaultValue) {
        defaultValue = { value: jsDocComment.tags.defaultValue };
      } else if (jsDocComment.tags.defaultvalue) {
        defaultValue = { value: jsDocComment.tags.defaultvalue };
      }

      const resolvedType = this.resolveType(propType, prop);

      const parent = getParentType(prop);
      const parents = getDeclarations(prop, this.checker);
      const declarations = prop.declarations || [];
      const baseProp = baseProps.find(p => p.getName() === propName);

      const required =
        !isOptional(prop) &&
        !hasCodeBasedDefault &&
        // If in a intersection or union check original declaration for "?"
        declarations.every(d => !(d as ts.ParameterDeclaration).questionToken) &&
        (!baseProp || !isOptional(baseProp));

      result[propName] = {
        defaultValue,
        description: jsDocComment.fullComment,
        name: propName,
        parent,
        required,
        type: { name: propTypeString },
        resolvedType,
        declarations: parents,
        tags: jsDocComment.tags,
      };
    });

    return result;
  }

  private findDocComment(symbol: ts.Symbol): JSDoc {
    const comment = this.getFullJsDocComment(symbol);
    if (comment.fullComment || comment.tags.default) {
      return comment;
    }

    const rootSymbols = this.checker.getRootSymbols(symbol);
    const commentsOnRootSymbols = rootSymbols
      .filter(x => x !== symbol)
      .map(x => this.getFullJsDocComment(x))
      .filter(x => !!x.fullComment || !!comment.tags.default);

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
  private getFullJsDocComment(symbol: ts.Symbol): JSDoc {
    // in some cases this can be undefined (Pick<Type, 'prop1'|'prop2'>)
    if (symbol.getDocumentationComment === undefined) {
      return defaultJSDoc;
    }

    let mainComment = ts.displayPartsToString(symbol.getDocumentationComment(this.checker));

    if (mainComment) {
      mainComment = mainComment.replace(/\r\n/g, '\n');
    }

    const tags = symbol.getJsDocTags() || [];

    const tagComments: string[] = [];
    const tagMap: StringIndexedObject<string> = {};

    tags.forEach(tag => {
      // TS 4.3+
      // const trimmedText = ts.displayPartsToString(tag.text).trim();
      const trimmedText = (tag.text || '').trim();
      const currentValue = tagMap[tag.name];
      tagMap[tag.name] = currentValue ? `${currentValue}\n${trimmedText}` : trimmedText;

      if (['default', 'type'].indexOf(tag.name) < 0) {
        tagComments.push(formatTag(tag));
      }
    });

    return {
      description: mainComment,
      fullComment: `${mainComment}\n${tagComments.join('\n')}`.trim(),
      tags: tagMap,
    };
  }

  private extractDefaultPropsFromComponent(symbol: ts.Symbol, source: ts.SourceFile) {
    let possibleStatements = [
      ...source.statements
        // ensure that name property is available
        .filter(stmt => !!(stmt as ts.ClassDeclaration).name)
        .filter(stmt => this.checker.getSymbolAtLocation((stmt as ts.ClassDeclaration).name!) === symbol),
      ...source.statements.filter(stmt => ts.isExpressionStatement(stmt) || ts.isVariableStatement(stmt)),
    ];

    return possibleStatements.reduce((res, statement) => {
      if (statementIsClassDeclaration(statement) && statement.members.length) {
        const possibleDefaultProps = statement.members.filter(
          member => member.name && getPropertyName(member.name) === 'defaultProps',
        );

        if (!possibleDefaultProps.length) {
          return res;
        }

        const defaultProps = possibleDefaultProps[0];
        let initializer = (defaultProps as ts.PropertyDeclaration).initializer;
        if (!initializer) {
          return res;
        }
        let properties = (initializer as ts.ObjectLiteralExpression).properties;

        while (ts.isIdentifier(initializer as ts.Identifier)) {
          const defaultPropsReference = this.checker.getSymbolAtLocation(initializer as ts.Node);
          if (defaultPropsReference) {
            const declarations = defaultPropsReference.getDeclarations();

            if (declarations) {
              if (ts.isImportSpecifier(declarations[0])) {
                var symbol = this.checker.getSymbolAtLocation((declarations[0] as ts.ImportSpecifier).name);
                if (!symbol) {
                  continue;
                }
                var aliasedSymbol = this.checker.getAliasedSymbol(symbol);
                if (aliasedSymbol && aliasedSymbol.declarations && aliasedSymbol.declarations.length) {
                  initializer = (aliasedSymbol.declarations[0] as ts.VariableDeclaration).initializer;
                } else {
                  continue;
                }
              } else {
                initializer = (declarations[0] as ts.VariableDeclaration).initializer;
              }
              properties = (initializer as ts.ObjectLiteralExpression).properties;
            }
          }
        }

        let propMap = {};

        if (properties) {
          propMap = this.getPropMap(properties as ts.NodeArray<ts.PropertyAssignment>);
        }

        return {
          ...res,
          ...propMap,
        };
      }

      if (statementIsStatelessWithDefaultProps(statement)) {
        let propMap = {};
        (statement as ts.ExpressionStatement).getChildren().forEach(child => {
          let { right } = child as ts.BinaryExpression;

          if (right && ts.isIdentifier(right)) {
            const value = ((source as any).locals as ts.SymbolTable).get(right.escapedText);

            if (
              value &&
              value.valueDeclaration &&
              ts.isVariableDeclaration(value.valueDeclaration) &&
              value.valueDeclaration.initializer
            ) {
              right = value.valueDeclaration.initializer;
            }
          }

          if (right) {
            const { properties } = right as ts.ObjectLiteralExpression;
            if (properties) {
              propMap = this.getPropMap(properties as ts.NodeArray<ts.PropertyAssignment>);
            }
          }
        });
        return {
          ...res,
          ...propMap,
        };
      }

      const functionStatement = this.getFunctionStatement(statement);

      // Extracting default values from props destructuring
      if (functionStatement && functionStatement.parameters && functionStatement.parameters.length) {
        const { name } = functionStatement.parameters[0];

        if (ts.isObjectBindingPattern(name)) {
          return {
            ...res,
            ...this.getPropMap(name.elements),
          };
        }
      }

      return res;
    }, {});
  }

  private getLiteralValueFromImportSpecifier(
    property: ts.ImportSpecifier,
  ): string | boolean | number | null | undefined {
    if (ts.isImportSpecifier(property)) {
      const symbol = this.checker.getSymbolAtLocation(property.name);

      if (!symbol) {
        return null;
      }

      const aliasedSymbol = this.checker.getAliasedSymbol(symbol);
      if (aliasedSymbol && aliasedSymbol.declarations && aliasedSymbol.declarations.length) {
        return this.getLiteralValueFromPropertyAssignment(aliasedSymbol.declarations[0] as ts.BindingElement);
      }

      return null;
    }

    return null;
  }

  private getLiteralValueFromPropertyAssignment(
    property: ts.PropertyAssignment | ts.BindingElement,
  ): string | boolean | number | null | undefined {
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
      return undefined;
    }

    // Literal values
    switch (initializer.kind) {
      case ts.SyntaxKind.PropertyAccessExpression: {
        const symbol = this.checker.getSymbolAtLocation(initializer as ts.PropertyAccessExpression);

        if (symbol && symbol.declarations && symbol.declarations.length) {
          const declaration = symbol.declarations[0];

          if (ts.isBindingElement(declaration) || ts.isPropertyAssignment(declaration)) {
            return this.getLiteralValueFromPropertyAssignment(declaration);
          }
        }
      }
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
        if ((initializer as ts.Identifier).text === 'undefined') {
          return 'undefined';
        }

        const symbol = this.checker.getSymbolAtLocation(initializer as ts.Identifier);

        if (symbol && symbol.declarations && symbol.declarations.length) {
          if (ts.isImportSpecifier(symbol.declarations[0])) {
            return this.getLiteralValueFromImportSpecifier(symbol.declarations[0] as ts.ImportSpecifier);
          }

          return this.getLiteralValueFromPropertyAssignment(symbol.declarations[0] as ts.BindingElement);
        }

        return null;

      case ts.SyntaxKind.ObjectLiteralExpression:
      default:
        try {
          return initializer.getText();
        } catch (e) {
          return null;
        }
    }
  }

  private getPropMap(
    properties: ts.NodeArray<ts.PropertyAssignment | ts.BindingElement>,
  ): StringIndexedObject<string | boolean | number | null> {
    return properties.reduce((acc, property) => {
      if (ts.isSpreadAssignment(property) || !property.name) {
        return acc;
      }

      const literalValue = this.getLiteralValueFromPropertyAssignment(property);
      const propertyName = getPropertyName(property.name);

      if (
        (typeof literalValue === 'string' ||
          typeof literalValue === 'number' ||
          typeof literalValue === 'boolean' ||
          literalValue === null) &&
        propertyName !== null
      ) {
        acc[propertyName] = literalValue;
      }

      return acc;
    }, {} as StringIndexedObject<string | boolean | number | null>);
  }

  private getFunctionStatement(statement: ts.Statement) {
    if (ts.isFunctionDeclaration(statement)) {
      return statement;
    }

    if (ts.isVariableStatement(statement)) {
      let initializer = statement.declarationList && statement.declarationList.declarations[0].initializer;

      // Look at forwardRef function argument
      if (initializer && ts.isCallExpression(initializer)) {
        const symbol = this.checker.getSymbolAtLocation(initializer.expression);
        if (!symbol || symbol.getName() !== 'forwardRef') return;
        initializer = initializer.arguments[0];
      }

      if (initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer))) {
        return initializer;
      }
    }
  }
}

function statementIsClassDeclaration(statement: ts.Statement): statement is ts.ClassDeclaration {
  return !!(statement as ts.ClassDeclaration).members;
}

function statementIsStatelessWithDefaultProps(statement: ts.Statement): boolean {
  const children = (statement as ts.ExpressionStatement).getChildren();
  for (const child of children) {
    const { left } = child as ts.BinaryExpression;
    if (left) {
      const { name } = left as ts.PropertyAccessExpression;
      if (name && name.escapedText === 'defaultProps') {
        return true;
      }
    }
  }
  return false;
}

function getPropertyName(name: ts.PropertyName | ts.BindingPattern): string | null {
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
    // TS 4.3
    // result += ` ${ts.displayPartsToString(tag.text)}`;
    result += ` ${tag.text}`;
  }
  return result;
}

function getTextValueOfClassMember(classDeclaration: ts.ClassDeclaration, memberName: string): string {
  const [textValue] = classDeclaration.members
    ?.filter(member => ts.isPropertyDeclaration(member))
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
function getDefaultExportForFile(source: ts.SourceFile) {
  const name = path.basename(source.fileName, path.extname(source.fileName));
  const filename = name === 'index' ? path.basename(path.dirname(source.fileName)) : name;

  // JS identifiers must starts with a letter, and contain letters and/or numbers
  // So, you could not take filename as is
  const identifier = filename.replace(/^[^A-Z]*/gi, '').replace(/[^A-Z0-9]*/gi, '');

  return identifier.length ? identifier : 'DefaultName';
}

const isOptional = (prop: ts.Symbol) => (prop.getFlags() & ts.SymbolFlags.Optional) !== 0;

function isTypeLiteral(node: ts.Node): node is ts.TypeLiteralNode {
  return node.kind === ts.SyntaxKind.TypeLiteral;
}

function getDeclarations(prop: ts.Symbol, checker: ts.TypeChecker): ParentType[] | undefined {
  const declarations = prop.getDeclarations();

  if (declarations === undefined || declarations.length === 0) {
    return undefined;
  }

  const parents: ParentType[] = [];

  for (let declaration of declarations) {
    const { parent } = declaration;

    if (!isTypeLiteral(parent) && !isInterfaceOrTypeAliasDeclaration(parent)) {
      continue;
    }

    const parentName = 'name' in parent ? (parent as InterfaceOrTypeAliasDeclaration).name.text : 'TypeLiteral';

    const { fileName } = (parent as InterfaceOrTypeAliasDeclaration | ts.TypeLiteralNode).getSourceFile();

    parents.push({
      fileName: trimFileName(fileName),
      name: parentName,
    });
  }

  return parents;
}

function getParentType(prop: ts.Symbol): ParentType | undefined {
  const declarations = prop.getDeclarations();

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

  return {
    fileName: trimFileName(fileName),
    name: parentName,
  };
}

function trimFileName(fileName: string) {
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

  return trimmedFileName;
}

function isInterfaceOrTypeAliasDeclaration(node: ts.Node): node is ts.InterfaceDeclaration | ts.TypeAliasDeclaration {
  return node.kind === ts.SyntaxKind.InterfaceDeclaration || node.kind === ts.SyntaxKind.TypeAliasDeclaration;
}

function parseWithProgramProvider(
  filePathOrPaths: string | string[],
  compilerOptions: ts.CompilerOptions,
  parserOpts: ParserOptions,
  programProvider?: () => ts.Program,
): TypeOrInterface[] {
  const filePaths = Array.isArray(filePathOrPaths) ? filePathOrPaths : [filePathOrPaths];

  const program = programProvider ? programProvider() : ts.createProgram(filePaths, compilerOptions);

  const parser = new Parser(program, parserOpts);

  const checker = program.getTypeChecker();

  return filePaths
    .map(filePath => program.getSourceFile(filePath))
    .filter((sourceFile): sourceFile is ts.SourceFile => typeof sourceFile !== 'undefined')
    .reduce<TypeOrInterface[]>((docs, sourceFile) => {
      const moduleSymbol = checker.getSymbolAtLocation(sourceFile);

      if (!moduleSymbol) {
        return docs;
      }

      Array.prototype.push.apply(
        docs,
        checker
          .getExportsOfModule(moduleSymbol)
          .map(exp => parser.getTypeOrInterfaceInfo(exp, sourceFile))
          .filter((t): t is TypeOrInterface => t !== null)
          .filter((t, index, types) => types.slice(index + 1).every(innerT => innerT!.name !== t!.name)),
      );

      return docs;
    }, []);
}
