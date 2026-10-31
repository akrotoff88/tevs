export const pages = {
  "ru": {
    "htmlLang": "ru",
    "locale": "ru_KZ",
    "canonical": "https://tevs.kz/",
    "title": "Юрист в Костанае — Тевс Наталья Геннадьевна | TEVS.KZ",
    "description": "Юридическая помощь в городе Костанай и по Республике Казахстан: консультации, судебные споры, недвижимость и сопровождение бизнеса."
  },
  "kk": {
    "htmlLang": "kk",
    "locale": "kk_KZ",
    "canonical": "https://tevs.kz/kk/",
    "title": "Қостанайдағы заңгер — Тевс Наталья Геннадьевна | TEVS.KZ",
    "description": "Қостанайда және Қазақстан бойынша заң көмегі: кеңес беру, сот даулары, жылжымайтын мүлік, ЖШС тіркеу және бизнесті сүйемелдеу."
  }
};
export const entities = [
  {
    "@type": "LegalService",
    "@id": "https://tevs.kz/#legal-service",
    "name": "TEVS.KZ — юридическая практика Тевс Натальи Геннадьевны",
    "url": "https://tevs.kz/",
    "image": "https://tevs.kz/natalia-tevs-1333.webp",
    "telephone": [
      "+77055445554"
    ],
    "email": "natalia@tevs.kz",
    "priceRange": "от 15 000 ₸",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Алтынсарина, д. 34, н.п. 190",
      "addressLocality": "Костанай",
      "addressCountry": "KZ",
      "addressRegion": "Костанайская область"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Казахстан"
    },
    "founder": {
      "@id": "https://tevs.kz/#natalia-tevs"
    }
  },
  {
    "@type": "Person",
    "@id": "https://tevs.kz/#natalia-tevs",
    "name": "Тевс Наталья Геннадьевна",
    "jobTitle": "Юрист",
    "url": "https://tevs.kz/#about",
    "image": "https://tevs.kz/natalia-tevs-1333.webp",
    "worksFor": {
      "@id": "https://tevs.kz/#legal-service"
    }
  },
  {
    "@type": "WebSite",
    "@id": "https://tevs.kz/#website",
    "url": "https://tevs.kz/",
    "name": "TEVS.KZ",
    "inLanguage": [
      "ru-KZ",
      "kk-KZ"
    ],
    "publisher": {
      "@id": "https://tevs.kz/#legal-service"
    }
  }
];
export const origin = "https://tevs.kz";
