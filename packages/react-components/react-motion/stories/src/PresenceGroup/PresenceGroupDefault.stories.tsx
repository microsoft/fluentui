import {
  createPresenceComponent,
  makeStyles,
  Button,
  Persona,
  tokens,
  MessageBar,
  MessageBarTitle,
  MessageBarBody,
  motionTokens,
  PresenceGroup,
} from '@fluentui/react-components';
import { AddRegular, DeleteRegular } from '@fluentui/react-icons';
import * as React from 'react';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: 0,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderBottom: 'none',
    borderTopLeftRadius: tokens.borderRadiusMedium,
    borderTopRightRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
    alignSelf: 'end',
  },
});

const users = [
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    name: 'Allan Munger',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg',
    name: 'Amanda Brady',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AshleyMcCarthy.jpg',
    name: 'Ashley McCarthy',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    name: 'Cameron Evans',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    name: 'Carlos Slattery',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg',
    name: 'Carole Poland',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CecilFolk.jpg',
    name: 'Cecil Folk',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CelesteBurton.jpg',
    name: 'Celeste Burton',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CharlotteWaltson.jpg',
    name: 'Charlotte Waltson',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ColinBallinger.jpg',
    name: 'ColinBallinger',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/DaisyPhillips.jpg',
    name: 'Daisy Phillips',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElliotWoodward.jpg',
    name: 'Elliot Woodward',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ElviaAtkins.jpg',
    name: 'Elvia Atkins',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg',
    name: 'Erik Nason',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/HenryBrill.jpg',
    name: 'Henry Brill',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/IsaacFielder.jpg',
    name: 'Isaac Fielder',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/JohnieMcConnell.jpg',
    name: 'Johnie McConnell',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatLarsson.jpg',
    name: 'Kat Larsson',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    name: 'Katri Athokas',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KevinSturgis.jpg',
    name: 'Kevin Sturgis',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KristinPatterson.jpg',
    name: 'Kristin Patterson',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/LydiaBauer.jpg',
    name: 'Lydia Bauer',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MauricioAugust.jpg',
    name: 'Mauricio August',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MiguelGarcia.jpg',
    name: 'Miguel Garcia',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MonaKane.jpg',
    name: 'Mona Kane',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg',
    name: 'Robert Tolbert',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
    name: 'Robin Counts',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    name: 'Tim Deboer',
  },
  {
    image: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg',
    name: 'Wanda Howard',
  },
];

const ItemMotion = createPresenceComponent({
  enter: {
    keyframes: [
      { opacity: 0, transform: 'scaleY(0) translateX(-30px)', height: 0 },
      { opacity: 1, transform: 'scaleY(1) translateX(0)', height: '40px' },
    ],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationUltraSlow,
  },
  exit: {
    keyframes: [
      { opacity: 1, transform: 'scaleY(1) translateX(0)', height: '40px' },
      { opacity: 0, transform: 'scaleY(0) translateX(-30px)', height: 0 },
    ],
    easing: motionTokens.curveEasyEase,
    duration: motionTokens.durationUltraSlow,
  },
});

export const PresenceGroupDefault = () => {
  const classes = useClasses();
  const [limit, setLimit] = React.useState(3);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button
          appearance="primary"
          disabled={limit + 1 === users.length}
          icon={<AddRegular />}
          onClick={() => setLimit(l => l + 1)}
          size="small"
        >
          Add user
        </Button>
        <Button disabled={limit === 0} icon={<DeleteRegular />} onClick={() => setLimit(l => l - 1)} size="small">
          Remove user
        </Button>
      </div>

      <div className={classes.card}>
        <ItemMotion visible={limit === 0} unmountOnExit>
          <MessageBar>
            <MessageBarBody>
              <MessageBarTitle>No users</MessageBarTitle>
              Click "Add user" to add a user to the presence group.
            </MessageBarBody>
          </MessageBar>
        </ItemMotion>

        <PresenceGroup>
          {users.slice(0, limit).map(item => (
            <ItemMotion key={item.name}>
              <Persona
                avatar={{
                  image: { src: item.image },
                }}
                textPosition="after"
                name={item.name}
                presence={{ status: 'available' }}
                secondaryText="Available"
                size="extra-large"
              />
            </ItemMotion>
          ))}
        </PresenceGroup>
      </div>
    </div>
  );
};
