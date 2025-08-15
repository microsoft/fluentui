import * as React from 'react';
import {
  Button,
  Card,
  Text,
  makeStyles,
  tokens,
  Field,
  createPresenceComponentVariant,
  motionTokens,
  Badge,
  Slider,
} from '@fluentui/react-components';
import { Stagger, Fade, Scale, Slide, Collapse, Blur, Rotate } from '@fluentui/react-motion-components-preview';
import {
  Play20Regular,
  Pause20Regular,
  ArrowReset20Regular,
  Timer20Regular,
  Flash20Regular,
} from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '24px',
    maxWidth: '1000px',
  },
  masterControls: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
    padding: '20px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorBrandForeground2}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorBrandBackground2,
  },
  controlGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  animationPreview: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    minHeight: '400px',
  },
  previewCard: {
    padding: '16px',
    textAlign: 'center',
    transition: `all ${tokens.durationFast} ${tokens.curveDecelerateMin}`,
    cursor: 'pointer',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralForeground3}`,
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  motionSelector: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px',
  },
  motionBadge: {
    cursor: 'pointer',
    transition: `all ${tokens.durationFast}`,
  },
  activeBadge: {
    transform: 'scale(1.1)',
  },
  timeline: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: '16px',
  },
  timelineProgress: {
    flex: 1,
    height: '4px',
    backgroundColor: tokens.colorNeutralBackground4,
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: '2px',
    transition: `width ${tokens.durationNormal}`,
  },
  configPanel: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralForeground3}`,
  },
  statsPanel: {
    display: 'flex',
    gap: '24px',
    padding: '16px',
    backgroundColor: tokens.colorSubtleBackground,
    borderRadius: tokens.borderRadiusMedium,
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  ctaButton: {
    minWidth: '120px',
  },
});

type MotionType = 'Fade' | 'Scale' | 'Slide' | 'Collapse' | 'Blur' | 'Rotate';

interface MotionConfig {
  type: MotionType;
  duration: number;
  delay: number;
  enabled: boolean;
}

// Create variants for each motion type
const FadeVariant = createPresenceComponentVariant(Fade, {
  duration: motionTokens.durationSlow,
});

const ScaleVariant = createPresenceComponentVariant(Scale, {
  duration: motionTokens.durationSlow,
});

const SlideVariant = createPresenceComponentVariant(Slide, {
  duration: motionTokens.durationSlow,
});

const CollapseVariant = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlow,
});

const BlurVariant = createPresenceComponentVariant(Blur, {
  duration: motionTokens.durationSlow,
});

const RotateVariant = createPresenceComponentVariant(Rotate, {
  duration: motionTokens.durationSlow,
});

const motionComponents = {
  Fade: FadeVariant,
  Scale: ScaleVariant,
  Slide: SlideVariant,
  Collapse: CollapseVariant,
  Blur: BlurVariant,
  Rotate: RotateVariant,
};

