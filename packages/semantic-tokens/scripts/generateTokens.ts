import { generics } from './definitions/generics';
// import { primitives } from './definitions/primitives';
import { GroupPart, Groups } from './definitions/groups.types';
import { controls } from './definitions/controls';

const joiner = '.';

export interface Token {
  name: string;
  figmaAlias: string;
  type?: string;
  property?: string;
  group?: string;
  state?: string;
  variant?: string;
}

// These help us map the property to a type, and eventual value classification
const propertyTypes = {
  background: 'color',
  foreground: 'color',
  stroke: 'color',
  fontsize: 'dimension',
  lineheight: 'dimension',
  padding: 'dimension',
  gap: 'dimension',
  shadow: 'shadow',
  corner: 'dimension',
  size: 'dimension',
  divider: 'color',
  color: 'color',
  strokewidth: 'dimension',
  fontfamily: 'string',
  weight: 'weight',
};

const generateGenericTokenName = ({
  variant,
  emphasis,
  property,
  state,
}: {
  collectionName?: string;
  groupName?: string;
  variant?: string;
  scale?: string;
  emphasis?: string;
  partName?: string;
  property?: string;
  state?: string;
}) => {
  return [property, variant, emphasis, state].filter(Boolean).join(joiner);
};

const generateGroupTokenName = ({
  collectionName,
  groupName,
  variant,
  scale,
  partName,
  property,
  state,
}: {
  collectionName?: string;
  groupName?: string;
  variant?: string;
  scale?: string;
  partName?: string;
  property?: string;
  state?: string;
}) => {
  return [collectionName, groupName, variant, scale, partName, property, state].filter(Boolean).join(joiner);
};

// We use a different format for figma interfaces, optimized for use/searchability
const generateFigmaName = ({
  collectionName,
  groupName,
  variant,
  scale,
  partName,
  property,
  state,
}: {
  collectionName?: string;
  groupName?: string;
  variant?: string;
  scale?: string;
  partName?: string;
  property?: string;
  state?: string;
}) => {
  if (state === '') {
    state = 'rest';
  }
  return [property, collectionName, groupName, variant, scale, partName, state].filter(Boolean).join(joiner);
};

// export function generatePrimitiveTokens() {
//   let result = [];

//   for (const prim of Object.keys(primitives)) {
//     for (const style of primitives[prim].styles) {
//       for (const state of primitives[prim].states) {
//         let tokenParts = [prim, style, state];

//         result.push({
//           name: tokenParts.filter(Boolean).join(joiner),
//           type: primitives[prim].type || 'color',
//           property: null,
//         });
//       }
//     }
//   }
//   return result;
// }

export function generateGenericTokens() {
  let result: Array<Token> = [];

  for (const property of Object.keys(generics)) {
    for (const variant of generics[property].variants) {
      for (const emphasis of generics[property].emphasis || ['']) {
        const states = generics[property].states || [''];
        for (const state of states) {
          const propertyToken = {
            name: generateGenericTokenName({ property, emphasis, variant, state }),
            // Figma alias is the same on generic tokens (property first)
            figmaAlias: generateGenericTokenName({ property, emphasis, variant, state }),
            type: generics[property].type || 'dimension',
            property,
            emphasis,
            variant,
            state,
          };

          result.push(propertyToken);
        }
      }
    }

    const exceptions = generics[property].exceptions || [];
    for (const exception of exceptions) {
      for (const variant of exception.variants) {
        for (const emphasis of exception.emphasis || []) {
          const states = exception.states || [''];
          for (const state of states) {
            const propertyToken = {
              name: generateGenericTokenName({ property, emphasis, variant, state }),
              // Figma alias is the same on generic tokens (property first)
              figmaAlias: generateGenericTokenName({ property, emphasis, variant, state }),
              type: exception.type || 'dimension',
              property,
              emphasis,
              variant,
              state,
            };

            result.push(propertyToken);
          }
        }
      }
    }
  }
  return result;
}

