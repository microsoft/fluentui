import { visitorKeys } from 'oxc-parser';
import type { Node, Program } from 'oxc-parser';

import type { ParsedSource } from './parse';

export type BindingKind = 'class' | 'const' | 'function' | 'import' | 'let' | 'param' | 'var';

export interface ImportBinding {
  source: string;
  importedName: string;
}

export interface ScopeBinding {
  name: string;
  kind: BindingKind;
  declaration: Node;
  scope: Scope;
  importBinding?: ImportBinding;
  references: Node[];
  writes: Node[];
}

export interface Scope {
  kind: 'block' | 'class' | 'function' | 'program';
  parent: Scope | null;
  bindings: Map<string, ScopeBinding>;
}

interface TraversalContext {
  scope: Scope;
  parent: Node | null;
  key: string | null;
}

type PatternNode = Node & {
  argument?: Node | null;
  left?: Node | null;
  elements?: Array<Node | null>;
  properties?: Node[];
};

function isFunction(node: Node): boolean {
  return (
    node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression'
  );
}

function isNode(value: unknown): value is Node {
  return value !== null && typeof value === 'object' && typeof (value as { type?: unknown }).type === 'string';
}

function childEntries(node: Node): Array<[string, Node]> {
  const entries: Array<[string, Node]> = [];
  for (const key of visitorKeys[node.type] ?? []) {
    const value = (node as unknown as Record<string, unknown>)[key];
    if (Array.isArray(value)) {
      for (const child of value) {
        if (isNode(child)) {
          entries.push([key, child]);
        }
      }
    } else if (isNode(value)) {
      entries.push([key, value]);
    }
  }
  return entries;
}

function bindPattern(
  node: Node | null | undefined,
  kind: BindingKind,
  scope: Scope,
  declaration: Node,
  bindings: WeakMap<Node, ScopeBinding>,
  declarationNodes: WeakSet<Node>,
  importBinding?: ImportBinding,
): void {
  if (!node) {
    return;
  }
  if (node.type === 'Identifier') {
    declarationNodes.add(node);
    const name = (node as Node & { name: string }).name;
    const binding: ScopeBinding = {
      name,
      kind,
      declaration,
      scope,
      references: [],
      writes: [],
      ...(importBinding ? { importBinding } : {}),
    };
    if (!scope.bindings.has(name)) {
      scope.bindings.set(name, binding);
    }
    bindings.set(node, scope.bindings.get(name)!);
    return;
  }
  const pattern = node as PatternNode;
  if (node.type === 'RestElement') {
    bindPattern(pattern.argument, kind, scope, declaration, bindings, declarationNodes);
  } else if (node.type === 'AssignmentPattern') {
    bindPattern(pattern.left, kind, scope, declaration, bindings, declarationNodes);
  } else if (node.type === 'ArrayPattern') {
    for (const element of pattern.elements ?? []) {
      bindPattern(element, kind, scope, declaration, bindings, declarationNodes);
    }
  } else if (node.type === 'ObjectPattern') {
    for (const property of pattern.properties ?? []) {
      if (property.type === 'RestElement') {
        bindPattern(
          (property as unknown as { argument: Node }).argument,
          kind,
          scope,
          declaration,
          bindings,
          declarationNodes,
        );
      } else {
        bindPattern(
          (property as unknown as { value: Node }).value,
          kind,
          scope,
          declaration,
          bindings,
          declarationNodes,
        );
      }
    }
  }
}

function isTypeNode(node: Node): boolean {
  const type = node.type as string;
  return type.startsWith('TS') || type === 'TypeAnnotation' || type === 'TypeParameter';
}

function isReferenceIdentifier(node: Node, parent: Node | null, key: string | null): boolean {
  if (node.type !== 'Identifier' || isTypeNode(node)) {
    return false;
  }
  if (!parent) {
    return false;
  }
  if (
    (parent.type === 'FunctionDeclaration' ||
      parent.type === 'FunctionExpression' ||
      parent.type === 'ClassDeclaration') &&
    key === 'id'
  ) {
    return false;
  }
  if (parent.type === 'VariableDeclarator' && key === 'id') {
    return false;
  }
  if (
    parent.type === 'ImportSpecifier' ||
    parent.type === 'ImportDefaultSpecifier' ||
    parent.type === 'ImportNamespaceSpecifier'
  ) {
    return false;
  }
  if (
    (parent.type === 'MemberExpression' ||
      parent.type === 'MethodDefinition' ||
      parent.type === 'PropertyDefinition') &&
    key === 'property' &&
    !(parent as unknown as { computed?: boolean }).computed
  ) {
    return false;
  }
  if (
    parent.type === 'Property' &&
    key === 'key' &&
    !(parent as unknown as { computed?: boolean; shorthand?: boolean }).computed
  ) {
    return Boolean((parent as unknown as { shorthand?: boolean }).shorthand);
  }
  if (parent.type === 'LabeledStatement' || parent.type === 'BreakStatement' || parent.type === 'ContinueStatement') {
    return false;
  }
  if (parent.type === 'MetaProperty') {
    return false;
  }
  if (parent.type === 'ExportSpecifier' && key === 'exported') {
    return false;
  }
  return true;
}

