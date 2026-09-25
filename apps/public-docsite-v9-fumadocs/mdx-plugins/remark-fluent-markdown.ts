import type { Nodes, Root, TableCell } from 'mdast';
import type { ObjectExpression, Property } from 'estree';
import type { MdxJsxAttribute } from 'mdast-util-mdx-jsx';
import type { Transformer } from 'unified';
import type { GeneratedDoc } from 'fumadocs-typescript';
import type { LLMsOptions } from 'fumadocs-core/mdx-plugins/remark-llms';

declare module 'mdast' {
  interface Data {
    markdownTable?: Root;
  }
}

export function remarkFluentMarkdown(): Transformer<Root, Root> {
  const hostingBase = process.env.DOCSITE_BASE_PATH || '/';
  return tree => {
    const components: ObjectExpression[] = [];
    function walk(node: Nodes): void {
      if ((node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') && node.name === 'a') {
        for (const attribute of node.attributes) {
          if (
            attribute.type === 'mdxJsxAttribute' &&
            attribute.name === 'href' &&
            typeof attribute.value === 'string' &&
            attribute.value.startsWith('/docs/')
          ) {
            attribute.value = `${hostingBase}${attribute.value.slice(1)}`;
          }
        }
      }

      if (node.type === 'mdxJsxFlowElement' && node.name === null) {
        node.data = { ...node.data, _stringify: 'children-only' };
      }

      if (node.type === 'mdxJsxFlowElement' && (node.name === 'ComponentPage' || node.name === 'GuideExamples')) {
        const names =
          node.name === 'GuideExamples' ? ['description', 'examples'] : ['meta', 'stories', 'order', 'wrapper'];
        const properties = names.flatMap((name): Property[] => {
          const attribute = node.attributes.find(
            (item): item is MdxJsxAttribute => item.type === 'mdxJsxAttribute' && item.name === name,
          );

          if (!attribute) {
            return [];
          }

          const statement = typeof attribute.value === 'object' && attribute.value?.data?.estree?.body?.[0];
          const expression = statement && statement.type === 'ExpressionStatement' ? statement.expression : undefined;

          if (!expression) {
            throw new Error(`ComponentPage ${name} must be a JavaScript expression`);
          }

          return [
            {
              type: 'Property',
              key: { type: 'Identifier', name },
              value: expression,
              kind: 'init',
              method: false,
              shorthand: false,
              computed: false,
            },
          ];
        });

        node.attributes.push({ type: 'mdxJsxAttribute', name: 'data-llms-id', value: String(components.length) });
        components.push({ type: 'ObjectExpression', properties });
      }

      if (node.type === 'mdxJsxFlowElement' && node.name === 'TypeTable') {
        const value = node.attributes.find(
          (attribute): attribute is MdxJsxAttribute =>
            attribute.type === 'mdxJsxAttribute' && attribute.name === 'type',
        )?.value;

        const documentation = typeof value === 'object' && value?.value;

        if (!documentation) {
          throw new Error('TypeTable is missing its extracted documentation');
        }

        const doc = JSON.parse(documentation) as GeneratedDoc;
        const cell = (text: unknown, code = false): TableCell => ({
          type: 'tableCell',
          children: [
            {
              type: code ? 'inlineCode' : 'text',
              value: String(text ?? '')
                .replace(/\s+/g, ' ')
                .trim(),
            },
          ],
        });

        node.data = {
          ...node.data,
          markdownTable: {
            type: 'root',
            children: [
              { type: 'heading', depth: 2, children: [{ type: 'text', value: 'Props' }] },
              {
                type: 'table',
                children: [
                  {
                    type: 'tableRow' as const,
                    children: ['Name', 'Type', 'Required', 'Default', 'Description'].map(text => cell(text)),
                  },
                  ...doc.entries.map(prop => ({
                    type: 'tableRow' as const,
                    children: [
                      cell(prop.name, true),
                      cell(prop.type, true),
                      cell(prop.required ? 'Yes' : 'No'),
                      cell(prop.tags.find(tag => tag.name === 'default')?.text),
                      cell(prop.description),
                    ],
                  })),
                ],
              },
            ],
          },
        };
      }

      if ('children' in node) {
        for (const child of node.children) {
          walk(child);
        }
      }
    }

    walk(tree);

    tree.children.push({
      type: 'mdxjsEsm',
      value: '',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              attributes: [],
              specifiers: [],
              source: null,
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name: '_componentPages' },
                    init: { type: 'ArrayExpression', elements: components },
                  },
                ],
              },
            },
          ],
        },
      },
    });
  };
}

export const stringifyFluent: NonNullable<LLMsOptions['stringify']> = (node, _, state, info) => {
  if (node.data?.markdownTable) {
    return state.containerFlow(node.data.markdownTable, info);
  }
};
