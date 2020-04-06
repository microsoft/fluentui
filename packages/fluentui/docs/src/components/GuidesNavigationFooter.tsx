import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Divider, Icon } from '@fluentui/react-northstar';

export type PageDescriptor = {
  name: string;
  url: string;
};

type GuidesNavigationFooterProps = {
  previous?: PageDescriptor;
  next?: PageDescriptor;
};

const GuidesNavigationFooter: React.FC<GuidesNavigationFooterProps> = ({ previous, next }) => (
  <>
    <br />
    <Divider size={1} />
    <br />
    <Flex gap="gap.small">
      {previous && (
        <Button
          as={Link}
          content={previous.name}
          icon={<Icon name="arrow left" />}
          iconPosition="before"
          primary
          to={previous.url}
        />
      )}
      {next && (
        <Button
          as={Link}
          content={next.name}
          icon={<Icon name="arrow right" />}
          iconPosition="after"
          primary
          to={next.url}
        />
      )}
    </Flex>
  </>
);

export default GuidesNavigationFooter;
