import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/comfortaa'
import '@fontsource-variable/manrope'
import Script from 'next/script'
import './globals.css'

const SITE_URL = 'https://aist.life'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Аист — организация выписок, гендер-пати и дней рождения',
  description:
    'Событийное агентство «Аист». Создаём волшебные праздники под ключ: выписка из роддома, гендер-пати и дни рождения. Комплексный подход, декор, съёмка и незабываемые эмоции.',
  generator: 'v0.app',
  verification: {
    yandex: 'b54cad29198e8dd2',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Аист — организация выписок, гендер-пати и дней рождения',
    description:
      'Создаём волшебные праздники под ключ: выписка из роддома, гендер-пати и дни рождения.',
    url: SITE_URL,
    siteName: 'Аист',
    images: [
      {
        url: '/images/hero-celebration.png',
        width: 1200,
        height: 630,
        alt: 'Аист — событийное агентство',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Аист — организация выписок, гендер-пати и дней рождения',
    description:
      'Создаём волшебные праздники под ключ: выписка из роддома, гендер-пати и дни рождения.',
    images: ['/images/hero-celebration.png'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#eaf3fb',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Аист',
  description:
    'Событийное агентство: организация выписок из роддома, гендер-пати и дней рождения.',
  url: SITE_URL,
  image: `${SITE_URL}/images/hero-celebration.png`,
  priceRange: 'от 15 000 ₽',
  areaServed: {
    '@type': 'City',
    name: 'Москва',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="bg-background">
      <body className="font-sans antialiased">
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        {process.env.NODE_ENV === 'production' && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){
                    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();
                    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=110619987', 'ym');
                ym(110619987, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
              `}
            </Script>
            <noscript>
              <div>
                <img
                  src="https://mc.yandex.ru/watch/110619987"
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        )}

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}