import * as React from 'react';
import {
  Field,
  makeStyles,
  tokens,
  Switch,
  PresenceComponentProps,
  Skeleton,
  SkeletonItem,
} from '@fluentui/react-components';
import {
  Blur,
  Collapse,
  CollapseDelayed,
  CollapseRelaxed,
  Scale,
  ScaleRelaxed,
  Slide,
  SlideRelaxed,
  PresenceStagger,
  Stagger,
  Hold,
  Series,
} from '@fluentui/react-motion-components-preview';
import { SlideUnder } from '../Experiments/SlideUnder';
import { Wipe } from './Wipe';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplate: `"controls ." "card card" / 1fr 1fr`,
    gap: '20px 10px',
  },
  card: {
    gridArea: 'card',
    padding: '10px',
    overflow: 'hidden',
    minHeight: '100vh',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'controls',

    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '10px',
  },
  field: {
    flex: 1,
  },
});

const useStyles = makeStyles({
  invertedWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  firstRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    gap: '10px',
    gridTemplateColumns: 'min-content 80%',
  },
  secondThirdRow: {
    alignItems: 'center',
    display: 'grid',
    paddingBottom: '10px',
    position: 'relative',
    gap: '10px',
    gridTemplateColumns: 'min-content 20% 20% 15% 15%',
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const ExperimentsStaggerSkeleton = (props: React.ComponentProps<typeof Collapse>) => {
  const classes = useClasses();
  const styles = useStyles();

  const [visible, setVisible] = React.useState<boolean>(false);

  const RowMotion = () => (
    <Slide.In>
      <div className={styles.firstRow}>
        <SkeletonItem shape="circle" size={24} />
        <SkeletonItem shape="rectangle" size={16} />
      </div>
    </Slide.In>
  );

  const SkeletonRowCustom = () => (
    <div className={styles.firstRow}>
      <SkeletonItem shape="circle" size={28} />
      <SkeletonItem shape="rectangle" size={20} />
    </div>
  );

  const ContentRow = ({
    index = 0,
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  }: { index?: number; text?: string } = {}) => (
    <div key={index} className={styles.firstRow}>
      <div style={{ width: '28px', height: '28px', backgroundColor: 'grey', borderRadius: '50%' }} />
      <div style={{ width: '100%', height: '28px', paddingTop: '5px' }}>{text}</div>
    </div>
  );

  const ContentRowPresence = ({ visible = false }: { visible?: boolean }) => (
    // <ScaleRelaxed visible={visible} duration={1000}>
    // <div>
    // <Blur visible={visible} enterDuration={700} radius="50px">
    <SlideUnder visible={visible} distance="-100%">
      <div className={styles.firstRow}>
        {visible ? <ContentRow /> : <div style={{ width: '100%', height: '28px' }} />}
      </div>
    </SlideUnder>
    // </Blur>
    // </div>
    // </ScaleRelaxed>
  );

  const SkeletonRowPresence = ({ visible = false }: { visible?: boolean }) => (
    // <ScaleRelaxed visible={visible} duration={1000}>
    // <div>
    // <Blur visible={visible} enterDuration={700} radius="50px">
    <SlideUnder visible={visible} distance="-100%">
      {visible ? (
        <div style={{ height: '36px' }}>
          <Series>
            <Hold duration={4000}>{SkeletonRowCustom()}</Hold>
            {/* <Blur.Out radius="10px">{skeletonRowCustom}</Blur.Out> */}
            <Wipe.In enterDuration={1000}>{ContentRow()}</Wipe.In>
          </Series>
        </div>
      ) : (
        <div style={{ width: '100%', height: '36px' }} />
      )}
    </SlideUnder>
    // </Blur>
    // </div>
    // </ScaleRelaxed>
  );

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <CollapseDelayed visible={visible} unmountOnExit animateOpacity={false}>
        <div className={classes.card}>
          {
            <Skeleton>
              {/* TODO: get exit stagger working  */}
              <PresenceStagger delay={90} mode={visible ? 'enter' : 'exit'}>
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
                <SkeletonRowPresence />
              </PresenceStagger>
            </Skeleton>
          }
        </div>
      </CollapseDelayed>
    </div>
  );
};

ExperimentsStaggerSkeleton.parameters = {
  docs: {
    description: {
      // story: description,
    },
  },
};
