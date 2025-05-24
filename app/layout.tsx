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
  title: "Czech Eagles MMA Teplice | Profesionální MMA & Grappling Tělocvična",
  description: "Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně. Přidejte se k nám a začněte svou cestu bojovníka!",
  keywords: [
    "MMA Teplice",
    "MMA tělocvična Teplice",
    "grappling Teplice",
    "trénink MMA Teplice",
    "sebeobrana Teplice",
    "bojové sporty Teplice",
    "Czech Eagles MMA"
  ],
  generator: 'v0.dev',
  openGraph: {
    title: "Czech Eagles MMA Teplice | Profesionální MMA & Grappling Tělocvična",
    description: "Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně. Přidejte se k nám a začněte svou cestu bojovníka!",
    url: "https://www.czecheaglesmma.cz/",
    siteName: "Czech Eagles MMA Teplice",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Czech Eagles MMA Teplice - MMA tělocvična"
      }
    ],
    locale: "cs_CZ",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@CzechEaglesMMA",
    title: "Czech Eagles MMA Teplice | Profesionální MMA & Grappling Tělocvična",
    description: "Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně. Přidejte se k nám a začněte svou cestu bojovníka!",
    images: [
      "/og-image.jpg"
    ]
  },
  alternates: {
    canonical: "https://www.czecheaglesmma.cz/"
  }
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
        {/* SEO meta tags */}
        <meta name="keywords" content="MMA Teplice, MMA tělocvična Teplice, grappling Teplice, trénink MMA Teplice, sebeobrana Teplice, Czech Eagles MMA" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="cs_CZ" />
        <meta property="og:site_name" content="Czech Eagles MMA Teplice" />
        <meta property="og:title" content="Czech Eagles MMA Teplice | Profesionální MMA & Grappling Tělocvična" />
        <meta property="og:description" content="Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně. Přidejte se k nám a začněte svou cestu bojovníka!" />
        <meta property="og:url" content="https://www.czecheaglesmma.cz/" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Czech Eagles MMA Teplice | Profesionální MMA & Grappling Tělocvična" />
        <meta name="twitter:description" content="Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně. Přidejte se k nám a začněte svou cestu bojovníka!" />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href="https://www.czecheaglesmma.cz/" />
        {/* LocalBusiness Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SportsActivityLocation',
          name: 'Czech Eagles MMA Teplice',
          description: 'Czech Eagles MMA v Teplicích nabízí špičkové tréninky MMA, grapplingu, boxu a sebeobrany pro všechny úrovně.',
          image: 'https://www.czecheaglesmma.cz/og-image.jpg',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Pražská 1268/121',
            addressLocality: 'Teplice',
            addressCountry: 'CZ',
            postalCode: '41501',
          },
          telephone: '+420 603 586 073',
          openingHours: [
            'Mo-Fr 9:00-20:00'
          ],
          url: 'https://www.czecheaglesmma.cz/'
        }) }} />
        {/* FAQ Structured Data (example for 2 questions, add more as needed) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'Potřebuji předchozí zkušenosti s bojovými sporty?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Ne, vůbec ne. Naše lekce jsou navrženy pro všechny úrovně dovedností, včetně úplných začátečníků. Naši trenéři vás provedou základy a postupně budou zvyšovat intenzitu, jak se budete zlepšovat. Mnoho našich nejlepších bojovníků začínalo bez jakýchkoliv předchozích zkušeností.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Jaké vybavení potřebuji pro první trénink?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Pro první trénink stačí sportovní oblečení, ve kterém se můžete pohodlně pohybovat (tričko a sportovní kraťasy), ručník a láhev s vodou. Pro grappling doporučujeme přiléhavější oblečení. Pokud se rozhodnete pokračovat, poradíme vám s nákupem vhodného vybavení jako jsou rukavice, chrániče nebo gi (kimono).'
              }
            }
          ]
        }) }} />
      </head>
      <body className={`${inter.className} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
