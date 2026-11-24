class Decorated { accessor value = 1; }
const prefix = '😀';
export function Native() { 'use no memo'; return <number>new Decorated().value; }
