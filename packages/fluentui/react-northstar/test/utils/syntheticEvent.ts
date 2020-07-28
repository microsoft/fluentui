/**
 * Synthetic Event
 *
 * Names of all synthetic events and their event shape.
 * Methods are also included for comparing and validated event objects.
 *
 * https://facebook.github.io/react/docs/events.html
 */

const noop = () => undefined;

const baseShape = {
  bubbles: null,
  cancelable: null,
  currentTarget: null,
  defaultPrevented: null,
  eventPhase: null,
  isTrusted: null,
  nativeEvent: null,
  persist: noop,
  preventDefault: noop,
  isDefaultPrevented: noop,
  stopPropagation: noop,
  isPropagationStopped: noop,
  target: null,
  timeStamp: null,
  type: null,
};

// ------------------------------------
// Event Types
// ------------------------------------
export const types = {
  clipboard: {
    listeners: ['onCopy', 'onCut', 'onPaste'],
    eventShape: { ...baseShape, clipboardData: null },
  },
  composition: {
    listeners: ['onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate'],
    eventShape: { ...baseShape, data: null },
  },
  keyboard: {
    listeners: ['onKeyDown', 'onKeyPress', 'onKeyUp'],
    eventShape: {
      ...baseShape,
      altKey: null,
      charCode: null,
      ctrlKey: null,
      getModifierState: noop,
      key: null,
      keyCode: null,
      locale: null,
      location: null,
      metaKey: null,
      repeat: null,
      shiftKey: null,
      which: null,
    },
  },
  focus: {
    listeners: ['onFocus', 'onBlur'],
    eventShape: { ...baseShape, relatedTarget: null },
  },
  form: {
    listeners: ['onChange', 'onInput', 'onSubmit'],
    eventShape: { ...baseShape },
  },
  mouse: {
    listeners: [
      'onClick',
      'onContextMenu',
      'onDoubleClick',
      'onDrag',
      'onDragEnd',
      'onDragEnter',
      'onDragExit',
      'onDragLeave',
      'onDragOver',
      'onDragStart',
      'onDrop',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseOut',
      'onMouseOver',
      'onMouseUp',
    ],
    eventShape: {
      ...baseShape,
      altKey: null,
      button: null,
      buttons: null,
      clientX: null,
      clientY: null,
      ctrlKey: null,
      getModifierState: noop,
      metaKey: null,
      pageX: null,
      pageY: null,
      relatedTarget: null,
      screenX: null,
      screenY: null,
      shiftKey: null,
    },
  },
  selection: {
    listeners: ['onSelect'],
    eventShape: { ...baseShape },
  },
  touch: {
    listeners: ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'],
    eventShape: {
      ...baseShape,
      altKey: null,
      changedTouches: null,
      ctrlKey: null,
      getModifierState: noop,
      metaKey: null,
      shiftKey: null,
      targetTouches: null,
      touches: null,
    },
  },
  ui: {
    listeners: ['onScroll'],
    eventShape: { ...baseShape, detail: null, view: null },
  },
  wheel: {
    listeners: ['onWheel'],
    eventShape: { ...baseShape, deltaMode: null, deltaX: null, deltaY: null, deltaZ: null },
  },
  media: {
    listeners: [
      'onAbort',
      'onCanPlay',
      'onCanPlayThrough',
      'onDurationChange',
      'onEmptied',
      'onEncrypted',
      'onEnded',
      'onError',
      'onLoadedData',
      'onLoadedMetadata',
      'onLoadStart',
      'onPause',
      'onPlay',
      'onPlaying',
      'onProgress',
      'onRateChange',
      'onSeeked',
      'onSeeking',
      'onStalled',
      'onSuspend',
      'onTimeUpdate',
      'onVolumeChange',
      'onWaiting',
    ],
    eventShape: { ...baseShape },
  },
  image: {
    listeners: ['onLoad', 'onError'],
    eventShape: { ...baseShape },
  },
  animation: {
    listeners: ['onAnimationStart', 'onAnimationEnd', 'onAnimationIteration'],
    eventShape: { ...baseShape, animationName: null, pseudoElement: null, elapsedTime: null },
  },
  transition: {
    listeners: ['onTransitionEnd'],
    eventShape: { ...baseShape, propertyName: null, pseudoElement: null, elapsedTime: null },
  },
};
// ------------------------------------
// Methods
// ------------------------------------

/**
 * Determine if an event object has the shape of the event type specified.
 * @param event - The event object to test.
 * @param type - The string name of the event shape or actual event shape to compare against.
 */
export const hasShape = (event: object, type: string | object): boolean => {
  const shape = typeof type === 'string' ? types[type].shape : type;
  return Object.keys(event).every(key => key in shape);
};
