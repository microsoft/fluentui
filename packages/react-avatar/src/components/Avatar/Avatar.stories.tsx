import * as React from 'react';
import { Avatar } from './Avatar';
import { PersonaCoin, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Provider, themes, Header, Avatar as FUIAvatar, Flex } from '@fluentui/react-northstar';
import { PulsingAvatar } from './PulsingAvatar';
import { StylesheetProvider } from '../utils/StylesheetProvider';

const imageUrl = 'http://www.fillmurray.com/192/192';

export const AvatarFela = () => (
  <Provider theme={themes.teams}>
    <Header>Avatar (fela)</Header>
    <Flex column gap="gap.small">
      <Flex gap="gap.small">
        <FUIAvatar size="smallest" name="John Doe" status="success" />
        <FUIAvatar size="smaller" name="John Doe" status="success" />
        <FUIAvatar size="small" name="John Doe" status="success" />
        <FUIAvatar name="John Doe" status="success" />
        <FUIAvatar size="large" name="Jane Doe" status="error" />
        <FUIAvatar size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar size="largest" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="smallest" name="John Doe" status="success" />
        <FUIAvatar square size="smaller" name="John Doe" status="success" />
        <FUIAvatar square size="small" name="John Doe" status="success" />
        <FUIAvatar square name="John Doe" status="success" />
        <FUIAvatar square size="large" name="Jane Doe" status="error" />
        <FUIAvatar square size="larger" name="Lorem Ipsum" status="warning" />
        <FUIAvatar square size="largest" name="Lorem Ipsum" status="warning" />
      </Flex>
      <Flex gap="gap.small">
        <FUIAvatar size="smallest" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar size="smaller" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar size="small" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar size="large" name="Jane Doe" status="error" image={imageUrl} />
        <FUIAvatar size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
        <FUIAvatar size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
        <FUIAvatar square size="smallest" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar square size="smaller" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar square size="small" name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar square name="John Doe" status="success" image={imageUrl} />
        <FUIAvatar square size="large" name="Jane Doe" status="error" image={imageUrl} />
        <FUIAvatar square size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
        <FUIAvatar square size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
      </Flex>
    </Flex>
  </Provider>
);

const squareStyles = {
  initials: { borderRadius: 3 },
  image: { borderRadius: 3 },
};

export const AvatarMergeStyles = () => (
  <Provider theme={themes.teams}>
    <Header>PersonaCoin (css)</Header>
    <Flex column gap="gap.small">
      <Flex gap="gap.small">
        <PersonaCoin size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin size={PersonaSize.size32} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.busy} />
        <PersonaCoin size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.away} />
        <PersonaCoin size={PersonaSize.size48} text="John Doe" presence={PersonaPresence.away} />
        <PersonaCoin
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          styles={squareStyles}
          size={PersonaSize.size32}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin styles={squareStyles} size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.busy} />
        <PersonaCoin styles={squareStyles} size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.away} />
        <PersonaCoin styles={squareStyles} size={PersonaSize.size48} text="John Doe" presence={PersonaPresence.away} />
      </Flex>
      <Flex gap="gap.small">
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size24} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size32} text="John Doe" presence={PersonaPresence.online} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.busy} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size40} text="John Doe" presence={PersonaPresence.away} />
        <PersonaCoin imageUrl={imageUrl} size={PersonaSize.size48} text="John Doe" presence={PersonaPresence.away} />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size24}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size32}
          text="John Doe"
          presence={PersonaPresence.online}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size40}
          text="John Doe"
          presence={PersonaPresence.busy}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size40}
          text="John Doe"
          presence={PersonaPresence.away}
        />
        <PersonaCoin
          imageUrl={imageUrl}
          styles={squareStyles}
          size={PersonaSize.size48}
          text="John Doe"
          presence={PersonaPresence.away}
        />
      </Flex>
    </Flex>
  </Provider>
);

export const AvatarCss = () => (
  <Provider theme={themes.teams}>
    <StylesheetProvider>
      <Header>Avatar (css)</Header>
      <Flex column gap="gap.small">
        <Flex gap="gap.small">
          <Avatar size="smallest" name="John Doe" status="success" />
          <Avatar size="smaller" name="John Doe" status="success" />
          <Avatar size="small" name="John Doe" status="success" />
          <Avatar name="John Doe" status="success" />
          <Avatar size="large" name="Jane Doe" status="error" />
          <Avatar size="larger" name="Lorem Ipsum" status="warning" />
          <Avatar size="largest" name="Lorem Ipsum" status="warning" />
          <Avatar square size="smallest" name="John Doe" status="success" />
          <Avatar square size="smaller" name="John Doe" status="success" />
          <Avatar square size="small" name="John Doe" status="success" />
          <Avatar square name="John Doe" status="success" />
          <Avatar square size="large" name="Jane Doe" status="error" />
          <Avatar square size="larger" name="Lorem Ipsum" status="warning" />
          <Avatar square size="largest" name="Lorem Ipsum" status="warning" />
        </Flex>
        <Flex gap="gap.small">
          <Avatar size="smallest" name="John Doe" status="success" image={imageUrl} />
          <Avatar size="smaller" name="John Doe" status="success" image={imageUrl} />
          <Avatar size="small" name="John Doe" status="success" image={imageUrl} />
          <Avatar name="John Doe" status="success" image={imageUrl} />
          <Avatar size="large" name="Jane Doe" status="error" image={imageUrl} />
          <Avatar size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
          <Avatar size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
          <Avatar square size="smallest" name="John Doe" status="success" image={imageUrl} />
          <Avatar square size="smaller" name="John Doe" status="success" image={imageUrl} />
          <Avatar square size="small" name="John Doe" status="success" image={imageUrl} />
          <Avatar square name="John Doe" status="success" image={imageUrl} />
          <Avatar square size="large" name="Jane Doe" status="error" image={imageUrl} />
          <Avatar square size="larger" name="Lorem Ipsum" status="warning" image={imageUrl} />
          <Avatar square size="largest" name="Lorem Ipsum" status="warning" image={imageUrl} />
        </Flex>
      </Flex>
    </StylesheetProvider>
  </Provider>
);

export const PulsingAvatarExample = () => (
  <Provider theme={themes.teams}>
    <StylesheetProvider>
      <PulsingAvatar name="David Zearing" pulsing />
    </StylesheetProvider>
  </Provider>
);
