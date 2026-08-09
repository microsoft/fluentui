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

import { applyDragPresentation, createDropAnimation, releaseDragPresentation } from './createDragMotion';
import { estimateVelocity, smoothVelocity, type PositionSample } from './createDragVelocity';
import { baseTransferEasing, InterruptibleScalar } from './createInterruptibleScalar';
import { cardMachine, type CardAnimation, type CardEvent, type CardState } from './StateMotionCardTransfer.machine';

type Placement = 'topStart' | 'topMiddle' | 'topEnd' | 'bottomStart' | 'bottomMiddle' | 'bottomEnd';
type CardRoute = { origin: Placement; destination: Placement };
type RunMode = 'idle' | 'replay' | 'destination';
type Point = { x: number; y: number };
type DragSession = {
  pointerId: number;
  origin: Placement;
  startPointer: Point;
  latestPointer: Point;
  startCardCenter: Point;
  slotCenters: Record<Placement, Point>;
  samples: PositionSample[];
  smoothedVelocityX: number;
  previousFrameTime: number;
  frameId: number;
  targetWindow: Window;
};

const liftedDistance = `calc(-1 * ${tokens.spacingVerticalL})`;
const liftDuration = motionTokens.durationSlower * 2;
const transferDuration = motionTokens.durationUltraSlow * 2;
const dropDuration = motionTokens.durationUltraSlow;
const initialRoute: CardRoute = { origin: 'topStart', destination: 'topMiddle' };
const placements = ['topStart', 'topMiddle', 'topEnd', 'bottomStart', 'bottomMiddle', 'bottomEnd'] as const;
const placementLabels: Record<Placement, string> = {
  topStart: 'top start',
  topMiddle: 'top middle',
  topEnd: 'top end',
  bottomStart: 'bottom start',
  bottomMiddle: 'bottom middle',
  bottomEnd: 'bottom end',
};
const velocitySampleWindow = 80;
const velocitySmoothingTime = 40;
const rotationPerVelocity = 0.006;
const maximumRotation = 7;
const showOnlyDraggingFlowGraph = true;

const getPlacementX = (placement: Placement): string => {
  if (placement === 'topMiddle' || placement === 'bottomMiddle') {
    return `calc(100% + ${tokens.spacingHorizontalM})`;
  }
  if (placement === 'topEnd' || placement === 'bottomEnd') {
    return `calc(200% + 2 * ${tokens.spacingHorizontalM})`;
  }
  return '0';
};
const getPlacementY = (placement: Placement): string =>
  placement.startsWith('bottom') ? 'var(--card-transfer-row-offset, 0px)' : '0px';
const getNextPlacement = (placement: Placement): Placement =>
  placements[(placements.indexOf(placement) + 1) % placements.length];
const getPlacementIndex = (placement: Placement): number => placements.indexOf(placement);
const advanceRoute = ({ destination }: CardRoute): CardRoute => ({
  origin: destination,
  destination: getNextPlacement(destination),
});
const getClosestPlacement = (session: DragSession): Placement => {
  const cardCenter = {
    x: session.startCardCenter.x + session.latestPointer.x - session.startPointer.x,
    y: session.startCardCenter.y + session.latestPointer.y - session.startPointer.y,
  };
  let closestPlacement: Placement = session.origin;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (const placement of placements) {
    const center = session.slotCenters[placement];
    const distance = Math.hypot(cardCenter.x - center.x, cardCenter.y - center.y);
    if (distance < closestDistance) {
      closestPlacement = placement;
      closestDistance = distance;
    }
  }

  return closestPlacement;
};

const getDroppedKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.origin)}) translateY(${getPlacementY(
    context.origin,
  )}) rotate(0deg) scale(1)`,
  translate: '0px 0px',
  rotate: '0deg',
  boxShadow: tokens.shadow2,
});
const getLiftedKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.origin)}) translateY(${getPlacementY(
    context.origin,
  )}) translateY(${liftedDistance}) rotate(-1deg) scale(1.04)`,
  boxShadow: tokens.shadow16,
});
const getTransferredKeyframe = ({ context }: { context: CardRoute }): Keyframe => ({
  transform: `translateX(${getPlacementX(context.destination)}) translateY(${getPlacementY(
    context.destination,
  )}) translateY(${liftedDistance}) rotate(1deg) scale(1.04)`,
  boxShadow: tokens.shadow16,
});
const getDropSettledTransform = ({ context }: { context: CardRoute }): string =>
  `translateX(${getPlacementX(context.origin)}) translateY(${getPlacementY(context.origin)}) rotate(-1deg) scale(1.04)`;

