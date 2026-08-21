import type {
  DashboardGridCompatibilityEventData,
  DashboardGridCompatibilityItem,
  DashboardGridCompatibilityTarget,
  GridStackColumnLayout,
  GridStackCompatibilityEvent,
  GridStackElement,
  GridStackEventAdapterOptions,
  GridStackEventHandlerCallback,
  GridStackEventName,
  GridStackEventPayloadMap,
  GridStackLegacyLoadArgument,
  GridStackLikeFacade,
  GridStackNode,
  GridStackSelectorRoot,
  GridStackWidget,
} from './gridstackTypes';
import type {
  DashboardGridColumnLayout,
  DashboardGridEngine,
  DashboardGridEngineChangeSet,
  DashboardGridLayoutItemInput,
  DashboardGridLoadOptions,
  DashboardGridResolvedItem,
} from '../engine';
import {
  fromGridStackWidgets,
  toGridStackWidget,
  toGridStackWidgets,
} from './gridstackSchema';
import {
  getGridStackElements,
  readGridStackWidgetAttributes,
  writeGridStackAttributes,
  writeGridStackWidgetMetadata,
} from './gridstackDOM';

const gridStackEventNames = new Set<GridStackEventName>([
  'added',
  'change',
  'disable',
  'drag',
  'dragstart',
  'dragstop',
  'dropped',
  'enable',
  'removed',
  'resize',
  'resizestart',
  'resizestop',
  'resizecontent',
]);

function getEngine(target: DashboardGridCompatibilityTarget): DashboardGridEngine | undefined {
  if ('getSnapshot' in target) {
    return target;
  }
  return target.getStore?.().engine;
}

function getDefinitions(
  target: DashboardGridCompatibilityTarget,
): readonly DashboardGridLayoutItemInput[] {
  if ('getSnapshot' in target) {
    return target.getSnapshot().items;
  }
  return target.getItems();
}

function getItems(target: DashboardGridCompatibilityTarget): readonly DashboardGridResolvedItem[] {
  if ('getSnapshot' in target) {
    return target.getSnapshot().items;
  }
  const store = target.getStore?.();
  if (store) {
    return store.engine.getSnapshot().items;
  }
  return target.getItems().map(item => ({
    id: item.id,
    column: item.column ?? 0,
    row: item.row ?? 0,
    columnSpan: item.columnSpan ?? 1,
    rowSpan: item.rowSpan ?? 1,
    minColumnSpan: item.minColumnSpan,
    maxColumnSpan: item.maxColumnSpan,
    minRowSpan: item.minRowSpan,
    maxRowSpan: item.maxRowSpan,
    movable: item.movable ?? true,
    resizable: item.resizable ?? true,
    locked: item.locked ?? false,
  }));
}

function adaptColumnLayout(layout: GridStackColumnLayout | undefined): DashboardGridColumnLayout | undefined {
  if (typeof layout !== 'function') {
    return layout;
  }

  return context => {
    const nodes = context.items.map(item => toCallbackWidget(item));
    const previousNodes = nodes.map(node => ({ ...node }));
    layout(context.columns, context.previousColumns, nodes, previousNodes);
    return fromGridStackWidgets(nodes, {
      existingIds: context.items.map(item => item.id),
      preserveFirstExistingId: true,
    });
  };
}

function resolveElementIds(
  element: GridStackElement,
  target: DashboardGridCompatibilityTarget,
  rootElement: GridStackSelectorRoot | undefined,
): string[] {
  const currentIds = new Set(getItems(target).map(item => item.id));
  if (typeof element === 'string' && currentIds.has(element)) {
    return [element];
  }

  const elements =
    typeof element === 'string'
      ? rootElement
        ? getGridStackElements(element, rootElement)
        : []
      : [element];

  return elements
    .map(candidate => candidate.getAttribute('gs-id') || candidate.id)
    .filter((id): id is string => Boolean(id) && currentIds.has(id));
}

