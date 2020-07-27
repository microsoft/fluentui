import * as React from 'react';
import { Skeleton, Card, Flex, Image, Text } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const SkeletonExampleCard = () => {
  const [loading] = useBooleanKnob({
    name: 'Loading',
    initialValue: true,
  });

  return (
    <Card aria-roledescription="card with image and text">
      <Card.Body fitted>
        <Flex column gap="gap.small">
          {loading ? (
            <Skeleton animation="wave">
              <Skeleton.Shape width="266px" height="259px" />
              <Skeleton.Line />
              <Skeleton.Line width="70%" />
            </Skeleton>
          ) : (
            <>
              <Image src="public/images/wireframe/square-image.png" />
              <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." />
            </>
          )}
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default SkeletonExampleCard;
