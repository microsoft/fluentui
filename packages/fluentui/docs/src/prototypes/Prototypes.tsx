import * as React from 'react'
import { Box, Header, ICSSInJSStyle, Segment } from '@fluentui/react'

interface PrototypeSectionProps {
  title?: React.ReactNode
  styles?: ICSSInJSStyle
}

interface ComponentPrototypeProps extends PrototypeSectionProps {
  description?: React.ReactNode
}

export const PrototypeSection: React.FunctionComponent<ComponentPrototypeProps> = props => {
  const { title, children, styles, ...rest } = props
  return (
    <Box styles={{ margin: '20px', ...styles }} {...rest}>
      {title && <Header as="h1">{title}</Header>}
      {children}
    </Box>
  )
}

export const ComponentPrototype: React.FunctionComponent<ComponentPrototypeProps> = props => {
  const { description, title: header, children, styles, ...rest } = props
  return (
    <Box styles={{ marginTop: '20px', ...styles }} {...rest}>
      {(header || description) && (
        <Segment>
          {header && <Header as="h3">{header}</Header>}
          {description && <p>{description}</p>}
        </Segment>
      )}
      <Segment>{children}</Segment>
    </Box>
  )
}
