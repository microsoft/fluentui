import { PlotlySchema } from './PlotlySchema';
import { isArrayOrTypedArray } from './PlotlySchemaConverter';

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

// Helper to reshape a flat array into the given shape (e.g., [rows, cols])
export function reshapeArray(data: number[], shape: number[]): number[] | number[][] | number[][][] {
  if (shape.length === 1) {
    return data;
  }
  if (shape.length === 2) {
    const [rows, cols] = shape;
    const result: number[][] = [];
    for (let r = 0; r < rows; r++) {
      result.push(data.slice(r * cols, (r + 1) * cols));
    }
    return result;
  }
  // For higher dimensions, recursively reshape
  const [dim, ...rest] = shape;
  const step = data.length / dim;
  const result: number[][][] = [];
  for (let i = 0; i < dim; i++) {
    result.push(reshapeArray(data.slice(i * step, (i + 1) * step), rest) as number[][]);
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function decodeBdataInDict(node: any): any {
  // Primitive → return as-is
  if (node === null || typeof node !== 'object') {
    return node;
  }

  // Array → map recursively
  if (Array.isArray(node)) {
    return node.map(item => decodeBdataInDict(item));
  }

  // Object that directly contains bdata
  if ('bdata' in node && typeof node.bdata === 'string' && isBase64(node.bdata)) {
    const dtype = node.dtype || 'utf-8'; // Get dtype or default to 'utf-8'
    const decodedBdata = decodeBase64(node.bdata, dtype); // Decode the base64-encoded value
    let shape = node.shape;

    // Parse shape if it is a string
    if (typeof shape === 'string') {
      let parsedShape: number[] | undefined;

      try {
        // Try to parse as JSON array
        parsedShape = JSON.parse(shape);
        if (!isArrayOrTypedArray(parsedShape)) {
          parsedShape = undefined;
        }
      } catch {
        // If JSON.parse fails, try to parse as comma-separated numbers
        const parts = shape.split(',').map(s => Number(s.trim()));
        if (parts.every(n => !isNaN(n))) {
          parsedShape = parts;
        }
      }
      shape = parsedShape;
    }

    // If shape exists, reshape the decoded bdata
    if (shape && isArrayOrTypedArray(shape)) {
      return reshapeArray(decodedBdata, shape as number[]);
    }

    return decodedBdata;
  }

  // Otherwise recursively decode nested keys
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: any = {};
  for (const key of Object.keys(node)) {
    out[key] = decodeBdataInDict(node[key]);
  }

  return out;
}

// Function to process a PlotlySchema object
export function decodeBase64Fields(plotlySchema: PlotlySchema): PlotlySchema {
  // Decode base64-encoded 'bdata' in the JSON data
  plotlySchema.data = decodeBdataInDict(plotlySchema.data);
  return plotlySchema;
}
