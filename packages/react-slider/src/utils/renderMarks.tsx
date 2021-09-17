import * as React from 'react';
import { mergeClasses } from '@fluentui/react-make-styles';

// The mark related classNames are needed since they are used in a JSX element that is dynamically generated.
const markContainerClassName = 'ms-Slider-markItemContainer';
const firstMarkClassName = 'ms-Slider-firstMark';
const lastMarkClassName = 'ms-Slider-lastMark';
export const markClassName = 'ms-Slider-mark';
export const markLabelClassName = 'ms-Slider-label';

/**
 * Renders the marks
 *
 * @param markValues The marks percentage position relative to their individual positions.
 */
export const renderMarks = (
  markValues: number[],
  markPercent: string[],
  marks: boolean | (number | { value: number; label?: string | JSX.Element; mark?: JSX.Element })[],
) => {
  const marksPercent = markPercent;
  const marksValue = markValues;
  const marksChildren: JSX.Element[] = [];
  for (let i = 0; i < marksPercent.length; i++) {
    const marksItem = typeof marks === 'boolean' || marks === undefined ? null : marks[i];

    marksChildren.push(
      <div className={markContainerClassName} key={`markItemContainer-${i}`}>
        {marksItem && typeof marksItem === 'object' && marksItem.mark ? (
          marksItem.mark
        ) : (
          <div
            className={mergeClasses(
              markClassName,
              (marksValue[i] === 0 && firstMarkClassName) || (marksValue[i] === 100 && lastMarkClassName) || '',
            )}
            key={`mark-${i}`}
          />
        )}
        {marksItem !== null && typeof marksItem === 'object' && marksItem.label && (
          <div className={markLabelClassName} key={`markLabel-${i}`}>
            {marksItem.label}
          </div>
        )}
      </div>,
    );
  }

  return marksChildren;
};
