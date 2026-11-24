import { parseSource } from '../ast/parse';
import { getReactCallName, ScopeResolver } from '../ast/scope';
import { walkAst } from '../ast/traverse';

describe('ScopeResolver', () => {
  it('resolves shadowed bindings independently and handles hoisted var declarations', () => {
    const parsed = parseSource(
      `function Component() {
  before();
  var before = () => 1;
  const value = () => 2;
  {
    const value = 3;
    value;
  }
  return value();
}`,
      'scope.tsx',
    );
    const scopes = new ScopeResolver(parsed.program);
    const references = new Map<string, Array<{ node: object; binding: string | null }>>();
    walkAst(
      parsed.program,
      {
        enter(node) {
          if (node.type !== 'Identifier') {
            return;
          }
          const name = (node as typeof node & { name: string }).name;
          const binding = scopes.bindingOf(node);
          const occurrences = references.get(name) ?? [];
          occurrences.push({ node, binding: binding ? `${binding.kind}:${binding.declaration.start}` : null });
          references.set(name, occurrences);
        },
      },
      parsed.parents,
    );

    expect(references.get('before')?.map(item => item.binding)).toEqual([
      expect.stringMatching(/^var:/),
      expect.stringMatching(/^var:/),
    ]);
    const values = references.get('value')!;
    expect(values).toHaveLength(4);
    expect(values[1].binding).toBe(values[2].binding);
    expect(values[0].binding).not.toBe(values[1].binding);
    expect(values[3].binding).toBe(values[0].binding);
  });

  it('tracks destructured bindings and marks reassigned aliases non-constant', () => {
    const parsed = parseSource(
      `const source = { read: () => 1 };
const { read: accessor } = source;
let mutable = accessor;
mutable = () => 2;
accessor();`,
      'scope.js',
    );
    const scopes = new ScopeResolver(parsed.program);
    let accessorIdentifier: import('oxc-parser').Node | null = null;
    let mutableIdentifier: import('oxc-parser').Node | null = null;
    walkAst(
      parsed.program,
      {
        enter(node) {
          if (node.type !== 'Identifier') {
            return;
          }
          const name = (node as typeof node & { name: string }).name;
          const binding = scopes.bindingOf(node);
          if (name === 'accessor' && binding?.kind === 'const') {
            accessorIdentifier = node;
          } else if (name === 'mutable' && binding?.kind === 'let') {
            mutableIdentifier = node;
          }
        },
      },
      parsed.parents,
    );

    expect(accessorIdentifier).not.toBeNull();
    expect(mutableIdentifier).not.toBeNull();
    expect(scopes.isConstant(scopes.bindingOf(accessorIdentifier!))).toBe(true);
    expect(scopes.isConstant(scopes.bindingOf(mutableIdentifier!))).toBe(false);
    expect(scopes.readsOf(scopes.bindingOf(accessorIdentifier!)!)).toHaveLength(2);
  });

  it('resolves renamed React imports and ignores identifiers in TypeScript type positions', () => {
    const parsed = parseSource(
      `import { memo as cache } from 'react';
import * as ReactNS from 'react';
type Theme = string;
function Component(value: Theme) {
  const cacheValue = cache(() => value, [value]);
  return ReactNS.memo(() => cacheValue);
}`,
      'scope.tsx',
    );
    const scopes = new ScopeResolver(parsed.program);
    const calls: Array<{ name: string; api: string | null }> = [];
    walkAst(
      parsed.program,
      {
        enter(node) {
          if (node.type === 'CallExpression') {
            const call = node as typeof node & { callee: import('oxc-parser').Node };
            if (call.callee.type === 'Identifier') {
              calls.push({
                name: (call.callee as typeof call.callee & { name: string }).name,
                api: getReactCallName(node, scopes),
              });
            } else {
              calls.push({ name: 'member', api: getReactCallName(node, scopes) });
            }
          }
        },
      },
      parsed.parents,
    );

    expect(calls).toEqual([
      { name: 'cache', api: 'memo' },
      { name: 'member', api: 'memo' },
    ]);
    const imported = [...scopes.programScope.bindings.values()].find(binding => binding.name === 'cache')!;
    expect(imported.references).toHaveLength(1);
  });

  it('lets function parameters shadow imports by binding identity', () => {
    const parsed = parseSource(
      `import { readValue } from './reader';
function Widget(readValue: () => number) {
  return readValue();
}`,
      'scope.tsx',
    );
    const scopes = new ScopeResolver(parsed.program);
    let callBinding: ReturnType<ScopeResolver['bindingOf']> = null;
    walkAst(
      parsed.program,
      {
        enter(node) {
          if (node.type === 'CallExpression') {
            const callee = (node as typeof node & { callee: import('oxc-parser').Node }).callee;
            if (callee.type === 'Identifier') {
              callBinding = scopes.bindingOf(callee);
            }
          }
        },
      },
      parsed.parents,
    );
    expect(callBinding?.kind).toBe('param');
    expect(callBinding?.importBinding).toBeUndefined();
  });
});
