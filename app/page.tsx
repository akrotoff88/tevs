"use client";

import { FormEvent, useEffect, useState } from "react";

type Lang = "ru" | "kz";

const contact = {
  landline: "(7142) 75-12-20",
  landlineHref: "tel:+77142751220",
  mobile: "8-705-544-55-54",
  mobileHref: "tel:+77055445554",
  whatsapp: "https://wa.me/77055445554",
  email: "natalia@tevs.kz",
} as const;

const content = {
  ru: {
    nav: [
      ["Главная", "top"],
      ["Обо мне", "about"],
      ["Услуги", "services"],
      ["Прайс", "prices"],
      ["Клиенты", "clients"],
      ["Отзывы", "reviews"],
      ["FAQ", "faq"],
      ["Контакты", "contacts"],
    ],
    practice: "Юридическая практика",
    heroEyebrow: "Юридическая практика Тевс Натальи Геннадьевны",
    heroTitle: "Профессиональная юридическая помощь в Казахстане",
    heroText:
      "Более 15 лет практики. Решаю юридические задачи для частных лиц и бизнеса — быстро, надёжно и эффективно.",
    consult: "Получить консультацию",
    viewServices: "Смотреть услуги",
    heroCard: "Юрист с опытом более 15 лет",
    sectionServices: "Чем я могу вам помочь",
    servicesTitle: "Наши услуги",
    allServices: "Все услуги",
    services: [
      {
        title: "Недвижимость",
        text: "Сопровождение сделок, регистрация прав, узаконение перепланировок",
        icon: "home",
      },
      {
        title: "Бизнес и ТОО",
        text: "Регистрация, изменения, ликвидация, корпоративные документы",
        icon: "briefcase",
      },
      {
        title: "Семейные дела",
        text: "Развод, раздел имущества, алименты, установление опеки и др.",
        icon: "users",
      },
      {
        title: "Судебные споры",
        text: "Представительство в судах всех инстанций, защита ваших интересов",
        icon: "gavel",
      },
      {
        title: "Регистрационные действия",
        text: "Перерегистрация, справки, доверенности и другие процедуры",
        icon: "document",
      },
      {
        title: "Правовой анализ",
        text: "Консультации, составление договоров и правовое заключение",
        icon: "scales",
      },
    ],
    aboutEyebrow: "Обо мне",
    aboutTitle: "Тевс Наталья Геннадьевна",
    aboutText1:
      "Юрист с опытом более 15 лет в области гражданского, корпоративного, семейного и административного права.",
    aboutText2:
      "Работаю на результат, ценю доверие и время клиентов. Гарантирую индивидуальный подход, конфиденциальность и высокий уровень сервиса.",
    principles: [
      ["Опыт и экспертиза", "Более 15 лет успешной практики и сотни завершённых дел.", "expert"],
      ["Ответственность", "Довожу дело до результата, беру на себя сложные задачи.", "award"],
      ["Конфиденциальность", "Строгое соблюдение адвокатской этики и защита ваших данных.", "lock"],
      ["Практический подход", "Предлагаю оптимальные и рабочие решения для ваших задач.", "idea"],
    ],
    processEyebrow: "Как мы работаем",
    processTitle: "Как построена работа",
    process: [
      ["Консультация", "Обсуждаем вашу ситуацию, определяем цели и возможные решения.", "chat"],
      ["Анализ и стратегия", "Изучаю документы, оцениваю риски, предлагаю план действий.", "document"],
      ["Реализация", "Подготавливаю документы, представляю интересы, сопровождаю процесс.", "handshake"],
      ["Результат", "Вы получаете юридически верное решение и защищённый результат.", "check"],
    ],
    stats: [
      ["15+", "лет практики"],
      ["400+", "регистрационных процедур"],
      ["140+", "клиентов в судах"],
      ["70+", "объектов недвижимости"],
    ],
    proofStats: [
      ["15+", "лет практики"],
      ["400+", "регистрационных процедур"],
      ["140+", "клиентов в судах"],
      ["70+", "объектов недвижимости"],
      ["98%", "успешных дел"],
      ["100%", "конфиденциальность"],
    ],
    proofEyebrow: "Опыт, которому доверяют",
    clientsEyebrow: "Нам доверяют",
    clientsTitle: "Клиенты",
    clientsIntro:
      "Юридическое сопровождение компаний из транспорта, агробизнеса, промышленности, образования, безопасности и других отраслей.",
    clients: [
      "Группа компаний «Деньги населению»",
      "ТОО «ИнтерАвтоТранс»",
      "ТОО «АгроИмпэкс-7»",
      "ТОО «Теплоприбор-Казахстан»",
      "ТОО «Зерновая компания „Сункар и К“»",
      "ТОО «Языковой центр „Grand Luxe“»",
      "ТОО «Охранное агентство „Крепость“»",
      "ТОО «Kazagrodevelopment»",
      "ТОО «РосКАвто»",
      "ТОО «IT-Resourse»",
      "ТОО «Industrial Security LTD»",
      "И другие",
    ],
    priceEyebrow: "Прозрачные условия",
    priceTitle: "Стоимость услуг",
    prices: [
      ["Консультация", "от 15 000 ₸"],
      ["Составление документов (договоры, заявления и др.)", "от 20 000 ₸"],
      ["Регистрация ТОО", "от 30 000 ₸"],
      ["Сопровождение сделок с недвижимостью", "от 50 000 ₸"],
      ["Представительство в суде", "от 80 000 ₸"],
      ["Комплексное сопровождение бизнеса", "по договорённости"],
    ],
    fixedTitle: "Фиксированная стоимость",
    fixedText:
      "Стоимость обсуждается заранее и фиксируется в договоре. Без скрытых платежей.",
    reviewsEyebrow: "Отзывы клиентов",
    reviewsTitle: "Что говорят клиенты",
    reviews: [
      [
        "Профессионал своего дела! Быстро разобралась в ситуации и помогла решить вопрос с недвижимостью без лишних сложностей. Рекомендую!",
        "А., Алматы",
      ],
      [
        "Обратились по вопросу регистрации ТОО. Всё сделано в срок, чётко и без лишней бюрократии. Спасибо за высокий уровень сервиса.",
        "М., Астана",
      ],
      [
        "Выиграли сложный судебный спор. Наталья Геннадьевна очень внимательна к деталям и всегда на связи.",
        "Е., Караганда",
      ],
    ],
    allReviews: "Отправить свой отзыв",
    faqEyebrow: "Ответы на частые вопросы",
    faqTitle: "FAQ",
    faqs: [
      [
        "Какие документы нужны для консультации?",
        "Возьмите документы, которые относятся к вашей ситуации: договоры, переписку, уведомления, судебные акты. Если чего-то не хватает, я подскажу после первичного разговора.",
      ],
      [
        "Сколько стоит консультация?",
        "Стоимость первичной консультации начинается от 15 000 ₸ и зависит от сложности вопроса и объёма документов.",
      ],
      [
        "Вы работаете с физическими и юридическими лицами?",
        "Да. Я сопровождаю частных клиентов, индивидуальных предпринимателей, ТОО и другие организации.",
      ],
      [
        "Сколько времени занимает решение вопроса?",
        "Срок зависит от задачи. После анализа документов вы получите понятный план, этапы и ориентировочные сроки.",
      ],
      [
        "Предоставляете ли вы рассрочку оплаты?",
        "Для комплексных и длительных проектов можно согласовать поэтапную оплату.",
      ],
      [
        "Как проходит работа дистанционно?",
        "Консультации доступны по телефону и видеосвязи. Документы можно безопасно передать в электронном виде.",
      ],
    ],
    contactEyebrow: "Свяжитесь со мной",
    contactTitle: "Контакты",
    callLabel: "Телефоны / WhatsApp",
    emailLabel: "Электронная почта",
    address:
      "г. Костанай, ул. Алтынсарина, д. 34, н.п. 190, на входе вывеска «GMZ Консультант»",
    addressLabel: "Приём по предварительной записи",
    formName: "Ваше имя",
    formPhone: "Телефон",
    formEmail: "E-mail",
    formMessage: "Ваше сообщение",
    formSubmit: "Отправить сообщение",
    ready: "Готова помочь вам в сложных юридических вопросах.",
    readyText: "Обращайтесь — найду для вас лучшее решение!",
    whatsapp: "Написать в WhatsApp",
    footerServices: "Услуги",
    footerCompany: "О компании",
    footerInfo: "Информация",
    privacy: "Политика конфиденциальности",
    rights: "© 2026 TEVS.KZ. Все права защищены.",
  },
  kz: {
    nav: [
      ["Басты бет", "top"],
      ["Мен туралы", "about"],
      ["Қызметтер", "services"],
      ["Бағалар", "prices"],
      ["Клиенттер", "clients"],
      ["Пікірлер", "reviews"],
      ["FAQ", "faq"],
      ["Байланыс", "contacts"],
    ],
    practice: "Заңгерлік тәжірибе",
    heroEyebrow: "Тевс Наталья Геннадьевнаның заңгерлік тәжірибесі",
    heroTitle: "Қазақстандағы кәсіби заң көмегі",
    heroText:
      "15 жылдан астам тәжірибе. Жеке тұлғалар мен бизнеске арналған құқықтық мәселелерді жылдам, сенімді және тиімді шешемін.",
    consult: "Кеңес алу",
    viewServices: "Қызметтерді көру",
    heroCard: "15 жылдан астам тәжірибесі бар заңгер",
    sectionServices: "Мен сізге қалай көмектесе аламын",
    servicesTitle: "Біздің қызметтер",
    allServices: "Барлық қызметтер",
    services: [
      {
        title: "Жылжымайтын мүлік",
        text: "Мәмілелерді сүйемелдеу, құқықтарды тіркеу, қайта жоспарлауды заңдастыру",
        icon: "home",
      },
      {
        title: "Бизнес және ЖШС",
        text: "Тіркеу, өзгерістер енгізу, тарату және корпоративтік құжаттар",
        icon: "briefcase",
      },
      {
        title: "Отбасылық істер",
        text: "Ажырасу, мүлікті бөлу, алимент, қамқоршылықты белгілеу",
        icon: "users",
      },
      {
        title: "Сот даулары",
        text: "Барлық сатыдағы соттарда өкілдік ету және мүдделеріңізді қорғау",
        icon: "gavel",
      },
      {
        title: "Тіркеу әрекеттері",
        text: "Қайта тіркеу, анықтамалар, сенімхаттар және басқа рәсімдер",
        icon: "document",
      },
      {
        title: "Құқықтық талдау",
        text: "Кеңес беру, шарттар жасау және құқықтық қорытынды",
        icon: "scales",
      },
    ],
    aboutEyebrow: "Мен туралы",
    aboutTitle: "Тевс Наталья Геннадьевна",
    aboutText1:
      "Азаматтық, корпоративтік, отбасылық және әкімшілік құқық саласында 15 жылдан астам тәжірибесі бар заңгер.",
    aboutText2:
      "Нәтижеге жұмыс істеймін, клиенттердің сенімі мен уақытын бағалаймын. Жеке тәсілді, құпиялықты және жоғары қызмет сапасын қамтамасыз етемін.",
    principles: [
      ["Тәжірибе мен сараптама", "15 жылдан астам табысты тәжірибе және жүздеген аяқталған іс.", "expert"],
      ["Жауапкершілік", "Істі нәтижеге дейін жеткіземін, күрделі міндеттерді өз мойныма аламын.", "award"],
      ["Құпиялық", "Кәсіби әдепті қатаң сақтау және деректеріңізді қорғау.", "lock"],
      ["Практикалық тәсіл", "Міндеттеріңізге тиімді және жұмыс істейтін шешімдер ұсынамын.", "idea"],
    ],
    processEyebrow: "Біз қалай жұмыс істейміз",
    processTitle: "Жұмыс қалай құрылады",
    process: [
      ["Кеңес", "Жағдайыңызды талқылап, мақсаттар мен ықтимал шешімдерді анықтаймыз.", "chat"],
      ["Талдау және стратегия", "Құжаттарды зерттеп, тәуекелдерді бағалап, іс-қимыл жоспарын ұсынамын.", "document"],
      ["Іске асыру", "Құжаттарды дайындап, мүдделеріңізді қорғап, процесті сүйемелдеймін.", "handshake"],
      ["Нәтиже", "Заңды дұрыс шешім мен қорғалған нәтижеге қол жеткізесіз.", "check"],
    ],
    stats: [
      ["15+", "жыл тәжірибе"],
      ["400+", "тіркеу рәсімі"],
      ["140+", "соттағы клиент"],
      ["70+", "жылжымайтын мүлік нысаны"],
    ],
    proofStats: [
      ["15+", "жыл тәжірибе"],
      ["400+", "тіркеу рәсімі"],
      ["140+", "соттағы клиент"],
      ["70+", "жылжымайтын мүлік нысаны"],
      ["98%", "табысты іс"],
      ["100%", "құпиялық"],
    ],
    proofEyebrow: "Сенімге ие тәжірибе",
    clientsEyebrow: "Бізге сенім артады",
    clientsTitle: "Клиенттер",
    clientsIntro:
      "Көлік, агробизнес, өнеркәсіп, білім беру, қауіпсіздік және басқа салалардағы компанияларды құқықтық сүйемелдеу.",
    clients: [
      "«Деньги населению» компаниялар тобы",
      "«ИнтерАвтоТранс» ЖШС",
      "«АгроИмпэкс-7» ЖШС",
      "«Теплоприбор-Казахстан» ЖШС",
      "«Сункар и К» астық компаниясы ЖШС",
      "«Grand Luxe» тіл орталығы ЖШС",
      "«Крепость» күзет агенттігі ЖШС",
      "«Kazagrodevelopment» ЖШС",
      "«РосКАвто» ЖШС",
      "«IT-Resourse» ЖШС",
      "«Industrial Security LTD» ЖШС",
      "Және басқалары",
    ],
    priceEyebrow: "Ашық шарттар",
    priceTitle: "Қызметтердің құны",
    prices: [
      ["Кеңес беру", "15 000 ₸ бастап"],
      ["Құжаттарды жасау (шарттар, өтініштер және т.б.)", "20 000 ₸ бастап"],
      ["ЖШС тіркеу", "30 000 ₸ бастап"],
      ["Жылжымайтын мүлік мәмілелерін сүйемелдеу", "50 000 ₸ бастап"],
      ["Сотта өкілдік ету", "80 000 ₸ бастап"],
      ["Бизнесті кешенді сүйемелдеу", "келісім бойынша"],
    ],
    fixedTitle: "Бекітілген құн",
    fixedText:
      "Құны алдын ала талқыланып, шартта бекітіледі. Жасырын төлемдер жоқ.",
    reviewsEyebrow: "Клиенттердің пікірлері",
    reviewsTitle: "Клиенттер не дейді",
    reviews: [
      [
        "Өз ісінің нағыз маманы! Жағдайды тез түсініп, жылжымайтын мүлік мәселесін артық қиындықсыз шешуге көмектесті. Ұсынамын!",
        "А., Алматы",
      ],
      [
        "ЖШС тіркеу мәселесі бойынша жүгіндік. Барлығы уақытында, нақты және артық бюрократиясыз жасалды. Жоғары қызмет деңгейі үшін рақмет.",
        "М., Астана",
      ],
      [
        "Күрделі сот дауын жеңдік. Наталья Геннадьевна егжей-тегжейге өте мұқият және үнемі байланыста болды.",
        "Е., Қарағанды",
      ],
    ],
    allReviews: "Пікір қалдыру",
    faqEyebrow: "Жиі қойылатын сұрақтарға жауаптар",
    faqTitle: "FAQ",
    faqs: [
      [
        "Кеңес алу үшін қандай құжаттар қажет?",
        "Жағдайыңызға қатысты шарттарды, хат-хабарларды, хабарламалар мен сот актілерін дайындаңыз. Бір нәрсе жетіспесе, алғашқы әңгімеден кейін айтамын.",
      ],
      [
        "Кеңес қанша тұрады?",
        "Алғашқы кеңестің құны 15 000 ₸-ден басталады және мәселенің күрделілігі мен құжаттар көлеміне байланысты.",
      ],
      [
        "Жеке және заңды тұлғалармен жұмыс істейсіз бе?",
        "Иә. Жеке клиенттерді, жеке кәсіпкерлерді, ЖШС және басқа ұйымдарды сүйемелдеймін.",
      ],
      [
        "Мәселені шешуге қанша уақыт кетеді?",
        "Мерзім міндетке байланысты. Құжаттарды талдағаннан кейін нақты жоспар, кезеңдер және болжамды мерзімдер беріледі.",
      ],
      [
        "Бөліп төлеу мүмкіндігі бар ма?",
        "Кешенді және ұзақ жобалар үшін кезең-кезеңімен төлеуді келісуге болады.",
      ],
      [
        "Қашықтан жұмыс қалай жүргізіледі?",
        "Кеңестер телефон және бейнебайланыс арқылы қолжетімді. Құжаттарды электронды түрде қауіпсіз жіберуге болады.",
      ],
    ],
    contactEyebrow: "Маған хабарласыңыз",
    contactTitle: "Байланыс",
    callLabel: "Телефондар / WhatsApp",
    emailLabel: "Электрондық пошта",
    address:
      "Қостанай қ., Алтынсарин көш., 34-үй, 190-тұрғын емес үй-жай, кіреберісте «GMZ Консультант» маңдайшасы",
    addressLabel: "Алдын ала жазылу бойынша қабылдау",
    formName: "Сіздің атыңыз",
    formPhone: "Телефон",
    formEmail: "E-mail",
    formMessage: "Сіздің хабарламаңыз",
    formSubmit: "Хабарлама жіберу",
    ready: "Күрделі құқықтық мәселелеріңізді шешуге көмектесуге дайынмын.",
    readyText: "Хабарласыңыз — сіз үшін тиімді шешім табамын!",
    whatsapp: "WhatsApp-қа жазу",
    footerServices: "Қызметтер",
    footerCompany: "Компания туралы",
    footerInfo: "Ақпарат",
    privacy: "Құпиялық саясаты",
    rights: "© 2026 TEVS.KZ. Барлық құқықтар қорғалған.",
  },
} as const;

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 112"
      aria-hidden="true"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g fill="currentColor" stroke="none">
        <path d="M22 71c-6-1-9-5-10-10 6 0 10 3 12 8Z" />
        <path d="M19 60c-6-2-8-6-8-11 6 1 10 4 11 9Z" />
        <path d="M20 49c-5-3-6-8-5-13 5 2 8 6 8 11Z" />
        <path d="M26 79c-5 0-9-2-12-6 6-1 10 1 14 4Z" />
        <path d="M98 71c6-1 9-5 10-10-6 0-10 3-12 8Z" />
        <path d="M101 60c6-2 8-6 8-11-6 1-10 4-11 9Z" />
        <path d="M100 49c5-3 6-8 5-13-5 2-8 6-8 11Z" />
        <path d="M94 79c5 0 9-2 12-6-6-1-10 1-14 4Z" />
      </g>
      <path
        d="M60 6 91 17v33c0 21-12.8 38.7-31 51-18.2-12.3-31-30-31-51V17L60 6Z"
        stroke="currentColor"
        strokeWidth="2.8"
      />
      <path
        d="M60 12 85 21v28c0 17-9.8 32.1-25 43-15.2-10.9-25-26-25-43V21L60 12Z"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity=".55"
      />
      <circle cx="60" cy="27" r="2.7" fill="currentColor" stroke="none" />
      <path d="M60 30v39M42 38c8 2 28 2 36 0" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="m43 39-9 17m9-17 9 17m25-17-9 17m9-17 9 17"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M31 57c3.7 6.4 19.3 6.4 23 0M66 57c3.7 6.4 19.3 6.4 23 0"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path d="M50 69h20M45 74h30" stroke="currentColor" strokeWidth="2.3" />
      <path
        d="M25 84C14 74 9 61 11 44M95 84c11-10 16-23 14-40"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="m56 19 4-4 4 4-4 4-4-4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <Mark className="brand-mark" />
      <span className="brand-copy">
        <strong>TEVS.KZ</strong>
        <small>
          Юридическая практика
          <br />
          Тевс Натальи Геннадьевны
        </small>
      </span>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d="m4 11 8-7 8 7" />
        <path d="M6.5 10v10h11V10M10 20v-6h4v6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18M10 12v2h4v-2" />
      </>
    ),
    users: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="7" r="2.5" />
        <path d="M2.5 20v-2a5.5 5.5 0 0 1 11 0v2M14 13a5 5 0 0 1 7.5 4.3V20" />
      </>
    ),
    gavel: (
      <>
        <path d="m14.5 4 5.5 5.5M11.5 7l5.5 5.5M13.5 5 5 13.5l3 3L16.5 8M10 15l8 5" />
        <path d="M14 20h8" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h8l4 4v14H6zM14 3v5h4" />
        <path d="M9 12h6M9 15h6M9 18h4" />
      </>
    ),
    scales: (
      <>
        <path d="M12 3v18M6 6h12M12 3l-2 3h4zM6 6 3 13m3-7 3 7m9-7-3 7m3-7 3 7" />
        <path d="M2 13c1.3 3 6.7 3 8 0M14 13c1.3 3 6.7 3 8 0M8 21h8" />
      </>
    ),
    expert: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2M7 5 4 4M17 5l3-1" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="10" r="7" />
        <path d="m8 16-1 6 5-3 5 3-1-6M9.5 10.5l1.7 1.7 3.5-4" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    idea: (
      <>
        <path d="M8 15c-1.3-1.1-2-2.8-2-4.6a6 6 0 1 1 12 0c0 1.8-.7 3.5-2 4.6-.7.6-1 1.2-1 2H9c0-.8-.3-1.4-1-2Z" />
        <path d="M9 20h6M10 17v3M14 17v3" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8 8 0 0 1-8.4 8 10 10 0 0 1-4.2-.9L3 21l1.7-4.4A8 8 0 1 1 21 11.5Z" />
        <path d="M8 11h.01M12 11h.01M16 11h.01" />
      </>
    ),
    handshake: (
      <>
        <path d="m8.5 9 3-2.5a2.5 2.5 0 0 1 3.2 0L22 12M2 12l4-4 4 3.5M6 8l-2-2M18 8l2-2" />
        <path d="m7 13 5.5 5.5a1.5 1.5 0 0 0 2.1-2.1l-3.1-3.1M14 15l1.5 1.5a1.5 1.5 0 0 0 2.1-2.1l-3.4-3.4M17 13l.8.8a1.5 1.5 0 0 0 2.2-2L17 9" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 2.6 2.7L16.5 9" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 7h15a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12v3" />
        <path d="M15 11h6v5h-6a2.5 2.5 0 0 1 0-5Z" />
      </>
    ),
    pillar: (
      <>
        <path d="M5 4h14M6 7h12M8 7v10M12 7v10M16 7v10M6 17h12M5 20h14" />
        <path d="m6 4 2-2h8l2 2" />
      </>
    ),
    phone: (
      <path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 1.1-.9 2-2 2C10.2 20.5 3.5 13.8 3 5a2 2 0 0 1 2-2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    send: (
      <>
        <path d="m3 11 18-8-7 18-3-7-8-3Z" />
        <path d="m11 14 5-6" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {paths[name] ?? paths.scales}
    </svg>
  );
}

