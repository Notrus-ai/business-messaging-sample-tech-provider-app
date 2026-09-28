// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import zlib from 'node:zlib';

// Separates the PT-BR and EN halves inside one inline-document env var value.
// Never expected to occur naturally in authored HTML.
const LANG_SPLIT = '<!--NOTRUS_LANG_SPLIT-->';

function looksLikeHtml(value: string): boolean {
  return value.startsWith('<');
}

/**
 * Decodes a *_HTML env var value into one or two language variants.
 *
 * Vercel caps total Environment Variable size at 64KB per project. A
 * bilingual privacy policy + terms of use pasted as raw HTML already exceeds
 * that on their own, so this accepts a gzip+base64-encoded blob (optionally
 * holding both languages joined by LANG_SPLIT) in addition to plain HTML, and
 * decodes whichever was provided. Plain HTML is detected by a leading '<' so
 * existing single-language, uncompressed setups keep working unchanged.
 */
export function decodeInlineDocument(value: string): {pt: string; en?: string} {
  const trimmed = value.trim();
  const raw = looksLikeHtml(trimmed)
    ? trimmed
    : zlib.gunzipSync(Buffer.from(trimmed, 'base64')).toString('utf8');
  const [pt, en] = raw.split(LANG_SPLIT);
  return en ? {pt, en} : {pt: raw};
}

/** Inverse of decodeInlineDocument, used to produce the env var value. */
export function encodeInlineDocument(pt: string, en?: string): string {
  const raw = en ? `${pt}${LANG_SPLIT}${en}` : pt;
  return zlib.gzipSync(raw).toString('base64');
}
