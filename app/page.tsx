"use client";

import { FormEvent, useEffect, useState } from "react";

export type Lang = "ru" | "kk";

const contact = {
  mobile: "8-705-544-55-54",
  mobileHref: "tel:+77055445554",
  whatsapp: "https://wa.me/77055445554",
  telegram: "https://t.me/+77055445554",
  email: "natalia@tevs.kz",
} as const;

const content = {
  ru: {
    nav: [
      ["Главная", "top"],
      ["Обо мне", "about"],
      ["Услуги", "services"],
      ["Стоимость", "prices"],
      ["Клиенты", "clients"],
      ["Вопросы", "faq"],
      ["Контакты", "contacts"],
    ],
    practice: "Юридическая практика",
    heroEyebrow: "Юридическая практика Тевс Натальи Геннадьевны",
    heroTitle: "Юридическая помощь в городе Костанай и по Республике Казахстан",
    heroText:
      "Помогаю частным лицам и бизнесу разобраться в юридических вопросах, оценить риски и выбрать понятный план действий.",
    consult: "Получить консультацию",
    viewServices: "Смотреть услуги",
    heroCard: "Юрист с опытом более 20 лет",
    sectionServices: "Чем я могу помочь",
    servicesTitle: "Юридические услуги",
    allServices: "Смотреть стоимость",
    services: [
      {
        title: "Недвижимость",
        text: "Сделки с недвижимостью, регистрация прав и узаконение перепланировок",
        icon: "home",
      },
      {
        title: "Сопровождение бизнеса",
        text: "Договоры, корпоративные документы и юридическая поддержка в работе компании",
        icon: "briefcase",
      },
      {
        title: "Семейное право",
        text: "Расторжение брака, раздел имущества, алименты и вопросы опеки",
        icon: "users",
      },
      {
        title: "Судебные споры",
        text: "Подготовка правовой позиции и представительство в судах разных инстанций",
        icon: "landmark",
      },
      {
        title: "Регистрация ТОО",
        text: "Регистрация и перерегистрация, внесение изменений в документы и получение справок",
        icon: "document",
      },
      {
        title: "Составление договоров",
        text: "Подготовка и проверка договоров, дополнительных соглашений и правовой анализ условий",
        icon: "scales",
      },
    ],
    aboutEyebrow: "Обо мне",
    aboutTitle: "Тевс Наталья Геннадьевна",
    aboutText1:
      "Более 20 лет занимаюсь вопросами гражданского, корпоративного, семейного и административного права.",
    aboutText2:
      "Внимательно изучаю ситуацию, объясняю возможные варианты и риски простым языком. Объём работы, сроки и стоимость согласовываем заранее.",
    principles: [
      ["Опыт", "Работаю с частными клиентами, предпринимателями и компаниями.", "star"],
      ["Ответственность", "Остаюсь на связи и сообщаю о ходе работы на каждом согласованном этапе.", "shieldCheck"],
      ["Конфиденциальность", "Соблюдаю профессиональную этику и бережно отношусь к переданным данным.", "lock"],
      ["Понятный подход", "Объясняю варианты без лишней терминологии и предлагаю конкретный план действий.", "idea"],
    ],
    processEyebrow: "Порядок работы",
    processTitle: "Как проходит работа",
    process: [
      ["Первичная консультация", "Обсуждаем ситуацию, уточняем задачу и определяем, какие документы понадобятся.", "chat"],
      ["Правовой анализ", "Изучаю документы, оцениваю риски и предлагаю возможные варианты действий.", "fileSearch"],
      ["Сопровождение", "Готовлю документы, веду переговоры и представляю ваши интересы — в зависимости от задачи.", "briefcase"],
      ["Итог и следующие шаги", "Передаю подготовленные документы, объясняю результат и дальнейший порядок действий.", "check"],
    ],
    stats: [
      ["Более 20", "лет юридической практики"],
      ["400+", "регистрационных процедур"],
      ["140+", "клиентов получили помощь в судебных спорах"],
      ["70+", "объектов недвижимости на сопровождении"],
    ],
    clientsEyebrow: "Опыт работы с бизнесом",
    clientsTitle: "Клиенты",
    clientsIntro:
      "Среди клиентов — компании из сфер транспорта, агробизнеса, промышленности, образования и безопасности, а также других отраслей.",
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
      "Другие компании",
    ],
    priceEyebrow: "Ориентиры по стоимости",
    priceTitle: "Стоимость услуг",
    prices: [
      ["Консультация", "от 15 000 ₸"],
      ["Составление договоров, заявлений и других документов", "от 20 000 ₸"],
      ["Регистрация ТОО", "от 30 000 ₸"],
      ["Сопровождение сделок с недвижимостью", "от 50 000 ₸"],
      ["Представительство в суде", "от 80 000 ₸"],
      ["Комплексное сопровождение бизнеса", "рассчитывается индивидуально"],
    ],
    fixedTitle: "Условия согласовываются заранее",
    fixedText:
      "После оценки задачи объём работ, стоимость и порядок оплаты фиксируются в договоре.",
    faqEyebrow: "Перед консультацией",
    faqTitle: "Частые вопросы",
    faqs: [
      [
        "Какие документы нужны для консультации?",
        "Подготовьте документы, которые относятся к вашей ситуации: договоры, переписку, уведомления и судебные акты. Если чего-то не хватает, я подскажу после первичного разговора.",
      ],
      [
        "Сколько стоит консультация?",
        "Стоимость первичной консультации — от 15 000 ₸. Итоговая стоимость зависит от сложности вопроса и объёма документов.",
      ],
      [
        "С кем вы работаете?",
        "Работаю с частными лицами, индивидуальными предпринимателями, ТОО и другими организациями.",
      ],
      [
        "Как определяется срок работы?",
        "Срок зависит от задачи и объёма документов. После первичного анализа я обозначу этапы и ориентировочные сроки.",
      ],
      [
        "Можно ли оплачивать работу поэтапно?",
        "Для комплексных и длительных проектов можно согласовать поэтапную оплату.",
      ],
      [
        "Как проходит работа дистанционно?",
        "Консультации можно проводить по телефону или видеосвязи. Способ передачи документов согласуем заранее.",
      ],
    ],
    contactEyebrow: "Записаться на консультацию",
    contactTitle: "Контакты",
    callLabel: "Мобильный номер · WhatsApp и Telegram",
    emailLabel: "Электронная почта",
    address:
      "РК, Костанайская обл., г. Костанай, ул. Алтынсарина, д. 34, нежилое помещение 190. Ориентир — вывеска «GMZ Консультант»",
    addressLabel: "Приём по предварительной записи",
    formName: "Ваше имя",
    formPhone: "Телефон",
    formEmail: "Электронная почта",
    formMessage: "Кратко опишите ситуацию",
    formSubmit: "Продолжить в WhatsApp",
    privacyAgree: "Я соглашаюсь с обработкой данных и передачей сообщения в WhatsApp в соответствии с",
    privacyLink: "Политикой конфиденциальности",
    ready: "Нужна консультация по вашей ситуации?",
    readyText: "Кратко опишите вопрос в форме или напишите напрямую в WhatsApp.",
    whatsapp: "Написать в WhatsApp",
    footerServices: "Услуги",
    footerCompany: "О юристе",
    footerInfo: "Полезное",
    privacy: "Политика конфиденциальности",
    rights: "© 2026 TEVS.KZ. Все права защищены.",
  },
  kk: {
    nav: [
      ["Басты бет", "top"],
      ["Мен туралы", "about"],
      ["Қызметтер", "services"],
      ["Бағалар", "prices"],
      ["Клиенттер", "clients"],
      ["Сұрақтар", "faq"],
      ["Байланыс", "contacts"],
    ],
    practice: "Заңгерлік тәжірибе",
    heroEyebrow: "Заңгер Тевс Наталья Геннадьевна",
    heroTitle: "Қостанай қаласында және Қазақстан Республикасы бойынша заң көмегі",
    heroText:
      "Жеке тұлғалар мен бизнеске заң мәселелерін түсінуге, тәуекелдерді бағалауға және нақты іс-қимыл жоспарын таңдауға көмектесемін.",
    consult: "Кеңес алу",
    viewServices: "Қызметтерді көру",
    heroCard: "20 жылдан астам тәжірибесі бар заңгер",
    sectionServices: "Қандай мәселелер бойынша көмектесе аламын",
    servicesTitle: "Заңгерлік қызметтер",
    allServices: "Қызмет құнын көру",
    services: [
      {
        title: "Жылжымайтын мүлік",
        text: "Жылжымайтын мүлік мәмілелері, құқықтарды тіркеу және қайта жоспарлауды заңдастыру",
        icon: "home",
      },
      {
        title: "Бизнесті сүйемелдеу",
        text: "Шарттар, корпоративтік құжаттар және компания жұмысына заңгерлік қолдау",
        icon: "briefcase",
      },
      {
        title: "Отбасы құқығы",
        text: "Некені бұзу, мүлікті бөлу, алимент және қамқоршылық мәселелері",
        icon: "users",
      },
      {
        title: "Сот даулары",
        text: "Құқықтық ұстанымды дайындау және әртүрлі сатыдағы соттарда өкілдік ету",
        icon: "landmark",
      },
      {
        title: "ЖШС тіркеу",
        text: "Тіркеу және қайта тіркеу, құжаттарға өзгерістер енгізу және анықтамалар алу",
        icon: "document",
      },
      {
        title: "Шарттар дайындау",
        text: "Шарттар мен қосымша келісімдерді дайындау, тексеру және талаптарды құқықтық талдау",
        icon: "scales",
      },
    ],
    aboutEyebrow: "Мен туралы",
    aboutTitle: "Тевс Наталья Геннадьевна",
    aboutText1:
      "Азаматтық, корпоративтік, отбасылық және әкімшілік құқық салаларындағы мәселелермен 20 жылдан астам айналысып келемін.",
    aboutText2:
      "Жағдайды мұқият зерттеп, ықтимал нұсқалар мен тәуекелдерді қарапайым тілмен түсіндіремін. Жұмыс көлемін, мерзімін және құнын алдын ала келісеміз.",
    principles: [
      ["Тәжірибе", "Жеке клиенттермен, кәсіпкерлермен және компаниялармен жұмыс істеймін.", "star"],
      ["Жауапкершілік", "Әр келісілген кезеңде байланыста болып, жұмыс барысы туралы хабарлаймын.", "shieldCheck"],
      ["Құпиялық", "Кәсіби әдепті сақтап, берілген деректерге ұқыпты қараймын.", "lock"],
      ["Түсінікті тәсіл", "Нұсқаларды артық терминдерсіз түсіндіріп, нақты іс-қимыл жоспарын ұсынамын.", "idea"],
    ],
    processEyebrow: "Жұмыс тәртібі",
    processTitle: "Жұмыс қалай жүргізіледі",
    process: [
      ["Алғашқы кеңес", "Жағдайды талқылап, міндетті нақтылаймыз және қандай құжаттар қажет екенін анықтаймыз.", "chat"],
      ["Құқықтық талдау", "Құжаттарды зерттеп, тәуекелдерді бағалап, ықтимал әрекет нұсқаларын ұсынамын.", "fileSearch"],
      ["Сүйемелдеу", "Міндетке қарай құжаттарды дайындап, келіссөздер жүргізіп, мүдделеріңізді білдіремін.", "briefcase"],
      ["Қорытынды және келесі қадамдар", "Дайындалған құжаттарды беріп, нәтижені және әрі қарайғы әрекет тәртібін түсіндіремін.", "check"],
    ],
    stats: [
      ["20", "жылдан астам заңгерлік тәжірибе"],
      ["400+", "тіркеу рәсімі"],
      ["140+", "сот даулары бойынша көмек алған клиент"],
      ["70+", "сүйемелдеудегі жылжымайтын мүлік нысаны"],
    ],
    clientsEyebrow: "Бизнеспен жұмыс тәжірибесі",
    clientsTitle: "Клиенттер",
    clientsIntro:
      "Клиенттер қатарында көлік, агробизнес, өнеркәсіп, білім беру, қауіпсіздік және басқа салалардағы компаниялар бар.",
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
      "Басқа компаниялар",
    ],
    priceEyebrow: "Қызмет құны туралы",
    priceTitle: "Қызметтердің құны",
    prices: [
      ["Кеңес беру", "15 000 ₸ бастап"],
      ["Шарттар, өтініштер және басқа құжаттар дайындау", "20 000 ₸ бастап"],
      ["ЖШС тіркеу", "30 000 ₸ бастап"],
      ["Жылжымайтын мүлік мәмілелерін сүйемелдеу", "50 000 ₸ бастап"],
      ["Сотта өкілдік ету", "80 000 ₸ бастап"],
      ["Бизнесті кешенді сүйемелдеу", "жеке есептеледі"],
    ],
    fixedTitle: "Шарттар алдын ала келісіледі",
    fixedText:
      "Міндетті бағалағаннан кейін жұмыс көлемі, құны және төлем тәртібі шартта бекітіледі.",
    faqEyebrow: "Кеңес алдында",
    faqTitle: "Жиі қойылатын сұрақтар",
    faqs: [
      [
        "Кеңес алу үшін қандай құжаттар қажет?",
        "Жағдайыңызға қатысты шарттарды, хат-хабарларды, хабарламалар мен сот актілерін дайындаңыз. Бір нәрсе жетіспесе, алғашқы әңгімеден кейін нақтылап айтамын.",
      ],
      [
        "Кеңес қанша тұрады?",
        "Алғашқы кеңестің құны — 15 000 ₸-ден бастап. Нақты құны мәселенің күрделілігі мен құжаттар көлеміне байланысты.",
      ],
      [
        "Кімдермен жұмыс істейсіз?",
        "Жеке тұлғалармен, жеке кәсіпкерлермен, ЖШС және басқа ұйымдармен жұмыс істеймін.",
      ],
      [
        "Жұмыс мерзімі қалай анықталады?",
        "Мерзім міндет пен құжаттар көлеміне байланысты. Алғашқы талдаудан кейін кезеңдер мен болжамды мерзімдерді айтамын.",
      ],
      [
        "Қызмет ақысын кезең-кезеңімен төлеуге бола ма?",
        "Кешенді және ұзақ жобалар үшін кезең-кезеңімен төлеуді келісуге болады.",
      ],
      [
        "Қашықтан жұмыс қалай жүргізіледі?",
        "Кеңесті телефон немесе бейнебайланыс арқылы өткізуге болады. Құжаттарды беру тәсілін алдын ала келісеміз.",
      ],
    ],
    contactEyebrow: "Кеңеске жазылу",
    contactTitle: "Байланыс",
    callLabel: "Ұялы нөмір · WhatsApp және Telegram",
    emailLabel: "Электрондық пошта",
    address:
      "Қазақстан Республикасы, Қостанай облысы, Қостанай қ., Алтынсарин көш., 34-үй, 190-тұрғын емес үй-жай. Бағдар — «GMZ Консультант» маңдайшасы",
    addressLabel: "Алдын ала жазылу бойынша қабылдау",
    formName: "Сіздің атыңыз",
    formPhone: "Телефон",
    formEmail: "Электрондық пошта",
    formMessage: "Жағдайыңызды қысқаша сипаттаңыз",
    formSubmit: "WhatsApp-та жалғастыру",
    privacyAgree: "Деректерді өңдеуге және хабарламаны WhatsApp арқылы жіберуге келісемін. Толық ақпарат",
    privacyLink: "Құпиялық саясатында",
    ready: "Жағдайыңыз бойынша кеңес қажет пе?",
    readyText: "Сұрақты нысанда қысқаша сипаттаңыз немесе WhatsApp-қа тікелей жазыңыз.",
    whatsapp: "WhatsApp-қа жазу",
    footerServices: "Қызметтер",
    footerCompany: "Заңгер туралы",
    footerInfo: "Пайдалы ақпарат",
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

