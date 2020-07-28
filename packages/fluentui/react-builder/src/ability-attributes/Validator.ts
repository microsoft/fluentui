/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    AbilityAttributesError,
    AssumeClass,
    ATTRIBUTE_NAME_CLASS,
    ATTRIBUTE_NAME_ERROR_ID,
    ATTRIBUTE_NAME_ERROR_MESSAGE,
    ATTRIBUTE_NAME_PROPS,
    AttributeSchemaClass,
    ErrorReporter,
    JSConstraints
} from './DevEnvTypes';
import * as Errors from './Errors';
import { AttributeSchema, ParamConstraint } from './Schema';
import { getAttributes, isAccessibleElement } from './Utils';

interface HTMLElementWithValidatorId extends HTMLElement {
    __aaValidatorId?: string;
}

type GetClass = (name: string) => AttributeSchemaClass | undefined;

let _error: ErrorReporter;
let _getClass: GetClass;
let _jsConstraints: JSConstraints;
let _assumeClass: AssumeClass;
let _isBrokenIE11: boolean;
let _validatorQueue: { [id: string]: HTMLElementWithValidatorId } = {};
let _removeQueue: { [id: string]: HTMLElementWithValidatorId } = {};
let _lastValidatorId = 0;
let _validatorTimer: number | undefined;
let _enforceClasses = true;
let _ignoreUnknownClasses = false;

try {
    // IE11 only accepts `filter` argument as a function (not object with the `acceptNode`
    // property as the docs define). Also `entityReferenceExpansion` argument is not
    // optional. And it throws exception when the above arguments aren't there.
    document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
    _isBrokenIE11 = false;
} catch (e) {
    _isBrokenIE11 = true;
}

function createElementTreeWalker(doc: Document, root: Node, acceptNode: (node: Node) => number): TreeWalker | undefined {
    // IE11 will throw an exception when the TreeWalker root is not an Element.
    if (root.nodeType !== Node.ELEMENT_NODE) {
        return undefined;
    }

    // TypeScript isn't aware of IE11 behaving badly.
    const filter = (_isBrokenIE11 ? acceptNode : ({ acceptNode } as NodeFilter)) as any as NodeFilter;

    return doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filter, false /* Last argument is not optional for IE11! */);
}

function validate(element: HTMLElementWithValidatorId) {
    const propsVal = element.getAttribute(ATTRIBUTE_NAME_PROPS);
    let a: AttributeSchema<any> | undefined;
    let error: AbilityAttributesError | undefined;

    try {
        const className = element.getAttribute(ATTRIBUTE_NAME_CLASS);

        if (className) {
            const Class = _getClass(className);

            if (Class) {
                if (propsVal) {
                    const props = JSON.parse(propsVal);
                    a = new (Class)(element.tagName.toLowerCase(), props);
                } else {
                    a = Class.fromAttributes(element.tagName.toLowerCase(), getAttributes(element));
                }
            } else if (!_ignoreUnknownClasses) {
                error = new Errors.UnknownClassError(className);
            } else {
                return;
            }
        } else if (_enforceClasses) {
            const tagName = element.tagName.toLowerCase();
            const attributes = getAttributes(element);

            if (isAccessibleElement(tagName, attributes)) {
                const Class = _assumeClass(tagName, attributes, element);

                if (Class) {
                    a = Class.fromAttributes(tagName, attributes);
                } else {
                    error = new Errors.NoClassError();
                }
            } else {
                return;
            }
        } else {
            return;
        }
    } catch (e) {
        error = (e instanceof AbilityAttributesError) ? e : new Errors.ValidationFailedError();
    }

    if (!error && a && a.getConstraints) {
        const constraints = a.getConstraints();

        constraints.every(constraint => {
            if ('one' in constraint) {
                return constraint.one.some(c => {
                    if (!checkConstraint(element, c)) {
                        error = new Errors.ConstraintNotSatisfiedError(c.description, constraint);

                        return false;
                    }

                    return true;
                });
            } else {
                if (!checkConstraint(element, constraint)) {
                    error = new Errors.ConstraintNotSatisfiedError(constraint.description, constraint);

                    return false;
                }

                return true;
            }
        });
    }

    if (error) {
        _error.report(element, error);
    } else {
        _error.remove(element);
    }
}

