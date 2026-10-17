import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'dist');
const output = path.join(root, 'public');
await mkdir(path.join(output, 'assets'), { recursive: true });
const page = await readFile(path.join(source, 'city-demo.html'), 'utf8');
await writeFile(path.join(output, 'index.html'), page);
for (const name of ['city-demo.css', 'city-demo.js', 'fragments.html', 'assets/cormorant-garamond-500.woff2', 'assets/CormorantGaramond-OFL.txt', 'assets/city-vancouver-hd.jpg', 'assets/city-kaohsiung-hd.jpg']) {
  await copyFile(path.join(source, name), path.join(output, name));
}
console.log('Landing page ready: public/ (landing page, first scene, local fonts and two city photographs).');
