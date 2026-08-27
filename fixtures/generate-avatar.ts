// This script generates the test profile picture fixture
// Run once: npx ts-node fixtures/generate-avatar.ts
import fs from 'fs';
import path from 'path';

// Minimal 1x1 red PNG (base64)
const PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

const dest = path.join(__dirname, 'avatar.png');
fs.writeFileSync(dest, Buffer.from(PNG_BASE64, 'base64'));
console.log('avatar.png created at', dest);