function checkConstraint(element: HTMLElement, constraint: ParamConstraint): boolean {
    if ('xpath' in constraint) {
        return queryXPath(element, constraint.xpath);
    } else if ('js' in constraint) {
        return queryJS(element, constraint.js, constraint.name, constraint.value);
    } else {
        return false;
    }
}

function queryXPath(element: HTMLElement, xpath: string): boolean {
    try {
        return document.evaluate(xpath, element, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
    } catch (e) {
        _error.report(element, new Errors.XPathExpressionFailedError(xpath, e.message));
        return true;
    }
}

function queryJS(element: HTMLElement, funcName: string, name?: string, value?: string | number | boolean | null): boolean {
    const func = _jsConstraints[funcName];

    if (func) {
        return func(element, value);
    }

    return false;
}

export function setup(
    win: Window,
    error: ErrorReporter,
    getClass: GetClass,
    jsConstraints: JSConstraints,
    enforceClasses: boolean,
    assumeClass: AssumeClass,
    ignoreUnknownClasses: boolean
) {
    if (!__DEV__) {
        return;
    }

    if ((typeof MutationObserver === 'undefined') || _isBrokenIE11 || (typeof document.evaluate !== 'function')) {
        return;
    }

    _error = error;
    _getClass = getClass;
    _jsConstraints = jsConstraints;
    _enforceClasses = enforceClasses;
    _assumeClass = assumeClass;
    _ignoreUnknownClasses = ignoreUnknownClasses;

    const observer = new MutationObserver(mutations => {
        let hasId = false;

        for (let mutation of mutations) {
            const added = mutation.addedNodes;
            const removed = mutation.removedNodes;
            const attributeName = mutation.attributeName;

            if ((attributeName !== null) &&
                    ((attributeName === ATTRIBUTE_NAME_ERROR_ID) || (attributeName === ATTRIBUTE_NAME_ERROR_MESSAGE))) {
                continue;
            }

            if (!hasId) {
                if (attributeName === 'id') {
                    hasId = true;

                    findTargets(win.document.body, false);
                } else {
                    lookUp(mutation.target);

                    for (let i = 0; i < added.length; i++) {
                        findTargets(added[i], false);
                    }
                }
            }

            for (let i = 0; i < removed.length; i++) {
                findTargets(removed[i], true);
            }
        }

        if (_validatorTimer) {
            win.clearTimeout(_validatorTimer);
        }

        // Defer validation a bit.
        _validatorTimer = win.setTimeout(() => {
            _validatorTimer = undefined;

            const toRemove = Object.keys(_removeQueue).map(id => _removeQueue[id]);
            const toValidate = Object.keys(_validatorQueue).map(id => _validatorQueue[id]);

            _removeQueue = {};
            _validatorQueue = {};

            toRemove.forEach(e => _error.remove(e));
            toValidate.filter(e => win.document.contains(e)).map(validate);
        }, 100);

        function lookUp(node: Node): void {
            for (let n: Node | null = node; n; n = n.parentNode) {
                acceptNode(n, false);
            }
        }

        function findTargets(node: Node, removed: boolean): void {
            acceptNode(node as HTMLElement, removed);

            const walker = createElementTreeWalker(win.document, node, (node: Node): number => {
                return acceptNode(node, removed);
            });

            if (walker) {
                while (walker.nextNode()) { /* Iterating for the sake of calling acceptNode callback. */ }
            }
        }

        function acceptNode(node: Node, removed: boolean): number {
            const element = node as HTMLElementWithValidatorId;

            if (element.getAttribute) {
                if (!element.__aaValidatorId) {
                    element.__aaValidatorId = 'aa-' + ++_lastValidatorId;
                }

                if (removed) {
                    if (element.getAttribute(ATTRIBUTE_NAME_ERROR_ID)) {
                        delete _validatorQueue[element.__aaValidatorId];
                        _removeQueue[element.__aaValidatorId] = element;
                    }
                } else {
                    delete _removeQueue[element.__aaValidatorId];
                    _validatorQueue[element.__aaValidatorId] = element;
                }
            }

            return NodeFilter.FILTER_SKIP;
        }
    });

    observer.observe(win.document, { childList: true, subtree: true, attributes: true });
}
