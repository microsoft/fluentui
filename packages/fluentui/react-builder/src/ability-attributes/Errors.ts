/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AbilityAttributesError } from './DevEnvTypes';

enum ErrorCode {
    AmbiguousAssumption = 1,
    IllegalTag,
    UnknownParameter,
    ExcessiveParameter,
    IllegalParameterValue,
    MissingParameter,
    SchemaNoAttributeValue,
    SchemaIllegalAttributeValue,
    ExcessiveAttribute,
    InconsistentParameterValue,
    IllegalAttributeValue,
    MissingAttribute,
    IllegalTagAttribute,
    UnknownClass,
    ValidationFailed,
    NoClass,
    ConstraintNotSatisfied,
    XPathExpressionFailed
}

export class AmbiguousAssumptionError extends AbilityAttributesError {
    code = ErrorCode.AmbiguousAssumption;

    constructor(className1: string, className2: string) {
        super(`Ambiguous class assumption: '${ className1 }' and '${ className2 }'`);
    }
}

export class UnknownClassError extends AbilityAttributesError {
    code = ErrorCode.UnknownClass;

    constructor(className: string) {
        super(`Unknown class '${ className }'`);
    }
}

export class ValidationFailedError extends AbilityAttributesError {
    code = ErrorCode.ValidationFailed;

    constructor() {
        super('Failed to validate element');
    }
}

interface ParamConstraint {
    param?: string;
    name?: string;
    value?: string | number | boolean | null;
}

export class ConstraintNotSatisfiedError extends AbilityAttributesError {
    code = ErrorCode.ConstraintNotSatisfied;

    constructor(description: string, constraint: ParamConstraint) {
        super((() => {
            let errorMessage = description;

            if (constraint.param || (constraint.name && constraint.value)) {
                errorMessage += ' (';

                if (constraint.param) {
                    errorMessage += `when no ${ constraint.param } specified`;
                }

                if (constraint.name && constraint.value) {
                    if (constraint.param) {
                        errorMessage += ', ';
                    }

                    errorMessage += `parameter '${ constraint.name }', value: '${ constraint.value }'`;
                }

                errorMessage += ')';
            }

            return errorMessage;
        })());
    }
}

export class XPathExpressionFailedError extends AbilityAttributesError {
    code = ErrorCode.XPathExpressionFailed;

    constructor(xpath: string, message: string) {
        super(`Failed to evaluate expression: ${ xpath }, ${ message }`);
    }
}

export class NoClassError extends AbilityAttributesError {
    code = ErrorCode.NoClass;

    constructor() {
        super('Accessible element must have accessibility class assigned');
    }
}

abstract class ClassError extends AbilityAttributesError {
    constructor(message: string, className: string) {
        super(`${ message } in class '${ className }'`);
    }
}

export class IllegalTagError extends ClassError {
    code = ErrorCode.IllegalTag;

    constructor(tagName: string, className: string) {
        super(`Illegal tag '${ tagName }'`, className);
    }
}

export class UnknownParameterError extends ClassError {
    code = ErrorCode.UnknownParameter;

    constructor(paramName: string, className: string) {
        super(`Unknown parameter '${ paramName }'`, className);
    }
}

export class ExcessiveParameterError extends ClassError {
    code = ErrorCode.ExcessiveParameter;

    constructor(paramName1: string, paramName2: string, className: string) {
        super(`Only one of '${ paramName1 }' or '${ paramName2 }' parameters can be present`, className);
    }
}

export class IllegalParameterValueError extends ClassError {
    code = ErrorCode.IllegalParameterValue;

    constructor(paramName: string, value: string, className: string) {
        super(`Illegal parameter value '${ value }' of parameter '${ paramName }'`, className);
    }
}

export class MissingParameterError extends ClassError {
    code = ErrorCode.MissingParameter;

    constructor(paramName: string, className: string) {
        super(`Missing mandatory parameter ${ paramName }`, className);
    }
}

export class SchemaNoAttributeValueError extends ClassError {
    code = ErrorCode.SchemaNoAttributeValue;

    constructor(attrName: string, className: string) {
        super(`Schema error, attribute '${ attrName }' does not have a value`, className);
    }
}

export class SchemaIllegalAttributeValueError extends ClassError {
    code = ErrorCode.SchemaIllegalAttributeValue;

    constructor(paramName: string, attrName: string, className: string) {
        super(`Schema error, parameter '${ paramName }' sets illegal value of attribute '${ attrName }'`, className);
    }
}

export class ExcessiveAttributeError extends ClassError {
    code = ErrorCode.ExcessiveAttribute;

    constructor(attrName1: string, attrName2: string, className: string) {
        super(`Only one of '${ attrName1 }' and '${ attrName2 }' attributes can be present`, className);
    }
}

export class InconsistentParameterValueError extends ClassError {
    code = ErrorCode.InconsistentParameterValue;

    constructor(paramName: string, value1: any, value2: any, className: string) {
        super(`Inconsistent value of parameter '${ paramName }': '${ value1 }' != '${ value2 }'`, className);
    }
}

export class IllegalAttributeValueError extends ClassError {
    code = ErrorCode.IllegalAttributeValue;

    constructor(attrName: string, value: string, className: string) {
        super(`Illegal attribute value '${ value }' of attribute '${ attrName }'`, className);
    }
}

export class MissingAttributeError extends ClassError {
    code = ErrorCode.MissingAttribute;

    constructor(attrName: string, className: string) {
        super(`Missing mandatory attribute ${ attrName }`, className);
    }
}

export class IllegalTagAttributeError extends ClassError {
    code = ErrorCode.IllegalTagAttribute;

    constructor(attrName: string, tagName: string, className: string) {
        super(`Illegal attribute '${ attrName }' for tag '${ tagName }'`, className);
    }
}
