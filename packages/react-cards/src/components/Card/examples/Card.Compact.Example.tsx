// @codepen
import * as React from 'react';
import { Persona, Text } from '@uifabric/experiments';
import { Icon, Image, Stack } from 'office-ui-fabric-react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Card } from '../Card';

export class CardCompactExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const styles = mergeStyleSets({
      siteText: {
        color: '#025F52',
        fontSize: 14,
        fontWeight: 600
      },
      descriptionText: {
        color: '#33332D',
        fontSize: 16,
        fontWeight: 600
      },
      helpfulText: {
        color: '#323130',
        fontSize: 14,
        fontWeight: 600
      }
    });

    return (
      <Card compact={true}>
        <Persona text="Kevin Jameson" secondaryText="Feb 2, 2019" />
        <Image
          src="https://placehold.it/250x120"
          alt="Example implementation of the property image fit using the center value on an image larger than the frame."
        />
        <Text className={styles.siteText}>Contoso</Text>
        <Text className={styles.descriptionText}>Contoso Denver expansion design marketing hero guidelines</Text>
        <Text className={styles.helpfulText}>Is this recommendation helpful?</Text>
        <Icon iconName="RedEye" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
        <Icon iconName="MoreVertical" styles={{ root: { color: 'mediumturquoise', fontSize: '20px' } }} />
      </Card>
    );
  }
}
