import * as React from 'react';
import { performance } from 'node:perf_hooks';
import { runInNewContext } from 'node:vm';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../components/Avatar/Avatar';
import { getInitials } from './getInitials';

describe('Avatar name enclosure cleanup', () => {
  it('preserves enclosure, initials, and Unicode behavior', () => {
    for (const name of [
      'Ada Lovelace',
      'Ada (Team) Lovelace',
      'Ada [Team] Lovelace',
      'Ada {Team} Lovelace',
      'Ada [Team) Lovelace',
      'Ada [[Team] Lovelace',
      'Ada [[[ Lovelace',
    ]) {
      expect(getInitials(name, false)).toBe('AL');
      expect(getInitials(name, true)).toBe('LA');
      expect(getInitials(name, false, { firstInitialOnly: true })).toBe('A');
    }

    expect(getInitials('\u00cdrissa \u00de\u00f3r\u00f0ard\u00f3ttir', false)).toBe('\u00cd\u00de');
    expect(getInitials('\u{20000} [Team]', false)).toBe('\u{20000}');
    expect(getInitials('\u6842\u82f1', false)).toBe('');
    expect(getInitials('\uac15\ud604', false)).toBe('');
    expect(getInitials('\u062e\u0633\u0631\u0648', true)).toBe('');
    expect(getInitials('+1 (555) 123-4567 ext.4567', false)).toBe('');
  });

  it('derives initials from a public name containing unmatched brackets', () => {
    // A Jest timeout alone cannot interrupt synchronous regex execution.
    runInNewContext(
      'renderAvatar()',
      {
        renderAvatar: () => {
          const name = `Ada ${'['.repeat(128)} Lovelace`;
          render(<Avatar name={name} />);
          expect(screen.getByText('AL')).toBeTruthy();
          expect(screen.getByRole('img').getAttribute('aria-label')).toBe(name);
        },
      },
      { timeout: 1000 },
    );
  });

  it('avoids superlinear growth when opening brackets have no closing enclosure', () => {
    const samples: {
      length: number;
      squareMs: number;
      parenthesisMs: number;
      braceMs: number;
      balancedMs: number;
      nonBracketMs: number;
      extendedNameMs: number;
    }[] = [];
    let ordinaryNameMs = 0;

    const measureName = (name: string, expected: string): number => {
      for (let warmup = 0; warmup < 2; warmup++) {
        expect(getInitials(name, false)).toBe(expected);
      }

      const durations: number[] = [];
      for (let sample = 0; sample < 5; sample++) {
        let initials = '';
        const start = performance.now();
        for (let call = 0; call < 3; call++) {
          initials = getInitials(name, false);
        }
        durations.push((performance.now() - start) / 3);
        expect(initials).toBe(expected);
      }
      return durations.sort((a, b) => a - b)[2];
    };

    // These are experiment bounds, not an application name-length policy.
    runInNewContext(
      'measure()',
      {
        measure: () => {
          ordinaryNameMs = measureName('Ada Lovelace', 'AL');
          for (const length of [64, 128, 256, 512, 1024, 2048, 4096]) {
            samples.push({
              length,
              squareMs: measureName('['.repeat(length), ''),
              parenthesisMs: measureName('('.repeat(length), ''),
              braceMs: measureName('{'.repeat(length), ''),
              balancedMs: measureName('['.repeat(length / 2) + ']'.repeat(length / 2), ''),
              nonBracketMs: measureName('A'.repeat(length), 'A'),
              extendedNameMs: measureName('A'.repeat(length - 9) + ' Lovelace', 'AL'),
            });
          }
        },
      },
      { timeout: 2500 },
    );

    console.info(
      'Avatar enclosure measurements (milliseconds per call):',
      JSON.stringify({ ordinaryNameMs, sampleCount: 5, callsPerSample: 3, maxNameLength: 4096, samples }),
    );

    const small = samples.find(sample => sample.length === 1024);
    const large = samples.find(sample => sample.length === 4096);
    if (!small || !large) {
      throw new Error('The bounded scaling measurement did not produce both required input lengths.');
    }

    // Allow twice linear growth for a fourfold input increase, with a timer-noise floor.
    expect(large.squareMs).toBeLessThanOrEqual(8 * Math.max(small.squareMs, 0.1));
    expect(large.parenthesisMs).toBeLessThanOrEqual(8 * Math.max(small.parenthesisMs, 0.1));
    expect(large.braceMs).toBeLessThanOrEqual(8 * Math.max(small.braceMs, 0.1));
  });
});
