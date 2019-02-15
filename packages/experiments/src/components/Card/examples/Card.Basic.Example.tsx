// @codepen
import * as React from 'react';
import { Card } from '../Card';
import { Persona } from '../../../Persona';
import { PersonaTestImages } from '@uifabric/experiments/lib/common/TestImages';
import { Stack } from '../../../Stack';
import { Text } from '../../../Text';
import { Icon, Image } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

const alertClicked = (): void => {
  alert('Clicked');
};

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
      <Stack horizontal gap={30}>
        <Card>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" coin={{ imageUrl: PersonaTestImages.personMale }} />
          <Card.Item disableChildPadding>
            <Image
              src="https://placehold.it/250x120"
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
          <Card.Item disableChildPadding>
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
        <Card tokens={{ width: '150px' }}>
          <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" coin={{ imageUrl: PersonaTestImages.personMale }} />
          <Card.Item disableChildPadding>
            <Image
              src="https://placehold.it/250x120"
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
          <Text wrap className={styles.textBold}>
            Is this recommendation helpful?
          </Text>
          <Text wrap className={styles.textBold}>
            Is this recommendation helpful?
          </Text>
          <Text wrap className={styles.textBold}>
            Is this recommendation helpful?
          </Text>
          <Card.Item disableChildPadding>
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
        <Card onClick={alertClicked}>
          <Card.Item>
            <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" coin={{ imageUrl: PersonaTestImages.personMale }} />
          </Card.Item>
          <Card.Item disableChildPadding>
            <Image
              src="https://placehold.it/250x120"
              alt="Example implementation of the property image fit using the center value on an image larger than the frame."
              width="100%"
              height="120px"
            />
          </Card.Item>
          <Card.Item grow={5}>
            <div />
          </Card.Item>
          <Card.Item disableChildPadding>
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