function resolveDragInElements(
  elements: string | readonly HTMLElement[],
  root: GridStackSelectorRoot | undefined,
): HTMLElement[] {
  if (typeof elements !== 'string') {
    return [...elements];
  }
  if (!root) {
    throw new Error('setupDragIn() requires an explicit root or adapter rootElement.');
  }

  try {
    return Array.from(root.querySelectorAll(elements)).filter(
      (element): element is HTMLElement => {
        const HTMLElementConstructor = element.ownerDocument.defaultView?.HTMLElement;
        return HTMLElementConstructor !== undefined && element instanceof HTMLElementConstructor;
      },
    );
  } catch {
    return [];
  }
}

function getItemsForSave(
  target: DashboardGridCompatibilityTarget,
): readonly DashboardGridCompatibilityItem[] {
  const resolvedItems = getItems(target);
  if ('getSnapshot' in target) {
    return resolvedItems;
  }

  const definitions = new Map(target.getItems().map(item => [item.id, item as Record<string, unknown>]));
  return resolvedItems.map(item => {
    const definition = definitions.get(item.id);
    const content = definition?.content;
    const component = definition?.component;
    const props = definition?.props;

    return {
      ...item,
      content: typeof content === 'string' ? content : undefined,
      component: typeof component === 'string' ? component : undefined,
      props:
        typeof props === 'object' && props !== null && !Array.isArray(props)
          ? (props as Readonly<Record<string, unknown>>)
          : undefined,
      data: definition?.data,
      lazyMount: typeof definition?.lazyMount === 'boolean' ? definition.lazyMount : undefined,
      sizeToContent:
        typeof definition?.sizeToContent === 'boolean' || typeof definition?.sizeToContent === 'number'
          ? definition.sizeToContent
          : undefined,
    };
  });
}

function getEventNames(name: string): GridStackEventName[] {
  return name
    .trim()
    .split(/\s+/)
    .filter((eventName): eventName is GridStackEventName =>
      gridStackEventNames.has(eventName as GridStackEventName),
    );
}

function hasSameGeometry(previous: DashboardGridResolvedItem, current: DashboardGridResolvedItem): boolean {
  return (
    previous.column === current.column &&
    previous.row === current.row &&
    previous.columnSpan === current.columnSpan &&
    previous.rowSpan === current.rowSpan
  );
}

function getChangeSet(result: unknown): DashboardGridEngineChangeSet | undefined {
  if (typeof result !== 'object' || result === null) {
    return undefined;
  }

  const candidate = result as Record<string, unknown>;
  if (candidate.status === 'rejected') {
    return undefined;
  }
  if (
    typeof candidate.revision === 'number' &&
    Array.isArray(candidate.removed) &&
    Array.isArray(candidate.added) &&
    Array.isArray(candidate.changed)
  ) {
    return result as DashboardGridEngineChangeSet;
  }

  const changeSet = candidate.changeSet;
  if (
    typeof changeSet === 'object' &&
    changeSet !== null &&
    Array.isArray((changeSet as Record<string, unknown>).removed) &&
    Array.isArray((changeSet as Record<string, unknown>).added) &&
    Array.isArray((changeSet as Record<string, unknown>).changed)
  ) {
    return changeSet as DashboardGridEngineChangeSet;
  }
  return undefined;
}

function getEventOriginalEvent<Name extends GridStackEventName>(
  payload: GridStackEventPayloadMap[Name],
): Event | undefined {
  return 'originalEvent' in payload ? payload.originalEvent : undefined;
}

function getNativeEvent(event: unknown, data: DashboardGridCompatibilityEventData): Event | undefined {
  const candidate = data.event ?? event;
  if (typeof candidate !== 'object' || candidate === null) {
    return undefined;
  }

  const nativeEvent = (candidate as { nativeEvent?: unknown }).nativeEvent;
  if (typeof nativeEvent === 'object' && nativeEvent !== null) {
    return nativeEvent as Event;
  }
  if (
    typeof (candidate as { type?: unknown }).type === 'string' &&
    typeof (candidate as { preventDefault?: unknown }).preventDefault === 'function'
  ) {
    return candidate as Event;
  }
  return undefined;
}

function toNode(
  item: DashboardGridResolvedItem,
  getItemElement: (id: string) => HTMLElement | undefined,
): GridStackNode {
  const node = toCallbackWidget(item);
  const element = getItemElement(item.id);
  if (element) {
    node.el = element;
  }
  return node;
}

