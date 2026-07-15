import {
  Button,
  Caption1,
  Card,
  makeStyles,
  mergeClasses,
  motionTokens,
  Text,
  tokens,
  createStateMotionComponent,
  createStateMotionController,
  type JSXElement,
  type StateMotionMachineDefinition,
  type StateMotionSkin,
  useStateMotion,
} from '@fluentui/react-components';
import { DocumentRegular, ReplayFilled } from '@fluentui/react-icons';
import * as React from 'react';

type CardState = 'originRest' | 'originLifted' | 'destinationLifted' | 'destinationRest';
type CardEvent =
  | { type: 'LIFT_FROM_ORIGIN' }
  | { type: 'TRANSFER_TO_DESTINATION' }
  | { type: 'DROP_AT_DESTINATION' }
  | { type: 'LIFT_FROM_DESTINATION' }
  | { type: 'TRANSFER_TO_ORIGIN' }
  | { type: 'DROP_AT_ORIGIN' };
type CardTransition = 'lifting' | 'transferring' | 'dropping';

const travelDistance = `calc(100% + ${tokens.spacingHorizontalM})`;
const liftedDistance = `calc(-1 * ${tokens.spacingVerticalL})`;
const liftDuration = motionTokens.durationSlower * 2;
const transferDuration = motionTokens.durationUltraSlow * 4;
const dropDuration = motionTokens.durationUltraSlow * 2;

const cardMachine: StateMotionMachineDefinition<CardState, CardEvent, CardTransition> = {
  initialState: 'originRest',
  states: {
    originRest: {
      on: { LIFT_FROM_ORIGIN: { id: 'lifting', target: 'originLifted' } },
    },
    originLifted: {
      on: {
        TRANSFER_TO_DESTINATION: { id: 'transferring', target: 'destinationLifted' },
        DROP_AT_ORIGIN: { id: 'dropping', target: 'originRest' },
      },
    },
    destinationLifted: {
      on: {
        DROP_AT_DESTINATION: { id: 'dropping', target: 'destinationRest' },
        TRANSFER_TO_ORIGIN: { id: 'transferring', target: 'originLifted' },
      },
    },
    destinationRest: {
      on: { LIFT_FROM_DESTINATION: { id: 'lifting', target: 'destinationLifted' } },
    },
  },
};

const cardSkin = {
  states: {
    originRest: {
      transform: 'translateX(0) translateY(0) rotate(0deg) scale(1)',
      boxShadow: tokens.shadow2,
    },
    originLifted: {
      transform: `translateX(0) translateY(${liftedDistance}) rotate(-1deg) scale(1.04)`,
      boxShadow: tokens.shadow16,
    },
    destinationLifted: {
      transform: `translateX(${travelDistance}) translateY(${liftedDistance}) rotate(1deg) scale(1.04)`,
      boxShadow: tokens.shadow16,
    },
    destinationRest: {
      transform: `translateX(${travelDistance}) translateY(0) rotate(0deg) scale(1)`,
      boxShadow: tokens.shadow2,
    },
  },
  transitions: {
    lifting: {
      keyframes: [{ state: 'current' }, { offset: 0.28, boxShadow: tokens.shadow16 }, { state: 'target' }],
      duration: liftDuration,
      easing: motionTokens.curveDecelerateMid,
    },
    transferring: {
      keyframes: [{ state: 'current' }, { state: 'target' }],
      duration: transferDuration,
      easing: motionTokens.curveEasyEase,
    },
    dropping: {
      keyframes: [{ state: 'current' }, { offset: 0.58, boxShadow: tokens.shadow2 }, { state: 'target' }],
      duration: dropDuration,
      easing: motionTokens.curveDecelerateMid,
    },
  },
} satisfies StateMotionSkin<CardState, CardTransition>;

