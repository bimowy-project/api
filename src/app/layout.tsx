import { Outfit } from 'next/font/google'
const outfit = Outfit({ subsets: ['latin'] })

import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Viewport } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@/styles/index.css'
import { generateMetadataUtil } from '@cpn/sidebars/main';
import { LanguageCode } from '@/lib/locale';
import SideBarContainer from '@cpn/sidebars/SideBarContainer';

export async function generateMetadata() {
  return await generateMetadataUtil('home')
}

export const viewport: Viewport = { themeColor: '#FFFFFE' }

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const lang = await getLocale() as LanguageCode

  return (
    <html lang={lang} className={outfit.className}>
      <body className='w-screen min-h-screen'>
        <NextIntlClientProvider>
          <SideBarContainer>
            {children}
          </SideBarContainer>
        </NextIntlClientProvider>
        {process.env.NODE_ENV != 'development' && <SpeedInsights />}
      </body>
    </html>
  )
}