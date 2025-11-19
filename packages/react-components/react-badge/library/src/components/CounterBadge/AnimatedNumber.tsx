'use client';

import * as React from 'react';
import { useEffect, useState, useRef } from 'react';

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

  const baseStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
  };

  const previousStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0',
    transform: animateOut ? (direction === 'up' ? 'translateY(-100%)' : 'translateY(100%)') : 'translateY(0)',
    opacity: animateOut ? 0 : 1,
    transition: 'transform 75ms cubic-bezier(0.9,0.1,1,0.2), opacity 75ms cubic-bezier(0.9,0.1,1,0.2)',
  };

  const currentStyle: React.CSSProperties = {
    display: 'inline-block',
    transform: animateIn
      ? 'translateY(0)'
      : isAnimating
      ? direction === 'up'
        ? 'translateY(100%)'
        : 'translateY(-100%)'
      : 'translateY(0)',
    opacity: animateIn || !isAnimating ? 1 : 0,
    transition: animateIn
      ? 'transform 150ms cubic-bezier(0.1,0.9,0.2,1), opacity 150ms cubic-bezier(0.1,0.9,0.2,1)'
      : 'none',
  };

  return (
    <span style={baseStyle}>
      {showPrevious && previousDigit !== null && <span style={previousStyle}>{previousDigit}</span>}
      <span style={currentStyle}>{currentDigit}</span>
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
    <span style={{ display: 'inline-flex' }}>
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
