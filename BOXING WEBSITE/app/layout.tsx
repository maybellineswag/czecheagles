import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactNode } from "react"

// Use Inter font with proper subsets and display settings
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: "Box Teplice – VELOZO Boxing Team | Tréninky pro děti a dospělé",
  description: "Boxerské tréninky v Teplicích pro děti, dospělé i začátečníky. Připojte se k VELOZO Teamu a trénujte s profesionálními trenéry. Box Teplice v Arena68.",
  keywords: [
    "Box Teplice",
    "boxerská tělocvična Teplice",
    "trénink boxu Teplice",
    "VELOZO Team",
    "Velozo Boxing",
    "Arena 68",
    "box pro děti Teplice",
    "soukromé tréninky boxu Teplice"
  ],
  generator: 'v0.dev',
  openGraph: {
    title: "Profesionální boxerský klub v Teplicích. Trénujte s VELOZO Boxing Team",
    description: "Profesionální boxerský klub v Teplicích. Trénujte s VELOZO Boxing Team v moderní hale Arena68.",
    url: "https://velozoteam.cz/",
    siteName: "VELOZO Team Boxing Teplice",
    images: [
      {
        url: "https://velozoteam.cz/images/bg.jpg",
        width: 1200,
        height: 630,
        alt: "VELOZO Boxing Team Teplice"
      }
    ],
    locale: "cs_CZ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@VelozoBoxing",
    title: "Box Teplice – VELOZO Boxing Team",
    description: "Profesionální boxerský klub v Teplicích. Box pro děti, dospělé i soukromé tréninky s Miguelem Velozem.",
    images: ["https://velozoteam.cz/images/bg.jpg"]
  },
  alternates: {
    canonical: "https://velozoteam.cz/"
  },
  icons: {
    icon: [
      { url: "/favicon_velozo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_velozo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_velozo/favicon.ico" },
    ],
    apple: [
      { url: "/favicon_velozo/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon_velozo/site.webmanifest",
}

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* LocalBusiness Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsActivityLocation',
            name: 'VELOZO Team Boxing Teplice',
            description: 'Profesionální boxerský klub v Teplicích. Box pro děti, dospělé i soukromé tréninky s Miguelem Velozem.',
            image: 'https://velozoteam.cz/images/bg.jpg',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Pražská 1268/121',
              addressLocality: 'Teplice',
              addressCountry: 'CZ',
              postalCode: '415 01',
            },
            telephone: '+420 603 586 073',
            openingHours: [
              'Mo, We, Fr 16:00-20:30',
              'Tu, Th, Sa 09:00-20:00'
            ],
            url: 'https://velozoteam.cz/'
          })
        }} />
        {/* FAQ Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            'mainEntity': [
              {
                '@type': 'Question',
                'name': 'Potřebuji předchozí zkušenosti s boxem?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Ne, vůbec ne. Naše lekce jsou navrženy pro všechny úrovně dovedností, včetně úplných začátečníků. Naši trenéři vás provedou základy a postupně budou zvyšovat intenzitu, jak se budete zlepšovat.'
                }
              },
              {
                '@type': 'Question',
                'name': 'Jaké vybavení potřebuji pro první trénink?',
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': 'Pro první trénink stačí sportovní oblečení, ve kterém se můžete pohodlně pohybovat (tričko a sportovní kraťasy), čistá sálová obuv, ručník a láhev s vodou. Pokud se rozhodnete pokračovat, poradíme vám s nákupem vhodného vybavení jako jsou vlastní boxerské rukavice, bandáže a chránič zubů.'
                }
              }
            ]
          })
        }} />
      </head>
      <body className={`${inter.className} font-sans`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
