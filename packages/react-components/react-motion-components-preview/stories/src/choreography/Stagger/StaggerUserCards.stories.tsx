import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardFooter,
  Text,
  makeStyles,
  tokens,
  createPresenceComponentVariant,
  motionTokens,
} from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';
import {
  Heart20Regular,
  Heart20Filled,
  ShareAndroid20Regular,
  Comment20Regular,
  MoreHorizontal20Regular,
} from '@fluentui/react-icons';

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
    padding: '0 16px 12px 16px',
  },
  cardFooter: {
    padding: '8px 16px 16px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  postImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: tokens.borderRadiusMedium,
  },
  likeButton: {
    color: tokens.colorPaletteRedForeground1,
  },
  ctaButton: {
    minWidth: '120px',
  },
});

// Enhanced transitions for card reveal
const FadeSlideVariant = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationSlow,
});

// Sample user data
const users = [
  {
    name: 'Sarah Chen',
    username: '@sarahc_design',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    status: 'available',
    post: "Just finished redesigning our mobile app! Really excited about the new user experience we've created. The research phase took months but it was so worth it.",
    image: 'https://picsum.photos/400/200?random=1',
    time: '2 hours ago',
    likes: 24,
    comments: 5,
  },
  {
    name: 'Marcus Johnson',
    username: '@mjohnson_dev',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    status: 'busy',
    post: "Working on some exciting new features for our component library. Can't wait to share more details soon! 🚀",
    time: '4 hours ago',
    likes: 18,
    comments: 3,
  },
  {
    name: 'Emily Rodriguez',
    username: '@emilyrod_pm',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg',
    status: 'away',
    post: "Great team meeting today! We're making excellent progress on the Q4 roadmap. Special thanks to everyone who contributed ideas.",
    image: 'https://picsum.photos/400/200?random=2',
    time: '6 hours ago',
    likes: 31,
    comments: 8,
  },
  {
    name: 'David Park',
    username: '@dpark_research',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CameronEvans.jpg',
    status: 'available',
    post: 'Fascinating findings from our latest user research study. Users are definitely trending towards more personalized experiences.',
    time: '8 hours ago',
    likes: 42,
    comments: 12,
  },
  {
    name: 'Lisa Thompson',
    username: '@lisathompson_eng',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/MonaKane.jpg',
    status: 'do-not-disturb',
    post: 'Deep dive into performance optimization today. Managed to reduce bundle size by 30% while maintaining all functionality! 💪',
    image: 'https://picsum.photos/400/200?random=3',
    time: '10 hours ago',
    likes: 56,
    comments: 15,
  },
];

export const UserCards = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [likedPosts, setLikedPosts] = React.useState<Set<number>>(new Set());

  const handleLike = (index: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
          {visible ? 'Hide' : 'Show'} Posts
        </Button>
      </div>

      <Stagger presence visible={visible} appear itemDelay={150} itemDuration={400}>
        {users.map((user, index) => (
          <FadeSlideVariant key={index}>
            <Card className={classes.userCard}>
              <CardHeader
                className={classes.cardHeader}
                image={<Avatar name={user.name} image={{ src: user.avatar }} badge={{ status: user.status as any }} />}
                header={
                  <div>
                    <Text weight="semibold">{user.name}</Text>
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      {user.username} · {user.time}
                    </Text>
                  </div>
                }
                action={<Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />}
              />

              <div className={classes.cardContent}>
                <Text>{user.post}</Text>
                {user.image && (
                  <img
                    src={user.image}
                    alt="Post content"
                    className={classes.postImage}
                    style={{ marginTop: '12px' }}
                  />
                )}
              </div>

              <CardFooter className={classes.cardFooter}>
                <div className={classes.actionButtons}>
                  <Button
                    appearance="subtle"
                    icon={likedPosts.has(index) ? <Heart20Filled /> : <Heart20Regular />}
                    onClick={() => handleLike(index)}
                    size="small"
                    className={likedPosts.has(index) ? classes.likeButton : undefined}
                  >
                    {user.likes + (likedPosts.has(index) ? 1 : 0)}
                  </Button>
                  <Button appearance="subtle" icon={<Comment20Regular />} size="small">
                    {user.comments}
                  </Button>
                  <Button appearance="subtle" icon={<ShareAndroid20Regular />} size="small">
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </FadeSlideVariant>
        ))}
      </Stagger>
    </div>
  );
};

UserCards.parameters = {
  docs: {
    description: {
      story:
        'A social media feed-style example showing user posts with staggered animations. ' +
        'Demonstrates how Stagger works with complex Card components, Avatars with presence badges, ' +
        'and interactive elements like like buttons. Perfect for social feeds, activity streams, or news feeds.',
    },
  },
};
