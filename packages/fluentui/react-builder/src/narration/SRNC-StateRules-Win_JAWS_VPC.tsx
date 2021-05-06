export function register(SRNC: Record<string, any>) {
  SRNC.stateRules['Win/JAWS/VPC'] = {
    h1: { elementType: 'h1' },
    h2: { elementType: 'h2' },
    h3: { elementType: 'h3' },
    h4: { elementType: 'h4' },
    h5: { elementType: 'h5' },
    h6: { elementType: 'h6' },
    'role=listbox': { elementType: 'listbox' },
    'role=tree': { elementType: 'tree' },
  };
}
