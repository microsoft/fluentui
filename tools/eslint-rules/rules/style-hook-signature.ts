/* eslint-disable no-bitwise -- TypeScript type and symbol flags are bitmasks. */
import { ESLintUtils } from '@typescript-eslint/utils';
import * as path from 'node:path';
import * as ts from 'typescript';

export const RULE_NAME = 'style-hook-signature';

const calendarClassMapHooks = new Set([
  'Calendar',
  'CalendarDay',
  'CalendarDayGrid',
  'CalendarMonth',
  'CalendarPicker',
  'CalendarYear',
]);

export const rule = ESLintUtils.RuleCreator(() => __filename)<[], 'invalidSignature'>({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require exported v9 component style hooks to accept component state and return the same state type.',
    },
    schema: [],
    messages: {
      invalidSignature:
        '`{{hookName}}` must take a required component state parameter and return the matching state type in every call signature (not any, unknown, never or void).',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.filename.replace(/\\/g, '/');
    const component =
      /\/packages\/react-components\/(?:deprecated\/)?react-[^/]+\/(?:library\/)?src\/components\/(?:.*\/)?([^/]+)\/[^/]+\.tsx?$/.exec(
        filename,
      )?.[1];
    if (!component || /\.(?:test|spec|cy|stories)\.[^.]+$/.test(filename)) {
      return {};
    }

    const hookNames = new Set([`use${component}Styles`, `use${component}Styles_unstable`]);
    // These six compat hooks generate class maps from props, rather than styling state.
    if (filename.includes('/react-calendar-compat/library/src/components/') && calendarClassMapHooks.has(component)) {
      hookNames.delete(`use${component}Styles_unstable`);
    }
    if (![...hookNames].some(name => new RegExp(`\\b${name}\\b`).test(context.sourceCode.text))) {
      return {};
    }
    return {
      'Program:exit'(node) {
        const services = ESLintUtils.getParserServices(context);
        const checker = services.program.getTypeChecker();
        const sourceFile = services.esTreeNodeToTSNodeMap.get(node);
        const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
        if (!moduleSymbol) {
          return;
        }

        for (const exported of checker.getExportsOfModule(moduleSymbol)) {
          const hookName = exported.getName();
          if (!hookNames.has(hookName)) {
            continue;
          }
          const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
          if (isGriffelClassHook(symbol, checker)) {
            continue;
          }
          const signatures = checker.getTypeOfSymbolAtLocation(symbol, sourceFile).getCallSignatures();
          const renderState = getRenderState(services.program, checker, filename, component);
          if (signatures.length && signatures.every(signature => isStatePreserving(signature, checker, renderState))) {
            continue;
          }
          const declaration = exported.declarations?.find(item => item.getSourceFile() === sourceFile);
          const reportNode =
            declaration &&
            (ts.isVariableDeclaration(declaration) ||
              ts.isFunctionDeclaration(declaration) ||
              ts.isExportSpecifier(declaration))
              ? declaration.name
              : undefined;
          context.report({
            node: reportNode ? services.tsNodeToESTreeNodeMap.get(reportNode) : node,
            messageId: 'invalidSignature',
            data: { hookName },
          });
        }
      },
    };
  },
});

function isStatePreserving(
  signature: ts.Signature,
  checker: ts.TypeChecker,
  renderState: ts.Type | undefined,
): boolean {
  const parameter = signature.getParameters()[0];
  const declaration = parameter?.valueDeclaration;
  if (
    !declaration ||
    !ts.isParameter(declaration) ||
    declaration.questionToken ||
    declaration.initializer ||
    declaration.dotDotDotToken
  ) {
    return false;
  }
  const input = checker.getTypeOfSymbolAtLocation(parameter, declaration);
  const output = checker.getReturnTypeOfSignature(signature);
  return (
    isComponentState(input, checker, declaration, renderState) &&
    isComponentState(output, checker, declaration, renderState) &&
    checker.isTypeAssignableTo(input, output) &&
    checker.isTypeAssignableTo(output, input)
  );
}

function isConcrete(type: ts.Type): boolean {
  return (
    !(
      type.flags &
      (ts.TypeFlags.Any |
        ts.TypeFlags.Unknown |
        ts.TypeFlags.Never |
        ts.TypeFlags.Void |
        ts.TypeFlags.Null |
        ts.TypeFlags.Undefined)
    ) &&
    (!type.isUnion() || type.types.every(isConcrete))
  );
}

function isObject(type: ts.Type): boolean {
  return (
    isConcrete(type) &&
    (type.isUnion() ? type.types.every(isObject) : !!(type.flags & (ts.TypeFlags.Object | ts.TypeFlags.Intersection)))
  );
}

