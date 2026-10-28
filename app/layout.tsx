import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TEVS.KZ — профессиональная юридическая помощь в Казахстане",
  description:
    "Юридическая практика Тевс Натальи Геннадьевны. Консультации, судебные споры, недвижимость, регистрация ТОО и сопровождение бизнеса.",
  keywords: [
    "юрист Алматы",
    "юридическая помощь Казахстан",
    "Тевс Наталья Геннадьевна",
    "регистрация ТОО",
    "судебные споры",
  ],
  openGraph: {
    title: "TEVS.KZ — юридическая помощь в Казахстане",
    description:
      "Более 15 лет юридической практики для частных лиц и бизнеса.",
    type: "website",
    locale: "ru_KZ",
    siteName: "TEVS.KZ",
  },
  other: {
    "codex-preview": "development",
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
