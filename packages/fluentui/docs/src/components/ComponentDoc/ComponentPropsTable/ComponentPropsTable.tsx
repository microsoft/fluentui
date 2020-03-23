import { Loader } from '@fluentui/react-northstar';
import * as React from 'react';

import useComponentProps from '../useComponentProps';
import ComponentPropsRow from './ComponentPropsRow';

const tableStyles: React.CSSProperties = {
  textAlign: 'left',
  borderCollapse: 'collapse',
  width: '100%',
};

type ComponentPropsTable = {
  componentName: string;
};

/**
 * Displays a table of a Component's PropTypes.
 * TODO: use Flex or a Table component, when it will be available
 */
const ComponentPropsTable: React.FunctionComponent<ComponentPropsTable> = props => {
  const componentProps = useComponentProps(props.componentName);

  return (
    <React.Suspense fallback={<Loader />}>
      <table style={tableStyles}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Default</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {componentProps.map(propDef => (
            <ComponentPropsRow {...propDef} key={propDef.name} />
          ))}
        </tbody>
      </table>
    </React.Suspense>
  );
};

export default ComponentPropsTable;
