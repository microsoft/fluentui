import { transform } from '@babel/standalone';
import { getUUID } from './getUUID';
import { JSONTreeElement } from '../components/types';

const prefixElementNamesPlugin = ({ types }) => {
  const hackElementName = elementNode => {
    if (types.isJSXIdentifier(elementNode.name)) {
      elementNode.name.name = `hack_${elementNode.name.name}`;
    } else if (types.isJSXMemberExpression(elementNode.name) && types.isJSXIdentifier(elementNode.name.object)) {
      elementNode.name = types.jsxIdentifier(
        `hack_${elementNode.name.object.name}_dot_${elementNode.name.property.name}`,
      );
    } else {
      console.error('NOT SUPPORTED', elementNode);
      // FIXME!
    }
  };

  return {
    visitor: {
      JSXElement(path) {
        hackElementName(path.node.openingElement);
        if (path.node.closingElement) {
          hackElementName(path.node.closingElement);
        }
      },
    },
  };
};

export const codeToTree: (code: string) => JSONTreeElement = code => {
  const compiled = transform(code, {
    plugins: [prefixElementNamesPlugin],
    presets: [['react', { pragma: 'convert', pragmaFrag: '"hack_React_dot_Fragment"' }]],
  });

  (window as any).convert = (name, props, ...children) => {
    // console.log('CONVERT', { name, props, children });

    const objectName = name.match(/^hack_(.*)_dot_(.*)$/);
    if (objectName) {
      name = `${objectName[1]}.${objectName[2]}`;
    } else {
      const literalName = name.match(/^hack_(.*)$/);
      if (literalName) {
        name = literalName[1];
      }
    }

    const uuid = props && !props.hasOwnProperty('data-builder-id') ? props['data-builder-id'] : getUUID();
    delete props?.['data-builder-id'];

    return {
      type: name,
      displayName: name,
      uuid,
      ...(name.match(/^[A-Za-z]/) && { $$typeof: 'Symbol(react.element)' }),
      props: { ...props, ...(children.length > 0 && { children }) },
    };
  };

  // eslint-disable-next-line no-new-func
  const f = new Function(`return ${compiled.code}`);

  const tree = f();

  return tree;
};
