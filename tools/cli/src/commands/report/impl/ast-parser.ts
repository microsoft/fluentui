import {
  Project,
  SyntaxKind,
  Node,
  type SourceFile,
  type JsxOpeningElement,
  type JsxSelfClosingElement,
} from 'ts-morph';

import type {
  AstParser,
  ImportInfo,
  JsxUsageInfo,
  CallUsageInfo,
  SymbolClassification,
  TypeRefUsageInfo,
} from './types';

/** Type names that indicate a JSX return type. */
const JSX_TYPE_NAMES = new Set([
  'Element',
  'ReactElement',
  'ReactNode',
  'JSX.Element',
  'React.ReactElement',
  'React.ReactNode',
]);

/** Name patterns that strongly suggest a pure type (interface/type alias). */
const TYPE_NAME_SUFFIXES = [
  'Props',
  'State',
  'Slots',
  'Type',
  'Data',
  'Event',
  'Handler',
  'Params',
  'Renderer',
  'Element',
  'Colors',
  'Geometry',
];

/**
 * ts-morph implementation of the AstParser interface.
 * Can be replaced with raw TypeScript compiler API or another parser.
 */
export class TsMorphAstParser implements AstParser {
  private project: Project | null = null;

  /** Cache classification results per (moduleSpecifier::symbolName) for consistency across files. */
  private classificationCache = new Map<string, SymbolClassification>();

  /** The original user source file paths (excludes resolved dependencies). */
  private userFilePaths = new Set<string>();

  public createProject(filePaths: string[], tsConfigPath?: string, rootPath?: string): void {
    if (tsConfigPath) {
      this.project = new Project({ tsConfigFilePath: tsConfigPath, skipAddingFilesFromTsConfig: true });
    } else {
      this.project = new Project({
        compilerOptions: {
          jsx: 2 /* JsxEmit.React */,
          allowJs: true,
          moduleResolution: 2 /* ModuleResolutionKind.NodeJs */,
          ...(rootPath ? { baseUrl: rootPath } : {}),
        },
        skipAddingFilesFromTsConfig: true,
      });
    }

    this.project.addSourceFilesAtPaths(filePaths);

    // Track which files are the user's source files before resolving dependencies
    this.userFilePaths = new Set(this.project.getSourceFiles().map(sf => sf.getFilePath()));

    // Resolve import dependencies so ts-morph can follow path aliases
    // and node_modules .d.ts files for symbol classification.
    this.project.resolveSourceFileDependencies();

    this.classificationCache.clear();
  }

  public getSourceFiles(): string[] {
    this._ensureProject();
    // Only return user source files, not resolved library dependencies
    return this.project!.getSourceFiles()
      .map(sf => sf.getFilePath())
      .filter(fp => this.userFilePaths.has(fp));
  }

  public getImportDeclarations(filePath: string): ImportInfo[] {
    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      return [];
    }

