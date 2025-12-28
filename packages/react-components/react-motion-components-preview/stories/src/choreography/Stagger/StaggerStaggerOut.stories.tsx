import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  PresenceBadgeStatus,
  Text,
  makeStyles,
  motionTokens,
  tokens,
  JSXElement,
} from '@fluentui/react-components';
import { Stagger, Collapse } from '@fluentui/react-motion-components-preview';
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

// Basic Out: items animate out when removed from the list
export const StaggerOut = (): JSXElement => {
  const classes = useClasses();
  const [items] = React.useState(users);
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  const replayAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={replayAnimation}>
          Replay Animation
        </Button>
      </div>

      <Stagger.Out key={animationKey} itemDelay={motionTokens.durationFast} reversed>
        {items.map((user, index) => (
          <Collapse.Out key={index} duration={motionTokens.durationUltraSlow} easing={motionTokens.curveDecelerateMin}>
            <Card className={classes.userCard}>
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
          </Collapse.Out>
        ))}
      </Stagger.Out>
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
