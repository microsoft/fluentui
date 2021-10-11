import {
  CSSClasses,
  CSSClassesMap,
  DEFINITION_LOOKUP_TABLE,
  LookupItem,
  makeStyles as vanillaMakeStyles,
  SEQUENCE_PREFIX,
  SequenceHash,
} from '@fluentui/make-styles';
import { useFluent } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { useRenderer } from './RendererContext';
import type { MakeStylesOptions, MakeStylesStyleRule } from '@fluentui/make-styles';
import type { Theme } from '@fluentui/react-theme';

function isInsideComponent() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useContext(({} as unknown) as React.Context<unknown>);
    return true;
  } catch (e) {
    return false;
  }
}

export function makeStyles<Slots extends string | number>(stylesBySlots: Record<Slots, MakeStylesStyleRule<Theme>>) {
  const getStyles = vanillaMakeStyles(stylesBySlots);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent()) {
      throw new Error(
        [
          "makeStyles(): this function cannot be called in component's scope.",
          'All makeStyles() calls should be top level i.e. in a root scope of a file.',
        ].join(' '),
      );
    }
  }

  return function useClasses(): Record<Slots, string> {
    const { dir } = useFluent();

    const renderer = useRenderer();
    const options: MakeStylesOptions = {
      dir,
      renderer,
    };

    return getStyles(options);
  };
}

/* --- */

function getClassName(classes: CSSClasses, direction: 'ltr' | 'rtl') {
  return Array.isArray(classes) ? (direction === 'rtl' ? classes[1] : classes[0]) : classes;
}

function findRootSequenceForClassName(className: string, direction: 'ltr' | 'rtl', originSequence: string): string {
  const sequenceList = window.debugMKS[originSequence] as Record<SequenceHash, LookupItem> | undefined;

  if (sequenceList) {
    const sequences = Object.entries(sequenceList);
    const sequenceId = sequences.find(([sequenceId, lookupItem]) => {
      const lookupClasses: CSSClassesMap = lookupItem[0];

      return Object.values(lookupClasses).find(classes => getClassName(classes, direction) === className);
    });

    return sequenceId[0];
  }

  return originSequence;
}

function f(element: HTMLElement) {
  const sequenceId = Array.from(element.classList).find(className => className.startsWith(SEQUENCE_PREFIX));

  if (sequenceId) {
    const s: LookupItem = DEFINITION_LOOKUP_TABLE[sequenceId];

    const direction = s[1];
    const classesToProperties = s[0];

    const rules = Object.values(classesToProperties).reduce((acc, classes) => {
      const className = getClassName(classes, direction);
      const realSequenceId = findRootSequenceForClassName(className, direction, sequenceId);

      acc.push({
        className,
        sequenceId: realSequenceId,
        css: ((window as any).debugMKC as string[]).find(cssRule => cssRule.includes(className)),
      });

      return acc;
    }, []);

    console.log('direction', direction);
    console.log('css', rules, JSON.stringify(rules));

    console.log(sequenceId, s);

    return {
      direction,
      sequenceId,
      rules,
    };
  }

  return 'foo';
}

if (typeof window !== 'undefined') {
  console.log('Register DEBUG');
  window.debugMK = f;
}
