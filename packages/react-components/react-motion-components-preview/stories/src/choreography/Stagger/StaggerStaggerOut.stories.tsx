import * as React from 'react';
import type { PresenceBadgeStatus, JSXElement } from '@fluentui/react-components';
import { Avatar, Button, Card, CardHeader, Text, makeStyles, motionTokens, tokens } from '@fluentui/react-components';
import { createStaggerComponent, fadeOut } from '@fluentui/react-motion-components-preview';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import StaggerStaggerOutDescription from './StaggerStaggerOut.stories.md';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '600px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  userCard: {
    width: '100%',
    marginBottom: '4px',
  },
  cardHeader: {
    paddingBottom: '8px',
  },
  cardContent: {
    padding: '0 16px 16px 16px',
  },
  ctaButton: {
    minWidth: '120px',
  },
});

const StaggeredCollapseOut = createStaggerComponent(({ element }) => {
  const duration = motionTokens.durationUltraSlow;
  const easing = motionTokens.curveDecelerateMin;
  const fullHeight = `${element.scrollHeight}px`;

  return [
    fadeOut({ duration, easing }),
    {
      keyframes: [
        { maxHeight: fullHeight, overflowY: 'hidden' },
        { maxHeight: '0px', overflowY: 'hidden' },
      ],
      duration,
      easing,
      fill: 'both',
    },
  ];
});

// Reuse sample users from the In story file by duplicating data here to keep stories self-contained.
const users = [
  {
    name: 'Sarah Chen',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    status: 'available',
    post: "Just finished redesigning our mobile app! Really excited about the new user experience we've created. The research phase took months but it was so worth it.",
    time: '2 hours ago',
  },
  {
    name: 'Marcus Johnson',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    status: 'busy',
    post: "Working on some exciting new features for our component library. Can't wait to share more details soon! 🚀",
    time: '4 hours ago',
  },
  {
    name: 'Emily Rodriguez',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    status: 'away',
    post: "Great team meeting today! We're making excellent progress on the Q4 roadmap. Special thanks to everyone who contributed ideas.",
    time: '6 hours ago',
  },
  {
    name: 'David Park',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    status: 'available',
    post: 'Fascinating findings from our latest user research study. Users are definitely trending towards more personalized experiences.',
    time: '8 hours ago',
  },
];

// Basic Out: items animate out in reverse order
export const StaggerOut = (): JSXElement => {
  const classes = useClasses();
  const [replayKey, setReplayKey] = React.useState<number>(0);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button
          className={classes.ctaButton}
          appearance="primary"
          size="large"
          onClick={() => setReplayKey(prev => prev + 1)}
        >
          Replay Animation
        </Button>
      </div>

      <StaggeredCollapseOut startInterval={motionTokens.durationFast} order="reverse" replayKey={replayKey}>
        <div className={classes.cards}>
          {users.map((user, index) => (
            <Card key={index} className={classes.userCard}>
              <CardHeader
                className={classes.cardHeader}
                image={
                  <Avatar
                    name={user.name}
                    image={{ src: user.avatar }}
                    badge={{ status: user.status as PresenceBadgeStatus }}
                  />
                }
                header={
                  <div>
                    <Text weight="semibold">{user.name}</Text>
                    <Text
                      size={200}
                      style={{ color: tokens.colorNeutralForeground3, marginLeft: tokens.spacingHorizontalS }}
                    >
                      {user.time}
                    </Text>
                  </div>
                }
                action={<Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />}
              />

              <div className={classes.cardContent}>
                <Text>{user.post}</Text>
              </div>
            </Card>
          ))}
        </div>
      </StaggeredCollapseOut>
    </div>
  );
};

StaggerOut.parameters = {
  docs: {
    description: {
      story: StaggerStaggerOutDescription,
    },
  },
};
