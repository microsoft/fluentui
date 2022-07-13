import { contrast, hex_to_sRGB, Vec3 } from '@fluent-blocks/colors';
import { Theme } from '@fluentui/react-components';
import { accessiblePairs } from './AccessiblePairs';

export type ContrastRatio = {
  compHex: string;
  ratio: string;
  desiredRatio: string;
};

export type ContrastRatioList = Record<string, ContrastRatio[]>;

export const getAccessibilityChecker = (theme: Partial<Theme>) => {
  const currTheme = (theme as unknown) as Record<string, string>;

  const calculateContrastRatio = (curr: string, comp: string, desiredRatio: number) => {
    const currHex: string = currTheme[curr];
    const compHex: string = currTheme[comp];

    if (!currHex || !compHex || currHex === 'transparent' || compHex === 'transparent') {
      return { pass: true };
    }
    console.log(curr);
    console.log(comp);

    console.log(currHex);
    console.log(compHex);

    const currSRGB: Vec3 = hex_to_sRGB(currHex);
    const compSRGB: Vec3 = hex_to_sRGB(compHex);

    const contrastRatio = contrast(currSRGB, compSRGB);

    return {
      pass: contrastRatio >= desiredRatio,
      failInfo: {
        compHex: compHex,
        ratio: contrastRatio.toFixed(1),
        desiredRatio: desiredRatio.toFixed(1),
      },
    };
  };

  const pass: string[] = [];
  const fail: ContrastRatioList = {};

  Object.keys(accessiblePairs).map(token => {
    const failList: ContrastRatio[] = [];

    // Go through all comparisons for each token
    for (let i = 0; i < accessiblePairs[token].length; i++) {
      const [compToken, ratio] = accessiblePairs[token][i];
      const { pass, failInfo } = calculateContrastRatio(token, compToken, ratio);
      if (!pass && failInfo) {
        failList.push(failInfo);
      }
    }

    // Check if there are any accessibility failures
    if (failList.length > 0) {
      fail[token] = failList;
    } else {
      pass.push(token);
    }
  });

  return { pass, fail };
};