const createCardSkin = (transferring: StateMotionAnimation, dropping: StateMotionAnimation) =>
  ({
    states: {
      dropped: getDroppedKeyframe,
      lifting: getLiftedKeyframe,
      lifted: getLiftedKeyframe,
      transferring: getTransferredKeyframe,
      transferred: getTransferredKeyframe,
      pickingUp: getLiftedKeyframe,
      dragging: getLiftedKeyframe,
      dropping: getDroppedKeyframe,
    },
    animations: {
      lifting: {
        keyframes: [{ state: 'current' }, { offset: 0.28, boxShadow: tokens.shadow16 }, { state: 'target' }],
        duration: liftDuration,
        easing: motionTokens.curveDecelerateMid,
      },
      transferring,
      dropping,
    },
  } satisfies StateMotionSkin<CardState, CardAnimation, CardRoute>);

const graphSkin = {
  states: {
    dropped: { strokeDashoffset: 0 },
    lifting: { strokeDashoffset: 0 },
    lifted: { strokeDashoffset: 0 },
    transferring: { strokeDashoffset: 0 },
    transferred: { strokeDashoffset: 0 },
    pickingUp: { strokeDashoffset: 0 },
    dragging: { strokeDashoffset: 0 },
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
  event: 'LIFT' | 'TRANSFER' | 'DROP' | 'GRAB';
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
    path: 'M 725 180 C 735 4 150 4 75 40',
    labelX: 400,
    labelY: 20,
  },
  {
    event: 'GRAB',
    animation: 'lifting',
    path: 'M 130 284 C 145 284 160 284 175 284',
    labelX: 152,
    labelY: 274,
  },
];

const graphNodes: Array<{ id: CardState; x: number; y: number }> = [
  { id: 'dropped', x: 20, y: 40 },
  { id: 'lifting', x: 150, y: 180 },
  { id: 'lifted', x: 280, y: 40 },
  { id: 'transferring', x: 410, y: 180 },
  { id: 'transferred', x: 540, y: 40 },
  { id: 'dropping', x: 670, y: 180 },
  { id: 'pickingUp', x: 20, y: 260 },
  { id: 'dragging', x: 175, y: 260 },
];

const eventEdges = [
  { event: 'LIFT', path: 'M 130 64 C 144 106 150 145 176 180', labelX: 140, labelY: 124 },
  { event: 'TRANSFER', path: 'M 390 64 C 404 106 410 145 436 180', labelX: 400, labelY: 124 },
  { event: 'RETARGET', path: 'M 438 228 C 420 270 510 270 492 228', labelX: 465, labelY: 274 },
  { event: 'DROP', path: 'M 650 64 C 664 106 670 145 696 180', labelX: 660, labelY: 124 },
  { event: 'GRAB', path: 'M 75 88 C 45 140 45 208 75 260', labelX: 48, labelY: 176 },
  { event: 'RELEASE / CANCEL', path: 'M 285 284 C 410 360 610 350 725 228', labelX: 485, labelY: 348 },
] as const;

const dragGraphNodes: Array<{ id: CardState; x: number; y: number }> = [
  { id: 'dropped', x: 60, y: 40 },
  { id: 'pickingUp', x: 470, y: 40 },
  { id: 'dragging', x: 470, y: 212 },
  { id: 'dropping', x: 60, y: 212 },
];

const dragEventEdges = [
  { event: 'GRAB', path: 'M 170 64 C 270 64 370 64 470 64', labelX: 320, labelY: 52 },
  { event: 'RELEASE / CANCEL', path: 'M 470 236 C 370 236 270 236 170 236', labelX: 320, labelY: 264 },
] as const;

const dragGraphEdges: GraphEdge[] = [
  {
    event: 'GRAB',
    animation: 'lifting',
    path: 'M 525 88 C 525 129 525 171 525 212',
    labelX: 554,
    labelY: 153,
  },
  {
    event: 'DROP',
    animation: 'dropping',
    path: 'M 115 212 C 115 171 115 129 115 88',
    labelX: 86,
    labelY: 153,
  },
];

const visibleGraphNodes = showOnlyDraggingFlowGraph ? dragGraphNodes : graphNodes;
const visibleEventEdges = showOnlyDraggingFlowGraph ? dragEventEdges : eventEdges;
const visibleGraphEdges = showOnlyDraggingFlowGraph ? dragGraphEdges : graphEdges;
const graphViewBox = showOnlyDraggingFlowGraph ? '0 0 640 300' : '0 0 810 390';