function Brand({ compact = false, lang = "ru" }: { compact?: boolean; lang?: Lang }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <Mark className="brand-mark" />
      <span className="brand-copy">
        <strong>TEVS.KZ</strong>
        <small>
          {lang === "ru" ? "Юридическая практика" : "Заңгерлік тәжірибе"}
          <br />
          {lang === "ru" ? "Тевс Натальи Геннадьевны" : "Тевс Наталья Геннадьевна"}
        </small>
      </span>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<string, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10.5 9-7.5 9 7.5" />
        <path d="M5 9.5V21h14V9.5M9 21v-7h6v7" />
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
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M16 14.2A5.5 5.5 0 0 1 21 19v2" />
      </>
    ),
    landmark: (
      <>
        <path d="M3 21h18M5 18h14M6 18v-7M10 18v-7M14 18v-7M18 18v-7M3 10h18" />
        <path d="m12 3 9 4H3z" />
      </>
    ),
    document: (
      <>
        <path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6" />
      </>
    ),
    scales: (
      <>
        <path d="M12 3v18M6 6h12M12 3l-2 3h4zM6 6 3 13m3-7 3 7m9-7-3 7m3-7 3 7" />
        <path d="M2 13c1.3 3 6.7 3 8 0M14 13c1.3 3 6.7 3 8 0M8 21h8" />
      </>
    ),
    star: (
      <>
        <path d="m12 3 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 17l-5.5 2.92 1.05-6.12L3.1 9.47l6.15-.9z" />
      </>
    ),
    shieldCheck: (
      <>
        <path d="M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14.5v2" />
      </>
    ),
    idea: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M8.6 15.5A7 7 0 1 1 15.4 15.5c-.8.6-1.3 1.5-1.4 2.5h-4c-.1-1-.6-1.9-1.4-2.5Z" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 10 10 0 0 1-4-.9L3 21l1.7-4.2A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" />
      </>
    ),
    fileSearch: (
      <>
        <path d="M6 3h8l4 4v6M14 3v5h4" />
        <path d="M6 3v18h7" />
        <circle cx="16.5" cy="16.5" r="3.5" />
        <path d="m19 19 2 2" />
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
    whatsapp: (
      <>
        <path d="M20.5 11.7a8.5 8.5 0 0 1-8.9 8.5 10.8 10.8 0 0 1-4.1-.9L3 21l1.6-4.2a8.5 8.5 0 1 1 15.9-5.1Z" />
        <path d="M8.2 7.5c.3-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.9 2.1c.1.3.1.5-.1.7l-.7.9c.8 1.7 2.2 3 3.9 3.8l.9-.8c.2-.2.5-.2.7-.1l2.1 1c.3.1.4.3.4.6v.6c0 .5-.3.9-.7 1.1-.6.3-1.3.4-2 .3-4.6-.7-8.3-4.4-9-9-.1-.8 0-1.5.4-2.1Z" />
      </>
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

function LanguageSwitcher({ lang }: { lang: Lang }) {
  return (
    <div className="lang-switcher" aria-label={lang === "ru" ? "Язык сайта" : "Сайт тілі"}>
      {/* Full-page links intentionally load the matching prerendered language document. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a className={lang === "ru" ? "selected" : ""} href="/" lang="ru" hrefLang="ru" aria-current={lang === "ru" ? "page" : undefined}>RU</a>
      <span>/</span>
      <a className={lang === "kk" ? "selected" : ""} href="/kk/" lang="kk" hrefLang="kk" aria-current={lang === "kk" ? "page" : undefined}>ҚАЗ</a>
    </div>
  );
}

const serviceSlugs = ["nedvizhimost", "soprovozhdenie-biznesa", "semeynye-spory", "predstavitelstvo-v-sude", "registraciya-too", "dogovory"];
function serviceHref(lang: Lang, index?: number) {
  return `${lang === "kk" ? "/kk" : ""}/uslugi/${index === undefined ? "" : `${serviceSlugs[index]}/`}`;
}

export default function Home({ lang = "ru" }: { lang?: Lang } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("top");
  const t = content[lang];

  useEffect(() => {
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (!sectionId) return;

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({ block: "start" });
    });
  }, []);

  useEffect(() => {
    const sections = t.nav
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-96px 0px -58%", threshold: [0.05, 0.25, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [t.nav]);

  function navigateToSection(event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    setMenuOpen(false);

    const target = document.getElementById(sectionId);
    if (!target) return;

    const nextHash = `#${sectionId}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
    setActiveSection(sectionId);
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
          <a href="#top" aria-label={lang === "ru" ? "TEVS.KZ — главная" : "TEVS.KZ — басты бет"}>
            <Brand lang={lang} />
          </a>

          <nav
            className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`}
            aria-label={lang === "ru" ? "Основная навигация" : "Негізгі навигация"}
          >
            {t.nav.map(([label, id]) => (
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                aria-current={activeSection === id ? "location" : undefined}
                key={id}
                onClick={(event) => navigateToSection(event, id)}
              >
                {label}
              </a>
            ))}
            <div className="mobile-actions">
              <LanguageSwitcher lang={lang} />
              <a className="header-phone" href={contact.mobileHref}>{contact.mobile}</a>
            </div>
          </nav>

          <div className="header-actions">
            <LanguageSwitcher lang={lang} />
            <a className="header-phone" href={contact.mobileHref}>
              <Icon name="phone" />
              {contact.mobile}
            </a>
            <button
              className="menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? (lang === "ru" ? "Закрыть меню" : "Мәзірді жабу") : (lang === "ru" ? "Открыть меню" : "Мәзірді ашу")}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <picture className="hero-art">
          <source
            type="image/webp"
            srcSet="/natalia-tevs-720.webp 720w, /natalia-tevs-1333.webp 1333w"
            sizes="(max-width: 760px) 100vw, 72vw"
          />
          <img
            src="/natalia-tevs.jpg"
            alt="Тевс Наталья Геннадьевна"
            width="1333"
            height="1600"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
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
                  Юридическая помощь
                  <br />
                  в городе Костанай
                  <br />
                  и по Республике Казахстан
                </>
              ) : (
                <>
                  Қостанай қаласында
                  <br />
                  және Қазақстан Республикасы бойынша
                  <br />
                  заң көмегі
                </>
              )}
            </h1>
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#contacts">
                {t.consult}
                <span className="button-icon whatsapp-icon"><Icon name="whatsapp" /></span>
              </a>
              <a className="button button-secondary" href="#services">
                {t.viewServices}
                <span>→</span>
              </a>
            </div>
            <div className="hero-stats">
              {t.stats.map(([number, label], index) => (
                <div className="hero-stat" key={label}>
                  <Icon name={["star", "document", "users", "home"][index]} />
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
            {t.services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <div className="service-icon"><Icon name={service.icon} /></div>
                <h3><a className="service-card-link" href={serviceHref(lang, index)}>{service.title}<span aria-hidden="true">↗</span></a></h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
          <div className="service-actions">
            <a className="button button-outline" href={serviceHref(lang)}>{lang === "ru" ? "Все услуги" : "Барлық қызметтер"}<span>→</span></a>
            <a className="service-consult-link" href={`${serviceHref(lang)}konsultaciya/`}>{lang === "ru" ? "Начать с консультации" : "Кеңес алудан бастау"}<span aria-hidden="true">↗</span></a>
          </div>
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
                    <a href={contact.mobileHref}>{contact.mobile}</a>
                  </strong>
                  <small>{t.callLabel}</small>
                  <div className="contact-messengers"><a href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a><a href={contact.telegram} target="_blank" rel="noreferrer">Telegram</a></div>
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
              <label className="privacy-consent">
                <input name="privacy" type="checkbox" required />
                <span>
                  {t.privacyAgree}{" "}
                  <a href={lang === "ru" ? "/privacy/" : "/kk/privacy/"} target="_blank" rel="noreferrer">
                    {t.privacyLink}
                  </a>
                </span>
              </label>
              <button className="button button-primary" type="submit">
                {t.formSubmit}<Icon name="send" />
              </button>
            </form>

            <aside className="contact-cta">
              <Icon name="scales" />
              <h3>{t.ready}</h3>
              <p>{t.readyText}</p>
              <a className="button button-gold" href={contact.whatsapp} target="_blank" rel="noreferrer">
                <span className="whatsapp-icon"><Icon name="whatsapp" /></span>{t.whatsapp}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Brand compact lang={lang} />
            <p>{t.rights}</p>
          </div>
          <div>
            <h3>{t.footerServices}</h3>
            {t.services.slice(0, 6).map((service, index) => <a href={serviceHref(lang, index)} key={service.title}>{service.title}</a>)}
            <a href={`${serviceHref(lang)}konsultaciya/`}>{lang === "ru" ? "Консультация юриста" : "Заңгер кеңесі"}</a>
          </div>
          <div>
            <h3>{t.footerCompany}</h3>
            <a href="#about">{t.nav[1][0]}</a>
            <a href="#clients">{t.nav[4][0]}</a>
          </div>
          <div>
            <h3>{t.footerInfo}</h3>
            <a href="#prices">{t.nav[3][0]}</a>
            <a href="#faq">{t.nav[5][0]}</a>
            <a href="#contacts">{t.nav[6][0]}</a>
          </div>
          <div className="footer-contact">
            <a href={contact.mobileHref}><Icon name="phone" />{contact.mobile}</a>
            <a href={`mailto:${contact.email}`}><Icon name="mail" />{contact.email}</a>
            <div className="socials" aria-label={lang === "ru" ? "Связаться в мессенджере" : "Мессенджер арқылы байланысу"}>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><Icon name="whatsapp" /></a>
              <a href={contact.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><Icon name="send" /></a>
            </div>
            <a className="privacy" href={lang === "ru" ? "/privacy/" : "/kk/privacy/"}>{t.privacy}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
