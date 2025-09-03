import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

type NestingComponentName = 'MenuGrid' | 'MenuGridItem' | 'MenuGridRow';

export const useCheckNesting = (componentName: NestingComponentName): React.RefObject<HTMLElement> => {
  'use no memo';

  const ref = React.useRef<HTMLElement>(null);
  const { targetDocument } = useFluent();
  
  if (process.env.NODE_ENV !== 'production') {
    // This check should run only in development mode
    // It's okay to disable the ESLint rule because we ar checking env variable statically (not at runtime)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      console.log(ref.current);
      /*
      let current = ref.current?.parentElement;
      let role = current?.getAttribute('role');
      while (current !== targetDocument?.body) {
        if (role === 'grid' || role === 'menuitem') {
          break;
        }
        if (role === 'menu') {
          let message = '';
          switch (componentName) {
            case 'MenuGrid':
              message = 'MenuGrid is incorrectly nested within MenuList or within an element with the "menu" role.';
              break;
            case 'MenuGridItem':
              message =
                'MenuGridItem is incorrectly nested within MenuList or within an element with the "menu" role. You probably want to wrap it in a MenuGrid.';
              break;
            case 'MenuGridRow':
              message =
                'MenuGridRow is incorrectly nested within MenuList or within an element with the "menu" role. You probably want to wrap it in a MenuGrid.';
              break;
          }
          throw new Error(message);
        }
        current = current?.parentElement ?? null;
        role = current?.getAttribute('role');
      }
        */
    }, [componentName, ref, targetDocument?.body]);
  }
  return ref;
};