const edgeByEvent: Record<CardEvent['type'], GraphEdge> = {
  LIFT: graphEdges[0],
  TRANSFER: graphEdges[1],
  RETARGET: graphEdges[1],
  DROP: graphEdges[2],
  GRAB: graphEdges[3],
  RELEASE: graphEdges[2],
  CANCEL: graphEdges[2],
};

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
  slotStateDestination: {
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
  slotDestination: {
    backgroundColor: tokens.colorBrandBackground2,
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
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none',
    willChange: 'transform, translate, rotate, box-shadow',
  },
  cardDragging: {
    cursor: 'grabbing',
    userSelect: 'none',
  },
  cardTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  cardSubtitle: {
    overflow: 'hidden',
    color: tokens.colorNeutralForeground3,
    lineHeight: tokens.lineHeightBase100,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  const stageRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const slotRefs = React.useRef<Partial<Record<Placement, HTMLButtonElement>>>({});
  const dragSessionRef = React.useRef<DragSession | undefined>(undefined);
  const dragDestinationRef = React.useRef<Placement | undefined>(undefined);
  const retargetKeyframeRef = React.useRef<Keyframe | undefined>(undefined);
  const [transferAnimation] = React.useState<StateMotionAnimation>(() => ({
    keyframes: [{ state: 'current' }, { state: 'target' }],
    duration: transferDuration,
    easing: baseTransferEasing.easing,
  }));
  const [transferMotion] = React.useState(
    () => new InterruptibleScalar(getPlacementIndex(initialRoute.origin), () => transferDuration),
  );
  const [dropAnimation] = React.useState<StateMotionAnimation>(() =>
    createDropAnimation(
      {},
      {
        destinationTransform: getDropSettledTransform({ context: initialRoute }),
        liftedShadow: tokens.shadow16,
        duration: dropDuration,
        settleOffset: 0.6,
        settleEasing: motionTokens.curveDecelerateMid,
      },
    ),
  );
  const [CardMotion] = React.useState(() =>
    createStateMotionComponent<CardState, CardEvent, CardAnimation, CardRoute>(
      cardMachine,
      createCardSkin(transferAnimation, dropAnimation),
    ),
  );

  const updateRowOffset = React.useCallback(() => {
    const motionCard = cardRef.current;
    const topSlot = slotRefs.current.topStart;
    const bottomSlot = slotRefs.current.bottomStart;
    if (motionCard && topSlot && bottomSlot) {
      motionCard.style.setProperty('--card-transfer-row-offset', `${bottomSlot.offsetTop - topSlot.offsetTop}px`);
    }
  }, []);

  React.useEffect(() => {
    const stage = stageRef.current;
    const targetWindow = stage?.ownerDocument.defaultView;
    if (!stage || !targetWindow) {
      return;
    }

    updateRowOffset();
    const resizeObserver = new targetWindow.ResizeObserver(updateRowOffset);
    resizeObserver.observe(stage);
    return () => resizeObserver.disconnect();
  }, [updateRowOffset]);

  React.useEffect(
    () => () => {
      const session = dragSessionRef.current;
      if (session) {
        session.targetWindow.cancelAnimationFrame(session.frameId);
      }
    },
    [],
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

  const prepareDrop = React.useCallback(
    (nextRoute: CardRoute, targetWindow?: Window) => {
      const card = cardRef.current;
      const view = targetWindow ?? card?.ownerDocument.defaultView;
      if (!card || !view) {
        return;
      }

      const computedStyle = view.getComputedStyle(card);
      const nextAnimation = createDropAnimation(
        {
          transform: computedStyle.transform,
          translate: computedStyle.translate,
          rotate: computedStyle.rotate,
          boxShadow: computedStyle.boxShadow,
        },
        {
          destinationTransform: getDropSettledTransform({ context: nextRoute }),
          liftedShadow: tokens.shadow16,
          duration: dropDuration,
          settleOffset: 0.6,
          settleEasing: motionTokens.curveDecelerateMid,
        },
      );
      dropAnimation.keyframes = nextAnimation.keyframes;
      dropAnimation.duration = nextAnimation.duration;
      dropAnimation.easing = nextAnimation.easing;
      releaseDragPresentation(card.style);
    },
    [dropAnimation],
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
      let nextRoute = routeRef.current;
      if (
        event.type === 'DROP' &&
        (controller.getSnapshot().state === 'transferred' || controller.getSnapshot().state === 'transferring')
      ) {
        nextRoute = advanceRoute(routeRef.current);
        routeRef.current = nextRoute;
        setRoute(nextRoute);
      }
      if (event.type === 'DROP') {
        prepareDrop(nextRoute);
      }
      controller.send(event);
    },
    [controller, prepareDrop, prepareTransfer, updateRunMode],
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

  const updateDragSession = React.useCallback((event: PointerEvent) => {
    const session = dragSessionRef.current;
    if (!session || session.pointerId !== event.pointerId) {
      return;
    }

    session.latestPointer = { x: event.clientX, y: event.clientY };
    const coalescedEvents = event.getCoalescedEvents?.() ?? [];
    const pointerEvents = coalescedEvents.length > 0 ? coalescedEvents : [event];
    for (const pointerEvent of pointerEvents) {
      session.samples.push({ position: pointerEvent.clientX, time: pointerEvent.timeStamp });
    }
    const sampleCutoff = event.timeStamp - velocitySampleWindow * 2;
    session.samples = session.samples.filter(sample => sample.time >= sampleCutoff);
  }, []);

  const finishDrag = React.useCallback(
    (pointerId: number, cancelled: boolean) => {
      const session = dragSessionRef.current;
      if (!session || session.pointerId !== pointerId) {
        return;
      }

      session.targetWindow.cancelAnimationFrame(session.frameId);
      const destination = cancelled ? session.origin : getClosestPlacement(session);
      const nextRoute = { origin: destination, destination: getNextPlacement(destination) };
      prepareDrop(nextRoute, session.targetWindow);
      dragSessionRef.current = undefined;
      dragDestinationRef.current = undefined;
      routeRef.current = nextRoute;
      setRoute(nextRoute);
      setRequestedDestination(undefined);
      sendEvent({ type: cancelled ? 'CANCEL' : 'RELEASE' });
    },
    [prepareDrop, sendEvent],
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0 || controller.getSnapshot().state !== 'dropped') {
        return;
      }

      const targetWindow = event.currentTarget.ownerDocument.defaultView;
      if (!targetWindow) {
        return;
      }
      updateRowOffset();

      const slotCenters: Partial<Record<Placement, Point>> = {};
      for (const placement of placements) {
        const slotElement = slotRefs.current[placement];
        if (!slotElement) {
          return;
        }
        const slotRect = slotElement.getBoundingClientRect();
        slotCenters[placement] = {
          x: slotRect.left + slotRect.width / 2,
          y: slotRect.top + slotRect.height / 2,
        };
      }

      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      const cardRect = event.currentTarget.getBoundingClientRect();
      const session: DragSession = {
        pointerId: event.pointerId,
        origin: routeRef.current.origin,
        startPointer: { x: event.clientX, y: event.clientY },
        latestPointer: { x: event.clientX, y: event.clientY },
        startCardCenter: { x: cardRect.left + cardRect.width / 2, y: cardRect.top + cardRect.height / 2 },
        slotCenters: slotCenters as Record<Placement, Point>,
        samples: [{ position: event.clientX, time: event.timeStamp }],
        smoothedVelocityX: 0,
        previousFrameTime: event.timeStamp,
        frameId: 0,
        targetWindow,
      };
      dragSessionRef.current = session;
      sendEvent({ type: 'GRAB' });
      dragDestinationRef.current = session.origin;
      setRequestedDestination(session.origin);

      const drawFrame = (now: number) => {
        const activeSession = dragSessionRef.current;
        const element = cardRef.current;
        if (!activeSession || activeSession.pointerId !== event.pointerId || !element) {
          return;
        }

        const elapsed = Math.max(0, now - activeSession.previousFrameTime);
        const velocityX = estimateVelocity(activeSession.samples, now, velocitySampleWindow);
        activeSession.smoothedVelocityX = smoothVelocity(
          activeSession.smoothedVelocityX,
          velocityX,
          elapsed,
          velocitySmoothingTime,
        );
        activeSession.previousFrameTime = now;

        const offsetX = activeSession.latestPointer.x - activeSession.startPointer.x;
        const offsetY = activeSession.latestPointer.y - activeSession.startPointer.y;
        const rotation = Math.min(
          Math.max(activeSession.smoothedVelocityX * rotationPerVelocity, -maximumRotation),
          maximumRotation,
        );
        applyDragPresentation(element.style, { offsetX, offsetY, rotation, boxShadow: tokens.shadow16 });

        const destination = getClosestPlacement(activeSession);
        if (dragDestinationRef.current !== destination) {
          dragDestinationRef.current = destination;
          setRequestedDestination(destination);
        }
        activeSession.frameId = targetWindow.requestAnimationFrame(drawFrame);
      };

      session.frameId = targetWindow.requestAnimationFrame(drawFrame);
    },
    [controller, sendEvent, updateRowOffset],
  );

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => updateDragSession(event.nativeEvent),
    [updateDragSession],
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      updateDragSession(event.nativeEvent);
      finishDrag(event.pointerId, false);
    },
    [finishDrag, updateDragSession],
  );

  const handlePointerCancel = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => finishDrag(event.pointerId, true),
    [finishDrag],
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
  const activeGraphEdge = visibleGraphEdges.find(edge => edge.event === activeEdge.event);
  const activeNode = snapshot.state;
  const occupiedPlacement =
    activeNode === 'dropped' || activeNode === 'lifting' || activeNode === 'pickingUp' || activeNode === 'dropping'
      ? route.origin
      : undefined;
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
          <Button
            icon={<ReplayFilled />}
            disabled={runMode === 'replay' || activeNode === 'dragging'}
            onClick={startSequence}
            size="small"
          >
            Replay
          </Button>
        </div>
      </div>

      <div ref={stageRef} className={styles.stage}>
        {placements.map(placement => {
          const isDestination =
            occupiedPlacement !== placement && (hoveredPlacement === placement || requestedDestination === placement);

          return (
            <button
              key={placement}
              ref={element => {
                slotRefs.current[placement] = element ?? undefined;
              }}
              type="button"
              className={mergeClasses(
                styles.slot,
                occupiedPlacement === placement && styles.slotActive,
                occupiedPlacement !== placement && styles.slotInteractive,
                isDestination && styles.slotDestination,
              )}
              disabled={occupiedPlacement === placement}
              aria-label={
                occupiedPlacement === placement
                  ? `${placementLabels[placement]} origin`
                  : `Transfer card to ${placementLabels[placement]}`
              }
              onBlur={() => setHoveredPlacement(undefined)}
              onClick={() => transferToDestination(placement)}
              onFocus={() => setHoveredPlacement(placement)}
              onMouseEnter={() => setHoveredPlacement(placement)}
              onMouseLeave={() => setHoveredPlacement(undefined)}
            >
              <Caption1
                className={mergeClasses(
                  styles.slotState,
                  occupiedPlacement === placement && styles.slotStateActive,
                  isDestination && styles.slotStateDestination,
                )}
              >
                {occupiedPlacement === placement ? 'origin' : isDestination ? 'destination' : 'available'}
              </Caption1>
            </button>
          );
        })}

        <CardMotion context={route} controller={controller} onMotionFinish={handleMotionFinish}>
          <Card
            ref={cardRef}
            className={mergeClasses(
              styles.card,
              (activeNode === 'pickingUp' || activeNode === 'dragging') && styles.cardDragging,
            )}
            appearance="filled"
            onLostPointerCapture={handlePointerCancel}
            onPointerCancel={handlePointerCancel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <Text className={styles.cardTitle} weight="semibold">
              State: {activeNode}
            </Text>
            <Caption1 className={styles.cardSubtitle} aria-live="polite">
              Animation: {snapshot.animation ? activeEdge.animation : 'none'}
            </Caption1>
          </Card>
        </CardMotion>
      </div>

      <div className={styles.graphViewport}>
        <svg
          className={styles.graph}
          viewBox={graphViewBox}
          role="img"
          aria-labelledby="card-transfer-title card-transfer-description"
        >
          <title id="card-transfer-title">
            {showOnlyDraggingFlowGraph ? 'Card drag state graph' : 'Card transfer state graph'}
          </title>
          <desc id="card-transfer-description">
            {showOnlyDraggingFlowGraph
              ? 'The states and transitions used to pick up, drag, and drop the card.'
              : 'Stable and active states connected by a forward cycle. The active animation fills as it progresses.'}
          </desc>
          <defs>
            <marker id={markerId} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
              <path className={styles.arrow} d="M 0 0 L 8 4 L 0 8 Z" />
            </marker>
          </defs>

          {visibleEventEdges.map(edge => (
            <React.Fragment key={edge.event}>
              <path className={styles.edge} d={edge.path} markerEnd={`url(#${markerId})`} />
              <text className={styles.edgeLabel} x={edge.labelX} y={edge.labelY} textAnchor="middle">
                {edge.event}
              </text>
            </React.Fragment>
          ))}

          {visibleGraphEdges.map(edge => (
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
              d={activeGraphEdge?.path ?? activeEdge.path}
              pathLength={1}
              visibility={snapshot.animation && activeGraphEdge ? 'visible' : 'hidden'}
              aria-hidden="true"
            />
          </GraphMotion>

          {visibleGraphNodes.map(node => (
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
