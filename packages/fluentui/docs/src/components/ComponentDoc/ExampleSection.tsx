import * as React from 'react'
import { Grid, Extendable, Header, ICSSInJSStyle } from '@fluentui/react'

const headerStyle: ICSSInJSStyle = {
  marginTop: '1.5em',
  marginBottom: '0.5em',
  color: '#999',
  textTransform: 'uppercase',
}

export type ExampleSectionProps = Extendable<{
  title: string
}>

// minmax = prevent example overflow - https://stackoverflow.com/a/43312314
const ExampleSection: React.FC<ExampleSectionProps> = ({ title, children }) => (
  <>
    <Header as="h2" align="center" styles={headerStyle} className="no-anchor">
      {title}
    </Header>
    <Grid variables={{ gridGap: '2rem' }} columns="minmax(550px, 1fr)">
      {children}
    </Grid>
  </>
)

export default ExampleSection
