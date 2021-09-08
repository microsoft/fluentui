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
 * @param markValues The marks percentage position relative to their individual positions.
 */
export const renderMarks = (markValues: number[]) =>
  markValues.map((value, i) => (
    <div className={markContainerClassName} key={`markItemContainer-${i}`}>
      <div
        className={mergeClasses(
          markClassName,
          (markValues[i] === 0 && firstMarkClassName) || (markValues[i] === 100 && lastMarkClassName) || '',
        )}
        key={`mark-${i}`}
      />
    </div>
  ));
