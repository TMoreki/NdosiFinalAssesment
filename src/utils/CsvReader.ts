import fs from 'fs';
import path from 'path';

export function readCsv(fileName: string): Record<string, string>[] {
  const filePath = path.resolve(__dirname, '../../src/data', fileName);
  const lines = fs.readFileSync(filePath, 'utf-8').trim().split('\n');
  const headers = lines[0].split(',').map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']));
  });
}
