// simulant is written with `export = simulant` which means types must be imported like this
// without esModuleInterop
import * as SimulantType from 'simulant';

// But at runtime it has to be imported like this
const simulant: typeof SimulantType = require('simulant');

// ----------------------------------------
// Simulate DOM Events on real DOM nodes
// ----------------------------------------

/**
 * Generic method for dispatching an event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param eventType - A DOMString
 * @param data - Additional event data.
 * @returns The event
 */
export const fire = (node: Element | string, eventType: string, data: any = {}) => {
  const DOMNode = typeof node === 'string' ? document.querySelector(node) : node;
  const event = simulant(eventType, data);

  return simulant.fire(DOMNode, event);
};

/**
 * Dispatch a 'click' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const click = (node: Element | string, data?: any) => fire(node, 'click', data);

/**
 * Dispatch a 'keydown' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const keyDown = (node: Element | string, data?: any) => fire(node, 'keydown', data);

/**
 * Dispatch a 'mouseenter' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const mouseEnter = (node: Element | string, data?: any) => fire(node, 'mouseenter', data);

/**
 * Dispatch a 'mouseleave' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const mouseLeave = (node: Element | string, data?: any) => fire(node, 'mouseleave', data);

/**
 * Dispatch a 'mouseover' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const mouseOver = (node: Element | string, data?: any) => fire(node, 'mouseover', data);

/**
 * Dispatch a 'mouseup' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const mouseUp = (node: Element | string, data?: any) => fire(node, 'mouseup', data);

/**
 * Dispatch a 'resize' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const resize = (node: Element | string, data?: any) => fire(node, 'resize', data);

/**
 * Dispatch a 'scroll' event on a DOM node.
 * @param node - A querySelector string or DOM node.
 * @param data - Additional event data.
 * @returns The event
 */
export const scroll = (node: Element | string, data?: any) => fire(node, 'scroll', data);
