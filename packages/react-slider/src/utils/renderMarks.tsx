import * as React from 'react';
import { mergeClasses } from '@fluentui/react-make-styles';

// The mark related classNames are needed since they are used in a JSX element that is dynamically generated.
const markContainerClassName = 'ms-Slider-markItemContainer';
const firstMarkClassName = 'ms-Slider-firstMark';
const lastMarkClassName = 'ms-Slider-lastMark';
export const markClassName = 'ms-Slider-mark';

/**
 * Renders the marks
 *
 * The marks percentage position relative to their individual positions.
 * @param markValues
 */
export const renderMarks = (markValues: number[]) => {
  const marksChildren: JSX.Element[] = [];
  for (let i = 0; i < markValues.length; i++) {
    marksChildren.push(
      <div className={markContainerClassName} key={`markItemContainer-${i}`}>
        <div
          className={mergeClasses(
            markClassName,
            (markValues[i] === 0 && firstMarkClassName) || (markValues[i] === 100 && lastMarkClassName) || '',
          )}
          key={`mark-${i}`}
        />
      </div>,
    );
  }

  return marksChildren;
};
