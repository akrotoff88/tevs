import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://tevs.kz"),
  title: "Юрист в Костанае — Тевс Наталья Геннадьевна | TEVS.KZ",
  description:
    "Юридическая помощь в Костанае и по Казахстану: консультации, судебные споры, недвижимость, регистрация ТОО и сопровождение бизнеса.",
  keywords: [
    "юрист Костанай",
    "юридическая помощь Казахстан",
    "Тевс Наталья Геннадьевна",
    "регистрация ТОО",
    "судебные споры",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "ru-KZ": "/",
      "kk-KZ": "/kk/",
    },
  },
  openGraph: {
    title: "Юрист в Костанае — Тевс Наталья Геннадьевна | TEVS.KZ",
    description:
      "Юридическая помощь в Костанае и по Казахстану для частных лиц и бизнеса.",
    type: "website",
    url: "/",
    locale: "ru_KZ",
    siteName: "TEVS.KZ",
    images: [
      {
        url: "/natalia-tevs.jpg",
        width: 1333,
        height: 1600,
        alt: "Тевс Наталья Геннадьевна",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Юрист в Костанае — TEVS.KZ",
    description: "Юридическая помощь в Костанае и по Казахстану.",
    images: ["/natalia-tevs.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
