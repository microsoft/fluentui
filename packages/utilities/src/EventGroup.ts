/* tslint:disable:no-string-literal */

/**
 * EventRecord interface.
 *
 * @internal
 */
export interface IEventRecord {
  target: any;
  eventName: string;
  parent: any;
  callback: (args?: any) => void;
  elementCallback?: (...args: any[]) => void;
  objectCallback?: (args?: any) => void;
  useCapture: boolean;
}

/**
 * EventRecordsByName interface.
 *
 * @internal
 */
export interface IEventRecordsByName {
  [eventName: string]: IEventRecordList;
}

/**
 * EventRecordList interface.
 *
 * @internal
 */
export interface IEventRecordList {
  [id: string]: IEventRecord[] | number;
  count: number;
}

/**
 * DeclaredEventsByName interface.
 *
 * @internal
 */
export interface IDeclaredEventsByName {
  [eventName: string]: boolean;
}

/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 *
 * @public
 */
export class EventGroup {
  // tslint:disable-next-line:no-inferrable-types
  private static _uniqueId: number = 0;
  private _parent: any;
  private _eventRecords: IEventRecord[];
  private _id: number = EventGroup._uniqueId++;
  private _isDisposed: boolean;

  /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
   *  Events raised here by default have bubbling set to false and cancelable set to true.
   *  This applies also to built-in events being raised manually here on HTMLElements,
   *  which may lead to unexpected behavior if it differs from the defaults.
   *
   */
  public static raise(
    target: any,
    eventName: string,
    eventArgs?: any,
    bubbleEvent?: boolean
  ): boolean | undefined {
    let retVal;

    if (EventGroup._isElement(target)) {
      if (document.createEvent) {
        let ev = document.createEvent('HTMLEvents');

        ev.initEvent(eventName, bubbleEvent || false, true);
        (ev as any)['args'] = eventArgs;
        retVal = target.dispatchEvent(ev);
      } else if ((document as any)['createEventObject']) { // IE8
        let evObj = (document as any)['createEventObject'](eventArgs);
        // cannot set cancelBubble on evObj, fireEvent will overwrite it
        target.fireEvent('on' + eventName, evObj);
      }
    } else {
      while (target && retVal !== false) {
        let events = <IEventRecordsByName>target.__events__;
        let eventRecords = events ? events[eventName] : null;

        if (eventRecords) {
          for (let id in eventRecords) {
            if (eventRecords.hasOwnProperty(id)) {
              let eventRecordList = <IEventRecord[]>eventRecords[id];

              for (let listIndex = 0; retVal !== false && listIndex < eventRecordList.length; listIndex++) {
                let record = eventRecordList[listIndex];

                if (record.objectCallback) {
                  retVal = record.objectCallback.call(record.parent, eventArgs);
                }
              }
            }
          }
        }

        // If the target has a parent, bubble the event up.
        target = bubbleEvent ? target.parent : null;
      }
    }

    return retVal;
  }

  public static isObserved(target: any, eventName: string): boolean {
    let events = target && <IEventRecordsByName>target.__events__;

    return !!events && !!events[eventName];
  }

  /** Check to see if the target has declared support of the given event. */
  public static isDeclared(target: any, eventName: string): boolean {
    let declaredEvents = target && <IDeclaredEventsByName>target.__declaredEvents;

    return !!declaredEvents && !!declaredEvents[eventName];
  }

  public static stopPropagation(event: any): void {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else { // IE8
      event.cancelBubble = true;
    }
  }

  private static _isElement(target: HTMLElement): boolean {
    return !!target && (!!target.addEventListener || target instanceof HTMLElement);
  }

  /** parent: the context in which events attached to non-HTMLElements are called */
  public constructor(parent: any) {
    this._parent = parent;
    this._eventRecords = [];
  }

  public dispose(): void {
    if (!this._isDisposed) {
      this._isDisposed = true;

      this.off();
      this._parent = null;
    }
  }

  /** On the target, attach a set of events, where the events object is a name to function mapping. */
  public onAll(target: any, events: { [key: string]: (args?: any) => void; }, useCapture?: boolean): void {
    for (let eventName in events) {
      if (events.hasOwnProperty(eventName)) {
        this.on(target, eventName, events[eventName], useCapture);
      }
    }
  }

