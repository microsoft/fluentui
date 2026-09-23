import { relative, dirname } from 'node:path';
import { remarkAutoTypeTable } from 'fumadocs-typescript';
import type { Generator } from 'fumadocs-typescript';

import type { Nodes } from 'mdast';
import type { MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import { componentApiSource } from './component-api-source';
import { toKebabCase } from '../src/utils/toKebabCase';

function walk(node: Nodes, callback: (node: Nodes) => void): void {
  callback(node);
  if ('children' in node) {
    for (const child of node.children) {
      walk(child, callback);
    }
  }
}

export function remarkComponentApi({ generator }: { generator: Generator }): ReturnType<typeof remarkAutoTypeTable> {
  const compileTables = remarkAutoTypeTable({ generator });
  return async (tree, file) => {
    const storyImports: string[] = [];
    walk(tree, node => {
      if (node.type === 'mdxjsEsm') {
        for (const declaration of node.data?.estree?.body ?? []) {
          if (
            declaration.type === 'ImportDeclaration' &&
            typeof declaration.source.value === 'string' &&
            declaration.source.value.includes('-stories/src/')
          ) {
            storyImports.push(declaration.source.value);
          }
        }
      }
    });

    walk(tree, node => {
      if (node.type !== 'mdxJsxFlowElement' || node.name !== 'ComponentPage') {
        return;
      }

      const component = node.attributes.find(
        (attribute): attribute is MdxJsxAttribute =>
          attribute.type === 'mdxJsxAttribute' && attribute.name === 'docgen',
      )?.value;

      if (!component) {
        return;
      }

      if (typeof component !== 'string' || storyImports.length !== 1) {
        throw new Error(`${file.path}: ComponentPage requires a literal docgen name and one story import`);
      }

      const source = componentApiSource(storyImports[0], component);

      node.children.push({
        type: 'mdxJsxFlowElement',
        name: 'auto-type-table',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'path',
            value: relative(dirname(file.path), source.path).replaceAll('\\', '/'),
          },
          { type: 'mdxJsxAttribute', name: 'name', value: source.name },
          { type: 'mdxJsxAttribute', name: 'data-api-table', value: component },
        ],
        children: [],
      });
    });

    await compileTables(tree, file, error => {
      if (error) {
        throw error;
      }
    });

    walk(tree, node => {
      if (node.type !== 'mdxJsxFlowElement' || node.name !== 'TypeTable') {
        return;
      }

      const component = node.attributes.find(
        (attribute): attribute is MdxJsxAttribute =>
          attribute.type === 'mdxJsxAttribute' && attribute.name === 'data-api-table',
      )?.value;

      const id = node.attributes.find(
        (attribute): attribute is MdxJsxAttribute => attribute.type === 'mdxJsxAttribute' && attribute.name === 'id',
      );

      if (typeof component === 'string' && id) {
        id.value = `props-${toKebabCase(component)}`;
      }
    });
  };
}
