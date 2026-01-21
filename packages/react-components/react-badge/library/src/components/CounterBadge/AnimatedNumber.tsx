'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';

const useStyles = makeStyles({
  root: {
    display: 'inline-flex',
  },

  digitSlot: {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  },

  previousDigit: {
    position: 'absolute',
    inset: '0',
    transform: 'translateY(0)',
    opacity: 1,
    transitionProperty: 'transform, opacity',
    transitionDuration: '75ms',
    transitionTimingFunction: 'cubic-bezier(0.9, 0.1, 1, 0.2)',
  },

  previousDigitAnimateOutUp: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },

  previousDigitAnimateOutDown: {
    transform: 'translateY(100%)',
    opacity: 0,
  },

  currentDigit: {
    display: 'inline-block',
    transform: 'translateY(0)',
    opacity: 1,
  },

  currentDigitInitialUp: {
    transform: 'translateY(100%)',
    opacity: 0,
  },

  currentDigitInitialDown: {
    transform: 'translateY(-100%)',
    opacity: 0,
  },

  // Current digit animating in
  currentDigitAnimateIn: {
    transform: 'translateY(0)',
    opacity: 1,
    transitionProperty: 'transform, opacity',
    transitionDuration: '150ms',
    transitionTimingFunction: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
  },
});

interface DigitSlotProps {
  currentDigit: string;
  previousDigit: string | null;
  isAnimating: boolean;
  direction: 'up' | 'down';
}

function DigitSlot({ currentDigit, previousDigit, isAnimating, direction }: DigitSlotProps) {
  const [showPrevious, setShowPrevious] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const styles = useStyles();

  useEffect(() => {
    if (isAnimating && previousDigit !== null) {
      setShowPrevious(true);
      setAnimateOut(false);
      setAnimateIn(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateOut(true);

          setTimeout(() => {
            setAnimateIn(true);

            setTimeout(() => {
              setShowPrevious(false);
              setAnimateOut(false);
              setAnimateIn(false);
            }, 225);
          }, 75);
        });
      });
    }
  }, [isAnimating, previousDigit]);

  const previousDigitClassName = mergeClasses(
    styles.previousDigit,
    animateOut && direction === 'up' && styles.previousDigitAnimateOutUp,
    animateOut && direction === 'down' && styles.previousDigitAnimateOutDown,
  );

  const currentDigitClassName = mergeClasses(
    styles.currentDigit,
    // Initial position when animating (before transition starts)
    !animateIn && isAnimating && direction === 'up' && styles.currentDigitInitialUp,
    !animateIn && isAnimating && direction === 'down' && styles.currentDigitInitialDown,
    // Animate in
    animateIn && styles.currentDigitAnimateIn,
  );

  return (
    <span className={styles.digitSlot}>
      {showPrevious && previousDigit !== null && <span className={previousDigitClassName}>{previousDigit}</span>}
      <span className={currentDigitClassName}>{currentDigit}</span>
    </span>
  );
}

interface AnimatedNumberProps {
  value: number;
}

export function AnimatedNumber({ value }: AnimatedNumberProps) {
  const [currentValue, setCurrentValue] = useState(value.toString());
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [animatingIndices, setAnimatingIndices] = useState<Set<number>>(new Set());
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const prevValueRef = useRef(value);
  const styles = useStyles();

  useEffect(() => {
    if (value === prevValueRef.current) return;

    const prevStr = prevValueRef.current.toString();
    const nextStr = value.toString();
    const newDirection = value > prevValueRef.current ? 'up' : 'down';
    setDirection(newDirection);

    const maxLength = Math.max(prevStr.length, nextStr.length);
    const paddedPrev = prevStr.padStart(maxLength, ' ');
    const paddedNext = nextStr.padStart(maxLength, ' ');

    const indicesToAnimate = new Set<number>();
    for (let i = 0; i < maxLength; i++) {
      if (paddedPrev[i] !== paddedNext[i]) {
        indicesToAnimate.add(i);
      }
    }

    setPreviousValue(currentValue);
    setCurrentValue(nextStr);
    setAnimatingIndices(indicesToAnimate);

    setTimeout(() => {
      setAnimatingIndices(new Set());
      setPreviousValue(null);
    }, 300);

    prevValueRef.current = value;
  }, [value, currentValue]);

  const currentChars = currentValue.split('');
  const previousChars = previousValue?.split('') || [];

  const maxLength = Math.max(currentChars.length, previousChars.length);
  const displayLength = currentChars.length;

  return (
    <span className={styles.root}>
      {currentChars.map((char, index) => {
        const adjustedIndex = maxLength - displayLength + index;
        const prevChar = previousChars[adjustedIndex] !== ' ' ? previousChars[adjustedIndex] : null;

        return (
          <DigitSlot
            key={index}
            currentDigit={char}
            previousDigit={prevChar}
            isAnimating={animatingIndices.has(adjustedIndex)}
            direction={direction}
          />
        );
      })}
    </span>
  );
}
