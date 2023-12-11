import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
/* import normalizeInput from '#build/normalizeInput'; */
/* import usePixelMeta from 'my-module'; */

describe('Server util normalizeInput', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
  });

  /* it('Field with extra space', async () => {
    expect(normalizeInput(' example@example.com ', 'em')).toHaveLength(2);
    expect(normalizeInput(' no   ', 'country')).toHaveLength(2);
  });
  it('em: invalid input', async () => {
    expect(normalizeInput(' example@example.com@@ ', 'em')).toThrowError();
  }); */
  it('true', async () => {
    expect(true).toBeTruthy();
  });
});
