import * as React from 'react';
import { Skeleton, Image, List } from '@fluentui/react-northstar';
import { useBooleanKnob } from '@fluentui/docs-components';
import * as _ from 'lodash';

const SkeletonExampleList = () => {
  const [loading] = useBooleanKnob({
    name: 'Loading',
    initialValue: true,
  });

  return (
    <List>
      {_.times(5, index => (
        <List.Item
          key={index}
          styles={{
            backgroundColor: index % 2 === 0 ? '#f5f2f2' : 'transparent',
          }}
          media={
            loading ? (
              <Skeleton animation="wave">
                <Skeleton.Shape round width="32px" height="32px" />
              </Skeleton>
            ) : (
              <Image
                src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
                avatar
              />
            )
          }
          header={
            loading ? (
              <Skeleton
                animation="wave"
                styles={{
                  paddingBottom: '2px',
                }}
              >
                <Skeleton.Line width="100px" />
              </Skeleton>
            ) : (
              'Robert Tolbert'
            )
          }
          content={
            loading ? (
              <Skeleton animation="wave">
                <Skeleton.Line width="400px" />
              </Skeleton>
            ) : (
              'Program the sensor to the SAS alarm through the haptic SQL card!'
            )
          }
          headerMedia={loading ? '' : '7:26:56 AM'}
          index={index}
        />
      ))}
    </List>
  );
};

export default SkeletonExampleList;
