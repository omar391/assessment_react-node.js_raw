import { describe, expect, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cssPath = resolve(__dirname, '../components/FoodItem/FoodItem.css');
const cssContent = readFileSync(cssPath, 'utf8');

describe('FoodItem CSS adjustments', () => {
  it('adds a hover zoom transform for menu images', () => {
    expect(cssContent).toMatch(/\.food-item-image\s*{[^}]*transition:\s*transform 0\.3s ease;[^}]*}/si);
    expect(cssContent).toMatch(/\.food-item-img-container:hover \\.food-item-image\s*{[^}]*transform:\s*scale\(1\.05\);[^}]*}/s);
  });

  it('guards the image container overflow during hover', () => {
    expect(cssContent).toMatch(/\.food-item-img-container\s*{[^}]*overflow:\s*hidden;[^}]*}/s);
  });

  it('stabilizes the counter layout to keep the minus icon fixed', () => {
    expect(cssContent).toMatch(/\.food-item-counter\s*{[^}]*min-width:\s*120px;[^}]*}/s);
    expect(cssContent).toMatch(/\.food-item-counter\s*{[^}]*padding:\s*6px 12px;[^}]*}/s);
    expect(cssContent).toMatch(/\.food-item-counter\s*{[^}]*justify-content:\s*space-between;[^}]*}/s);
    expect(cssContent).toMatch(/\.food-item-counter p\s*{[^}]*width:\s*32px;[^}]*text-align:\s*center;[^}]*}/s);
  });
});
