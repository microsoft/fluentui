/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/* eslint-disable */

import { AbilityAttributesError, AssumptionSpecificity, ATTRIBUTE_NAME_CLASS } from './DevEnvTypes';
import * as Errors from './Errors';
import { AccessibilityAttributes, HTMLElementAttributes } from './HTML';

export interface ParameterValue {
  parameter: string | number | boolean | null;
  attribute: string | boolean | (string | boolean)[];
}

export interface AttributeInParameter {
  name: string;
  value?: ParameterValue[];
  constraints?: (Constraint | ConstraintRef)[];
  optional?: boolean;
}

export interface ParameterEntry {
  name: string;
  attributes: AttributeInParameter[];
}

export interface TagRuntimeParameters {
  [name: string]: {
    class: string;
    param: ParameterEntry;
  };
}

export interface RuntimeParameters {
  [tagName: string]: TagRuntimeParameters;
}

export interface AttributeToParameter {
  [name: string]: string;
}

export interface AttributeToParameterByTag {
  [tagName: string]: AttributeToParameter;
}

export interface MandatoryParameters {
  [paramClass: string]: string[];
}

export interface VariantsInClass {
  [paramClass: string]: number;
}

export interface AttributeEntry {
  name: string;
  default?: string;
  value?: { [value: string]: boolean };
  optional?: boolean;
}

export interface NonParameterAttribute {
  [attrName: string]: {
    class: string;
    attr: AttributeEntry;
  };
}

export interface NonParameterAttributesByTag {
  [tagName: string]: NonParameterAttribute;
}

export interface AttributeDefaults {
  [attrName: string]: string;
}

export interface ConstraintRef {
  ref: string;
}

export type ConstraintEntry =
  | {
      xpath: string;
      description: string;
    }
  | {
      js: string;
      description: string;
    };

export type Constraint = ConstraintEntry | { one: ConstraintEntry[] };

export interface TagConstraints {
  [tagName: string]: Constraint[];
}

export type ParamConstraint = (ConstraintEntry | { one: ConstraintEntry[] }) & {
  param?: string;
  name?: string;
  value?: string | number | boolean | null;
};

export interface AttributeInAssumption {
  name: string;
  value: string;
}

export type ClassAssumption =
  | {
      tag: string;
      attributes: AttributeInAssumption[];
    }
  | {
      tag: string;
    }
  | {
      attributes: AttributeInAssumption[];
    };

export interface TagsByTag {
  [tagName: string]: string;
}

export abstract class AttributeSchema<P extends { [name: string]: any }> {
  protected abstract _className: string;
  protected abstract _allParamsByTag: RuntimeParameters;
  protected abstract _attrToParamByTag: AttributeToParameterByTag;
  protected abstract _mandatoryParams: MandatoryParameters;
  protected abstract _nonParamAttrsByTag: NonParameterAttributesByTag;
  protected _tagName: string;
  protected _params: P;
  protected _paramNames: string[];
  protected _defaults?: AttributeDefaults;

  getConstraints?: () => ParamConstraint[];

  constructor(tagName: string, params: P) {
    this._tagName = tagName.toLowerCase();
    this._params = params;
    this._paramNames = Object.keys(params).filter(name => params[name] !== undefined);
  }

  static assume?: (tagName: string, attributes: HTMLElementAttributes) => AssumptionSpecificity | undefined;

  private static _error(error: AbilityAttributesError): void {
    throw error;
  }

  private _error(error: AbilityAttributesError): void {
    AttributeSchema._error(error);
  }

  protected _setDefaults(defaults: AttributeDefaults): void {
    this._defaults = defaults;
  }

  protected static _assignTagNames(
    byTag: { [tagsName: string]: any },
    tagsByTag: TagsByTag,
  ): { [tagName: string]: any } {
    const tagNames = Object.keys(tagsByTag);
    const ret: { [tagName: string]: any } = {};

    for (let tagName of tagNames) {
      ret[tagName] = byTag[tagsByTag[tagName]];
    }

    return ret;
  }

  getAttributes(): HTMLElementAttributes {
    const params = this._params;
    const allParams = this._allParamsByTag[this._tagName];
    const classes: { [cls: string]: string } = {};
    const attrs: HTMLElementAttributes = {};
    const attrToParam = this._attrToParamByTag[this._tagName];
    const nonParamAttrs = this._nonParamAttrsByTag[this._tagName];

    if (__DEV__) {
      attrs[ATTRIBUTE_NAME_CLASS] = this._className;
    }

    if (!allParams || !nonParamAttrs) {
      if (__DEV__) {
        this._error(new Errors.IllegalTagError(this._tagName, this._className));
      }

      return attrs;
    }

    for (let paramName of this._paramNames) {
      const paramDef = allParams[paramName];

      if (!paramDef) {
        if (__DEV__) {
          this._error(new Errors.UnknownParameterError(paramName, this._className));
        }

        continue;
      }

      if (paramDef.class in classes) {
        if (__DEV__) {
          this._error(new Errors.ExcessiveParameterError(paramName, classes[paramDef.class], this._className));
        }

        continue;
      }

      classes[paramDef.class] = paramName;

      for (let a of paramDef.param.attributes) {
        if (a.optional) {
          continue;
        }

        const values = a.value;

        if (values) {
          let illegalValue = true;

          for (let value of values) {
            if (value.parameter === params[paramName]) {
              const aVal = typeof value.attribute === 'object' ? value.attribute[0] : value.attribute;

              if (typeof aVal === 'boolean') {
                if (aVal) {
                  attrs[a.name] = '';
                }
              } else {
                attrs[a.name] = aVal;
              }
              illegalValue = false;
              break;
            }
          }

          if (__DEV__ && illegalValue) {
            this._error(new Errors.IllegalParameterValueError(paramName, params[paramName], this._className));
          }
        } else {
          attrs[a.name] = params[paramName];
        }
      }
    }

    if (__DEV__) {
      for (let c of Object.keys(this._mandatoryParams)) {
        if (!(c in classes)) {
          this._error(
            new Errors.MissingParameterError(this._mandatoryParams[c].map(p => `'${p}'`).join(' or '), this._className),
          );
        }
      }
    }

    for (let a of Object.keys(nonParamAttrs)) {
      const attr = nonParamAttrs[a].attr;

      if (!(a in attrs)) {
        if (this._defaults && a in this._defaults) {
          attrs[a] = this._defaults[a];
        } else if (attr.default !== undefined) {
          if (!attr.optional) {
            attrs[a] = attr.default;
          }
        } else if (__DEV__) {
          this._error(new Errors.SchemaNoAttributeValueError(a, this._className));
        }
      } else if (__DEV__ && (!attr.value || !(attrs[a] in attr.value))) {
        this._error(new Errors.SchemaIllegalAttributeValueError(attrToParam[a], a, this._className));
      }
    }

    return attrs;
  }

