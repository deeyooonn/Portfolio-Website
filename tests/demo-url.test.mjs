import { test } from 'node:test';
import assert from 'node:assert/strict';
import { demoUrl } from '../src/utils/demoUrl.js';
test('published HTTPS links are usable and invalid or empty settings hide the link', () => {
  assert.equal(demoUrl(' https://example.com/demo '), 'https://example.com/demo');
  for (const value of ['', undefined, 'javascript:alert(1)', 'http://localhost:3000', 'https://user:pass@example.com']) assert.equal(demoUrl(value), '');
});
