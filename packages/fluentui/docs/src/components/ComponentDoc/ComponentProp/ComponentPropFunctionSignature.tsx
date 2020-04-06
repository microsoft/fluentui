import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import ComponentPropExtra, { ComponentPropExtraProps } from './ComponentPropExtra';

interface ComponentPropFunctionProps extends ComponentPropExtraProps {
  name?: string;
  tags?: {
    name?: string;
    description?: string;
    title?: string;
  }[];
}

const descriptionStyle = {
  flex: '5 5 0',
  padding: '0.1em 0',
};

const nameStyle = {
  flex: '2 2 0',
  padding: '0.1em 0',
};

const rowStyle: any = {
  display: 'flex',
  flexDirection: 'row',
};

const getTagType = tag => (tag.type ? (tag.type.type === 'AllLiteral' ? 'any' : tag.type.name) : '');

const ComponentPropFunctionSignature: React.SFC<ComponentPropFunctionProps> = ({ name, tags }) => {
  const params = _.filter(tags, { title: 'param' });
  const returns = _.find(tags, { title: 'returns' });

  // this doesn't look like a function propType docblock
  // don't try to render a signature
  if (_.isEmpty(params) && !returns) return null;

  const paramSignature = params
    .map(param => `${param.name}: ${getTagType(param)}`)
    // prevent object properties from showing as individual params
    .filter(p => !_.includes(p, '.'))
    .join(', ');

  const tagDescriptionRows = _.compact([...params, returns]).map(tag => {
    const title = tag.name || tag.title;
    return (
      <div key={title} style={rowStyle}>
        <div style={nameStyle}>
          <code>{title}</code>
        </div>
        <div style={descriptionStyle}>{tag.description}</div>
      </div>
    );
  });

  return (
    <ComponentPropExtra
      title={
        <pre>
          {name}({paramSignature}){returns ? `: ${getTagType(returns)}` : ''}
        </pre>
      }
    >
      {tagDescriptionRows}
    </ComponentPropExtra>
  );
};

ComponentPropFunctionSignature.propTypes = {
  name: PropTypes.string,
  tags: PropTypes.array,
};

const arePropsEqual = () => true;

export default React.memo(ComponentPropFunctionSignature, arePropsEqual);