function isWriteReference(node: Node, parent: Node | null, key: string | null): boolean {
  if (!parent) {
    return false;
  }
  if (parent.type === 'AssignmentExpression' && key === 'left') {
    return true;
  }
  if (parent.type === 'UpdateExpression' && key === 'argument') {
    return true;
  }
  if ((parent.type === 'ForInStatement' || parent.type === 'ForOfStatement') && key === 'left') {
    return true;
  }
  if (parent.type === 'AssignmentPattern' && key === 'left') {
    return true;
  }
  return false;
}

export class ScopeResolver {
  public readonly programScope: Scope;
  private readonly scopeByNode = new WeakMap<Node, Scope>();
  private readonly parentByNode = new WeakMap<Node, Node | null>();
  private readonly keyByNode = new WeakMap<Node, string>();
  private readonly bindingByNode = new WeakMap<Node, ScopeBinding>();
  private readonly declarationNodes = new WeakSet<Node>();

  public constructor(program: Program) {
    this.programScope = { kind: 'program', parent: null, bindings: new Map() };
    this._collectScopes(program, { scope: this.programScope, parent: null, key: null });
    this._collectReferences(program, { scope: this.programScope, parent: null, key: null });
  }

  public scopeOf(node: Node): Scope {
    return this.scopeByNode.get(node) ?? this.programScope;
  }

  public parentOf(node: Node): Node | null {
    return this.parentByNode.get(node) ?? null;
  }

  public bindingOf(node: Node): ScopeBinding | null {
    return this.bindingByNode.get(node) ?? null;
  }

  public resolve(name: string, from: Node): ScopeBinding | null {
    let scope: Scope | null = this.scopeOf(from);
    while (scope) {
      const binding = scope.bindings.get(name);
      if (binding) {
        return binding;
      }
      scope = scope.parent;
    }
    return null;
  }

  public isConstant(binding: ScopeBinding | null | undefined): boolean {
    return Boolean(binding && binding.writes.length === 0);
  }

  public readsOf(binding: ScopeBinding): Node[] {
    return binding.references.filter(reference => !binding.writes.includes(reference));
  }

  private _collectScopes(node: Node, context: TraversalContext): void {
    const parent = context.parent;
    let scope = context.scope;
    if (node.type === 'BlockStatement') {
      scope = { kind: 'block', parent: context.scope, bindings: new Map() };
    } else if (
      node.type === 'ForStatement' ||
      node.type === 'ForInStatement' ||
      node.type === 'ForOfStatement' ||
      node.type === 'SwitchStatement'
    ) {
      scope = { kind: 'block', parent: context.scope, bindings: new Map() };
    } else if (isFunction(node)) {
      scope = { kind: 'function', parent: context.scope, bindings: new Map() };
    } else if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') {
      scope = { kind: 'class', parent: context.scope, bindings: new Map() };
    } else if (node.type === 'CatchClause') {
      scope = { kind: 'block', parent: context.scope, bindings: new Map() };
    }

    this.scopeByNode.set(node, scope);
    if (parent) {
      this.parentByNode.set(node, parent);
      this.keyByNode.set(node, context.key!);
    }

    const record = (
      identifier: Node | null | undefined,
      kind: BindingKind,
      bindingScope = scope,
      imported?: ImportBinding,
      bindingDeclaration = node,
    ) => {
      if (!identifier) {
        return;
      }
      bindPattern(
        identifier,
        kind,
        bindingScope,
        bindingDeclaration,
        this.bindingByNode,
        this.declarationNodes,
        imported,
      );
    };

    if (node.type === 'FunctionDeclaration' || node.type === 'ClassDeclaration') {
      record(
        (node as unknown as { id: Node | null }).id,
        node.type === 'FunctionDeclaration' ? 'function' : 'class',
        context.scope,
      );
    } else if (node.type === 'FunctionExpression' && (node as unknown as { id: Node | null }).id) {
      record((node as unknown as { id: Node }).id, 'function', scope);
    } else if (node.type === 'VariableDeclarator') {
      const declaration = parent?.type === 'VariableDeclaration' ? (parent as unknown as { kind: string }) : null;
      const kind = declaration?.kind === 'const' ? 'const' : declaration?.kind === 'var' ? 'var' : 'let';
      let bindingScope = scope;
      if (kind === 'var') {
        while (bindingScope.parent && bindingScope.kind !== 'function' && bindingScope.kind !== 'program') {
          bindingScope = bindingScope.parent;
        }
      }
      record((node as unknown as { id: Node }).id, kind, bindingScope);
    } else if (node.type === 'ImportDeclaration') {
      const importNode = node as unknown as { source: { value: string }; specifiers: Node[] };
      for (const specifier of importNode.specifiers ?? []) {
        const local = (specifier as unknown as { local: Node }).local;
        const importedName =
          specifier.type === 'ImportDefaultSpecifier'
            ? 'default'
            : specifier.type === 'ImportNamespaceSpecifier'
            ? '*'
            : (specifier as unknown as { imported: { name?: string; value?: string } }).imported.name ??
              (specifier as unknown as { imported: { value?: string } }).imported.value ??
              '';
        record(local, 'import', scope, { source: importNode.source.value, importedName });
      }
    } else if (node.type === 'CatchClause') {
      const parameter = (node as unknown as { param: Node | null }).param;
      record(parameter, 'param', scope, undefined, parameter ?? node);
    }
    if (isFunction(node)) {
      for (const parameter of (node as unknown as { params: Node[] }).params ?? []) {
        record(parameter, 'param', scope, undefined, parameter);
      }
    }

