import * as React from 'react';
import DocumentTitle from 'react-document-title';

import { Box, Header, ICSSInJSStyle, Segment } from '@fluentui/react-northstar';

interface PrototypeSectionProps {
  title?: React.ReactNode;
  styles?: ICSSInJSStyle;
}

interface ComponentPrototypeProps extends PrototypeSectionProps {
  description?: React.ReactNode;
}

export const PrototypeSection: React.FunctionComponent<PrototypeSectionProps> = ({ children, styles, title }) => (
  <Box styles={{ margin: '20px', ...styles }}>
    <DocumentTitle title={`Fluent UI - ${title || 'Prototype'}`} />
    <Header as="h1">{title}</Header>
    {children}
  </Box>
);

export const ComponentPrototype: React.FunctionComponent<ComponentPrototypeProps> = ({
  children,
  description,
  styles,
  title,
}) => (
  <Box styles={{ marginTop: '20px', ...styles }}>
    {(title || description) && (
      <Segment>
        {title && <Header as="h3">{title}</Header>}
        {description && <p>{description}</p>}
      </Segment>
    )}
    <Segment>{children}</Segment>
  </Box>
);