export const AdvancedConfiguration = () => {
  const classes = useClasses();

  // Stagger configuration
  const [visible, setVisible] = React.useState<boolean>(false);
  const [itemDelay, setItemDelay] = React.useState<number>(100);
  const [itemDuration, setItemDuration] = React.useState<number>(400);
  const [selectedMotion, setSelectedMotion] = React.useState<MotionType>('Fade');

  // Animation state
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [progress, setProgress] = React.useState<number>(0);
  const [completedItems, setCompletedItems] = React.useState<number>(0);

  // Motion configurations
  const [motionConfigs, setMotionConfigs] = React.useState<MotionConfig[]>([
    { type: 'Fade', duration: 400, delay: 100, enabled: true },
    { type: 'Scale', duration: 350, delay: 120, enabled: false },
    { type: 'Slide', duration: 450, delay: 80, enabled: false },
    { type: 'Collapse', duration: 500, delay: 150, enabled: false },
    { type: 'Blur', duration: 300, delay: 90, enabled: false },
    { type: 'Rotate', duration: 600, delay: 110, enabled: false },
  ]);

  // Sample demo items
  const demoItems = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `Demo Item ${i + 1}`,
    description: `Sample content for item ${i + 1}`,
    category: ['Feature', 'Content', 'Media', 'Tool'][i % 4],
  }));

  // Calculate total animation time
  const totalDuration = (demoItems.length - 1) * itemDelay + itemDuration;

  React.useEffect(() => {
    if (isPlaying && visible) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsPlaying(false);
            setCompletedItems(demoItems.length);
            return 100;
          }
          setCompletedItems(Math.floor((newProgress / 100) * demoItems.length));
          return newProgress;
        });
      }, totalDuration / 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying, visible, totalDuration, demoItems.length]);

  const handlePlay = () => {
    setProgress(0);
    setCompletedItems(0);
    setVisible(true);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setVisible(false);
    setIsPlaying(false);
    setProgress(0);
    setCompletedItems(0);
  };

  const toggleMotionConfig = (type: MotionType) => {
    setMotionConfigs(configs =>
      configs.map(config => ({
        ...config,
        enabled: config.type === type ? !config.enabled : config.enabled,
      })),
    );
    setSelectedMotion(type);
  };

  const updateMotionConfig = (type: MotionType, field: keyof MotionConfig, value: number) => {
    setMotionConfigs(configs => configs.map(config => (config.type === type ? { ...config, [field]: value } : config)));
  };

  const SelectedMotionComponent = motionComponents[selectedMotion];

  return (
    <div className={classes.container}>
      {/* Master Controls */}
      <div className={classes.masterControls}>
        <div className={classes.controlGroup}>
          <Text size={400} weight="semibold">
            Animation Control
          </Text>
          <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
            {visible ? 'Hide' : 'Show'} Animation
          </Button>
        </div>

        <div className={classes.controlGroup}>
          <Text size={400} weight="semibold">
            Timing Configuration
          </Text>
          <Field label={`Item Delay: ${itemDelay}ms`}>
            <Slider value={itemDelay} onChange={(e, data) => setItemDelay(data.value)} min={50} max={500} step={10} />
          </Field>
          <Field label={`Item Duration: ${itemDuration}ms`}>
            <Slider
              value={itemDuration}
              onChange={(e, data) => setItemDuration(data.value)}
              min={200}
              max={1000}
              step={50}
            />
          </Field>
        </div>

        <div className={classes.controlGroup}>
          <Text size={400} weight="semibold">
            Playback Controls
          </Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button appearance="primary" icon={<Play20Regular />} onClick={handlePlay} disabled={isPlaying}>
              Play
            </Button>
            <Button
              appearance="outline"
              icon={<Pause20Regular />}
              onClick={() => setIsPlaying(false)}
              disabled={!isPlaying}
            >
              Pause
            </Button>
            <Button appearance="outline" icon={<ArrowReset20Regular />} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Motion Type Selector */}
      <div>
        <Text size={400} weight="semibold" style={{ marginBottom: '12px' }}>
          Motion Type Selection
        </Text>
        <div className={classes.motionSelector}>
          {motionConfigs.map(config => (
            <Badge
              key={config.type}
              appearance={config.enabled ? 'filled' : 'outline'}
              color={config.enabled ? 'brand' : 'subtle'}
              className={`${classes.motionBadge} ${config.enabled ? classes.activeBadge : ''}`}
              onClick={() => toggleMotionConfig(config.type)}
            >
              {config.type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Configuration Panel */}
      <div className={classes.configPanel}>
        {motionConfigs
          .filter(config => config.enabled)
          .map(config => (
            <div key={config.type} className={classes.controlGroup}>
              <Text size={300} weight="semibold">
                {config.type} Settings
              </Text>
              <Field label={`Duration: ${config.duration}ms`}>
                <Slider
                  value={config.duration}
                  onChange={(e, data) => updateMotionConfig(config.type, 'duration', data.value)}
                  min={200}
                  max={1000}
                  step={50}
                />
              </Field>
              <Field label={`Delay: ${config.delay}ms`}>
                <Slider
                  value={config.delay}
                  onChange={(e, data) => updateMotionConfig(config.type, 'delay', data.value)}
                  min={50}
                  max={300}
                  step={10}
                />
              </Field>
            </div>
          ))}
      </div>

      {/* Animation Timeline */}
      <div className={classes.timeline}>
        <Timer20Regular />
        <Text size={300}>Progress:</Text>
        <div className={classes.timelineProgress}>
          <div className={classes.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <Text size={300}>{Math.round(progress)}%</Text>
      </div>

      {/* Statistics Panel */}
      <div className={classes.statsPanel}>
        <div className={classes.statItem}>
          <div className={classes.statValue}>{totalDuration}ms</div>
          <div className={classes.statLabel}>Total Duration</div>
        </div>
        <div className={classes.statItem}>
          <div className={classes.statValue}>
            {completedItems}/{demoItems.length}
          </div>
          <div className={classes.statLabel}>Items Completed</div>
        </div>
        <div className={classes.statItem}>
          <div className={classes.statValue}>{motionConfigs.filter(c => c.enabled).length}</div>
          <div className={classes.statLabel}>Active Motions</div>
        </div>
        <div className={classes.statItem}>
          <div className={classes.statValue}>{itemDelay}ms</div>
          <div className={classes.statLabel}>Stagger Delay</div>
        </div>
      </div>

      {/* Animation Preview */}
      <div className={classes.animationPreview}>
        <Stagger visible={visible}  itemDelay={itemDelay} itemDuration={itemDuration}>
          {demoItems.map(item => (
            <SelectedMotionComponent key={item.id}>
              <Card className={classes.previewCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Flash20Regular />
                  <Text size={300} weight="semibold">
                    {item.title}
                  </Text>
                </div>
                <Text size={200} style={{ color: tokens.colorNeutralForeground2, marginBottom: '8px' }}>
                  {item.description}
                </Text>
                <Badge appearance="outline" color="informative" size="small">
                  {item.category}
                </Badge>
              </Card>
            </SelectedMotionComponent>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

AdvancedConfiguration.parameters = {
  docs: {
    description: {
      story:
        'An advanced configuration interface showcasing all Stagger capabilities with real-time controls. ' +
        'Features motion type selection, timing adjustments, playback controls, progress tracking, and statistics. ' +
        'Perfect for animation tools, development environments, or demonstration purposes.',
    },
  },
};
