import * as _ from 'lodash';
import traverse, { NodePath } from '@babel/traverse';

import parseBuffer from './parseBuffer';
import { JSXOpeningElement } from '@babel/types';

const getJSXAttributes = (jsxPath: NodePath<JSXOpeningElement>) =>
  _.map(_.get(jsxPath, 'node.attributes'), attr => ({
    name: _.get(attr, 'name.name'),
    value: _.get(attr, 'value.value'),
  }));

const getAttributeValue = (attributes: ReturnType<typeof getJSXAttributes>, name: string) =>
  _.get(_.find(attributes, { name }), 'value');

type Example = {
  title: string;
  examplePath: string;
};

/**
 * Parses the section view of component examples and builds an object with examples titles and paths.
 *
 * @param buffer - The content of a view
 */
const parseDocSection = (buffer: Buffer): { examples: Example[]; sectionName: string } => {
  const ast = parseBuffer(buffer);
  const examples: Example[] = [];
  let sectionName: string;

  traverse(ast, {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    JSXOpeningElement: path => {
      const attributes = getJSXAttributes(path);
      const name = _.get(path, 'node.name.name');

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

  return { examples, sectionName: sectionName! };
};

export default parseDocSection;
