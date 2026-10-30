import type { SourcePosition } from '../types';

export class SourceLocations {
  private readonly lineStarts = [0];

  public constructor(private readonly source: string) {
    for (let offset = 0; offset < source.length; offset++) {
      const code = source.charCodeAt(offset);
      if (code === 13 && source.charCodeAt(offset + 1) === 10) {
        offset++;
      }
      if (code === 10 || code === 13 || code === 0x2028 || code === 0x2029) {
        this.lineStarts.push(offset + 1);
      }
    }
  }

  public positionAt(offset: number): SourcePosition {
    const boundedOffset = Math.min(this.source.length, Math.max(0, offset));
    let low = 0;
    let high = this.lineStarts.length;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (this.lineStarts[middle] <= boundedOffset) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }
    const lineIndex = Math.max(0, low - 1);
    return {
      line: lineIndex + 1,
      column: boundedOffset - this.lineStarts[lineIndex],
      offset: boundedOffset,
    };
  }

  public offsetAt(line: number, column: number): number {
    const lineStart = this.lineStarts[Math.max(0, line - 1)] ?? this.source.length;
    return Math.min(this.source.length, Math.max(0, lineStart + column));
  }
}
