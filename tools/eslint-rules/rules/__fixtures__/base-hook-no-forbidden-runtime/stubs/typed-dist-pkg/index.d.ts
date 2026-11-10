import type { HeavyOptions } from 'heavy-runtime';

// Stands in for a package linted against built output rather than source.
export declare type DistHeavy = { tag: 'dist-heavy'; options: HeavyOptions };

export declare type DistClean = { tag: 'dist-clean' };

export declare function useDistClean(): DistClean;