  /** On the target, attach an event whose handler will be called in the context of the parent
   * of this instance of EventGroup.
   */
  public on(target: any, eventName: string, callback: (args?: any) => void, useCapture?: boolean): void {
    if (eventName.indexOf(',') > -1) {
      let events = eventName.split(/[ ,]+/);

      for (let i = 0; i < events.length; i++) {
        this.on(target, events[i], callback, useCapture);
      }
    } else {
      let parent = this._parent;
      let eventRecord: IEventRecord = {
        target: target,
        eventName: eventName,
        parent: parent,
        callback: callback,
        useCapture: useCapture || false
      };

      // Initialize and wire up the record on the target, so that it can call the callback if the event fires.
      let events = <IEventRecordsByName>(target.__events__ = target.__events__ || {});
      events[eventName] = events[eventName] || <IEventRecordList>{
        count: 0
      };
      events[eventName][this._id] = events[eventName][this._id] || [];
      (<IEventRecord[]>events[eventName][this._id]).push(eventRecord);
      events[eventName].count++;

      if (EventGroup._isElement(target)) {
        let processElementEvent = (...args: any[]) => {
          if (this._isDisposed) {
            return;
          }

          let result;
          try {
            result = callback.apply(parent, args);
            if (result === false && args[0]) {
              let e = args[0];

              if (e.preventDefault) {
                e.preventDefault();
              }

              if (e.stopPropagation) {
                e.stopPropagation();
              }

              e.cancelBubble = true;
            }
          } catch (e) {
            /* ErrorHelper.log(e); */
          }

          return result;
        };

        eventRecord.elementCallback = processElementEvent;

        if (target.addEventListener) {
          /* tslint:disable:ban-native-functions */
          (<EventTarget>target).addEventListener(eventName, processElementEvent, useCapture);
          /* tslint:enable:ban-native-functions */
        } else if (target.attachEvent) { // IE8
          target.attachEvent('on' + eventName, processElementEvent);
        }
      } else {
        let processObjectEvent = (...args: any[]) => {
          if (this._isDisposed) {
            return;
          }

          return callback.apply(parent, args);
        };

        eventRecord.objectCallback = processObjectEvent;
      }

      // Remember the record locally, so that it can be removed.
      this._eventRecords.push(eventRecord);
    }
  }

  public off(target?: any, eventName?: string, callback?: (args?: any) => void, useCapture?: boolean): void {
    for (let i = 0; i < this._eventRecords.length; i++) {
      let eventRecord = this._eventRecords[i];
      if ((!target || target === eventRecord.target) &&
        (!eventName || eventName === eventRecord.eventName) &&
        (!callback || callback === eventRecord.callback) &&
        ((typeof useCapture !== 'boolean') || useCapture === eventRecord.useCapture)) {
        let events = <IEventRecordsByName>eventRecord.target.__events__;
        let targetArrayLookup = events[eventRecord.eventName];
        let targetArray = targetArrayLookup ? <IEventRecord[]>targetArrayLookup[this._id] : null;

        // We may have already target's entries, so check for null.
        if (targetArray) {
          if (targetArray.length === 1 || !callback) {
            targetArrayLookup.count -= targetArray.length;
            delete events[eventRecord.eventName][this._id];
          } else {
            targetArrayLookup.count--;
            targetArray.splice(targetArray.indexOf(eventRecord), 1);
          }

          if (!targetArrayLookup.count) {
            delete events[eventRecord.eventName];
          }
        }

        if (eventRecord.elementCallback) {
          if (eventRecord.target.removeEventListener) {
            eventRecord.target.removeEventListener(eventRecord.eventName, eventRecord.elementCallback, eventRecord.useCapture);
          } else if (eventRecord.target.detachEvent) { // IE8
            eventRecord.target.detachEvent('on' + eventRecord.eventName, eventRecord.elementCallback);
          }
        }

        this._eventRecords.splice(i--, 1);
      }
    }
  }

  /** Trigger the given event in the context of this instance of EventGroup. */
  public raise(eventName: string, eventArgs?: any, bubbleEvent?: boolean): any {
    return EventGroup.raise(this._parent, eventName, eventArgs, bubbleEvent);
  }

  /** Declare an event as being supported by this instance of EventGroup. */
  public declare(event: any): void {
    let declaredEvents = this._parent.__declaredEvents = this._parent.__declaredEvents || {};

    if (typeof event === 'string') {
      declaredEvents[event] = true;
    } else {
      for (let i = 0; i < event.length; i++) {
        declaredEvents[event[i]] = true;
      }
    }
  }
}
