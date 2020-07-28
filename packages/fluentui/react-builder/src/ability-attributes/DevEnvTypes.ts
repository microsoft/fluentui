/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { JSConstraintFunction } from 'ability-attributes-js-constraints';

import { HTMLElementAttributes } from './HTML';
import { AttributeSchema } from './Schema';

export const ATTRIBUTE_NAME_CLASS = 'data-aa-class';
export const ATTRIBUTE_NAME_ERROR_ID = 'data-aa-error-id';
export const ATTRIBUTE_NAME_ERROR_MESSAGE = 'data-aa-error-message';
export const ATTRIBUTE_NAME_PROPS = 'data-aa-props';

export abstract class AbilityAttributesError extends Error {
    abstract readonly code: number;
}

export abstract class ErrorReporter {
    abstract report(element: HTMLElement, error: AbilityAttributesError): void;
    abstract remove(element: HTMLElement): void;
    abstract dismiss(element: HTMLElement): void;
    abstract toggle(): void;
}

export type AssumptionSpecificity = { tag: boolean; attributes: number; };

export type AssumeClass = (tagName: string, attributes: HTMLElementAttributes,
    element: HTMLElement | null) => AttributeSchemaClass | undefined;

export interface AttributeSchemaClass<P = any> {
    new (tagName: string, params?: P): AttributeSchema<P>;
    className: string;
    fromAttributes(tagName: string, attributes: HTMLElementAttributes): AttributeSchema<P>;
    assume?: (tagName: string, attributes: HTMLElementAttributes) => AssumptionSpecificity | undefined;
}

export { JSConstraintFunction };

export interface JSConstraints {
    [funcName: string]: JSConstraintFunction;
}

export interface DevEnv {
    error: ErrorReporter;
    jsConstraints: JSConstraints;
}

export interface WindowWithDevEnv extends Window {
    __abilityAttributesDev?: DevEnv;
}

export interface WindowWithClassMap extends Window {
    __abilityAttributesDevClassMap?: { [name: string]: AttributeSchemaClass };
}

export interface DevEnvSettings {
    enforceClasses?: boolean;
    ignoreUnknownClasses?: boolean;
    window?: Window;
}
