import * as React from 'react';
import { AccessibilityError } from '../accessibility/types';
import { runAxe } from '../hooks/useAxeOnElement';

export interface IA11yValidationContext {
  validationErrors: AccessibilityError[];
  setValidationErrors: React.Dispatch<React.SetStateAction<AccessibilityError[]>>;
}

const A11yValidationContext = React.createContext<IA11yValidationContext>(undefined as any);

export const useA11yValidationContext = () => {
  const context = React.useContext(A11yValidationContext);

  const { validationErrors, setValidationErrors } = context;

  const updateWithElementValidation = async (elementUuid: string) => {
    const result = await runAxe();

    console.log(result);
  };

  const validateAll = async () => {
    const { violations } = await runAxe();
    const errors = [];
    violations.forEach(node => {
      node.nodes.forEach(nodeResult => {
        const idMatch = nodeResult.html.match(/data-builder-id=\"(.*?)\"/);
        if (idMatch) {
          const results = nodeResult.all.concat(nodeResult.any, nodeResult.none);
          results.forEach(result => {
            errors.push({
              elementUuid: idMatch[1],
              source: 'AXE-core',
              error: result.message,
            } as AccessibilityError);
          });
        }
      });
    });
    setValidationErrors(errors);
  };

  return {
    validationErrors,
    setValidationErrors,
    updateWithElementValidation,
    validateAll,
  };
};

export const A11yValidationContextProvider = (props: any) => {
  const [validationErrors, setValidationErrors] = React.useState([]);
  // const value = React.useMemo(() => {count: count, setCount: setCount, increment: increment}, [count])

  React.useEffect(() => {
    console.log('Re-rendering provider');
    console.log(validationErrors);
  });

  return (
    <A11yValidationContext.Provider value={{ validationErrors, setValidationErrors }}>
      {props.children}
    </A11yValidationContext.Provider>
  );
};
