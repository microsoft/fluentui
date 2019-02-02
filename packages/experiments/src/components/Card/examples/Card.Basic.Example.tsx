// @codepen
import * as React from 'react';
import { Card } from '../Card';
import { Persona } from '../../../Persona';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { Stack } from '../../../Stack';
import { Text } from '../../../Text';
import { Icon, Image } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

export class CardBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      textLarge: {
        color: 'teal',
        fontWeight: 'bolder'
      },
      textBold: {
        fontWeight: 'bold'
      }
    });

    return (
      <Stack gap={5}>
        <Card>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" coin={{ imageUrl: PersonaTestImages.personMale }} />
          <Card.Item preventPadding>
            <Image
              src="https://get.pxhere.com/photo/landscape-water-nature-forest-rock-wilderness-mountain-sky-hiking-lake-valley-mountain-range-stone-panorama-summer-reflection-autumn-holiday-italy-alpine-blue-fjord-national-park-mountain-landscape-clouds-great-mountains-alps-vision-outlook-plateau-wide-viewpoint-mood-loch-alm-distant-dolomites-clouded-sky-distant-view-alpine-panorama-tarn-unesco-world-heritage-mountainous-landforms-computer-wallpaper-1401782.jpg"
              alt="Example implementation of the property image fit using the center value on an image larger than the frame."
              width="100%"
              height="120px"
            />
          </Card.Item>
          <Text variant="large" className={styles.textLarge}>
            Contoso
          </Text>
          <Text wrap variant="large">
            Contoso Denver expansion design marketing hero guidelines
          </Text>
          <Text className={styles.textBold}>Is this recommendation helpful?</Text>
          <Card.Item preventPadding>
            <Stack
              horizontal
              horizontalAlign="space-between"
              padding="10px 10px -2px 10px"
              styles={{ root: { borderTop: '1px solid lightgray' } }}
            >
              <Icon iconName="RedEye" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
              <Icon iconName="MoreVertical" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
            </Stack>
          </Card.Item>
        </Card>
      </Stack>
    );
  }
}