function toCallbackWidget(item: Readonly<DashboardGridLayoutItemInput>): GridStackNode {
  const widget = toGridStackWidget(item);
  widget.w = item.columnSpan ?? item.minColumnSpan ?? 1;
  widget.h = item.rowSpan ?? item.minRowSpan ?? 1;
  return widget;
}

function requireCallbackRoot(options: GridStackEventAdapterOptions): HTMLElement {
  if (!options.rootElement) {
    throw new Error(
      'The legacy GridStack load callback overload requires GridStackEventAdapterOptions.rootElement.',
    );
  }
  return options.rootElement;
}

export function adaptGridStackLoadOptions(
  addRemove?: GridStackLegacyLoadArgument,
): DashboardGridLoadOptions {
  if (addRemove === false) {
    return {
      addMissing: false,
      removeMissing: false,
    };
  }

  return {
    addMissing: true,
    removeMissing: true,
  };
}

export function createGridStackEventAdapter(
  target: DashboardGridCompatibilityTarget,
  options: GridStackEventAdapterOptions = {},
): GridStackLikeFacade {
  const handlers = new Map<GridStackEventName, Set<GridStackEventHandlerCallback>>();
  const emittingEvents = new Set<GridStackEventName>();
  const callbackElements = new Map<string, HTMLElement>();
  const getItemElement = (id: string): HTMLElement | undefined =>
    options.getItemElement?.(id) ?? callbackElements.get(id);
  const disabledStates = new Map<string, Readonly<{ movable: boolean; resizable: boolean }>>();
  let compatibilityDisabled = false;
  let batchDepth = 0;
  let batchStartItems: readonly DashboardGridResolvedItem[] | undefined;
  let facade: GridStackLikeFacade;

  const emitDifferences = (
    before: readonly DashboardGridResolvedItem[],
    after: readonly DashboardGridResolvedItem[],
  ): void => {
    const beforeById = new Map(before.map(item => [item.id, item]));
    const afterById = new Map(after.map(item => [item.id, item]));
    const removed = before.filter(item => !afterById.has(item.id));
    const added = after.filter(item => !beforeById.has(item.id));
    const changed = after.filter(item => {
      const previous = beforeById.get(item.id);
      return previous !== undefined && !hasSameGeometry(previous, item);
    });

    if (removed.length > 0) {
      facade.emit('removed', { nodes: removed });
    }
    if (added.length > 0) {
      facade.emit('added', { nodes: added });
    }
    if (changed.length > 0) {
      facade.emit('change', { nodes: changed });
    }
  };

  const emitChangeSet = (changeSet: DashboardGridEngineChangeSet): void => {
    if (changeSet.removed.length > 0) {
      facade.emit('removed', { nodes: changeSet.removed });
    }
    if (changeSet.added.length > 0) {
      facade.emit('added', { nodes: changeSet.added });
    }
    if (changeSet.changed.length > 0) {
      const currentById = new Map(getItems(target).map(item => [item.id, item]));
      const changed = changeSet.changed
        .map(change => currentById.get(change.id))
        .filter((item): item is DashboardGridResolvedItem => item !== undefined);
      if (changed.length > 0) {
        facade.emit('change', { nodes: changed });
      }
    }
  };

  const runMutation = <T>(operation: () => T, triggerEvent = true): T => {
    const before = getItems(target);
    const result = operation();
    if (triggerEvent && batchDepth === 0) {
      const changeSet = getChangeSet(result);
      if (changeSet) {
        emitChangeSet(changeSet);
      } else {
        emitDifferences(before, getItems(target));
      }
    }
    return result;
  };

  const addItem = (item: DashboardGridCompatibilityItem): unknown => {
    if ('add' in target) {
      return target.add(item);
    }
    if (target.addItem) {
      return target.addItem(item);
    }
    return target.load([item], { addMissing: true, removeMissing: false });
  };

  const removeItem = (id: string): unknown => {
    if ('remove' in target) {
      return target.remove(id);
    }
    if (target.removeItem) {
      return target.removeItem(id);
    }
    return target.load(
      getDefinitions(target).filter(item => item.id !== id),
      { addMissing: true, removeMissing: true },
    );
  };

  const loadDefinitions = (items: readonly DashboardGridLayoutItemInput[]): unknown =>
    target.load(items, { addMissing: true, removeMissing: true });

  facade = {
    on(name, callback) {
      for (const eventName of getEventNames(name)) {
        let eventHandlers = handlers.get(eventName);
        if (!eventHandlers) {
          eventHandlers = new Set();
          handlers.set(eventName, eventHandlers);
        }
        eventHandlers.add(callback);
      }
      return facade;
    },

    off(name) {
      for (const eventName of getEventNames(name)) {
        handlers.delete(eventName);
      }
      return facade;
    },

    offAll() {
      handlers.clear();
      return facade;
    },

    emit(name, payload) {
      const eventHandlers = handlers.get(name);
      if (!eventHandlers || eventHandlers.size === 0 || emittingEvents.has(name)) {
        return facade;
      }

      const event: GridStackCompatibilityEvent = {
        type: name,
        target: options.rootElement ?? null,
        currentTarget: options.rootElement ?? null,
        originalEvent: getEventOriginalEvent(payload),
        detail: payload,
      };

      emittingEvents.add(name);
      try {
        for (const callback of eventHandlers) {
          if (
            name === 'added' ||
            name === 'change' ||
            name === 'removed' ||
            name === 'resizecontent'
          ) {
            const nodesPayload = payload as Readonly<{
              nodes: readonly DashboardGridResolvedItem[];
            }>;
            const nodes = nodesPayload.nodes.map(item =>
              toNode(item, getItemElement),
            );
            (callback as (event: GridStackCompatibilityEvent, nodes: readonly GridStackNode[]) => void)(
              event,
              nodes,
            );
          } else if (
            name === 'drag' ||
            name === 'dragstart' ||
            name === 'dragstop' ||
            name === 'resize' ||
            name === 'resizestart' ||
            name === 'resizestop'
          ) {
            const itemPayload = payload as Readonly<{
              item: DashboardGridResolvedItem;
              element?: HTMLElement;
            }>;
            const element = itemPayload.element ?? getItemElement(itemPayload.item.id);
            if (element) {
              (callback as (event: GridStackCompatibilityEvent, element: HTMLElement) => void)(
                event,
                element,
              );
            }
          } else if (name === 'dropped') {
            const dropPayload = payload as GridStackEventPayloadMap['dropped'];
            (
              callback as (
                event: GridStackCompatibilityEvent,
                previousNode: GridStackNode | undefined,
                newNode: GridStackNode,
              ) => void
            )(
              event,
              dropPayload.previousItem
                ? toNode(dropPayload.previousItem, getItemElement)
                : undefined,
              toNode(dropPayload.item, getItemElement),
            );
          } else {
            (callback as (event: GridStackCompatibilityEvent) => void)(event);
          }
        }
      } finally {
        emittingEvents.delete(name);
      }

      return facade;
    },

    addWidget(widget) {
      let item = fromGridStackWidgets([widget], {
        existingIds: getItems(target).map(existingItem => existingItem.id),
        fallbackIdPrefix: options.fallbackIdPrefix,
      })[0];
      if (compatibilityDisabled) {
        disabledStates.set(item.id, {
          movable: item.movable ?? true,
          resizable: item.resizable ?? true,
        });
        item = {
          ...item,
          movable: false,
          resizable: false,
        };
      }

      runMutation(() => addItem(item));
      const added = getItems(target).find(existingItem => existingItem.id === item.id);
      return added ? toNode(added, getItemElement) : undefined;
    },

    makeWidget(element, widgetOptions = {}) {
      const selectorRoot = options.selectorRoot ?? options.rootElement;
      const candidate = (
        typeof element === 'string'
          ? selectorRoot
            ? getGridStackElements(element, selectorRoot)
            : []
          : [element]
      ).find((match): match is HTMLElement => {
        const HTMLElementConstructor = match.ownerDocument.defaultView?.HTMLElement;
        return HTMLElementConstructor !== undefined && match instanceof HTMLElementConstructor;
      });
      if (!candidate) {
        return undefined;
      }

      const widget = readGridStackWidgetAttributes(candidate);
      for (const key of Object.keys(widgetOptions)) {
        const value = widgetOptions[key];
        if (value !== null && value !== undefined) {
          widget[key] = value;
        }
      }
      if (!widget.id && candidate.id) {
        widget.id = candidate.id;
      }
      if (widget.content === undefined) {
        const contentElement = Array.from(candidate.children).find(child =>
          child.classList.contains('grid-stack-item-content'),
        );
        const textContent = contentElement?.textContent;
        if (textContent) {
          widget.content = textContent;
        }
      }

      const existing = widget.id ? getItems(target).find(item => item.id === widget.id) : undefined;
      if (existing) {
        callbackElements.set(existing.id, candidate);
        facade.update(existing.id, widget);
        const updated = getItems(target).find(item => item.id === existing.id);
        if (updated) {
          writeGridStackAttributes(updated, candidate);
          return toNode(updated, getItemElement);
        }
        return undefined;
      }

      const added = facade.addWidget(widget);
      if (!added) {
        return undefined;
      }
      callbackElements.set(added.id!, candidate);
      const resolved = getItems(target).find(item => item.id === added.id);
      if (!resolved) {
        return undefined;
      }
      writeGridStackAttributes(resolved, candidate);
      return toNode(resolved, getItemElement);
    },

    removeWidget(element, removeDOM = true, triggerEvent = true) {
      void removeDOM;
      const ids = resolveElementIds(element, target, options.selectorRoot ?? options.rootElement);
      runMutation(() => {
        for (const id of ids) {
          removeItem(id);
          callbackElements.delete(id);
          disabledStates.delete(id);
        }
      }, triggerEvent);
      return facade;
    },

    removeAll(removeDOM = true, triggerEvent = true) {
      void removeDOM;
      runMutation(() => {
        const result =
          'removeAll' in target
            ? target.removeAll()
            : target.load([], { addMissing: false, removeMissing: true });
        callbackElements.clear();
        disabledStates.clear();
        return result;
      }, triggerEvent);
      return facade;
    },

    update(element, widget) {
      const ids = resolveElementIds(element, target, options.selectorRoot ?? options.rootElement);
      for (const id of ids) {
        runMutation(() => {
          const current = getItems(target).find(item => item.id === id);
          if (!current) {
            return;
          }

          const mergedWidget: GridStackWidget = {
            ...toCallbackWidget(current),
            ...widget,
            id: widget.id ?? id,
          };
          let mapped = fromGridStackWidgets([mergedWidget], {
            existingIds: getItems(target)
              .filter(item => item.id !== id)
              .map(item => item.id),
            fallbackIdPrefix: options.fallbackIdPrefix,
          })[0];
          if (compatibilityDisabled) {
            const previousState = disabledStates.get(id) ?? {
              movable: true,
              resizable: true,
            };
            disabledStates.delete(id);
            disabledStates.set(mapped.id, {
              movable: widget.noMove === undefined ? previousState.movable : !widget.noMove,
              resizable: widget.noResize === undefined ? previousState.resizable : !widget.noResize,
            });
            mapped = {
              ...mapped,
              movable: false,
              resizable: false,
            };
          }
          const definitions = getDefinitions(target).map(definition =>
            definition.id === id ? { ...definition, ...mapped } : definition,
          );

          if (mapped.id !== id) {
            const elementForId = callbackElements.get(id);
            callbackElements.delete(id);
            if (elementForId) {
              callbackElements.set(mapped.id, elementForId);
            }
          }
          return loadDefinitions(definitions);
        });
      }
      return facade;
    },

    load(widgets, addRemove) {
      const before = getItems(target);
      const existingIds = new Set(before.map(item => item.id));
      const callback = typeof addRemove === 'function' ? addRemove : undefined;
      const loadOptions = adaptGridStackLoadOptions(addRemove);
      let items = fromGridStackWidgets(widgets, {
        existingIds,
        preserveFirstExistingId: true,
        fallbackIdPrefix: options.fallbackIdPrefix,
      });

      if (callback) {
        const incomingIds = new Set(items.map(item => item.id));
        const removedItems = before.filter(item => !incomingIds.has(item.id));
        const addedItems = items.filter(item => !existingIds.has(item.id));

        if (removedItems.length > 0 || addedItems.length > 0) {
          const rootElement = requireCallbackRoot(options);

          for (const item of removedItems) {
            callback(rootElement, toCallbackWidget(item), false, false);
            callbackElements.delete(item.id);
          }

          const acceptedIds = new Set<string>();
          for (const item of addedItems) {
            const element = callback(rootElement, toCallbackWidget(item), true, false);
            if (element) {
              acceptedIds.add(item.id);
              callbackElements.set(item.id, element);
            }
          }

          items = items.filter(item => existingIds.has(item.id) || acceptedIds.has(item.id));
        }
      }

      if (compatibilityDisabled) {
        const beforeById = new Map(before.map(item => [item.id, item]));
        items = items.map(item => {
          const previousState = disabledStates.get(item.id);
          disabledStates.set(item.id, {
            movable: item.movable ?? previousState?.movable ?? beforeById.get(item.id)?.movable ?? true,
            resizable:
              item.resizable ?? previousState?.resizable ?? beforeById.get(item.id)?.resizable ?? true,
          });
          return {
            ...item,
            movable: false,
            resizable: false,
          };
        });
      }

      const loadResult = target.load(items as readonly DashboardGridLayoutItemInput[], loadOptions);
      const afterIds = new Set(getItems(target).map(item => item.id));
      for (const id of disabledStates.keys()) {
        if (!afterIds.has(id)) {
          disabledStates.delete(id);
        }
      }

      if (batchDepth === 0) {
        const changeSet = getChangeSet(loadResult);
        if (changeSet) {
          emitChangeSet(changeSet);
        } else {
          emitDifferences(before, getItems(target));
        }
      }

      return facade;
    },

    save(saveContent = true) {
      return toGridStackWidgets(saveContent ? getItemsForSave(target) : getItems(target));
    },

    batchUpdate(flag = true) {
      const engine = getEngine(target);
      if (flag) {
        if (batchDepth === 0) {
          batchStartItems = getItems(target);
        }
        batchDepth += 1;
        engine?.beginBatch();
      } else if (batchDepth > 0) {
        const changeSet = engine?.commitBatch();
        batchDepth -= 1;
        if (batchDepth === 0 && batchStartItems) {
          if (changeSet) {
            emitChangeSet(changeSet);
          } else {
            emitDifferences(batchStartItems, getItems(target));
          }
          batchStartItems = undefined;
        }
      }
      return facade;
    },

    column(columns, layout = 'moveScale') {
      const engine = getEngine(target);
      if (engine) {
        runMutation(() => engine.setColumns(columns, adaptColumnLayout(layout)));
      }
      return facade;
    },

    getColumn() {
      return getEngine(target)?.getSnapshot().columns ?? 12;
    },

    willItFit(widget) {
      const engine = getEngine(target);
      if (!engine) {
        return false;
      }
      const item = fromGridStackWidgets([widget], {
        existingIds: getItems(target).map(existingItem => existingItem.id),
        fallbackIdPrefix: options.fallbackIdPrefix,
      })[0];
      return engine.canPlace(item).fits;
    },

    compact(mode = 'compact', doSort = true) {
      void doSort;
      const engine = getEngine(target);
      if (engine) {
        runMutation(() => engine.compact(mode));
      } else if (!('getSnapshot' in target) && target.compact) {
        runMutation(() => target.compact?.(mode));
      }
      return facade;
    },

    getRow() {
      return getEngine(target)?.getRow() ?? 0;
    },

    isAreaEmpty(x, y, width, height) {
      return (
        getEngine(target)?.isAreaEmpty({
          column: x,
          row: y,
          columnSpan: width,
          rowSpan: height,
        }) ?? false
      );
    },

    rotate(element, relative) {
      const engine = getEngine(target);
      if (!engine) {
        return facade;
      }

      const ids = resolveElementIds(element, target, options.selectorRoot ?? options.rootElement);
      for (const id of ids) {
        runMutation(() =>
          engine.rotate(id, {
            input: 'api',
            pivot: relative
              ? {
                  column: relative.left,
                  row: relative.top,
                }
              : undefined,
          }),
        );
      }
      return facade;
    },

    enable(recurse = true) {
      void recurse;
      compatibilityDisabled = false;
      runMutation(() => {
        const definitions = getDefinitions(target).map(definition => {
          const previous = disabledStates.get(definition.id);
          return previous
            ? {
                ...definition,
                movable: previous.movable,
                resizable: previous.resizable,
              }
            : definition;
        });
        target.load(definitions, { addMissing: true, removeMissing: true });
        disabledStates.clear();
      });
      facade.emit('enable', {});
      return facade;
    },

    disable(recurse = true) {
      void recurse;
      compatibilityDisabled = true;
      runMutation(() => {
        const resolvedById = new Map(getItems(target).map(item => [item.id, item]));
        const definitions = getDefinitions(target).map(definition => {
          const resolved = resolvedById.get(definition.id);
          if (resolved && !disabledStates.has(definition.id)) {
            disabledStates.set(definition.id, {
              movable: resolved.movable,
              resizable: resolved.resizable,
            });
          }
          return {
            ...definition,
            movable: false,
            resizable: false,
          };
        });
        target.load(definitions, { addMissing: true, removeMissing: true });
      });
      facade.emit('disable', {});
      return facade;
    },

    setupDragIn(elements, dragOptions, widgets, root) {
      const resolvedElements = resolveDragInElements(
        elements,
        root ?? options.selectorRoot ?? options.rootElement,
      );
      resolvedElements.forEach((element, index) => {
        element.setAttribute('data-dashboard-grid-drag-source', 'true');
        const widget = widgets?.[index];
        if (widget) {
          writeGridStackWidgetMetadata(element, widget);
        }
      });
      options.setupDragIn?.(resolvedElements, dragOptions, widgets);
      return facade;
    },

    getDashboardGridEventHandlers() {
      const getEventItems = (
        data: DashboardGridCompatibilityEventData,
      ): readonly DashboardGridResolvedItem[] => {
        if (data.items) {
          return data.items;
        }
        if (data.itemId) {
          const item = getItems(target).find(candidate => candidate.id === data.itemId);
          return item ? [item] : [];
        }
        return [];
      };

      const getChangeItems = (
        data: DashboardGridCompatibilityEventData,
      ): readonly DashboardGridResolvedItem[] => {
        if (!data.changeSet) {
          return getEventItems(data);
        }
        const currentById = new Map(getItems(target).map(item => [item.id, item]));
        return data.changeSet.changed
          .map(change => currentById.get(change.id))
          .filter((item): item is DashboardGridResolvedItem => item !== undefined);
      };

      return {
        onLayoutChange(event, data) {
          const items = getChangeItems(data);
          if (items.length > 0) {
            facade.emit('change', {
              nodes: items,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onItemAdd(event, data) {
          const items = data.changeSet?.added ?? getEventItems(data);
          if (items.length > 0) {
            facade.emit('added', {
              nodes: items,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onItemRemove(event, data) {
          const items = data.changeSet?.removed ?? getEventItems(data);
          if (items.length > 0) {
            facade.emit('removed', {
              nodes: items,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onDragStart(event, data) {
          const item = getEventItems(data)[0];
          if (item) {
            facade.emit('dragstart', {
              item,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onDragEnd(event, data) {
          const item = getEventItems(data)[0];
          if (item) {
            facade.emit('dragstop', {
              item,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onResizeStart(event, data) {
          const item = getEventItems(data)[0];
          if (item) {
            facade.emit('resizestart', {
              item,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onResizeEnd(event, data) {
          const item = getEventItems(data)[0];
          if (item) {
            facade.emit('resizestop', {
              item,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onTransfer(event, data) {
          const item = getEventItems(data)[0];
          if (item) {
            facade.emit('dropped', {
              item,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
        onResizeContent(event, data) {
          const items = getEventItems(data);
          if (items.length > 0) {
            facade.emit('resizecontent', {
              nodes: items,
              originalEvent: getNativeEvent(event, data),
            });
          }
        },
      };
    },
  };

  return facade;
}
