// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

'use client';

import {useState} from 'react';

interface BilingualDocumentProps {
  htmlPt: string;
  htmlEn: string;
}

// Renders one of two inline HTML documents with a PT-BR/EN toggle, without
// changing the route or reloading the page. Used by /privacy, /terms and
// /data-deletion when both a Portuguese and an English env var are set, so
// the canonical URL informed to Meta stays the same for both languages.
export default function BilingualDocument({htmlPt, htmlEn}: BilingualDocumentProps) {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-end gap-2 mb-6">
          <button
            type="button"
            onClick={() => setLang('pt')}
            aria-pressed={lang === 'pt'}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors cursor-pointer ${
              lang === 'pt'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-gray-300 hover:border-slate-400'
            }`}
          >
            Português
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
            className={`px-3 py-1.5 rounded-full text-[13px] font-semibold border transition-colors cursor-pointer ${
              lang === 'en'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white text-slate-600 border-gray-300 hover:border-slate-400'
            }`}
          >
            English
          </button>
        </div>
        <div
          className="prose prose-slate"
          dangerouslySetInnerHTML={{__html: lang === 'pt' ? htmlPt : htmlEn}}
        />
      </div>
    </main>
  );
}
