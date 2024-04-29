import * as React from 'react';
import ComponentTableProps from '../ComponentPropsTable';
import { Divider, ICSSInJSStyle, Segment } from '@fluentui/react-northstar';

export const cardStyle: ICSSInJSStyle = {
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
};

type ComponentPropCardProps = {
  name: string;
  description: string;
};

const ComponentPropCard: React.FC<ComponentPropCardProps> = ({ name, description }) => (
  <Segment styles={cardStyle}>
    <div>{description}</div>
    <Divider />
    <ComponentTableProps componentName={name} />
  </Segment>
);

export default ComponentPropCard;
