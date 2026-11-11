import { cp, mkdir, rm } from 'node:fs/promises';

const sourceDirectory = new URL('../site/', import.meta.url);
const outputDirectory = new URL('../dist/', import.meta.url);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(sourceDirectory, outputDirectory, { recursive: true });

console.log('Built Image Hospitals website in dist/');