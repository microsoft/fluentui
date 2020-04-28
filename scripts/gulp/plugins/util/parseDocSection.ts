import traverse, { NodePath } from '@babel/traverse';
import * as t from '@babel/types';
import { parse } from '@babel/parser';

type JsxAttribute = {
  name: string | undefined;
  value: any; // tslint:disable-line:no-any
};

type Example = {
  title: string;
  examplePath: string;
};

const getJSXAttributes = (jsxPath: NodePath<t.JSXOpeningElement>): JsxAttribute[] => {
  return ((jsxPath.node?.attributes || []) as t.JSXAttribute[]).map(attr => ({
    name: attr.name?.name as string,
    value: (attr.value as any)?.value, // tslint:disable-line:no-any
  }));
};

const getAttributeValue = (attributes: JsxAttribute[], name: string) =>
  attributes.find(attr => attr.name === name)?.value;

/**
 * Parses the section view of component examples and builds an object with examples titles and paths.
 *
 * @param buffer - The content of a view
 */
const parseDocSection = (
  buffer: Buffer | NodeJS.ReadableStream,
): { examples: Example[]; sectionName: string | undefined } => {
  const ast = parse(buffer.toString(), {
    plugins: ['classProperties', 'jsx'],
    sourceType: 'module',
  });
  const examples: Example[] = [];
  let sectionName: string | undefined;

  traverse(ast, {
    JSXOpeningElement: path => {
      const attributes = getJSXAttributes(path);
      const name = (path.node?.name as t.JSXIdentifier)?.name;

      const title = getAttributeValue(attributes, 'title');
      const examplePath = getAttributeValue(attributes, 'examplePath');

      if (name === 'ExampleSection') {
        sectionName = title;
        return;
      }

      if (name === 'ComponentExample' && title) {
        examples.push({ title, examplePath });
      }
    },
  });

  return { examples, sectionName };
};

export default parseDocSection;
