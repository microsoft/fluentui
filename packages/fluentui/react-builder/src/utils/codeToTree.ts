import { transform } from '@babel/standalone';
import { getUUID } from './getUUID';
import { JSONTreeElement } from '../components/types';
import { componentInfoContext } from '../componentInfo/componentInfoContext';

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

    // eslint-disable-next-line
    const isElement = 'A' <= name[0] && name[0] <= 'Z';
    const isComponent = isElement && (!props || (props && props['data-builder-id'] !== 'undefined'));
    let componentName = name;
    if (isComponent && !name.includes('.')) {
      componentName = `Fluent.${name}`;
    }

    const uuid = props && props.hasOwnProperty('data-builder-id') ? props['data-builder-id'] : getUUID();
    delete props?.['data-builder-id'];

    return {
      type: name,
      displayName: componentName,
      ...(isComponent &&
        componentInfoContext.byDisplayName[componentName] && {
          moduleName: componentInfoContext.byDisplayName[componentName].moduleName,
        }),
      uuid,
      ...(isElement && { $$typeof: 'Symbol(react.element)' }),
      props: { ...props, ...(children.length > 0 && { children }) },
    };
  };

  // eslint-disable-next-line no-new-func
  const f = new Function(`return ${compiled.code}`);

  const tree = f();

  return tree;
};
