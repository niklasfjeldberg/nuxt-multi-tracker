import { describe, it, expect } from 'vitest';
import { fileURLToPath } from 'node:url';
import { setup } from '@nuxt/test-utils';
import normalizeInput from '../src/runtime/server/utils/normalizeInput';

// Sha256 tool
// https://emn178.github.io/online-tools/sha256.html

describe('Server util normalizeInput', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
    server: true,
  });

  it('Fields with extra space', () => {
    expect(normalizeInput(' example@example.com ', 'em')).toBe(
      '31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66',
    );
    expect(normalizeInput(' no   ', 'country')).toBe(
      '9390298f3fb0c5b160498935d79cb139aef28e1c47358b4bbba61862b9c26e59',
    );
  });

  it('f5first & f5last: correct hash', () => {
    expect(normalizeInput('Firstname', 'f5first')).toBe(
      'a7937b64b8caa58f03721bb6bacf5c78cb235febe0e70b1b84cd99541461a08e',
    );
    expect(normalizeInput('Lastname', 'f5last')).toBe(
      'c20d6de6217384509b272e7f2073b5f15734e74395a66de0b6e8418f9417dcef',
    );
  });

  it('Input hashed value', () => {
    expect(
      normalizeInput(
        'a7937b64b8caa58f03721bb6bacf5c78cb235febe0e70b1b84cd99541461a08e',
        'f5first',
      ),
    ).toBe('a7937b64b8caa58f03721bb6bacf5c78cb235febe0e70b1b84cd99541461a08e');
  });

  it('country', () => {
    // Valid input
    expect(normalizeInput('NO', 'country')).toHaveLength(64);
    // Invalid input
    expect(() =>
      normalizeInput('non-existing country', 'country'),
    ).toThrowError();
  });

  it('currency', () => {
    // Valid input
    expect(normalizeInput('NOK', 'currency')).toHaveLength(64);
    // Invalid input
    expect(() =>
      normalizeInput('non-existing currency', 'currency'),
    ).toThrowError();
  });

  it('em: email', () => {
    // Valid input
    expect(normalizeInput('example@example.com', 'em')).toHaveLength(64);
    // Invalid input
    expect(() =>
      normalizeInput(' example@example.com@@ ', 'em'),
    ).toThrowError();
  });

  it('ph: phone', () => {
    // Valid input
    expect(normalizeInput('+4746672688', 'ph')).toHaveLength(64);
    // Invalid input
    expect(() => normalizeInput('888', 'ph')).toThrowError();
    expect(() => normalizeInput('+4746672688888888', 'ph')).toThrowError();
  });

  it('ge: gender', () => {
    // Valid input
    expect(normalizeInput('male', 'ge')).toHaveLength(64);
    expect(normalizeInput('female', 'ge')).toHaveLength(64);
    expect(normalizeInput('m', 'ge')).toHaveLength(64);
    expect(normalizeInput('f', 'ge')).toHaveLength(64);
    // Invalid input
    expect(normalizeInput('other', 'ge')).toBe(null);
    expect(normalizeInput('', 'ge')).toBe(null);
  });
});
