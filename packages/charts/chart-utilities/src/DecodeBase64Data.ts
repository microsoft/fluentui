import { PlotlySchema } from './PlotlySchema';

function addBase64Padding(s: string): string {
  const paddingNeeded = (4 - (s.length % 4)) % 4;
  return s + '='.repeat(paddingNeeded);
}
// Function to check if a string is base64-encoded
function isBase64(s: string): boolean {
  if (typeof s !== 'string') {
    return false;
  }

  // Base64 strings must have a length that is a multiple of 4
  if (s.length % 4 !== 0) {
    s = addBase64Padding(s);
  }

  // Use a regular expression to check if the string contains only valid base64 characters
  const base64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
  if (!base64Regex.test(s)) {
    return false;
  }

  try {
    decodeBase64FromString(s);
    return true;
  } catch {
    return false;
  }
}

function decodeBase64FromString(base64String: string): Uint8Array {
  if (typeof window !== 'undefined' && typeof atob === 'function') {
    // For browsers
    const binaryString = atob(base64String);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  throw new Error('Base64 decoding is not supported in this environment.');
}

// Helper function to decode base64-encoded data based on dtype
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeBase64(value: string, dtype: string): any {
  // Add padding if necessary
  value = addBase64Padding(value);

  try {
    const decodedBytes = decodeBase64FromString(value);
    switch (dtype) {
      case 'f8':
        return Array.from(new Float64Array(decodedBytes.buffer));
      case 'i8':
        return Array.from(new Int32Array(decodedBytes.buffer)); // BigInt64Array is supported ES2020 onwards
      case 'u8':
        return Array.from(new Uint32Array(decodedBytes.buffer));
      case 'i4':
        return Array.from(new Int32Array(decodedBytes.buffer));
      case 'i2':
        return Array.from(new Int16Array(decodedBytes.buffer));
      case 'i1':
        return Array.from(new Int8Array(decodedBytes.buffer));
      default:
        try {
          return decodedBytes.toString();
        } catch (error) {
          return decodedBytes;
        }
    }
  } catch (error) {
    throw new Error(`Failed to decode base64 value: ${value}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeBdataInDict(d: any): void {
  for (const [key, value] of Object.entries(d)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      decodeBdataInDict(value); // Recursively process nested objects
    } else if (key === 'bdata' && typeof value === 'string' && isBase64(value)) {
      const dtype = d.dtype || 'utf-8'; // Get dtype or default to 'utf-8'
      d[key] = decodeBase64(value, dtype); // Decode the base64-encoded value
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === 'object' && value[i] !== null) {
          decodeBdataInDict(value[i]); // Recursively process objects in arrays
        }
      }
    }
  }
}

// Function to process a PlotlySchema object
export function decodeBase64Fields(plotlySchema: PlotlySchema): PlotlySchema {
  // Create a deep copy of the original data
  const originalData = JSON.parse(JSON.stringify(plotlySchema.data));

  // Decode base64-encoded 'bdata' in the JSON data
  decodeBdataInDict(plotlySchema.data);

  // Check if the data has changed
  if (JSON.stringify(plotlySchema.data) !== JSON.stringify(originalData)) {
    // Overwrite the 'y', 'x', or 'z' value with the decoded 'bdata'
    for (const item of plotlySchema.data || []) {
      ['y', 'x', 'z', 'r', 'theta'].forEach(key => {
        if (
          item[key as keyof typeof item] &&
          typeof item[key as keyof typeof item] === 'object' &&
          'bdata' in (item[key as keyof typeof item] as Record<string, number[]>)
        ) {
          const bdata = (item[key as keyof typeof item] as { bdata: number[] }).bdata;
          (item[key as keyof typeof item] as number[]) = bdata as number[];
        }
      });
    }

    return plotlySchema; // Return the decoded data
  }

  plotlySchema.data = originalData; // Restore the original data if no changes were made
  return plotlySchema; // Return the original data if no changes were made
}
