import * as React from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Text,
  makeStyles,
  tokens,
  createPresenceComponentVariant,
  motionTokens,
  Badge,
} from '@fluentui/react-components';
import { Stagger, Slide } from '@fluentui/react-motion-components-preview';
import { Warning20Regular, Info20Regular, Checkmark20Regular, Dismiss20Regular } from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '500px',
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
  notificationPanel: {
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '8px',
    maxHeight: '600px',
    overflowY: 'auto',
  },
  notification: {
    marginBottom: '8px',
    position: 'relative',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  unreadIndicator: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '8px',
    height: '8px',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
  },
  notificationContent: {
    paddingLeft: '24px',
    paddingRight: '8px',
  },
  notificationHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  notificationMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '8px',
  },
  timestamp: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  actionButtons: {
    display: 'flex',
    gap: '4px',
    marginTop: '12px',
  },
  urgent: {
    borderLeft: `4px solid ${tokens.colorPaletteRedBackground3}`,
  },
  info: {
    borderLeft: `4px solid ${tokens.colorPaletteBlueBorderActive}`,
  },
  success: {
    borderLeft: `4px solid ${tokens.colorPaletteGreenBackground3}`,
  },
  ctaButton: {
    minWidth: '120px',
  },
});

// Slide in from the right for notifications
const SlideInVariant = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationNormal,
});

type NotificationType = 'urgent' | 'info' | 'success';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  sender?: string;
  avatar?: string;
  timestamp: string;
  unread: boolean;
  actionable?: boolean;
}

// Sample notifications
const notifications: Notification[] = [
  {
    id: 1,
    type: 'urgent',
    title: 'System Alert',
    message: 'Server response time is critically high. Immediate attention required.',
    timestamp: '2 minutes ago',
    unread: true,
    actionable: true,
  },
  {
    id: 2,
    type: 'info',
    title: 'Team Meeting',
    sender: 'Sarah Chen',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/KatriAthokas.jpg',
    message: 'Reminder: Design review meeting starts in 15 minutes in Conference Room B.',
    timestamp: '10 minutes ago',
    unread: true,
  },
  {
    id: 3,
    type: 'success',
    title: 'Deployment Complete',
    message: 'Production deployment v2.1.4 completed successfully. All systems operational.',
    timestamp: '1 hour ago',
    unread: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'New Comment',
    sender: 'Marcus Johnson',
    avatar: 'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
    message: 'Added feedback on your pull request: "Great work on the performance improvements!"',
    timestamp: '2 hours ago',
    unread: false,
  },
  {
    id: 5,
    type: 'info',
    title: 'Weekly Report',
    message: 'Your weekly analytics report is ready for review. Click to view insights.',
    timestamp: '1 day ago',
    unread: false,
    actionable: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'urgent':
      return <Warning20Regular />;
    case 'success':
      return <Checkmark20Regular />;
    default:
      return <Info20Regular />;
  }
};

const getNotificationBadgeColor = (type: NotificationType) => {
  switch (type) {
    case 'urgent':
      return 'danger';
    case 'success':
      return 'success';
    default:
      return 'informative';
  }
};

export const NotificationCenter = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [dismissedNotifications, setDismissedNotifications] = React.useState<Set<number>>(new Set());

  const handleDismiss = (notificationId: number) => {
    setDismissedNotifications(prev => new Set([...prev, notificationId]));
  };

  const visibleNotifications = notifications.filter(n => !dismissedNotifications.has(n.id));

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
          {visible ? 'Hide' : 'Show'} Notifications
        </Button>
      </div>

      <div className={classes.notificationPanel}>
        <Stagger visible={visible} itemDelay={120} itemDuration={350}>
          {visibleNotifications.map(notification => (
            <SlideInVariant key={notification.id}>
              <Card className={`${classes.notification} ${classes[notification.type]}`}>
                {notification.unread && <div className={classes.unreadIndicator} />}

                <div className={classes.notificationContent}>
                  <CardHeader
                    image={
                      notification.sender && notification.avatar ? (
                        <Avatar name={notification.sender} image={{ src: notification.avatar }} size={32} />
                      ) : (
                        <Badge
                          icon={getNotificationIcon(notification.type)}
                          color={getNotificationBadgeColor(notification.type)}
                          size="large"
                        />
                      )
                    }
                    header={
                      <div className={classes.notificationHeader}>
                        <Text weight="semibold" size={300}>
                          {notification.title}
                        </Text>
                        <Button
                          appearance="subtle"
                          icon={<Dismiss20Regular />}
                          size="small"
                          onClick={() => handleDismiss(notification.id)}
                        />
                      </div>
                    }
                    description={
                      notification.sender && (
                        <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                          {notification.sender}
                        </Text>
                      )
                    }
                  />

                  <Text size={300} style={{ marginTop: '8px' }}>
                    {notification.message}
                  </Text>

                  <div className={classes.notificationMeta}>
                    <Text className={classes.timestamp}>{notification.timestamp}</Text>
                  </div>

                  {notification.actionable && (
                    <div className={classes.actionButtons}>
                      <Button size="small" appearance="primary">
                        View Details
                      </Button>
                      <Button size="small" appearance="subtle">
                        Later
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </SlideInVariant>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

NotificationCenter.parameters = {
  docs: {
    description: {
      story:
        'A notification center showing system alerts, messages, and updates with staggered slide animations. ' +
        'Features different notification types (urgent, info, success), unread indicators, sender avatars, ' +
        'and dismissible actions. Perfect for notification panels, activity feeds, or alert systems.',
    },
  },
};
