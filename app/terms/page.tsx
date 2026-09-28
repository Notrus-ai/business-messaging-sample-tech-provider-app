// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Link from 'next/link';
import {redirect} from 'next/navigation';

import BilingualDocument from '@/app/components/BilingualDocument';

function isHttpUrl(value: string | undefined): value is string {
  if (!value) {
    return false;
  }
  try {
    const {protocol} = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

export default function TermsPage() {
  // Mirrors app/privacy/page.tsx: Vercel's deploy button makes every listed env
  // var required and rejects a blank value, so operators without a terms URL
  // enter a sentinel like "none". Only redirect when the value is a real
  // http(s) URL; anything else falls through to the inline HTML content or the
  // placeholder page below.
  const termsUrl = process.env.TERMS_URL?.trim();
  if (isHttpUrl(termsUrl)) {
    redirect(termsUrl);
  }

  const termsHtml = process.env.TERMS_HTML?.trim();
  const hasHtml = termsHtml && termsHtml.toLowerCase() !== 'none';

  // Optional English translation. Only offers the PT-BR/EN toggle when both
  // are set, so a single-language setup keeps behaving exactly as before.
  const termsHtmlEn = process.env.TERMS_HTML_EN?.trim();
  const hasHtmlEn = termsHtmlEn && termsHtmlEn.toLowerCase() !== 'none';

  if (hasHtml && hasHtmlEn) {
    return <BilingualDocument htmlPt={termsHtml} htmlEn={termsHtmlEn} />;
  }

  if (hasHtml || hasHtmlEn) {
    return (
      <main className="min-h-screen bg-white px-4 py-10">
        <div
          className="max-w-3xl mx-auto prose prose-slate"
          dangerouslySetInnerHTML={{__html: (hasHtml ? termsHtml : termsHtmlEn) as string}}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#d97706"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <path d="M14 2v6h6" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-slate-800 mb-2">Termos de Serviço</h1>
        <p className="text-[14px] text-gray-500 leading-relaxed mb-6">
          Esta é uma página provisória. Como operador desta aplicação, você é responsável por publicar os seus próprios
          Termos de Serviço, em conformidade com a legislação aplicável e com as políticas de plataforma da Meta.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-left mb-6">
          <p className="text-[13px] font-semibold text-amber-800 mb-1">Ação necessária</p>
          <p className="text-[12px] text-amber-700 leading-relaxed mb-3">
            Antes de publicar em produção, faça uma das opções abaixo para que{' '}
            <code className="bg-amber-100 px-1 rounded font-mono text-[11px]">/terms</code> sirva os seus Termos de
            Serviço. Essa URL pode então ser referenciada na configuração do app na Meta.
          </p>
          <ul className="text-[12px] text-amber-700 leading-relaxed list-disc pl-4 space-y-1">
            <li>
              Defina a variável de ambiente{' '}
              <code className="bg-amber-100 px-1 rounded font-mono text-[11px]">TERMS_URL</code> para redirecionar esta
              rota para os termos hospedados em outro lugar, ou
            </li>
            <li>
              Substitua o conteúdo de{' '}
              <code className="bg-amber-100 px-1 rounded font-mono text-[11px]">app/terms/page.tsx</code> pelos seus
              próprios Termos de Serviço.
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white text-[13px] font-semibold rounded-full hover:bg-slate-700 transition-colors"
        >
          ← Voltar para o app
        </Link>
      </div>
    </main>
  );
}
