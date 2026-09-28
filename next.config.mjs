// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  allowedDevOrigins: ['dev.kxlconsulting.com', 'localhost'],
  eslint: {},
  // /privacy e /terms são as URLs canônicas informadas à Meta. Servimos o HTML
  // estático de public/ por rewrite (não redirect) para que a URL não mude e
  // não exista um segundo link para a mesma política.
  // beforeFiles é necessário para ter precedência sobre app/privacy/page.tsx
  // e app/terms/page.tsx, que ficam como fallback caso o HTML seja removido.
  async rewrites() {
    return {
      beforeFiles: [
        {source: '/privacy', destination: '/politica-privacidade.html'},
        {source: '/terms', destination: '/termos-de-servico.html'},
        {source: '/data-deletion', destination: '/exclusao-de-dados.html'},
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
