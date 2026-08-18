import { ESLintUtils, AST_NODE_TYPES, TSESLint, TSESTree } from '@typescript-eslint/utils';

interface TrackedImport {
  importedName: string;
  isTypeOnly: boolean;
  source: string;
}

/** Placeholder name used for `import * as ns from 'pkg'`, which maps to `export * as ns from 'pkg'`. */
const NAMESPACE_IMPORT_NAME = '*';

type MessageIds = 'preferFunctionReexport' | 'preferTypeReexport' | 'preferValueReexport';
type Options = [];

export const RULE_NAME = 'prefer-direct-reexport';

function isTypeOnly(declarationKind: 'type' | 'value', specifierKind: 'type' | 'value') {
  return declarationKind === 'type' || specifierKind === 'type';
}

function getNodeName(node: TSESTree.Identifier | TSESTree.StringLiteral): string | null {
  if (node.type === AST_NODE_TYPES.Identifier) {
    return node.name;
  }

  return typeof node.value === 'string' ? node.value : null;
}

function getImportedName(specifier: TSESTree.ImportClause): string | null {
  switch (specifier.type) {
    case AST_NODE_TYPES.ImportDefaultSpecifier:
      return 'default';
    case AST_NODE_TYPES.ImportNamespaceSpecifier:
      return NAMESPACE_IMPORT_NAME;
    case AST_NODE_TYPES.ImportSpecifier:
      return getNodeName(specifier.imported);
    default:
      return null;
  }
}

/**
 * A binding that is reassigned is a live mutable export, which `export … from` cannot express.
 * The initializer write is skipped so that a never-reassigned `let` still counts as a re-export.
 */
function isReassigned(variable: TSESLint.Scope.Variable) {
  return variable.references.some(reference => reference.isWrite() && !reference.init);
}

/**
 * Identifier of a bare `type Local = Imported` alias, or `null` when the alias declares type
 * parameters, instantiates its target, or composes it with anything else — in all of those cases
 * the alias is a new type rather than another name for the imported one.
 */
function getAliasedTypeReference(typeAliasDeclaration: TSESTree.TSTypeAliasDeclaration): TSESTree.Identifier | null {
  const { typeAnnotation } = typeAliasDeclaration;

  if (
    typeAliasDeclaration.typeParameters ||
    typeAnnotation.type !== AST_NODE_TYPES.TSTypeReference ||
    typeAnnotation.typeName.type !== AST_NODE_TYPES.Identifier ||
    typeAnnotation.typeArguments
  ) {
    return null;
  }

  return typeAnnotation.typeName;
}

/** Identifier that a local `const local = imported` / `type Local = Imported` declaration aliases. */
function getAliasTarget(definitionNode: TSESTree.Node): TSESTree.Identifier | null {
  if (definitionNode.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
    return getAliasedTypeReference(definitionNode);
  }

  if (
    definitionNode.type !== AST_NODE_TYPES.VariableDeclarator ||
    definitionNode.id.type !== AST_NODE_TYPES.Identifier ||
    definitionNode.id.typeAnnotation ||
    definitionNode.init?.type !== AST_NODE_TYPES.Identifier
  ) {
    return null;
  }

  return definitionNode.init;
}

function getParameterIdentifiers(parameters: TSESTree.Parameter[]): TSESTree.Identifier[] | null {
  const identifiers: TSESTree.Identifier[] = [];

  for (const parameter of parameters) {
    if (parameter.type !== AST_NODE_TYPES.Identifier || parameter.typeAnnotation) {
      return null;
    }

    identifiers.push(parameter);
  }

  return identifiers;
}

function getWrappedCallExpression(
  body: TSESTree.ArrowFunctionExpression['body'] | TSESTree.BlockStatement,
): TSESTree.CallExpression | null {
  if (body.type === AST_NODE_TYPES.CallExpression) {
    return body;
  }

  if (body.type !== AST_NODE_TYPES.BlockStatement || body.body.length !== 1) {
    return null;
  }

  const [statement] = body.body;

  if (
    statement.type !== AST_NODE_TYPES.ReturnStatement ||
    !statement.argument ||
    statement.argument.type !== AST_NODE_TYPES.CallExpression
  ) {
    return null;
  }

  return statement.argument;
}