function isComponentState(
  type: ts.Type,
  checker: ts.TypeChecker,
  node: ts.Node,
  renderState: ts.Type | undefined,
): boolean {
  if (type.flags & ts.TypeFlags.TypeParameter) {
    const constraint = checker.getBaseConstraintOfType(type);
    return !!constraint && isComponentState(constraint, checker, node, renderState);
  }
  if (!isObject(type)) {
    return false;
  }
  if (!checker.getPropertyOfType(type, 'components')) {
    // Components such as Overflow clone children instead of exposing slots.
    return (
      !!renderState &&
      isObject(renderState) &&
      checker.isTypeAssignableTo(type, renderState) &&
      checker.isTypeAssignableTo(renderState, type)
    );
  }
  const components = requiredProperty(type, 'components', checker, node);
  if (!components || !isObject(components)) {
    return false;
  }
  // ComponentState maps element types to slots; not every component has a root slot.
  const slots = checker.getPropertiesOfType(components);
  return (
    slots.some(slot => {
      const property = requiredProperty(type, slot.getName(), checker, node);
      return property && isObject(property);
    }) &&
    slots.every(slot => {
      const element = requiredProperty(components, slot.getName(), checker, node);
      const property = checker.getPropertyOfType(type, slot.getName());
      if (!element) {
        return false;
      }
      // Composed states can retain element-map entries for slots they omit.
      if (!property) {
        return true;
      }
      const slotType = checker.getTypeOfSymbolAtLocation(property, node);
      return (
        isObject(slotType) ||
        (slotType.isUnion() &&
          slotType.types.some(isObject) &&
          slotType.types.every(part => !!(part.flags & ts.TypeFlags.Undefined) || isObject(part)))
      );
    })
  );
}

function getRenderState(
  program: ts.Program,
  checker: ts.TypeChecker,
  filename: string,
  component: string,
): ts.Type | undefined {
  for (const extension of ['.ts', '.tsx']) {
    const sourceFile = program.getSourceFile(path.join(path.dirname(filename), `render${component}${extension}`));
    if (!sourceFile) {
      continue;
    }
    const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
    const render =
      moduleSymbol &&
      checker.getExportsOfModule(moduleSymbol).find(symbol => symbol.getName() === `render${component}_unstable`);
    const parameter =
      render && checker.getTypeOfSymbolAtLocation(render, sourceFile).getCallSignatures()[0]?.getParameters()[0];
    if (parameter?.valueDeclaration) {
      return checker.getTypeOfSymbolAtLocation(parameter, parameter.valueDeclaration);
    }
  }
  return undefined;
}

function requiredProperty(type: ts.Type, name: string, checker: ts.TypeChecker, node: ts.Node): ts.Type | undefined {
  const property = checker.getPropertyOfType(type, name);
  if (!property || property.flags & ts.SymbolFlags.Optional) {
    return undefined;
  }
  const value = checker.getTypeOfSymbolAtLocation(property, node);
  return isConcrete(value) ? value : undefined;
}

function isGriffelClassHook(symbol: ts.Symbol, checker: ts.TypeChecker): boolean {
  const declaration = symbol.valueDeclaration;
  if (!declaration || !ts.isVariableDeclaration(declaration) || !declaration.initializer) {
    return false;
  }
  const initializer = declaration.initializer;
  if (!ts.isCallExpression(initializer)) {
    return false;
  }
  const callee = initializer.expression;
  const binding = checker.getSymbolAtLocation(ts.isPropertyAccessExpression(callee) ? callee.expression : callee);
  return !!binding?.declarations?.some(item => {
    const specifier = ts.isImportSpecifier(item) ? item : undefined;
    const namespace = ts.isNamespaceImport(item) && ts.isPropertyAccessExpression(callee) ? item : undefined;
    const importedName = specifier
      ? (specifier.propertyName ?? specifier.name).text
      : namespace && ts.isPropertyAccessExpression(callee)
      ? callee.name.text
      : undefined;
    const importDeclaration = specifier?.parent.parent.parent ?? namespace?.parent.parent;
    return (
      !!importDeclaration &&
      ts.isImportDeclaration(importDeclaration) &&
      ts.isStringLiteral(importDeclaration.moduleSpecifier) &&
      ['@griffel/react', '@fluentui/react-components'].includes(importDeclaration.moduleSpecifier.text) &&
      (importedName === 'makeStyles' || importedName === 'makeResetStyles')
    );
  });
}
