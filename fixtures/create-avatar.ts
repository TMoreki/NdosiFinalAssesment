import fs from 'fs';
import path from 'path';

// Minimal valid 1x1 red PNG (base64)
const PNG_B64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==';

fs.writeFileSync(path.join(__dirname, 'avatar.png'), Buffer.from(PNG_B64, 'base64'));
console.log('fixtures/avatar.png created');
