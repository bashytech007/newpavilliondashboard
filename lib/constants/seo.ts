
import { Metadata } from 'next';

export const SEO_DETAILS = {
  title: {
    default: 'LawPavilion Dashboard | Advanced Legal Research & Case Management',
    template: '%s | LawPavilion',
  },
  description: 
    'Your premier destination for comprehensive legal research, case management, and team collaboration. Empowering legal professionals with AI-driven insights.',
  siteName: 'LawPavilion',
  metadataBase: new URL('https://dashboard.lawpavilion.com'), // Replace with actual production URL if known, or localhost for now
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'LawPavilion',
    images: [
      {
        url: '/dashboard-preview.png',
        width: 1200,
        height: 630,
        alt: 'LawPavilion Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@LawPavilion', // Replace with actual handle
    images: ['/dashboard-preview.png'],
  },
  icons: {
    icon: '/icon.png',
  },
};
