import * as React from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';

import { ComponentProp, ComponentPropType } from '../../../types';
import componentInfoContext from '../../../utils/componentInfoContext';
import ComponentPropName from '../ComponentProp/ComponentPropName';
import { getComponentGroup } from '../../../utils';

const InlineMarkdown = React.lazy(() => import('../InlineMarkdown'));

type ComponentPropsRowProps = ComponentProp;

const ComponentPropValue: React.FunctionComponent<ComponentPropType> = props => {
  const { name, parameters } = props;

  if (name === 'literal') return <span>enum</span>;
  if (name === 'ShorthandValue' || name === 'ShorthandCollection') {
    const componentName = parameters[0].name.replace('Props', '');

    const parentInfo = componentInfoContext.byDisplayName[componentName];
    if (parentInfo) {
      const linkName = _.kebabCase(parentInfo.parentDisplayName || componentName);

      const kindParam = parameters[1] && parameters[1].name !== 'never';
      const kindIsVisible = name === 'ShorthandCollection' && kindParam;

      const showHash = parentInfo.parentDisplayName || _.size(getComponentGroup(componentName)) > 1;
      const propsSection = showHash ? `#${_.kebabCase(componentName)}` : '';

      return (
        <span>
          {name}
          {`<`}
          <Link to={`/components/${linkName}/props${propsSection}`}>{parameters[0].name}</Link>
          {kindIsVisible && <span>, {parameters[1].name}</span>}
          {`>`}
        </span>
      );
    }
  }

  return <span>{name}</span>;
};

const ComponentPropsRow: React.FunctionComponent<ComponentPropsRowProps> = props => {
  const { defaultValue, description, name, required, types } = props;

  const shorthand = types.some(type => type.name === 'ShorthandValue' || type.name === 'ShorthandCollection');

  const typeValues = _.uniqBy(types, type => type.name);
  const enumValues = _.filter(types, type => type.name === 'literal');

  return (
    <tr style={{ borderTop: '1px solid grey' }}>
      <td>
        <ComponentPropName name={name} required={required} slot={shorthand} />
      </td>
      <td>{_.isNil(defaultValue) ? null : <code>{JSON.stringify(defaultValue)}</code>}</td>
      <td>
        <code>
          {typeValues.map((type, index) => (
            <React.Fragment key={type.name || 'enum'}>
              <ComponentPropValue {...type} />
              {index < typeValues.length - 1 && <span> | </span>}
            </React.Fragment>
          ))}
        </code>
      </td>
      <td>
        <InlineMarkdown value={description} />
        {enumValues.length > 0 && <b>Values:</b>}
        {enumValues.map(type => (
          <code key={type.value} style={{ marginRight: 3 }}>
            {type.value}
          </code>
        ))}
        {/* TODO make this work with typescript types */}
        {/* <ComponentPropFunctionSignature name={name} tags={tags} /> */}
      </td>
    </tr>
  );
};

export default React.memo(ComponentPropsRow);
