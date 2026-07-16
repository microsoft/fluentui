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
  type StateMotionAnimation,
  type StateMotionAnimationSnapshot,
  type StateMotionSkin,
  useStateMotion,
} from '@fluentui/react-components';
import { ReplayFilled } from '@fluentui/react-icons';
import * as React from 'react';

import { baseTransferEasing, InterruptibleScalar } from './createInterruptibleScalar';
import { cardMachine, type CardAnimation, type CardEvent, type CardState } from './StateMotionCardTransfer.machine';

type Placement = 'start' | 'middle' | 'end';
type CardRoute = { origin: Placement; destination: Placement };
type RunMode = 'idle' | 'replay' | 'destination';

const liftedDistance = `calc(-1 * ${tokens.spacingVerticalL})`;
const liftDuration = motionTokens.durationSlower * 2;
const transferDuration = motionTokens.durationUltraSlow * 2;
const dropDuration = motionTokens.durationUltraSlow;
const backEaseOut = 'cubic-bezier(.33, 2, .67, 1)';
const initialRoute: CardRoute = { origin: 'start', destination: 'middle' };

const getPlacementX = (placement: Placement): string => {
  if (placement === 'middle') {
    return `calc(100% + ${tokens.spacingHorizontalM})`;
  }
  if (placement === 'end') {
    return `calc(200% + 2 * ${tokens.spacingHorizontalM})`;
  }
  return '0';
};
const getNextPlacement = (placement: Placement): Placement =>
  placement === 'start' ? 'middle' : placement === 'middle' ? 'end' : 'start';
const getPlacementIndex = (placement: Placement): number =>
  placement === 'start' ? 0 : placement === 'middle' ? 1 : 2;
const advanceRoute = ({ destination }: CardRoute): CardRoute => ({
  origin: destination,
  destination: getNextPlacement(destination),
});

const getDroppedKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.origin)}) translateY(0) rotate(0deg) scale(1)`,
  boxShadow: tokens.shadow2,
});
const getLiftedKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.origin)}) translateY(${liftedDistance}) rotate(-1deg) scale(1.04)`,
  boxShadow: tokens.shadow16,
});
const getTransferredKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.destination)}) translateY(${liftedDistance}) rotate(1deg) scale(1.04)`,
  boxShadow: tokens.shadow16,
});

const createCardSkin = (transferring: StateMotionAnimation) =>
  ({
    states: {
      dropped: getDroppedKeyframe,
      lifting: getLiftedKeyframe,
      lifted: getLiftedKeyframe,
      transferring: getTransferredKeyframe,
      transferred: getTransferredKeyframe,
      dropping: getDroppedKeyframe,
    },
    animations: {
      lifting: {
        keyframes: [{ state: 'current' }, { offset: 0.28, boxShadow: tokens.shadow16 }, { state: 'target' }],
        duration: liftDuration,
        easing: motionTokens.curveDecelerateMid,
      },
      transferring,
      dropping: {
        keyframes: [{ state: 'current' }, { offset: 0.58, boxShadow: tokens.shadow2 }, { state: 'target' }],
        duration: dropDuration,
        easing: backEaseOut,
      },
    },
  } satisfies StateMotionSkin<CardState, CardAnimation, CardRoute>);

const graphSkin = {
  states: {
    dropped: { strokeDashoffset: 0 },
    lifting: { strokeDashoffset: 0 },
    lifted: { strokeDashoffset: 0 },
    transferring: { strokeDashoffset: 0 },
    transferred: { strokeDashoffset: 0 },
    dropping: { strokeDashoffset: 0 },
  },
  animations: {
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
} satisfies StateMotionSkin<CardState, CardAnimation>;

const sequence: CardEvent[] = [
  { type: 'LIFT' },
  { type: 'TRANSFER' },
  { type: 'DROP' },
  { type: 'LIFT' },
  { type: 'TRANSFER' },
  { type: 'DROP' },
];

const GraphMotion = createStateMotionComponent(cardMachine, graphSkin);

type GraphEdge = {
  event: Exclude<CardEvent['type'], 'RETARGET'>;
  animation: CardAnimation;
  path: string;
  labelX: number;
  labelY: number;
};

const graphEdges: GraphEdge[] = [
  {
    event: 'LIFT',
    animation: 'lifting',
    path: 'M 260 204 C 282 164 304 122 335 88',
    labelX: 300,
    labelY: 142,
  },
  {
    event: 'TRANSFER',
    animation: 'transferring',
    path: 'M 520 204 C 542 164 564 122 595 88',
    labelX: 560,
    labelY: 142,
  },
  {
    event: 'DROP',
    animation: 'dropping',
    path: 'M 725 228 C 590 318 205 318 75 88',
    labelX: 400,
    labelY: 304,
  },
];

const graphNodes: Array<{ id: CardState; x: number; y: number }> = [
  { id: 'dropped', x: 20, y: 40 },
  { id: 'lifting', x: 150, y: 180 },
  { id: 'lifted', x: 280, y: 40 },
  { id: 'transferring', x: 410, y: 180 },
  { id: 'transferred', x: 540, y: 40 },
  { id: 'dropping', x: 670, y: 180 },
];

const eventEdges = [
  { event: 'LIFT', path: 'M 130 64 C 144 106 150 145 176 180', labelX: 140, labelY: 124 },
  { event: 'TRANSFER', path: 'M 390 64 C 404 106 410 145 436 180', labelX: 400, labelY: 124 },
  { event: 'RETARGET', path: 'M 438 228 C 420 270 510 270 492 228', labelX: 465, labelY: 274 },
  { event: 'DROP', path: 'M 650 64 C 664 106 670 145 696 180', labelX: 660, labelY: 124 },
] as const;

const edgeByEvent = {
  ...Object.fromEntries(graphEdges.map(edge => [edge.event, edge])),
  RETARGET: graphEdges[1],
} as Record<CardEvent['type'], GraphEdge>;

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: tokens.spacingVerticalL,
    width: 'min(100%, 720px)',
  },
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
  },
  controls: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: tokens.spacingHorizontalXS,
  },
  stage: {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: tokens.spacingHorizontalM,
    alignItems: 'stretch',
  },
  slot: {
    minHeight: '164px',
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
    fontFamily: tokens.fontFamilyBase,
    cursor: 'default',
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
  slotInteractive: {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  card: {
    position: 'absolute',
    zIndex: 1,
    top: tokens.spacingVerticalL,
    left: 0,
    width: `calc((100% - 2 * ${tokens.spacingHorizontalM}) / 3)`,
    minWidth: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    paddingTop: tokens.spacingVerticalS,
    paddingRight: tokens.spacingHorizontalS,
    paddingBottom: tokens.spacingVerticalS,
    paddingLeft: tokens.spacingHorizontalS,
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
    lineHeight: tokens.lineHeightBase100,
    '& strong': {
      display: 'block',
      overflow: 'hidden',
      color: tokens.colorNeutralForeground1,
      fontSize: tokens.fontSizeBase100,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  graphViewport: {
    width: '100%',
    overflowX: 'auto',
  },
  graph: {
    display: 'block',
    width: '100%',
    minWidth: '680px',
    height: 'auto',
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  edge: {
    fill: 'none',
    stroke: tokens.colorNeutralStroke1,
    strokeWidth: tokens.strokeWidthThick,
    vectorEffect: 'non-scaling-stroke',
  },
  eventEdge: {
    strokeDasharray: `${tokens.spacingHorizontalXS} ${tokens.spacingHorizontalXS}`,
  },
  edgeProgress: {
    fill: 'none',
    stroke: tokens.colorBrandForeground1,
    strokeWidth: tokens.strokeWidthThicker,
    strokeLinecap: 'round',
    strokeDasharray: '1',
    strokeDashoffset: '1',
    opacity: 1,
    vectorEffect: 'non-scaling-stroke',
  },
  arrow: {
    fill: tokens.colorNeutralStroke1,
  },
  edgeLabel: {
    fill: tokens.colorNeutralForeground2,
    stroke: tokens.colorNeutralBackground2,
    strokeWidth: '6px',
    strokeLinejoin: 'round',
    paintOrder: 'stroke',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  node: {
    fill: tokens.colorNeutralBackground1,
    stroke: tokens.colorNeutralForeground3,
    strokeWidth: tokens.strokeWidthThick,
    vectorEffect: 'non-scaling-stroke',
  },
  nodeActive: {
    fill: tokens.colorBrandBackground,
    stroke: tokens.colorBrandForeground1,
  },
  nodeLabel: {
    fill: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
  },
  nodeLabelActive: {
    fill: tokens.colorNeutralForegroundOnBrand,
  },
});

export const StateMotionCardTransfer = (): JSXElement => {
  const styles = useStyles();
  const [controller] = React.useState(() => createStateMotionController(cardMachine));
  const snapshot = useStateMotion(controller);
  const [route, setRoute] = React.useState(initialRoute);
  const [runMode, setRunMode] = React.useState<RunMode>('idle');
  const [hoveredPlacement, setHoveredPlacement] = React.useState<Placement | undefined>(undefined);
  const [requestedDestination, setRequestedDestination] = React.useState<Placement | undefined>(undefined);
  const routeRef = React.useRef(initialRoute);
  const runModeRef = React.useRef<RunMode>('idle');
  const destinationRef = React.useRef<Placement | undefined>(undefined);
  const sequenceIndexRef = React.useRef(0);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const retargetKeyframeRef = React.useRef<Keyframe | undefined>(undefined);
  const [transferAnimation] = React.useState<StateMotionAnimation>(() => ({
    keyframes: [{ state: 'current' }, { state: 'target' }],
    duration: transferDuration,
    easing: baseTransferEasing.easing,
  }));
  const [transferMotion] = React.useState(
    () => new InterruptibleScalar(getPlacementIndex(initialRoute.origin), () => transferDuration),
  );
  const [CardMotion] = React.useState(() =>
    createStateMotionComponent<CardState, CardEvent, CardAnimation, CardRoute>(
      cardMachine,
      createCardSkin(transferAnimation),
    ),
  );

  const updateRunMode = React.useCallback((mode: RunMode) => {
    runModeRef.current = mode;
    setRunMode(mode);
  }, []);

  const updateDestination = React.useCallback((destination: Placement) => {
    const nextRoute = { ...routeRef.current, destination };
    routeRef.current = nextRoute;
    setRoute(nextRoute);
  }, []);

  const prepareTransfer = React.useCallback(
    (destination: Placement, interrupt: boolean) => {
      if (!interrupt) {
        transferMotion.reset(getPlacementIndex(routeRef.current.origin));
      }

      const segment = transferMotion.moveTo(getPlacementIndex(destination), globalThis.performance.now());
      transferAnimation.keyframes = interrupt
        ? [retargetKeyframeRef.current ?? { state: 'current' }, { state: 'target' }]
        : [{ state: 'current' }, { state: 'target' }];
      transferAnimation.duration = segment.duration;
      transferAnimation.easing = segment.easing.easing;
      retargetKeyframeRef.current = undefined;
    },
    [transferAnimation, transferMotion],
  );

  const sendEvent = React.useCallback(
    (event: CardEvent, fromAutomation = false) => {
      if (!fromAutomation) {
        destinationRef.current = undefined;
        setRequestedDestination(undefined);
        updateRunMode('idle');
      }
      if (event.type === 'TRANSFER') {
        prepareTransfer(routeRef.current.destination, false);
      } else if (event.type === 'RETARGET') {
        prepareTransfer(routeRef.current.destination, true);
      }
      if (
        event.type === 'DROP' &&
        (controller.getSnapshot().state === 'transferred' || controller.getSnapshot().state === 'transferring')
      ) {
        const nextRoute = advanceRoute(routeRef.current);
        routeRef.current = nextRoute;
        setRoute(nextRoute);
      }
      controller.send(event);
    },
    [controller, prepareTransfer, updateRunMode],
  );

  const startSequence = React.useCallback(() => {
    sequenceIndexRef.current = 0;
    destinationRef.current = undefined;
    setRequestedDestination(undefined);
    updateRunMode('replay');
    sendEvent(sequence[0], true);
  }, [sendEvent, updateRunMode]);

  const continueToDestination = React.useCallback(
    (destination: Placement) => {
      const state = controller.getSnapshot().state;
      if (state === 'dropped') {
        if (routeRef.current.origin === destination) {
          destinationRef.current = undefined;
          setRequestedDestination(undefined);
          updateRunMode('idle');
        } else {
          updateDestination(destination);
          sendEvent({ type: 'LIFT' }, true);
        }
      } else if (state === 'lifted') {
        updateDestination(destination);
        sendEvent({ type: 'TRANSFER' }, true);
      } else if (state === 'transferring' && routeRef.current.destination !== destination) {
        updateDestination(destination);
        sendEvent({ type: 'RETARGET' }, true);
      } else if (state === 'transferred') {
        sendEvent({ type: 'DROP' }, true);
      }
    },
    [controller, sendEvent, updateDestination, updateRunMode],
  );

  const transferToDestination = React.useCallback(
    (destination: Placement) => {
      destinationRef.current = destination;
      setRequestedDestination(destination);
      updateRunMode('destination');
      const state = controller.getSnapshot().state;
      if (state === 'transferring') {
        const element = cardRef.current;
        const computedStyle = element?.ownerDocument.defaultView?.getComputedStyle(element);
        if (computedStyle) {
          retargetKeyframeRef.current = {
            transform: computedStyle.transform,
            boxShadow: computedStyle.boxShadow,
          };
        }
      }
      if (state === 'dropped' || state === 'lifting' || state === 'lifted') {
        updateDestination(destination);
      }
      continueToDestination(destination);
    },
    [continueToDestination, controller, updateDestination, updateRunMode],
  );

  const handleMotionFinish = React.useCallback(
    (_ev: null, animation: StateMotionAnimationSnapshot<CardState, CardEvent>) => {
      if (animation.source === 'transferring') {
        transferMotion.complete();
      }
      if (runModeRef.current === 'destination' && destinationRef.current) {
        continueToDestination(destinationRef.current);
        return;
      }
      if (runModeRef.current !== 'replay') {
        return;
      }

      const nextIndex = sequenceIndexRef.current + 1;
      const followingEvent = sequence[nextIndex];
      if (followingEvent) {
        sequenceIndexRef.current = nextIndex;
        sendEvent(followingEvent, true);
      } else {
        updateRunMode('idle');
      }
    },
    [continueToDestination, sendEvent, transferMotion, updateRunMode],
  );

  const activeEdge = snapshot.animation ? edgeByEvent[snapshot.animation.event.type] : graphEdges[0];
  const activeNode = snapshot.state;
  const occupiedPlacement =
    activeNode === 'dropped' || activeNode === 'lifting' || activeNode === 'dropping' ? route.origin : undefined;
  const availableEvents = cardMachine.states[activeNode].on;
  const markerId = 'card-transfer-arrow';

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text weight="semibold">Card transfer</Text>
        <div className={styles.controls}>
          {(['LIFT', 'TRANSFER', 'DROP'] as const).map(eventType => (
            <Button
              key={eventType}
              disabled={!availableEvents?.[eventType]}
              onClick={() => sendEvent({ type: eventType })}
              size="small"
            >
              {eventType[0] + eventType.slice(1).toLowerCase()}
            </Button>
          ))}
          <Button icon={<ReplayFilled />} disabled={runMode === 'replay'} onClick={startSequence} size="small">
            Replay
          </Button>
        </div>
      </div>

      <div className={styles.stage}>
        {(['start', 'middle', 'end'] as const).map(placement => (
          <button
            key={placement}
            type="button"
            className={mergeClasses(
              styles.slot,
              occupiedPlacement === placement && styles.slotActive,
              occupiedPlacement !== placement && styles.slotInteractive,
            )}
            disabled={occupiedPlacement === placement}
            aria-label={occupiedPlacement === placement ? `${placement} origin` : `Transfer card to ${placement}`}
            onBlur={() => setHoveredPlacement(undefined)}
            onClick={() => transferToDestination(placement)}
            onFocus={() => setHoveredPlacement(placement)}
            onMouseEnter={() => setHoveredPlacement(placement)}
            onMouseLeave={() => setHoveredPlacement(undefined)}
          >
            <Caption1
              className={mergeClasses(styles.slotState, occupiedPlacement === placement && styles.slotStateActive)}
            >
              {occupiedPlacement === placement
                ? 'origin'
                : hoveredPlacement === placement || requestedDestination === placement
                ? 'destination'
                : 'available'}
            </Caption1>
          </button>
        ))}

        <CardMotion context={route} controller={controller} onMotionFinish={handleMotionFinish}>
          <Card ref={cardRef} className={styles.card} appearance="filled">
            <div className={styles.cardTitle}>
              <Text className={styles.cardText} weight="semibold">
                Motion spec
              </Text>
            </div>
            <div className={styles.cardMetadata} aria-live="polite">
              <Caption1 className={styles.cardMetadataRow}>
                State: <strong>{activeNode}</strong>
              </Caption1>
              <Caption1 className={styles.cardMetadataRow}>
                Animation: <strong>{snapshot.animation ? activeEdge.animation : 'none'}</strong>
              </Caption1>
            </div>
          </Card>
        </CardMotion>
      </div>

      <div className={styles.graphViewport}>
        <svg
          className={styles.graph}
          viewBox="0 0 810 330"
          role="img"
          aria-labelledby="card-transfer-title card-transfer-description"
        >
          <title id="card-transfer-title">Card transfer state graph</title>
          <desc id="card-transfer-description">
            Stable and active states connected by a forward cycle. The active animation fills as it progresses.
          </desc>
          <defs>
            <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path className={styles.arrow} d="M 0 0 L 8 4 L 0 8 Z" />
            </marker>
          </defs>

          {eventEdges.map(edge => (
            <React.Fragment key={edge.event}>
              <path className={styles.edge} d={edge.path} markerEnd={`url(#${markerId})`} />
              <text className={styles.edgeLabel} x={edge.labelX} y={edge.labelY} textAnchor="middle">
                {edge.event}
              </text>
            </React.Fragment>
          ))}

          {graphEdges.map(edge => (
            <React.Fragment key={edge.event}>
              <path
                className={mergeClasses(styles.edge, styles.eventEdge)}
                d={edge.path}
                markerEnd={`url(#${markerId})`}
              />
              <text className={styles.edgeLabel} x={edge.labelX} y={edge.labelY} textAnchor="middle">
                finish
              </text>
            </React.Fragment>
          ))}

          <GraphMotion completeAnimation={false} controller={controller}>
            <path
              className={styles.edgeProgress}
              d={activeEdge.path}
              pathLength={1}
              visibility={snapshot.animation ? 'visible' : 'hidden'}
              aria-hidden="true"
            />
          </GraphMotion>

          {graphNodes.map(node => (
            <React.Fragment key={node.id}>
              <rect
                className={mergeClasses(styles.node, activeNode === node.id && styles.nodeActive)}
                x={node.x}
                y={node.y}
                width="110"
                height="48"
                rx={tokens.borderRadiusMedium}
              />
              <text
                className={mergeClasses(styles.nodeLabel, activeNode === node.id && styles.nodeLabelActive)}
                x={node.x + 55}
                y={node.y + 24}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {node.id}
              </text>
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
};
