import { Visitor, visitorKeys } from 'oxc-parser';
import type { Node, Program, VisitorObject } from 'oxc-parser';

export interface AstVisitor {
  enter?(node: Node, parent: Node | null): void;
  exit?(node: Node, parent: Node | null): void;
}

export class AstParents {
  private readonly parents = new WeakMap<Node, Node | null>();

  public constructor(program: Program) {
    const visit = (node: Node, parent: Node | null): void => {
      this.parents.set(node, parent);
      node.parent = parent ?? undefined;
      for (const key of visitorKeys[node.type] ?? []) {
        const value = (node as unknown as Record<string, unknown>)[key];
        if (Array.isArray(value)) {
          for (const child of value) {
            if (isNode(child)) {
              visit(child, node);
            }
          }
        } else if (isNode(value)) {
          visit(value, node);
        }
      }
    };

    visit(program, null);
  }

  public get(node: Node): Node | null {
    return this.parents.get(node) ?? null;
  }
}

function isNode(value: unknown): value is Node {
  return value !== null && typeof value === 'object' && typeof (value as { type?: unknown }).type === 'string';
}

export function walkAst(program: Program, visitor: AstVisitor, parents = new AstParents(program)): AstParents {
  const oxcVisitor: Record<string, (node: Node) => void> = {};
  for (const type of Object.keys(visitorKeys)) {
    oxcVisitor[type] = node => visitor.enter?.(node, parents.get(node));
    if (visitor.exit) {
      oxcVisitor[`${type}:exit`] = node => visitor.exit?.(node, parents.get(node));
    }
  }
  new Visitor(oxcVisitor as VisitorObject).visit(program);
  return parents;
}