export function generateComponentGroupTokens(
  collectionName: string,
  groupName: string,
  group: GroupPart,
  partName?: string,
) {
  let result: Array<Token> = [];
  const groupCoreGroupProperties = group.coreProperties || [];
  for (const property of groupCoreGroupProperties) {
    let type = propertyTypes[property as keyof typeof propertyTypes] || 'dimension';

    const groupToken = {
      name: generateGroupTokenName({ collectionName, groupName, partName, property }),
      figmaAlias: generateFigmaName({ collectionName, groupName, partName, property }),
      type,
      property: property,
      group: groupName,
    };

    if (!result.find(r => r.name === groupToken.name)) {
      result.push(groupToken);
    }
  }

  // For each group, generate property tokens for each variant and scale
  const groupVariantStateProperties = group.variantStateProperties || [];
  for (const property of groupVariantStateProperties) {
    const groupVariants = group.variants || [];
    for (let variant of groupVariants) {
      const groupStates = group.states || ['rest'];
      for (let state of groupStates) {
        let type = propertyTypes[property as keyof typeof propertyTypes] || 'dimension';

        const groupToken = {
          name: generateGroupTokenName({ collectionName, groupName, variant, partName, property, state }),
          figmaAlias: generateFigmaName({ collectionName, groupName, variant, partName, property, state }),
          type,
          property: property,
          group: groupName,
        };

        if (!result.find(r => r.name === groupToken.name)) {
          result.push(groupToken);
        }
      }
    }
  }

  // Add variant properties that don't have states
  const groupVariantProperties = group.variantProperties || [];
  for (const property of groupVariantProperties) {
    const groupVariants = group.variants || [];
    for (let variant of groupVariants) {
      let type = propertyTypes[property as keyof typeof propertyTypes] || 'dimension';

      const groupToken = {
        name: generateGroupTokenName({ collectionName, groupName, variant, partName, property }),
        figmaAlias: generateFigmaName({ collectionName, groupName, variant, partName, property }),
        type,
        property: property,
        group: groupName,
      };

      if (!result.find(r => r.name === groupToken.name)) {
        result.push(groupToken);
      }
    }
  }

  // Add tokens for scale properties
  const groupScales = group.scales || ['default'];
  for (const scale of groupScales) {
    const groupScaleProperties = group.scaleProperties || [];
    for (const property of groupScaleProperties) {
      let type = propertyTypes[property as keyof typeof propertyTypes] || 'dimension';

      const groupScaleToken = {
        name: generateGroupTokenName({ collectionName, groupName, scale, partName, property }),
        figmaAlias: generateFigmaName({ collectionName, groupName, scale, partName, property }),
        type,
        property,
        group: groupName,
        scale,
      };

      if (!result.find(r => r.name === groupScaleToken.name)) {
        result.push(groupScaleToken);
      }
    }
  }

  // For each group, generate property tokens for each state and scale
  const groupScaleStateProperties = group.scaleStateProperties || [];
  for (const property of groupScaleStateProperties) {
    const groupScales = group.scales || [];
    for (let scale of groupScales) {
      const groupStates = group.states || ['rest'];
      for (let state of groupStates) {
        let type = propertyTypes[property as keyof typeof propertyTypes] || 'dimension';

        const groupToken = {
          name: generateGroupTokenName({ collectionName, groupName, scale, partName, property, state }),
          figmaAlias: generateFigmaName({ collectionName, groupName, scale, partName, property, state }),
          type,
          property: property,
          group: groupName,
        };

        if (!result.find(r => r.name === groupToken.name)) {
          result.push(groupToken);
        }
      }
    }
  }

  return result;
}

export function generateGroupTokens(groups: Groups) {
  let result: Token[] = [];

  // For each group, generate core property tokens
  for (const group of Object.keys(groups)) {
    const groupTokens = generateComponentGroupTokens('group', group, groups[group]);
    result = result.concat(groupTokens);

    if (groups[group].exceptions) {
      groups[group].exceptions.forEach(exception => {
        const exceptionTokens = generateComponentGroupTokens('group', group, exception);
        result = result.concat(exceptionTokens);
      });
    }

    // Handle any parts of the group (generated in a similar way to groups)
    const groupParts = groups[group].parts || {};
    for (const part of Object.keys(groupParts)) {
      const partTokens = generateComponentGroupTokens('group', `${group}`, groupParts[part], part);
      result = result.concat(partTokens);

      if (groupParts[part].exceptions) {
        groupParts[part].exceptions.forEach(exception => {
          const exceptionTokens = generateComponentGroupTokens('group', group, exception, part);
          result = result.concat(exceptionTokens);
        });
      }
    }
  }

  return result;
}

export function generateControlTokens() {
  let result: Token[] = [];

  // For each control group, generate core property tokens
  for (const group of Object.keys(controls)) {
    const groupTokens = generateComponentGroupTokens('ctrl', group, controls[group]);
    result = result.concat(groupTokens);

    if (controls[group].exceptions) {
      controls[group].exceptions.forEach(exception => {
        const exceptionTokens = generateComponentGroupTokens('ctrl', group, exception);
        result = result.concat(exceptionTokens);
      });
    }

    // Handle any parts of the group (generated in a similar way to groups)
    const groupParts = controls[group].parts || {};
    for (const part of Object.keys(groupParts)) {
      const partTokens = generateComponentGroupTokens('ctrl', `${group}`, groupParts[part], part);
      result = result.concat(partTokens);

      if (groupParts[part].exceptions) {
        groupParts[part].exceptions.forEach(exception => {
          const exceptionTokens = generateComponentGroupTokens('ctrl', group, exception, part);
          result = result.concat(exceptionTokens);
        });
      }
    }
  }

  return result;
}
