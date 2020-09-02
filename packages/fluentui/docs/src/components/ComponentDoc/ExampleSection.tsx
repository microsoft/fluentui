import * as React from 'react';
import { Flex, Extendable, Header, ICSSInJSStyle } from '@fluentui/react-northstar';

const headerStyle: ICSSInJSStyle = {
  marginTop: '1.5em',
  marginBottom: '0.5em',
  color: '#999',
  textTransform: 'uppercase',
};

export type ExampleSectionProps = Extendable<{
  title: string;
}>;

// minmax = prevent example overflow - https://stackoverflow.com/a/43312314
const ExampleSection: React.FC<ExampleSectionProps> = ({ title, children }) => (
  <>
    <Header as="h2" align="center" styles={headerStyle} className="no-anchor">
      {title}
    </Header>
    <Flex
      gap="gap.large"
      column
      styles={{
        minWidth: '550px',
      }}
    >
      {children}
    </Flex>
  </>
);

export default ExampleSection;
