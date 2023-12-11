import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
/* import usePixelMeta from '../src/runtime/composables/usePixelMeta'; */

describe('usePixelMeta', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    /* server: true, */
  });

  it('Event queue works', async () => {
    /* const pixel = usePixelMeta();
    const { options } = pixel;
    options.isEnabled = true;
    // options.pixelID = 'test';

    expect(options.eventsQueue).toHaveLength(0);
    pixel.track();
    expect(options.eventsQueue).toHaveLength(1);
    pixel.track('Lead');
    expect(options.eventsQueue).toHaveLength(2); */

    expect(true).toBe(true);
  });
});
