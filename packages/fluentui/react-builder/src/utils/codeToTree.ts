import { transformSync, types } from '@babel/core';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import reactPreset from '@babel/preset-react';
import generate from '@babel/generator';

const prefixElementNames = ast => {
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
  traverse(ast, {
    JSXElement(path) {
      hackElementName(path.node.openingElement);
      if (path.node.closingElement) {
        hackElementName(path.node.closingElement);
      }
    },
  });
};

export const codeToTree = code => {
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  prefixElementNames(ast);
  const output = generate(ast);
  // const output = generate(ast.program.body.find(n => n.type === 'ExportDefaultDeclaration').declaration);
  // console.log('After prefixing element names', output.code);

  const compiled = transformSync(output.code, {
    presets: [[reactPreset, { pragma: 'convert', pragmaFrag: '"hack_React_dot_Fragment"' }]],
  });
  // const compiled = transformSync(output.code, {
  //   plugins: [
  //     [
  //       pluginTransformReactJsx,
  //       {
  //         pragma: 'convert',
  //         pragmaFrag: '"fragment"',
  //       },
  //     ],
  //   ],
  // });
  // console.log('After pluginTransformReactJsx', compiled.code);

  const getUUID = () =>
    Math.random()
      .toString(36)
      .slice(2);

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

    const uuid = props?.['data-builder-id'] ?? getUUID();
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
  console.log('final tree', tree);

  return tree;
};