  protected static _getParamsFromAttributes<P extends { [name: string]: any }>(
    tagName: string,
    attributes: HTMLElementAttributes,
    className: string,
    allParamsByTag: RuntimeParameters,
    attrToParamByTag: AttributeToParameterByTag,
    paramToAttrByTag: AttributeToParameterByTag,
    mandatoryParams: MandatoryParameters,
    nonParamAttrs: NonParameterAttributesByTag,
  ): { params: P; defaults: AttributeDefaults } {
    const allParams = allParamsByTag[tagName];
    const attrToParam = attrToParamByTag[tagName];
    const paramToAttr = paramToAttrByTag[tagName];
    const nonParamAttrsForTag = nonParamAttrs[tagName];

    if (__DEV__ && !nonParamAttrsForTag) {
      AttributeSchema._error(new Errors.IllegalTagError(tagName, className));
    }

    const params: { [name: string]: string | number | boolean | null } = {};
    const classes: { [cls: string]: string } = {};
    const attributesUsed: { [name: string]: true } = {};
    const defaults: AttributeDefaults = {};
    const attrNames = Object.keys(attributes);

    for (let attrName of attrNames) {
      if (!attributesUsed[attrName] && attrName in attrToParam) {
        const paramName = attrToParam[attrName];
        const param = allParams[paramName];

        if (__DEV__ && param.class in classes) {
          AttributeSchema._error(new Errors.ExcessiveAttributeError(attrName, classes[param.class], className));
        }

        classes[param.class] = attrName;
        let paramVal: ParameterValue['parameter'] | undefined;

        for (let a of param.param.attributes) {
          if (a.value) {
            let illegalValue = true;

            for (let value of a.value) {
              const attrVal = attributes[a.name];
              const eVal = value.attribute;
              let expectedBool: boolean | undefined;
              let expectedStr: string[] = [];

              if (typeof eVal === 'object') {
                for (let v of eVal) {
                  if (typeof v === 'string') {
                    expectedStr.push(v);
                  } else {
                    expectedBool = v;
                  }
                }
              } else if (typeof eVal === 'string') {
                expectedStr.push(eVal);
              } else {
                expectedBool = eVal;
              }

              const valueMatched =
                (!a.optional && expectedBool === false && attrVal === undefined) ||
                (expectedBool === true && (attrVal === '' || attrVal === attrName)) ||
                expectedStr.indexOf(attrVal) >= 0;

              if (valueMatched || paramVal === value.parameter) {
                if (__DEV__ && paramVal !== undefined && paramVal !== value.parameter) {
                  AttributeSchema._error(
                    new Errors.InconsistentParameterValueError(param.param.name, paramVal, value.parameter, className),
                  );
                }

                if (valueMatched || (attrVal === undefined && a.optional)) {
                  illegalValue = false;
                }

                if (paramVal === undefined) {
                  paramVal = value.parameter;
                  break;
                }
              }
            }

            if (__DEV__ && illegalValue) {
              AttributeSchema._error(new Errors.IllegalAttributeValueError(a.name, attributes[a.name], className));
            }
          } else {
            paramVal = attributes[attrName];
          }

          attributesUsed[a.name] = true;
        }

        if (paramVal !== undefined) {
          params[paramName] = paramVal;
        }
      }
    }

    for (let c of Object.keys(mandatoryParams)) {
      if (__DEV__ && !(c in classes)) {
        AttributeSchema._error(
          new Errors.MissingAttributeError(mandatoryParams[c].map(p => `'${paramToAttr[p]}'`).join(' or '), className),
        );
      }
    }

    for (let a of Object.keys(nonParamAttrsForTag)) {
      if (a in attributesUsed) {
        continue;
      }

      const attr = nonParamAttrsForTag[a].attr;
      const v = attributes[a];

      if (__DEV__ && !(a in attributes) && !(v === undefined && attr.optional)) {
        AttributeSchema._error(new Errors.MissingAttributeError(a, className));
      }

      attributesUsed[a] = true;

      if (v === undefined && attr.optional) {
        continue;
      }

      if (attr.value) {
        if (v in attr.value) {
          defaults[a] = v;
        } else if (__DEV__) {
          AttributeSchema._error(new Errors.IllegalAttributeValueError(a, v, className));
        }
      } else {
        defaults[a] = v;
      }
    }

    if (__DEV__) {
      for (let attrName of attrNames) {
        if (!(attrName in attributesUsed) && attrName in AccessibilityAttributes) {
          AttributeSchema._error(new Errors.IllegalTagAttributeError(attrName, tagName, className));
        }
      }
    }

    return { params: params as P, defaults };
  }
}
