// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

import '@/app/globals.css';
import ErrorBoundary from '@/app/components/ErrorBoundary';
import MissingEnvVars from '@/app/components/MissingEnvVars';
import { getMissingEnvVars, type MissingEnvVarInfo } from '@/app/envChecker';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Notrus',
  description:
    'Notrus — plataforma de atendimento ao cliente com agentes de inteligência artificial, integrada à WhatsApp Business Platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check for missing environment variables
  const missingEnvVars: MissingEnvVarInfo[] = getMissingEnvVars();

  // If there are missing environment variables, show the error page
  if (missingEnvVars.length > 0) {
    return (
      <html lang="en">
        <body className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <MissingEnvVars missingVars={missingEnvVars} />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <Script src="https://connect.facebook.net/en_US/sdk.js" strategy="afterInteractive" />

      <body className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ErrorBoundary>{children}</ErrorBoundary>
        <footer className="text-center px-4 py-3 text-xs text-gray-500 border-t border-gray-200 mt-6">
          <span>Copyright &copy; {new Date().getFullYear()} Notrus. Todos os direitos reservados.</span>
          {' · '}
          <a href="/terms" className="text-gray-500 underline">
            Termos de Serviço
          </a>
          {' · '}
          <a href="/privacy" className="text-gray-500 underline">
            Política de Privacidade
          </a>
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
