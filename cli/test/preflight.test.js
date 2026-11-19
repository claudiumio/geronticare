import assert from 'node:assert/strict';
import test from 'node:test';

import { validarNode22, validarPreflight } from '../src/preflight.js';

test('aceita Node 22 em terminal interativo', () => {
  assert.doesNotThrow(() => validarPreflight({ nodeVersion: 'v22.20.0', isTTY: true }));
});

test('rejeita versão diferente de Node 22', () => {
  assert.throws(
    () => validarPreflight({ nodeVersion: 'v23.0.0', isTTY: true, plataforma: 'linux' }),
    /Node 22/,
  );
});

test('no Mac aponta para o Homebrew node@22 quando cai no Node 26', () => {
  assert.throws(
    () => validarNode22('v26.3.1', { plataforma: 'darwin' }),
    /node@22|\/opt\/homebrew\/opt\/node@22\/bin|Detectado: v26\.3\.1/,
  );
});

test('rejeita instalação sem terminal interativo', () => {
  assert.throws(
    () => validarPreflight({ nodeVersion: 'v22.20.0', isTTY: false }),
    /terminal interativo/,
  );
});
