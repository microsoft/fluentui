import * as React from 'react';
import {
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
import { Stagger, Scale } from '@fluentui/react-motion-components-preview';
import {
  PeopleTeam20Regular,
  MoneyHand20Regular,
  ChartMultiple20Regular,
  Target20Regular,
  DataTrending20Regular,
  Warning20Regular,
  Checkmark20Regular,
  Clock20Regular,
} from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '1000px',
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
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  metricCard: {
    minHeight: '160px',
    cursor: 'pointer',
    transition: `transform ${tokens.durationFast} ${tokens.curveDecelerateMin}`,
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  cardContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%',
  },
  metricValue: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: '4px',
  },
  ctaButton: {
    minWidth: '120px',
  },
  metricLabel: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
  },
  changeIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: tokens.fontSizeBase200,
  },
  positive: {
    color: tokens.colorPaletteGreenForeground1,
  },
  negative: {
    color: tokens.colorPaletteRedForeground1,
  },
  neutral: {
    color: tokens.colorNeutralForeground2,
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground2,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

// Enhanced scale animation for dashboard tiles
const ScaleVariant = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationNormal,
});

// Sample dashboard data
const dashboardMetrics = [
  {
    title: 'Total Users',
    value: '12,485',
    change: '+8.2%',
    changeType: 'positive' as const,
    icon: <PeopleTeam20Regular />,
    status: 'success' as const,
  },
  {
    title: 'Revenue',
    value: '$47,392',
    change: '+12.5%',
    changeType: 'positive' as const,
    icon: <MoneyHand20Regular />,
    status: 'success' as const,
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-0.3%',
    changeType: 'negative' as const,
    icon: <Target20Regular />,
    status: 'warning' as const,
  },
  {
    title: 'Page Views',
    value: '89,432',
    change: '+15.8%',
    changeType: 'positive' as const,
    icon: <ChartMultiple20Regular />,
    status: 'success' as const,
  },
  {
    title: 'Growth Rate',
    value: '24.7%',
    change: '+5.2%',
    changeType: 'positive' as const,
    icon: <DataTrending20Regular />,
    status: 'success' as const,
  },
  {
    title: 'Response Time',
    value: '247ms',
    change: 'No change',
    changeType: 'neutral' as const,
    icon: <Clock20Regular />,
    status: 'info' as const,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return <Checkmark20Regular />;
    case 'warning':
      return <Warning20Regular />;
    default:
      return <Clock20Regular />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'success';
    case 'warning':
      return 'important';
    default:
      return 'informative';
  }
};

export const DashboardTiles = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
          {visible ? 'Hide' : 'Show'} Dashboard
        </Button>
      </div>

      <div className={classes.dashboardGrid}>
        <Stagger presence visible={visible} appear itemDelay={100} itemDuration={300}>
          {dashboardMetrics.map((metric, index) => (
            <ScaleVariant key={index}>
              <Card className={classes.metricCard}>
                <CardHeader
                  image={<div className={classes.iconContainer}>{metric.icon}</div>}
                  header={
                    <div className={classes.headerContent}>
                      <Text weight="semibold">{metric.title}</Text>
                      <Badge
                        appearance="tint"
                        color={getStatusColor(metric.status)}
                        icon={getStatusIcon(metric.status)}
                        size="small"
                      />
                    </div>
                  }
                />

                <div className={classes.cardContent}>
                  <Text className={classes.metricValue}>{metric.value}</Text>

                  <div className={`${classes.changeIndicator} ${classes[metric.changeType]}`}>
                    {metric.changeType === 'positive' && <DataTrending20Regular />}
                    {metric.changeType === 'negative' && (
                      <DataTrending20Regular style={{ transform: 'rotate(180deg)' }} />
                    )}
                    <Text size={200}>{metric.change} from last month</Text>
                  </div>
                </div>
              </Card>
            </ScaleVariant>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

DashboardTiles.parameters = {
  docs: {
    description: {
      story:
        'A business dashboard showing key metrics with staggered scale animations. ' +
        'Features Cards with status badges, icons, and trend indicators. ' +
        'Perfect for executive dashboards, analytics overviews, or KPI displays.',
    },
  },
};
