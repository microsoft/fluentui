/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    AccessibilityAttributes,
    AccessibleElements,
    HTMLElementAttributes
} from './HTML';

export function isAccessibleElement(tagName: string, attributes: HTMLElementAttributes): boolean {
    if (tagName in AccessibleElements) {
        return true;
    }

    return hasAccessibilityAttribute(attributes);
}

export function hasAccessibilityAttribute(attributes: HTMLElementAttributes): boolean {
    for (let attrName of Object.keys(attributes)) {
        if ((attrName in AccessibilityAttributes) &&
            !((attrName === 'role') && ((attributes[attrName] === 'none') || (attributes[attrName] === 'presentation')))) {

            return true;
        }
    }

    return false;
}

export function getAttributes(element: HTMLElement): HTMLElementAttributes {
    const names = element.getAttributeNames();
    const attributes: HTMLElementAttributes = {};

    for (let name of names) {
        attributes[name] = element.getAttribute(name) || '';
    }

    return attributes;
}
