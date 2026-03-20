import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const yakushFont = localFont({
  src: "../../public/yakush.ttf",
  variable: "--font-yakush",
  display: "swap",
});

export const metadata = {
  title: "Yakush Studio LTD - Coming Soon | Digital Brand Growth Agency",
  description: "We integrate love into every plan, fostering a caring atmosphere for your brand's digital growth. Experience a change fueled by our desire for your success. Yakush Studio LTD - Innovating the digital space.",
  keywords: [
    "digital agency",
    "brand growth",
    "web design",
    "digital marketing",
    "Yakush Studio",
    "web development",
    "branding agency",
    "digital transformation",
    "creative agency",
    "UI/UX design"
  ],
  authors: [{ name: "Yakush Studio LTD" }],
  creator: "Yakush Studio LTD",
  publisher: "Yakush Studio LTD",
  
  // Open Graph metadata for social media sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yakushstudio.com",
    title: "Yakush Studio LTD - Coming Soon | Digital Brand Growth Agency",
    description: "We integrate love into every plan, fostering a caring atmosphere for your brand's digital growth. Experience a change fueled by our desire for your success.",
    siteName: "Yakush Studio LTD",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Yakush Studio LTD Logo",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Yakush Studio LTD - Coming Soon | Digital Brand Growth Agency",
    description: "We integrate love into every plan, fostering a caring atmosphere for your brand's digital growth.",
    creator: "@yakushstudio",
    site: "@yakushstudio",
    images: ["/logo.png"],
  },
  
  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Additional metadata
  category: "Digital Agency",
  classification: "Business",
  
  // Verification (add your verification codes when you have them)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  // Alternate languages (if you have multilingual support)
  alternates: {
    canonical: "https://yakushstudio.com",
  },
  
  // Additional meta tags
  other: {
    "theme-color": "#0a0a15",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0a0a15",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/flavicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/flavicon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${yakushFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}