    return sourceFile.getImportDeclarations().map(decl => {
      const namedImports = decl.getNamedImports().map(ni => ni.getName());
      const defaultImport = decl.getDefaultImport();
      if (defaultImport) {
        namedImports.unshift(defaultImport.getText());
      }

      return {
        moduleSpecifier: decl.getModuleSpecifierValue(),
        namedImports,
        isTypeOnly: decl.isTypeOnly(),
      };
    });
  }

  public getJsxElementUsages(filePath: string): JsxUsageInfo[] {
    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      return [];
    }

    const importMap = this._buildImportMap(sourceFile);
    const usages: JsxUsageInfo[] = [];

    // Collect JSX opening elements and self-closing elements
    const openingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxOpeningElement);
    const selfClosingElements = sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement);

    for (const element of [...openingElements, ...selfClosingElements]) {
      const tagName = element.getTagNameNode().getText();
      const moduleSpecifier = importMap.get(tagName);

      // Only track components that come from tracked imports (PascalCase)
      if (moduleSpecifier && /^[A-Z]/.test(tagName)) {
        const props = this._extractJsxProps(element);
        usages.push({ componentName: tagName, props, moduleSpecifier });
      }
    }

    return usages;
  }

  public getCallExpressionUsages(filePath: string): CallUsageInfo[] {
    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      return [];
    }

    const importMap = this._buildImportMap(sourceFile);
    const usages: CallUsageInfo[] = [];

    const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);

    for (const call of callExpressions) {
      const expression = call.getExpression();
      const functionName = expression.getText();
      const moduleSpecifier = importMap.get(functionName);

      if (moduleSpecifier) {
        const args = this._extractCallArgs(call);
        usages.push({ functionName, args, moduleSpecifier });
      }
    }

    return usages;
  }

  public getTypeReferenceUsages(filePath: string): TypeRefUsageInfo[] {
    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      return [];
    }

    const importMap = this._buildImportMap(sourceFile);
    const usages: TypeRefUsageInfo[] = [];

    // Track typeof X in type positions (TypeQuery nodes)
    const typeQueries = sourceFile.getDescendantsOfKind(SyntaxKind.TypeQuery);
    for (const tq of typeQueries) {
      const exprName = tq.getExprName().getText();
      const moduleSpecifier = importMap.get(exprName);
      if (moduleSpecifier) {
        usages.push({ symbolName: exprName, moduleSpecifier, kind: 'typeof' });
      }
    }

    // Track type references with generics (e.g., RowRenderer<Item>)
    const typeRefs = sourceFile.getDescendantsOfKind(SyntaxKind.TypeReference);
    for (const tr of typeRefs) {
      const typeName = tr.getTypeName().getText();
      const moduleSpecifier = importMap.get(typeName);
      if (moduleSpecifier) {
        const typeArgs = tr.getTypeArguments().map(ta => ta.getText());
        if (typeArgs.length > 0) {
          usages.push({ symbolName: typeName, moduleSpecifier, kind: 'generic', typeArgs });
        }
      }
    }

    return usages;
  }

  public getValueReferenceUsages(filePath: string): Array<{ symbolName: string; moduleSpecifier: string }> {
    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      return [];
    }

    const importMap = this._buildImportMap(sourceFile);
    const usages: Array<{ symbolName: string; moduleSpecifier: string }> = [];

    const identifiers = sourceFile.getDescendantsOfKind(SyntaxKind.Identifier);

    for (const ident of identifiers) {
      const name = ident.getText();
      const moduleSpecifier = importMap.get(name);
      if (!moduleSpecifier) {
        continue;
      }

      const parent = ident.getParent();
      if (!parent) {
        continue;
      }

      // Skip identifiers that are part of import declarations
      if (ident.getFirstAncestorByKind(SyntaxKind.ImportDeclaration)) {
        continue;
      }

      // Skip JSX tag names (already tracked by getJsxElementUsages)
      const parentKind = parent.getKind();
      if (
        parentKind === SyntaxKind.JsxOpeningElement ||
        parentKind === SyntaxKind.JsxSelfClosingElement ||
        parentKind === SyntaxKind.JsxClosingElement
      ) {
        continue;
      }

      // Skip call expression callees (already tracked by getCallExpressionUsages)
      if (parentKind === SyntaxKind.CallExpression) {
        const callExpr = parent.asKind(SyntaxKind.CallExpression)!;
        if (callExpr.getExpression() === ident) {
          continue;
        }
      }

      // Skip type positions (typeof, type annotations, etc.)
      if (ident.getFirstAncestorByKind(SyntaxKind.TypeQuery)) {
        continue;
      }
      if (ident.getFirstAncestorByKind(SyntaxKind.TypeReference)) {
        continue;
      }

      usages.push({ symbolName: name, moduleSpecifier });
    }

    return usages;
  }

  public classifySymbol(filePath: string, symbolName: string, moduleSpecifier: string): SymbolClassification {
    // Check cache first for consistency across files
    const cacheKey = `${moduleSpecifier}::${symbolName}`;
    const cached = this.classificationCache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Quick hook check by naming convention (reliable enough)
    if (/^use[A-Z]/.test(symbolName)) {
      this.classificationCache.set(cacheKey, 'hook');
      return 'hook';
    }

    const sourceFile = this._getSourceFile(filePath);
    if (!sourceFile) {
      const result = this._fallbackClassify(symbolName);
      this.classificationCache.set(cacheKey, result);
      return result;
    }

    // Find the import declaration that imports this symbol from the given module
    const importDecl = sourceFile.getImportDeclarations().find(d => d.getModuleSpecifierValue() === moduleSpecifier);
    if (!importDecl) {
      const result = this._fallbackClassify(symbolName);
      this.classificationCache.set(cacheKey, result);
      return result;
    }

    // Try to resolve the symbol via the type checker
    try {
      const namedImport = importDecl.getNamedImports().find(ni => {
        const alias = ni.getAliasNode();
        return alias ? alias.getText() === symbolName : ni.getName() === symbolName;
      });

      if (!namedImport) {
        const defaultImport = importDecl.getDefaultImport();
        if (defaultImport && defaultImport.getText() === symbolName) {
          const result = this._classifyFromNode(defaultImport, symbolName);
          this.classificationCache.set(cacheKey, result);
          return result;
        }
        const result = this._fallbackClassify(symbolName);
        this.classificationCache.set(cacheKey, result);
        return result;
      }

      const result = this._classifyFromNode(namedImport, symbolName);
      this.classificationCache.set(cacheKey, result);
      return result;
    } catch {
      const result = this._fallbackClassify(symbolName);
      this.classificationCache.set(cacheKey, result);
      return result;
    }
  }

  /**
   * Generate a description for an unknown symbol based on naming conventions.
   * Used when .d.ts resolution failed and the symbol is classified as 'unknown'.
   */
  public describeUnknownSymbol(symbolName: string): string {
    if (/^use[A-Z]/.test(symbolName)) {
      return 'Likely a React hook (use* naming convention)';
    }

    for (const suffix of TYPE_NAME_SUFFIXES) {
      if (symbolName.endsWith(suffix) && symbolName.length > suffix.length) {
        return `Likely a type/interface (*${suffix} naming convention)`;
      }
    }

    if (/^I[A-Z]/.test(symbolName) && symbolName.length > 2) {
      return 'Likely an interface (I* naming convention)';
    }

    if (/^[A-Z]/.test(symbolName)) {
      return 'PascalCase symbol — could be a component, constant, or type';
    }

    return 'Unresolved symbol — .d.ts not available';
  }

  // ---- Private helpers ----

  /**
   * Classify a symbol by resolving its declaration from an AST node.
   */
  private _classifyFromNode(node: Node, symbolName: string): SymbolClassification {
    try {
      const symbol = node.getSymbol();
      if (!symbol) {
        return this._fallbackClassify(symbolName);
      }

      // Follow aliases to the actual declaration
      const aliased = symbol.getAliasedSymbol() ?? symbol;
      const declarations = aliased.getDeclarations();

      if (declarations.length === 0) {
        return this._fallbackClassify(symbolName);
      }

      // Only classify from .d.ts declarations.
      // If resolved declarations come from non-.d.ts files (e.g., .ts/.tsx source
      // in symlinked node_modules), treat as unknown — we only trust type declarations.
      const dtsDeclarations = declarations.filter(d => d.getSourceFile().getFilePath().endsWith('.d.ts'));
      if (dtsDeclarations.length === 0) {
        return this._fallbackClassify(symbolName);
      }

      return this._classifyFromDeclarations(dtsDeclarations, symbolName);
    } catch {
      return this._fallbackClassify(symbolName);
    }
  }

  /**
   * Classify a symbol from its resolved declarations.
   */
  private _classifyFromDeclarations(
    declarations: ReadonlyArray<import('ts-morph').Node>,
    symbolName: string,
  ): SymbolClassification {
    for (const decl of declarations) {
      // Pure type: interface or type alias
      if (Node.isInterfaceDeclaration(decl) || Node.isTypeAliasDeclaration(decl)) {
        return 'type';
      }

      // Function declaration: check return type
      if (Node.isFunctionDeclaration(decl)) {
        if (this._returnsJsx(decl.getReturnType().getText())) {
          return 'component';
        }
        continue;
      }

      // Variable declaration (const MyComponent: FC = ...) or arrow function
      if (Node.isVariableDeclaration(decl)) {
        const typeText = decl.getType().getText();
        // Check for React.FC, React.ForwardRefExoticComponent, etc.
        if (this._isReactComponentType(typeText)) {
          return 'component';
        }
        // Check if the initializer is an arrow function that returns JSX
        const init = decl.getInitializer();
        if (init && (Node.isArrowFunction(init) || Node.isFunctionExpression(init))) {
          if (this._returnsJsx(init.getReturnType().getText())) {
            return 'component';
          }
        }
        continue;
      }

      // Class declaration: check for render() method
      if (Node.isClassDeclaration(decl)) {
        const renderMethod = decl.getMethod('render');
        if (renderMethod && this._returnsJsx(renderMethod.getReturnType().getText())) {
          return 'component';
        }
        continue;
      }

      // Enum declaration — treat as type
      if (Node.isEnumDeclaration(decl)) {
        return 'type';
      }
    }

    return 'other';
  }

  /**
   * Check if a return type text indicates JSX.
   */
  private _returnsJsx(returnTypeText: string): boolean {
    for (const jsxType of JSX_TYPE_NAMES) {
      if (returnTypeText.includes(jsxType)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if a type text indicates a React component type (FC, ForwardRefExoticComponent, etc.).
   */
  private _isReactComponentType(typeText: string): boolean {
    const componentTypePatterns = [
      'React.FC',
      'React.FunctionComponent',
      'React.ForwardRefExoticComponent',
      'ForwardRefComponent',
      'FC<',
      'FunctionComponent<',
      'ForwardRefExoticComponent<',
    ];
    return componentTypePatterns.some(p => typeText.includes(p));
  }

  /**
   * Fallback when type resolution is unavailable — returns 'unknown'.
   */
  private _fallbackClassify(_name: string): SymbolClassification {
    return 'unknown';
  }

  private _ensureProject(): void {
    if (!this.project) {
      throw new Error('AstParser: call createProject() before using the parser');
    }
  }

  private _getSourceFile(filePath: string): SourceFile | undefined {
    this._ensureProject();
    return this.project!.getSourceFile(filePath);
  }

  /**
   * Build a map from imported identifier name to its module specifier.
   */
  private _buildImportMap(sourceFile: SourceFile): Map<string, string> {
    const map = new Map<string, string>();

    for (const decl of sourceFile.getImportDeclarations()) {
      const moduleSpec = decl.getModuleSpecifierValue();

      const defaultImport = decl.getDefaultImport();
      if (defaultImport) {
        map.set(defaultImport.getText(), moduleSpec);
      }

      for (const named of decl.getNamedImports()) {
        const alias = named.getAliasNode();
        map.set(alias ? alias.getText() : named.getName(), moduleSpec);
      }
    }

    return map;
  }

  /**
   * Extract props from a JSX element as key-value pairs.
   */
  private _extractJsxProps(element: JsxOpeningElement | JsxSelfClosingElement): Record<string, string | undefined> {
    const props: Record<string, string | undefined> = {};

    for (const attr of element.getAttributes()) {
      if (attr.getKind() === SyntaxKind.JsxAttribute) {
        const jsxAttr = attr.asKind(SyntaxKind.JsxAttribute)!;
        const name = jsxAttr.getNameNode().getText();
        const initializer = jsxAttr.getInitializer();

        if (!initializer) {
          // Boolean shorthand: <Button disabled />
          props[name] = 'true';
        } else if (initializer.getKind() === SyntaxKind.StringLiteral) {
          props[name] = initializer.asKind(SyntaxKind.StringLiteral)!.getLiteralValue();
        } else if (initializer.getKind() === SyntaxKind.JsxExpression) {
          const expression = initializer.asKind(SyntaxKind.JsxExpression)!.getExpression();
          props[name] = expression ? expression.getText() : undefined;
        }
      }
    }

    return props;
  }

  /**
   * Extract call expression arguments as a simplified record.
   * For object literal arguments, extracts property names and their values.
   */
  private _extractCallArgs(call: import('ts-morph').CallExpression): Record<string, string | undefined> {
    const args: Record<string, string | undefined> = {};
    const callArgs = call.getArguments();

    for (let i = 0; i < callArgs.length; i++) {
      const arg = callArgs[i];

      if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
        const objLiteral = arg.asKind(SyntaxKind.ObjectLiteralExpression)!;
        const properties = objLiteral.getProperties();

        if (properties.length === 0) {
          // Capture empty object literals explicitly
          args[`arg${i}`] = '{}';
        } else {
          for (const prop of properties) {
            if (prop.getKind() === SyntaxKind.PropertyAssignment) {
              const propAssignment = prop.asKind(SyntaxKind.PropertyAssignment)!;
              args[propAssignment.getName()] = propAssignment.getInitializerOrThrow().getText();
            } else if (prop.getKind() === SyntaxKind.ShorthandPropertyAssignment) {
              const shorthand = prop.asKind(SyntaxKind.ShorthandPropertyAssignment)!;
              args[shorthand.getName()] = shorthand.getName();
            }
          }
        }
      } else {
        args[`arg${i}`] = arg.getText();
      }
    }

    return args;
  }
}
