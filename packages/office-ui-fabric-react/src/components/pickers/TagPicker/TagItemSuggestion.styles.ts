import { getGlobalClassNames } from '../../../Styling';
import { ITagItemSuggestionStyleProps, ITagItemSuggestionStyles } from './TagPicker.types';

const GlobalClassNames = {
  suggestionTextOverflow: 'ms-TagItem-TextOverflow'
};

export function getStyles(props: ITagItemSuggestionStyleProps): ITagItemSuggestionStyles {
  const { className, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    suggestionTextOverflow: [
      classNames.suggestionTextOverflow,
      {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '60vw',
        padding: '6px 12px 7px',
        whiteSpace: 'nowrap'
      },
      className
    ]
  };
}