    for (const [key, child] of childEntries(node)) {
      this._collectScopes(child, { scope, parent: node, key });
    }
  }

  private _collectReferences(node: Node, context: TraversalContext): void {
    const scope = this.scopeByNode.get(node) ?? context.scope;
    if (this.declarationNodes.has(node)) {
      this.bindingByNode.get(node);
    } else if (
      isReferenceIdentifier(node, context.parent, context.key) &&
      !this._isTypePosition(node) &&
      !this._isWriteTarget(node)
    ) {
      const name = (node as Node & { name: string }).name;
      let current: Scope | null = scope;
      while (current) {
        const binding = current.bindings.get(name);
        if (binding) {
          binding.references.push(node);
          this.bindingByNode.set(node, binding);
          break;
        }
        current = current.parent;
      }
    } else if (isReferenceIdentifier(node, context.parent, context.key) && this._isWriteTarget(node)) {
      const name = (node as Node & { name: string }).name;
      let current: Scope | null = scope;
      while (current) {
        const binding = current.bindings.get(name);
        if (binding) {
          binding.references.push(node);
          binding.writes.push(node);
          this.bindingByNode.set(node, binding);
          break;
        }
        current = current.parent;
      }
    }
    for (const [key, child] of childEntries(node)) {
      this._collectReferences(child, { scope, parent: node, key });
    }
  }

  private _isTypePosition(node: Node): boolean {
    let current = node;
    while (true) {
      const parent = this.parentByNode.get(current);
      if (!parent) {
        return false;
      }
      const key = this.keyByNode.get(current);
      const type = parent.type as string;
      if (
        [
          'TSAsExpression',
          'TSTypeAssertion',
          'TSNonNullExpression',
          'TSInstantiationExpression',
          'TSSatisfiesExpression',
        ].includes(type) &&
        key === 'expression'
      ) {
        current = parent;
        continue;
      }
      if (
        isTypeNode(parent) ||
        [
          'typeAnnotation',
          'returnType',
          'typeParameters',
          'typeArguments',
          'superTypeArguments',
          'implements',
        ].includes(key ?? '')
      ) {
        return true;
      }
      current = parent;
    }
  }

  private _isWriteTarget(node: Node): boolean {
    let current = node;
    while (true) {
      const parent = this.parentByNode.get(current);
      if (!parent) {
        return false;
      }
      const key = this.keyByNode.get(current);
      if (isWriteReference(current, parent, key ?? null)) {
        return true;
      }
      if (
        parent.type === 'ObjectPattern' ||
        parent.type === 'ArrayPattern' ||
        parent.type === 'RestElement' ||
        parent.type === 'AssignmentPattern' ||
        (parent.type === 'Property' && key === 'value')
      ) {
        current = parent;
        continue;
      }
      return false;
    }
  }
}

export function getReactCallName(call: Node, scopes: ScopeResolver): string | null {
  const normalized = call.type === 'ChainExpression' ? (call as unknown as { expression: Node }).expression : call;
  if (normalized.type !== 'CallExpression') {
    return null;
  }
  const callee = (normalized as unknown as { callee: Node }).callee;
  if (callee.type === 'Identifier') {
    const binding = scopes.resolve((callee as Node & { name: string }).name, callee);
    return binding?.importBinding?.source === 'react' ? binding.importBinding.importedName : null;
  }
  if (callee.type !== 'MemberExpression') {
    return null;
  }
  const member = callee as unknown as { object: Node; property: Node; computed: boolean };
  if (member.computed || member.object.type !== 'Identifier' || member.property.type !== 'Identifier') {
    return null;
  }
  const binding = scopes.resolve((member.object as Node & { name: string }).name, member.object);
  if (
    binding?.importBinding?.source === 'react' &&
    (binding.importBinding.importedName === 'default' || binding.importBinding.importedName === '*')
  ) {
    return (member.property as Node & { name: string }).name;
  }
  return null;
}

export function isReactWrapper(call: Node, scopes: ScopeResolver): boolean {
  const name = getReactCallName(call, scopes);
  return name === 'memo' || name === 'forwardRef';
}

export function getNodeParent(program: Program, node: Node): Node | null {
  return (node.parent as Node | undefined) ?? null;
}
