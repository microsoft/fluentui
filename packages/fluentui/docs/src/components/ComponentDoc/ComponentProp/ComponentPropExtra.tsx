import * as React from 'react';
import { Extendable } from '@fluentui/react-northstar';

export interface ComponentPropExtraProps {
  children?: JSX.Element[];
  title?: React.ReactNode;
  inline?: boolean;
}

const descriptionStyle = {
  color: '#666',
};
const contentStyle = {
  marginLeft: '0.5em',
};
const contentBlockStyle = {
  ...contentStyle,
  display: 'block',
};
const contentInlineStyle = {
  ...contentStyle,
  display: 'inline',
};

const ComponentPropExtra = ({ children, inline, title, ...restProps }: Extendable<ComponentPropExtraProps>) => (
  <div {...restProps} style={descriptionStyle}>
    <strong>{title}</strong>
    <div style={inline ? contentInlineStyle : contentBlockStyle}>{children}</div>
  </div>
);

export default ComponentPropExtra;
