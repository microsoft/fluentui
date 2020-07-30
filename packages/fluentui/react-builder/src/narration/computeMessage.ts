const ROLE_NAMES = {
  genericContainer: ' ',
};

const USAGE = {
  popupButton: 'To activate press Enter.',
  toggleButton: 'To activate press Enter.',
  button: 'To activate press Enter.',
  input: 'Type in text.',
  checkbox: 'To check press Spacebar.',
  radio: 'To change the selection press Up or Down Arrow.',
  combobox: 'To set the value use the Arrow keys or type the value.',
};

export async function computeMessage(element: HTMLElement) {
  if (!(window as any).getComputedAccessibleNode) {
    return `Go to chrome://flags and enable Experimental Web Platform features. ${element.textContent}`;
  }

  const aom = await (window as any).getComputedAccessibleNode(element);

  if (!aom || !aom.name) {
    return element.textContent;
  }

  let role = aom.role;
  const name = aom.name;

  if (aom.roleDescription) {
    role = aom.roleDescription;
  } else if (ROLE_NAMES[role]) {
    role = ROLE_NAMES[role];
  }

  const usage = USAGE[role];

  let state = '';

  if (aom.role === 'button') {
    if (element.hasAttribute('aria-expanded')) {
      state = aom.expanded ? 'expanded' : 'collapsed';
    } else if (aom.role === 'checkbox' || aom.role === 'radio') {
      state = aom.checked === 'true' ? 'checked' : 'not checked';
    }
  } else if (aom.role === 'toggleButton') {
    state = aom.checked === 'true' ? 'pressed' : '';
  }

  const value = aom.valueText;

  console.log(aom, { role, name, state, value, usage });

  return [role, name, state, value, usage].join(' ');
}
