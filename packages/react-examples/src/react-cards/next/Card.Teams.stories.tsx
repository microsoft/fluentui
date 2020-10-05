import * as React from 'react';
import { TestImages } from '@uifabric/example-data';
import { DefaultButton, IconButton, Image, ImageFit, Persona, PersonaPresence, Stack, Text } from '@fluentui/react';
import { Card, CardBody, CardFooter, CardHeader } from '@uifabric/react-cards/lib/next/index';

function onClick() {
  alert('Card was clicked');
}

export const TeamsCards = () => (
  <Stack gap={40}>
    <div>
      <Text variant="xLarge">Basic Card</Text>
      <Card onClick={onClick}>
        <CardHeader>
          <Persona
            imageUrl={TestImages.personaMale}
            text="Carmen Gaylord"
            secondaryText="Direct Communications Agent"
            presence={PersonaPresence.offline}
          />
        </CardHeader>
        <CardBody>
          Voluptatibus commodi ut. Neque eum odit eius repellat molestiae illo aut ut illum. Nulla vel et odit
          consequatur dolorem molestias. Rem rerum animi consequatur.
        </CardBody>
      </Card>
    </div>
    <div>
      <Text variant="xLarge">Only header</Text>
      <Card onClick={onClick}>
        <CardHeader fitted>
          <Persona
            imageUrl={TestImages.personaMale}
            text="Carmen Gaylord"
            secondaryText="Direct Communications Agent"
            presence={PersonaPresence.offline}
          />
        </CardHeader>
      </Card>
    </div>
    <div>
      <Text variant="xLarge">Only body</Text>
      <Card onClick={onClick}>
        <CardBody fitted>
          <Stack gap={10}>
            <Image src="http://placehold.it/500x500" imageFit={ImageFit.cover} height={300} maximizeFrame />
            <Text>Citizens of distant epochs muse about at theedge of forever hearts of the...</Text>
          </Stack>
        </CardBody>
      </Card>
    </div>
    <div>
      <Text variant="xLarge">Only footer</Text>
      <Card onClick={onClick}>
        <CardFooter fitted>
          <Stack horizontal horizontalAlign="space-between">
            <DefaultButton text="Action" />
            <Stack horizontal>
              <IconButton iconProps={{ iconName: 'FavoriteStar' }} />
              <IconButton iconProps={{ iconName: 'Download' }} />
              <IconButton iconProps={{ iconName: 'More' }} />
            </Stack>
          </Stack>
        </CardFooter>
      </Card>
    </div>
  </Stack>
);