function hasExactArguments(params: TSESTree.CallExpressionArgument[], parameterIdentifiers: TSESTree.Identifier[]) {
  if (params.length !== parameterIdentifiers.length) {
    return false;
  }

  return params.every(
    (param, index) => param.type === AST_NODE_TYPES.Identifier && param.name === parameterIdentifiers[index].name,
  );
}

export const rule = ESLintUtils.RuleCreator(() => __filename)<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: 'Prefer direct re-exports over local aliases and identity wrappers',
    },
    messages: {
      preferFunctionReexport:
        'Function "{{exportedName}}" is an identity wrapper around "{{importedName}}" from "{{source}}". Prefer `export … from "{{source}}"`.',
      preferTypeReexport:
        'Type "{{exportedName}}" is an alias of "{{importedName}}" from "{{source}}". Prefer `export type … from "{{source}}"`.',
      preferValueReexport:
        'Value "{{exportedName}}" is an alias of "{{importedName}}" from "{{source}}". Prefer `export … from "{{source}}"`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;
    const trackedImports = new Map<TSESLint.Scope.Variable, TrackedImport>();

    function trackImportDeclaration(importDeclaration: TSESTree.ImportDeclaration) {
      if (typeof importDeclaration.source.value !== 'string') {
        return;
      }

      const source = importDeclaration.source.value;

      importDeclaration.specifiers.forEach(specifier => {
        const importedName = getImportedName(specifier);

        if (!importedName) {
          return;
        }

        const typeOnly = isTypeOnly(
          importDeclaration.importKind,
          specifier.type === AST_NODE_TYPES.ImportSpecifier ? specifier.importKind : 'value',
        );

        sourceCode.getDeclaredVariables(specifier).forEach(variable => {
          trackedImports.set(variable, {
            importedName,
            isTypeOnly: typeOnly,
            source,
          });
        });
      });
    }

    function checkTypeAliasDeclaration(
      typeAliasDeclaration: TSESTree.TSTypeAliasDeclaration,
      exportedName = typeAliasDeclaration.id.name,
      reportNode: TSESTree.Identifier | TSESTree.StringLiteral = typeAliasDeclaration.id,
    ) {
      const aliasedTypeReference = getAliasedTypeReference(typeAliasDeclaration);

      if (!aliasedTypeReference) {
        return;
      }

      const trackedImport = getTrackedImport(aliasedTypeReference);

      if (!trackedImport) {
        return;
      }

      reportIssue('preferTypeReexport', reportNode, exportedName, trackedImport);
    }

    function isReassignedDeclarator(variableDeclarator: TSESTree.VariableDeclarator) {
      const [declaredVariable] = sourceCode.getDeclaredVariables(variableDeclarator);

      return !declaredVariable || isReassigned(declaredVariable);
    }

    function checkVariableDeclarator(
      variableDeclarator: TSESTree.VariableDeclarator,
      exportedName?: string,
      reportNode?: TSESTree.Identifier | TSESTree.StringLiteral,
    ) {
      if (
        variableDeclarator.id.type !== AST_NODE_TYPES.Identifier ||
        !variableDeclarator.init ||
        isReassignedDeclarator(variableDeclarator)
      ) {
        return;
      }

      const variableId = variableDeclarator.id;
      const resolvedExportedName = exportedName ?? variableId.name;
      const resolvedReportNode = reportNode ?? variableId;

      if (variableId.typeAnnotation) {
        return;
      }

      if (variableDeclarator.init.type === AST_NODE_TYPES.Identifier) {
        const trackedImport = getTrackedImport(variableDeclarator.init);
        if (!trackedImport) {
          return;
        }

        reportIssue('preferValueReexport', resolvedReportNode, resolvedExportedName, trackedImport);
        return;
      }

      if (
        variableDeclarator.init.type === AST_NODE_TYPES.ArrowFunctionExpression ||
        variableDeclarator.init.type === AST_NODE_TYPES.FunctionExpression
      ) {
        checkFunctionLike(variableDeclarator.init, resolvedReportNode, resolvedExportedName);
      }
    }

    /**
     * Matches an identity wrapper — a function whose entire body forwards its own parameters,
     * unchanged and in order, to an imported callee:
     *
     * ```ts
     * export const render = props => renderBase(props);
     * export function render(props) { return renderBase(props); }
     * ```
     *
     * The match is purely syntactic and never needs to know what the parameters are typed as.
     * An annotation anywhere in the signature — parameter type, return type or type parameter —
     * narrows the public contract, so the wrapper stops being a plain re-export and the rule bails.
     * It also bails on `async`/generator functions, a reassigned function declaration, parameters
     * that are not bare identifiers (rest, default, destructured), a body that is anything other
     * than a single forwarding call, an optional call or explicit type arguments, and any argument
     * list that is not exactly the parameter list.
     *
     * A wrapper is not byte-for-byte equivalent to its target: it drops `this`, `fn.length`,
     * `fn.name`, arguments beyond the declared parameters, and `new`-ability. Those differences are
     * not observable for the re-export patterns this rule targets, so they are reported anyway.
     */
    function checkFunctionLike(
      functionNode: TSESTree.ArrowFunctionExpression | TSESTree.FunctionDeclaration | TSESTree.FunctionExpression,
      reportNode: TSESTree.Identifier | TSESTree.StringLiteral,
      exportedName: string,
    ) {
      if (functionNode.async || functionNode.generator || functionNode.typeParameters || functionNode.returnType) {
        return;
      }

      if (functionNode.type === AST_NODE_TYPES.FunctionDeclaration && functionNode.id) {
        const [declaredVariable] = sourceCode.getDeclaredVariables(functionNode);
        if (declaredVariable && isReassigned(declaredVariable)) {
          return;
        }
      }

      const parameterIdentifiers = getParameterIdentifiers(functionNode.params);

      if (!parameterIdentifiers) {
        return;
      }

      const callExpression = getWrappedCallExpression(functionNode.body);
      if (
        !callExpression ||
        callExpression.callee.type !== AST_NODE_TYPES.Identifier ||
        callExpression.optional ||
        callExpression.typeArguments ||
        !hasExactArguments(callExpression.arguments, parameterIdentifiers)
      ) {
        return;
      }

      const trackedImport = getTrackedImport(callExpression.callee);

      if (!trackedImport) {
        return;
      }

      reportIssue('preferFunctionReexport', reportNode, exportedName, trackedImport);
    }

    function processExportNamedDeclaration(exportNamedDeclaration: TSESTree.ExportNamedDeclaration) {
      const declaration = exportNamedDeclaration.declaration;
      if (declaration) {
        if (declaration.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
          checkTypeAliasDeclaration(declaration);
          return;
        }

        if (declaration.type === AST_NODE_TYPES.VariableDeclaration) {
          declaration.declarations.forEach(variableDeclarator => {
            checkVariableDeclarator(variableDeclarator);
          });
          return;
        }

        if (declaration.type === AST_NODE_TYPES.FunctionDeclaration && declaration.id) {
          checkFunctionLike(declaration, declaration.id, declaration.id.name);
          return;
        }
      }

      if (exportNamedDeclaration.source) {
        return;
      }

      exportNamedDeclaration.specifiers.forEach(specifier => {
        if (specifier.type === AST_NODE_TYPES.ExportSpecifier) {
          processExportSpecifier(specifier, exportNamedDeclaration.exportKind);
        }
      });
    }

    function processExportSpecifier(exportSpecifier: TSESTree.ExportSpecifier, exportKind: 'type' | 'value') {
      if (exportSpecifier.local.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const exportedName = getNodeName(exportSpecifier.exported);

      if (!exportedName) {
        return;
      }

      const isTypeExport = isTypeOnly(exportKind, exportSpecifier.exportKind);
      const trackedImport = getTrackedImport(exportSpecifier.local);

      if (trackedImport) {
        if (trackedImport.importedName === NAMESPACE_IMPORT_NAME && exportedName === 'default') {
          return;
        }

        reportIssue(
          isTypeExport || trackedImport.isTypeOnly ? 'preferTypeReexport' : 'preferValueReexport',
          exportSpecifier.exported,
          exportedName,
          trackedImport,
        );
        return;
      }

      const resolvedVariable = getResolvedVariable(exportSpecifier.local);
      const definitionNode = resolvedVariable?.defs[0]?.node;

      if (!definitionNode) {
        return;
      }

      if (definitionNode.type === AST_NODE_TYPES.TSTypeAliasDeclaration) {
        checkTypeAliasDeclaration(definitionNode, exportedName, exportSpecifier.exported);
        return;
      }

      if (definitionNode.type === AST_NODE_TYPES.VariableDeclarator) {
        checkVariableDeclarator(definitionNode, exportedName, exportSpecifier.exported);
        return;
      }

      if (definitionNode.type === AST_NODE_TYPES.FunctionDeclaration && definitionNode.id) {
        checkFunctionLike(definitionNode, exportSpecifier.exported, exportedName);
      }
    }

    function processExportDefaultDeclaration(exportDefaultDeclaration: TSESTree.ExportDefaultDeclaration) {
      const declaration = exportDefaultDeclaration.declaration;

      if (declaration.type !== AST_NODE_TYPES.Identifier) {
        return;
      }

      const trackedImport = getTrackedImport(declaration);

      if (!trackedImport || trackedImport.importedName === NAMESPACE_IMPORT_NAME) {
        return;
      }

      reportIssue(
        trackedImport.isTypeOnly ? 'preferTypeReexport' : 'preferValueReexport',
        declaration,
        'default',
        trackedImport,
      );
    }

    function getTrackedImport(
      identifier: TSESTree.Identifier,
      visitedVariables = new Set<TSESLint.Scope.Variable>(),
    ): TrackedImport | undefined {
      const resolvedVariable = getResolvedVariable(identifier);

      if (!resolvedVariable || visitedVariables.has(resolvedVariable)) {
        return;
      }

      const trackedImport = trackedImports.get(resolvedVariable);

      if (trackedImport) {
        return trackedImport;
      }

      visitedVariables.add(resolvedVariable);

      const definitionNode = resolvedVariable.defs[0]?.node;

      if (!definitionNode || isReassigned(resolvedVariable)) {
        return;
      }

      const aliasTarget = getAliasTarget(definitionNode);

      if (!aliasTarget) {
        return;
      }

      return getTrackedImport(aliasTarget, visitedVariables);
    }

    function getResolvedVariable(identifier: TSESTree.Identifier): TSESLint.Scope.Variable | null {
      let scope: TSESLint.Scope.Scope | null = sourceCode.getScope(identifier);

      while (scope) {
        const reference = scope.references.find(currentReference => currentReference.identifier === identifier);

        if (reference) {
          return reference.resolved ?? null;
        }

        scope = scope.upper;
      }

      return null;
    }

    function reportIssue(
      messageId: MessageIds,
      node: TSESTree.Identifier | TSESTree.StringLiteral,
      exportedName: string,
      trackedImport: TrackedImport,
    ) {
      context.report({
        node,
        messageId,
        data: {
          exportedName,
          importedName: trackedImport.importedName,
          source: trackedImport.source,
        },
      });
    }

    return {
      ImportDeclaration: trackImportDeclaration,
      ExportNamedDeclaration: processExportNamedDeclaration,
      ExportDefaultDeclaration: processExportDefaultDeclaration,
    };
  },
});