const graphSkin = {
  states: {
    originRest: { strokeDashoffset: 0 },
    originLifted: { strokeDashoffset: 0 },
    destinationLifted: { strokeDashoffset: 0 },
    destinationRest: { strokeDashoffset: 0 },
  },
  transitions: {
    lifting: {
      keyframes: [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      duration: liftDuration,
      easing: 'linear',
    },
    transferring: {
      keyframes: [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      duration: transferDuration,
      easing: 'linear',
    },
    dropping: {
      keyframes: [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
      duration: dropDuration,
      easing: 'linear',
    },
  },
} satisfies StateMotionSkin<CardState, CardTransition>;

const nextEvent: Partial<Record<CardEvent['type'], CardEvent>> = {
  LIFT_FROM_ORIGIN: { type: 'TRANSFER_TO_DESTINATION' },
  TRANSFER_TO_DESTINATION: { type: 'DROP_AT_DESTINATION' },
  DROP_AT_DESTINATION: { type: 'LIFT_FROM_DESTINATION' },
  LIFT_FROM_DESTINATION: { type: 'TRANSFER_TO_ORIGIN' },
  TRANSFER_TO_ORIGIN: { type: 'DROP_AT_ORIGIN' },
};

const durationByEvent: Record<CardEvent['type'], number> = {
  LIFT_FROM_ORIGIN: liftDuration,
  TRANSFER_TO_DESTINATION: transferDuration,
  DROP_AT_DESTINATION: dropDuration,
  LIFT_FROM_DESTINATION: liftDuration,
  TRANSFER_TO_ORIGIN: transferDuration,
  DROP_AT_ORIGIN: dropDuration,
};

const CardMotion = createStateMotionComponent(cardMachine, cardSkin);
const GraphMotion = createStateMotionComponent(cardMachine, graphSkin);

type GraphEdge = {
  event: CardEvent['type'];
  transition: CardTransition;
  path: string;
  labelX: number;
  labelY: number;
};

const graphEdges: GraphEdge[] = [
  {
    event: 'LIFT_FROM_ORIGIN',
    transition: 'lifting',
    path: 'M 170 116 C 192 78 218 78 240 116',
    labelX: 205,
    labelY: 70,
  },
  {
    event: 'DROP_AT_ORIGIN',
    transition: 'dropping',
    path: 'M 240 160 C 218 198 192 198 170 160',
    labelX: 205,
    labelY: 214,
  },
  {
    event: 'TRANSFER_TO_DESTINATION',
    transition: 'transferring',
    path: 'M 370 116 C 392 78 418 78 440 116',
    labelX: 405,
    labelY: 70,
  },
  {
    event: 'TRANSFER_TO_ORIGIN',
    transition: 'transferring',
    path: 'M 440 160 C 418 198 392 198 370 160',
    labelX: 405,
    labelY: 214,
  },
  {
    event: 'DROP_AT_DESTINATION',
    transition: 'dropping',
    path: 'M 570 116 C 592 78 618 78 640 116',
    labelX: 605,
    labelY: 70,
  },
  {
    event: 'LIFT_FROM_DESTINATION',
    transition: 'lifting',
    path: 'M 640 160 C 618 198 592 198 570 160',
    labelX: 605,
    labelY: 214,
  },
];

const graphNodes: Array<{ id: CardState; x: number }> = [
  { id: 'originRest', x: 20 },
  { id: 'originLifted', x: 240 },
  { id: 'destinationLifted', x: 440 },
  { id: 'destinationRest', x: 640 },
];

const stageStates: CardState[][] = [
  ['originRest', 'originLifted'],
  ['destinationLifted', 'destinationRest'],
];

const edgeByEvent = Object.fromEntries(graphEdges.map(edge => [edge.event, edge])) as Record<
  CardEvent['type'],
  GraphEdge
>;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tokens.spacingVerticalL,
    width: 'min(100%, 560px)',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  stage: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: tokens.spacingHorizontalM,
    alignItems: 'stretch',
  },
  slot: {
    minHeight: '132px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'end',
    gap: tokens.spacingVerticalXXS,
    paddingTop: tokens.spacingVerticalM,
    paddingRight: tokens.spacingHorizontalM,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    borderTopWidth: tokens.strokeWidthThin,
    borderRightWidth: tokens.strokeWidthThin,
    borderBottomWidth: tokens.strokeWidthThin,
    borderLeftWidth: tokens.strokeWidthThin,
    borderTopStyle: 'dashed',
    borderRightStyle: 'dashed',
    borderBottomStyle: 'dashed',
    borderLeftStyle: 'dashed',
    borderTopColor: tokens.colorNeutralStroke1,
    borderRightColor: tokens.colorNeutralStroke1,
    borderBottomColor: tokens.colorNeutralStroke1,
    borderLeftColor: tokens.colorNeutralStroke1,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground3,
    transitionProperty: 'background-color, border-color, color',
    transitionDuration: `${motionTokens.durationFast}ms`,
  },
  slotState: {
    color: tokens.colorNeutralForeground3,
  },
  slotStateActive: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  slotActive: {
    borderTopColor: tokens.colorBrandStroke1,
    borderRightColor: tokens.colorBrandStroke1,
    borderBottomColor: tokens.colorBrandStroke1,
    borderLeftColor: tokens.colorBrandStroke1,
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground1,
  },
  card: {
    position: 'absolute',
    zIndex: 1,
    top: tokens.spacingVerticalL,
    left: 0,
    width: `calc((100% - ${tokens.spacingHorizontalM}) / 2)`,
    minWidth: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    pointerEvents: 'none',
    willChange: 'transform',
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  cardText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardMetadata: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    minWidth: 0,
  },
  cardMetadataRow: {
    color: tokens.colorNeutralForeground3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  graph: {
    display: 'block',
    width: '100%',
    height: 'auto',
    overflow: 'visible',
  },
  edge: {
    fill: 'none',
    stroke: tokens.colorNeutralStroke1,
    strokeWidth: tokens.strokeWidthThin,
    vectorEffect: 'non-scaling-stroke',
  },
  edgeProgress: {
    fill: 'none',
    stroke: tokens.colorBrandStroke1,
    strokeWidth: tokens.strokeWidthThick,
    strokeLinecap: 'round',
    strokeDasharray: '1',
    strokeDashoffset: '1',
    vectorEffect: 'non-scaling-stroke',
  },
  arrow: {
    fill: tokens.colorNeutralStroke1,
  },
  edgeLabel: {
    fill: tokens.colorNeutralForeground3,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
  },
  node: {
    fill: tokens.colorNeutralBackground1,
    stroke: tokens.colorNeutralStroke1,
    strokeWidth: tokens.strokeWidthThin,
    vectorEffect: 'non-scaling-stroke',
  },
  nodeActive: {
    fill: tokens.colorBrandBackground2,
    stroke: tokens.colorBrandStroke1,
  },
  nodeLabel: {
    fill: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const StateMotionCardTransfer = (): JSXElement => {
  const styles = useStyles();
  const [controller] = React.useState(() => createStateMotionController(cardMachine));
  const snapshot = useStateMotion(controller);
  const [isRunning, setIsRunning] = React.useState(false);

  const startSequence = React.useCallback(() => {
    setIsRunning(true);
    controller.send({ type: 'LIFT_FROM_ORIGIN' });
  }, [controller]);

  React.useEffect(() => {
    startSequence();
  }, [startSequence]);

  React.useEffect(() => {
    const transition = snapshot.transition;
    if (!isRunning || !transition) {
      return;
    }

    const timeout = globalThis.setTimeout(() => {
      const followingEvent = nextEvent[transition.event.type];
      if (followingEvent) {
        controller.send(followingEvent);
      } else {
        setIsRunning(false);
      }
    }, durationByEvent[transition.event.type]);

    return () => globalThis.clearTimeout(timeout);
  }, [controller, isRunning, snapshot.transition]);

  const activeEdge = snapshot.transition ? edgeByEvent[snapshot.transition.event.type] : graphEdges[0];
  const activeNode = snapshot.state;
  const markerId = 'card-transfer-arrow';

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text weight="semibold">Card transfer</Text>
        <Button icon={<ReplayFilled />} disabled={isRunning} onClick={startSequence}>
          Replay
        </Button>
      </div>

      <div className={styles.stage}>
        {stageStates.map(states => (
          <div
            key={states.join('-')}
            className={mergeClasses(styles.slot, states.includes(activeNode) && styles.slotActive)}
          >
            {states.map(state => (
              <Caption1
                key={state}
                className={mergeClasses(styles.slotState, activeNode === state && styles.slotStateActive)}
              >
                {state}
              </Caption1>
            ))}
          </div>
        ))}

        <CardMotion controller={controller}>
          <Card className={styles.card} appearance="filled">
            <div className={styles.cardTitle}>
              <DocumentRegular aria-hidden="true" />
              <Text className={styles.cardText} weight="semibold">
                Motion spec
              </Text>
            </div>
            <div className={styles.cardMetadata} aria-live="polite">
              <Caption1 className={styles.cardMetadataRow}>
                State: <strong>{activeNode}</strong>
              </Caption1>
              <Caption1 className={styles.cardMetadataRow}>
                Transition: <strong>{isRunning ? activeEdge.transition : 'none'}</strong>
              </Caption1>
            </div>
          </Card>
        </CardMotion>
      </div>

      <svg
        className={styles.graph}
        viewBox="0 0 810 250"
        role="img"
        aria-labelledby="card-transfer-title card-transfer-description"
      >
        <title id="card-transfer-title">Card transfer state graph</title>
        <desc id="card-transfer-description">
          Four states connected by six named transitions. The active transition fills as its animation progresses.
        </desc>
        <defs>
          <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path className={styles.arrow} d="M 0 0 L 8 4 L 0 8 Z" />
          </marker>
        </defs>

        {graphEdges.map(edge => (
          <React.Fragment key={edge.event}>
            <path className={styles.edge} d={edge.path} markerEnd={`url(#${markerId})`} />
            <text className={styles.edgeLabel} x={edge.labelX} y={edge.labelY} textAnchor="middle">
              {edge.transition}
            </text>
          </React.Fragment>
        ))}

        <GraphMotion controller={controller}>
          <path
            className={styles.edgeProgress}
            d={activeEdge.path}
            pathLength={1}
            visibility={isRunning ? 'visible' : 'hidden'}
            aria-hidden="true"
          />
        </GraphMotion>

        {graphNodes.map(node => (
          <React.Fragment key={node.id}>
            <rect
              className={mergeClasses(styles.node, activeNode === node.id && styles.nodeActive)}
              x={node.x}
              y="110"
              width="150"
              height="56"
              rx={tokens.borderRadiusMedium}
            />
            <text className={styles.nodeLabel} x={node.x + 75} y="138" textAnchor="middle" dominantBaseline="middle">
              {node.id}
            </text>
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};
