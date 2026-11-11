const PREFIX = 'fui-Card';

const baseClassNames = {
  root: PREFIX,
  header: 'fui-Card__header',
};

export const cardClassNames = {
  ...baseClassNames,
  footer: 'fui-Card__footer',
};

export type CardProps = { disabled?: boolean; size?: 'small' | 'large' };

export const useCard = (props: CardProps) => {
  const state = { root: {} as Record<string, string | undefined> };
  state.root['data-disabled'] = props.disabled ? '' : undefined;
  state.root['data-size'] = props.size;
  return state;
};

export const Card = (props: CardProps): null => {
  useCard(props);
  return null;
};