function Heading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ru");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const t = content[lang];

  useEffect(() => {
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (!sectionId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    });
  }, []);

  function navigateToSection(event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    setMenuOpen(false);

    const target = document.getElementById(sectionId);
    if (!target) return;

    const nextHash = `#${sectionId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    target.scrollIntoView({ block: "start", behavior: "auto" });
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      lang === "ru" ? "Здравствуйте! Хочу получить консультацию." : "Сәлеметсіз бе! Кеңес алғым келеді.",
      `${lang === "ru" ? "Имя" : "Аты"}: ${String(data.get("name") || "")}`,
      `${lang === "ru" ? "Телефон" : "Телефон"}: ${String(data.get("phone") || "")}`,
      `${lang === "ru" ? "E-mail" : "E-mail"}: ${String(data.get("email") || "")}`,
      `${lang === "ru" ? "Вопрос" : "Сұрақ"}: ${String(data.get("message") || "")}`,
    ].join("\n");
    window.open(`${contact.whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" aria-label="TEVS.KZ — главная">
            <Brand />
          </a>

          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Основная навигация">
            {t.nav.map(([label, id], index) => (
              <a
                href={`#${id}`}
                className={index === 0 ? "active" : ""}
                key={id}
                onClick={(event) => navigateToSection(event, id)}
              >
                {label}
              </a>
            ))}
            <div className="mobile-actions">
              <div className="lang-switcher">
                <button className={lang === "ru" ? "selected" : ""} onClick={() => setLang("ru")}>RU</button>
                <span>/</span>
                <button className={lang === "kz" ? "selected" : ""} onClick={() => setLang("kz")}>KZ</button>
              </div>
              <a className="header-phone" href={contact.mobileHref}>{contact.mobile}</a>
            </div>
          </nav>

          <div className="header-actions">
            <div className="lang-switcher">
              <button className={lang === "ru" ? "selected" : ""} onClick={() => setLang("ru")}>RU</button>
              <span>/</span>
              <button className={lang === "kz" ? "selected" : ""} onClick={() => setLang("kz")}>KZ</button>
            </div>
            <a className="header-phone" href={contact.mobileHref}>
              <Icon name="phone" />
              {contact.mobile}
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-art" aria-hidden="true" />
        <div className="hero-ornament" aria-hidden="true">
          <span />
          <span />
        </div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1>
              {lang === "ru" ? (
                <>
                  Профессиональная
                  <br />
                  юридическая помощь
                  <br />
                  в Казахстане
                </>
              ) : (
                <>
                  Қазақстандағы
                  <br />
                  кәсіби заң көмегі
                </>
              )}
            </h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#contacts">
                {t.consult}
                <span className="button-icon whatsapp-icon">◔</span>
              </a>
              <a className="button button-secondary" href="#services">
                {t.viewServices}
                <span>→</span>
              </a>
            </div>
            <div className="hero-stats">
              {t.stats.map(([number, label], index) => (
                <div className="hero-stat" key={label}>
                  <Icon name={["award", "document", "users", "home"][index]} />
                  <strong>{number}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="lawyer-card">
            <div className="lawyer-card-top">
              <Icon name="pillar" />
              <strong>Тевс Наталья<br />Геннадьевна</strong>
            </div>
            <span />
            <p>{t.heroCard}</p>
          </aside>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="container">
          <Heading eyebrow={t.sectionServices} title={t.servicesTitle} />
          <div className="services-grid">
            {t.services.map((service) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon"><Icon name={service.icon} /></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
          <a className="button button-outline section-button" href="#prices">
            {t.allServices}<span>→</span>
          </a>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-intro">
          <div className="about-intro-inner">
            <Mark className="about-mark" />
            <div>
              <p className="eyebrow light-eyebrow">{t.aboutEyebrow}</p>
              <h2>{t.aboutTitle}</h2>
              <div className="gold-rule" />
              <p>{t.aboutText1}</p>
              <p>{t.aboutText2}</p>
            </div>
          </div>
        </div>
        <div className="principles">
          {t.principles.map(([title, text, icon]) => (
            <article key={title}>
              <div className="principle-icon"><Icon name={icon} /></div>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <Heading eyebrow={t.processEyebrow} title={t.processTitle} />
          <div className="process-grid">
            {t.process.map(([title, text, icon], index) => (
              <article className="process-card" key={title}>
                <div className="process-icon"><Icon name={icon} /></div>
                <span className="step-number">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                {index < t.process.length - 1 && <span className="process-arrow">→</span>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="proof-strip" id="experience">
        <div className="proof-pattern" aria-hidden="true" />
        <div className="container">
          <p className="strip-eyebrow">{t.proofEyebrow}</p>
          <div className="proof-grid">
            {t.proofStats.map(([number, label]) => (
              <div key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section clients-section" id="clients">
        <div className="container">
          <Heading eyebrow={t.clientsEyebrow} title={t.clientsTitle} />
          <p className="clients-intro">{t.clientsIntro}</p>
          <div className="clients-grid">
            {t.clients.map((clientName, index) => (
              <article className="client-card" key={clientName}>
                <span className="client-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{clientName}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section prices-section" id="prices">
        <div className="container">
          <Heading eyebrow={t.priceEyebrow} title={t.priceTitle} />
          <div className="prices-layout">
            <div className="price-list">
              {t.prices.map(([name, value]) => (
                <div className="price-row" key={name}>
                  <span>{name}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
            <aside className="fixed-card">
              <Icon name="wallet" />
              <h3>{t.fixedTitle}</h3>
              <p>{t.fixedText}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="section reviews-section" id="reviews">
        <div className="container">
          <Heading eyebrow={t.reviewsEyebrow} title={t.reviewsTitle} />
          <div className="reviews-grid">
            {t.reviews.map(([text, author]) => (
              <blockquote key={author}>
                <span className="quote">“</span>
                <p>{text}</p>
                <cite>{author}</cite>
              </blockquote>
            ))}
          </div>
          <a className="button button-outline section-button" href="#contacts">
            {t.allReviews}<span>→</span>
          </a>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <Heading eyebrow={t.faqEyebrow} title={t.faqTitle} />
          <div className="faq-grid">
            {t.faqs.map(([question, answer], index) => (
              <article className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{question}</span>
                  <b>{openFaq === index ? "−" : "+"}</b>
                </button>
                <div className="faq-answer"><p>{answer}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contacts-section" id="contacts">
        <div className="container">
          <Heading eyebrow={t.contactEyebrow} title={t.contactTitle} />
          <div className="contacts-layout">
            <div className="contact-details">
              <div className="contact-detail contact-phones">
                <span><Icon name="phone" /></span>
                <div>
                  <strong>
                    <a href={contact.landlineHref}>{contact.landline}</a>
                    <a href={contact.mobileHref}>{contact.mobile}</a>
                  </strong>
                  <small>{t.callLabel}</small>
                </div>
              </div>
              <a href={`mailto:${contact.email}`}>
                <span><Icon name="mail" /></span>
                <div><strong>{contact.email}</strong><small>{t.emailLabel}</small></div>
              </a>
              <div className="contact-detail">
                <span><Icon name="pin" /></span>
                <div><strong>{t.address}</strong><small>{t.addressLabel}</small></div>
              </div>
            </div>

            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-row">
                <input name="name" required placeholder={t.formName} aria-label={t.formName} />
                <input name="phone" required placeholder={t.formPhone} aria-label={t.formPhone} />
                <input name="email" type="email" placeholder={t.formEmail} aria-label={t.formEmail} />
              </div>
              <textarea name="message" required placeholder={t.formMessage} aria-label={t.formMessage} />
              <button className="button button-primary" type="submit">
                {t.formSubmit}<Icon name="send" />
              </button>
            </form>

            <aside className="contact-cta">
              <Icon name="scales" />
              <h3>{t.ready}</h3>
              <p>{t.readyText}</p>
              <a className="button button-gold" href={contact.whatsapp} target="_blank" rel="noreferrer">
                <span className="whatsapp-icon">◔</span>{t.whatsapp}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand compact />
            <p>{t.rights}</p>
          </div>
          <div>
            <h3>{t.footerServices}</h3>
            {t.services.slice(0, 6).map((service) => <a href="#services" key={service.title}>{service.title}</a>)}
          </div>
          <div>
            <h3>{t.footerCompany}</h3>
            <a href="#about">{t.nav[1][0]}</a>
            <a href="#clients">{t.nav[4][0]}</a>
            <a href="#reviews">{t.nav[5][0]}</a>
          </div>
          <div>
            <h3>{t.footerInfo}</h3>
            <a href="#prices">{t.nav[3][0]}</a>
            <a href="#faq">FAQ</a>
            <a href="#contacts">{t.nav[7][0]}</a>
          </div>
          <div className="footer-contact">
            <a href={contact.landlineHref}><Icon name="phone" />{contact.landline}</a>
            <a href={contact.mobileHref}><Icon name="phone" />{contact.mobile}</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" />{contact.email}</a>
            <div className="socials" aria-label="Социальные сети">
              <a href={contact.whatsapp} aria-label="WhatsApp">W</a>
              <a href="#contacts" aria-label="Instagram">I</a>
              <a href="#contacts" aria-label="Telegram">T</a>
            </div>
            <a className="privacy" href="#faq">{t.privacy}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
