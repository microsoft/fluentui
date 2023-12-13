import { contrast, hex_to_sRGB, Vec3 } from '../../colors';
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
      return { isPass: true };
    }

    const currSRGB: Vec3 = hex_to_sRGB(currHex);
    const compSRGB: Vec3 = hex_to_sRGB(compHex);

    const contrastRatio = contrast(currSRGB, compSRGB);
    const roundedContrastRatio = Math.floor(contrastRatio * 10) / 10;

    return {
      isPass: contrastRatio >= desiredRatio,
      failInfo: {
        compHex: compHex,
        ratio: roundedContrastRatio.toFixed(1),
        desiredRatio: desiredRatio.toFixed(1),
      },
    };
  };

  const checkDuplicate = (failList: ContrastRatio[], failInfo: ContrastRatio): ContrastRatio[] => {
    let exists = false;
    const newFailList = failList.map(ratio => {
      if (ratio.compHex === failInfo.compHex) {
        exists = true;
        ratio = {
          ...ratio,
          desiredRatio: ratio.desiredRatio > failInfo.desiredRatio ? ratio.desiredRatio : failInfo.desiredRatio,
        };
      }
      return ratio;
    });

    if (exists) {
      return newFailList;
    } else {
      failList.push(failInfo);
      return failList;
    }
  };

  const all: string[] = [];
  const fail: ContrastRatioList = {};

  Object.keys(accessiblePairs).map(token => {
    const failList: ContrastRatio[] = [];

    // Go through all comparisons for each token
    for (let i = 0; i < accessiblePairs[token].length; i++) {
      const [compToken, ratio] = accessiblePairs[token][i];
      const { isPass, failInfo } = calculateContrastRatio(token, compToken, ratio);
      if (!isPass && failInfo) {
        checkDuplicate(failList, failInfo);
      }
    }

    // Check if there are any accessibility failures
    if (failList.length > 0) {
      fail[token] = failList;
    }

    all.push(token);

    return failList;
  });

  return { all, fail };
};
