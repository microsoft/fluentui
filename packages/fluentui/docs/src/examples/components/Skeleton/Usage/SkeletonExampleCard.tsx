import * as React from 'react';
import { Skeleton, Card, Flex, Image, Text, Avatar, Button } from '@fluentui/react-northstar';
import { StarIcon, DownloadIcon, MoreIcon } from '@fluentui/react-icons-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';

const SkeletonExampleCard = () => {
  const [loading] = useBooleanKnob({
    name: 'Loading',
    initialValue: true,
  });

  return (
    <Card aria-roledescription="card with avatar, image and action buttons">
      <Card.Header>
        {loading ? (
          <Skeleton animation="wave">
            <Flex gap="gap.small">
              <Skeleton.Shape round width="32px" height="32px" />
              <div>
                <Skeleton.Line width="200px" />
                <Skeleton.Line width="150px" />
              </div>
            </Flex>
          </Skeleton>
        ) : (
          <Flex gap="gap.small">
            <Avatar
              image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
              label="Copy bandwidth"
              name="Robert Tolbert"
              status="unknown"
            />
            <Flex column>
              <Text content="Title goes here" weight="bold" />
              <Text content="Secondary line" size="small" />
            </Flex>
          </Flex>
        )}
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Skeleton animation="wave">
            <Flex column gap="gap.small">
              <Skeleton.Shape height="266px" width="259px" />
              <div>
                <Skeleton.Line width="100%" />
                <Skeleton.Line width="80%" />
              </div>
            </Flex>
          </Skeleton>
        ) : (
          <Flex column gap="gap.small">
            <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
            <Text content="Citizens of distant epochs muse about at the edge of forever hearts of the..." />
          </Flex>
        )}
      </Card.Body>
      <Card.Footer>
        {loading ? (
          <Skeleton animation="wave">
            <Skeleton.Shape width="96px" height="31px" />
          </Skeleton>
        ) : (
          <Flex space="between">
            <Button content="Action" />
            <Flex>
              <Button icon={<StarIcon />} iconOnly text title="Favourite" />
              <Button icon={<DownloadIcon />} iconOnly text title="Download" />
              <Button icon={<MoreIcon />} iconOnly text title="More" />
            </Flex>
          </Flex>
        )}
      </Card.Footer>
    </Card>
  );
};

export default SkeletonExampleCard;
