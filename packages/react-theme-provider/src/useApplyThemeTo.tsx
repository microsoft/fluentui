import * as React from 'react';
import { useDocument } from '@fluentui/react-window-provider';
import { ThemeProviderState } from './ThemeProvider.types';

/**
 * Add body related styles to document body if applyTo is set to body.
 *
 * @param state ThemeProvider state.
 * @param classFromUser original className from user props.
 */
export function useApplyThemeTo(state: ThemeProviderState, classFromUser: string | undefined): void {
  const { className, applyTo } = state;

  const classesToBody: string[] = className
    .replace(classFromUser, '')
    .trim()
    .split(' ');

  const applyToBody = applyTo === 'body';
  const body = useDocument()?.body;

  React.useEffect(() => {
    if (!applyToBody || !body) {
      return;
    }

    for (const classToBody of classesToBody) {
      if (classToBody) {
        body.classList.add(classToBody);
      }
    }

    return () => {
      if (!applyToBody || !body) {
        return;
      }

      for (const classToBody of classesToBody) {
        if (classToBody) {
          body.classList.remove(classToBody);
        }
      }
    };
  }, [applyToBody, body, classesToBody]);
}
