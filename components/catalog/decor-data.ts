export type DecorCategory = 'baby' | 'gender' | 'birthday' | 'christening' | 'other'

// Once you start re-coloring photozones via GPT, tag each recolored variant
// with `colorVariant` and give siblings the same `variantGroup` (e.g. all
// three colors of "Teddy" share variantGroup: 'teddy'). Neither field is
// required — items without them behave exactly as before (no swatches shown).
export type ColorVariant = 'boy' | 'girl' | 'neutral'

export type DecorItem = {
  id: number
  slug: string

  title: string
  subtitle: string
  description: string

  // A single photozone can now belong to several occasions at once —
  // e.g. categories: ['baby', 'birthday'] shows it under both filters.
  categories: DecorCategory[]

  image: string

  priceFrom: number

  colors: string[]

  tags: string[]

  width: number
  height: number

  premium: boolean
  popular: boolean
  new: boolean

  colorVariant?: ColorVariant
  variantGroup?: string
}

export const DECOR_ITEMS: DecorItem[] = [
  {
    id: 1,
    slug: 'nebesnaya-arka',
    title: 'Небесная арка',
    subtitle: 'Выписка из роддома',
    description: 'Воздушная фотозона в нежных голубых, молочных и золотых оттенках с цветочным декором',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/nebesnaya-arka.png',
    priceFrom: 40000,
    colors: ['голубой', 'белый', 'золотой'],
    tags: ['выписка', 'мальчик', 'шары'],
    width: 3.5,
    height: 2.7,
    premium: true,
    popular: true,
    new: false,
  },
  {
    id: 2,
    slug: 'mishka-na-lune',
    title: 'Мишка на луне',
    subtitle: 'Выписка из роддома',
    description: 'Нежная детская фотозона с плюшевым мишкой, облаками, звёздами и голубо-молочным декором',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/mishka-na-lune.png',
    priceFrom: 40000,
    colors: ['белый', 'голубой', 'золотой'],
    tags: ['девочка', 'выписка', 'шары', 'цветы'],
    width: 3.5,
    height: 2.7,
    premium: true,
    popular: false,
    new: true,
  },
  {
    id: 3,
    slug: 'nezhnyy-syurpriz',
    title: 'Нежный сюрприз',
    subtitle: 'Выписка из роддома',
    description: 'Элегантная фотозона в кремовых оттенках с арками, цветочным декором, подсветкой и праздничным тортом',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/nezhnyy-syurpriz.png',
    priceFrom: 40000,
    colors: ['белый', 'кремовый', 'золотой'],
    tags: ['1 год', 'мальчик', 'день рождения'],
    width: 4,
    height: 2.8,
    premium: true,
    popular: true,
    new: false,
  },
  {
    id: 4,
    slug: 'vozdushnoe-oblako',
    title: 'Воздушное облако',
    subtitle: 'Выписка из роддома',
    description: 'Воздушная фотозона в бело-серой гамме с объемными шарами, облаками и декоративным воздушным шаром',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/vozdushnoe-oblako.png',
    priceFrom: 35000,
    colors: ['белый', 'серый', 'оливковый'],
    tags: ['девочка', 'цветы', 'сад'],
    width: 3.6,
    height: 2.7,
    premium: true,
    popular: false,
    new: true,
  },
  {
    id: 5,
    slug: 'malenkiy-prints',
    title: 'Маленький принц',
    subtitle: 'Выписка из роддома',
    description: 'Премиальная детская фотозона в шалфейно-золотых оттенках с плюшевым мишкой, цветами и воздушными шарами',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/malenkiy-prints.png',
    priceFrom: 40000,
    colors: ['шалфейный', 'золотой'],
    tags: ['гендер-пати', 'шары'],
    width: 3.8,
    height: 2.8,
    premium: true,
    popular: true,
    new: false,
  },
  {
    id: 6,
    slug: 'zolotoy-prazdnik',
    title: 'Золотой праздник',
    subtitle: 'Выписка из роддома',
    description: 'Атмосферная фотозона в теплых бежево-золотых оттенках с подсветкой, цветами, свечами',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/zolotoy-prazdnik.png',
    priceFrom: 45000,
    colors: ['белый', 'бежевый', 'золотой'],
    tags: ['облака', 'гендер', 'премиум'],
    width: 4.2,
    height: 2.8,
    premium: true,
    popular: false,
    new: true,
  },
  {
    id: 7,
    slug: 'romashkovaya-utka',
    title: 'Ромашковая Утка',
    subtitle: 'Выписка из роддома',
    description: 'Нежная фотозона с пастельными шарами, зайчиком-балериной, воздушными лентами и крупным кремовым бантом',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/romashkovaya-utka.png',
    priceFrom: 25000,
    colors: ['бежевый', 'белый', 'розовый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 8,
    slug: 'tsvetushchiy-rebenok',
    title: 'Цветущий ребенок',
    subtitle: 'Выписка из роддома',
    description: 'Воздушная фотозона в нежных голубых и белых оттенках с цветочным декором, объемной композицией из шаров и изящными ботаническими элементами',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/tsvetushchiy-rebenok.png',
    priceFrom: 25000,
    colors: ['синий', 'белый', 'голубой'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 9,
    slug: 'lunnaya-nezhnost',
    title: 'Лунная Нежность',
    subtitle: 'Выписка из роддома',
    description: 'Уютная детская фотозона в кремово-бежевой гамме с месяцем, плюшевым мишкой, облаками и воздушной композицией из шаров',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/lunnaya-nezhnost.png',
    priceFrom: 60000,
    colors: ['бежевый', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 10,
    slug: 'lunnaya-lyubov',
    title: 'Лунная Любовь',
    subtitle: 'Выписка из роддома',
    description: 'Романтичная фотозона в голубых и молочных оттенках с крупным месяцем, объемными облаками и нежной композицией из воздушных шаров',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/lunnaya-lyubov.png',
    priceFrom: 40000,
    colors: ['голубой', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 11,
    slug: 'slonyonok',
    title: 'Слонёнок',
    subtitle: 'Выписка из роддома',
    description: 'Праздничная детская фотозона в пастельных голубых, кремовых и персиковых оттенках со слонёнком, цветами и воздушными шарами',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/slonyonok.png',
    priceFrom: 35000,
    colors: ['голубой', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 12,
    slug: 'nebesnoe-oblako',
    title: 'Небесное Облако',
    subtitle: 'Выписка из роддома',
    description: 'Объемная воздушная арка в голубых и белых оттенках с декоративными облаками и легкой, воздушной композицией для детского праздника',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/nebesnoe-oblako.png',
    priceFrom: 35000,
    colors: ['голубой', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 13,
    slug: 'aist',
    title: 'Аист',
    subtitle: 'Выписка из роддома',
    description: 'Воздушная фотозона для встречи малыша с голубыми и кремовыми шарами, фигурой аиста и нежным декоративным оформлением',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/aist.png',
    priceFrom: 25000,
    colors: ['голубой', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 14,
    slug: 'malenkoe-chudo',
    title: 'Маленькое чудо',
    subtitle: 'Выписка из роддома',
    description: 'Нежная фотозона для встречи малышки с зайкой',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/malenkoe-chudo.png',
    priceFrom: 25000,
    colors: ['розовый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 15,
    slug: 'zhemchuzhina',
    title: 'Жемчужина',
    subtitle: 'Выписка из роддома',
    description: 'Неповторимая фотозона в виде драгоценных жемчужин',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/zhemchuzhina.png',
    priceFrom: 25000,
    colors: ['розовый', 'белый'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
  {
    id: 16,
    slug: 'dolgozhdannaya-vstrecha',
    title: 'Долгожданная встреча!',
    subtitle: 'Выписка из роддома',
    description: 'Фотозона для встречи малышки с розовыми и белыми шарами, цветами и детской люлькой',
    categories: ['baby'],
    image: '/dekoratsii-i-oformlenie/dolgozhdannaya-vstrecha.png',
    priceFrom: 35000,
    colors: ['розовый', 'белый', 'золотой'],
    tags: ['крещение', 'цветы'],
    width: 3.4,
    height: 2.6,
    premium: false,
    popular: false,
    new: true,
  },
]

export const CATEGORY_LABELS: Record<DecorCategory, string> = {
  baby: 'Выписка из роддома',
  gender: 'Гендер-пати',
  birthday: 'День рождения',
  christening: 'Крещение',
  other: 'Другое',
}

export const COLOR_VARIANT_LABELS: Record<ColorVariant, string> = {
  boy: 'Для мальчика',
  girl: 'Для девочки',
  neutral: 'Нейтральный',
}

// Solid swatch colors for the on-card color picker — one representative
// hex per variant, independent of the free-text `colors` array.
export const COLOR_VARIANT_SWATCH: Record<ColorVariant, string> = {
  boy: '#7EB6E0',
  girl: '#F2A6C0',
  neutral: '#D8CBB0',
}

// Price brackets for the price filter — mirrors the pill-style budget
// selectors already used elsewhere on the site (RequestModal).
export type PriceRange = {
  id: string
  label: string
  min?: number
  max?: number
}

export const PRICE_RANGES: PriceRange[] = [
  { id: 'under-35', label: 'до 35 000 ₽', max: 35000 },
  { id: '35-40', label: '35 000–40 000 ₽', min: 35000, max: 40000 },
  { id: '40-50', label: '40 000–50 000 ₽', min: 40000, max: 50000 },
  { id: 'over-50', label: 'более 50 000 ₽', min: 50000 },
]

export type SortOption = 'default' | 'popular' | 'price-asc' | 'price-desc'

export const SORT_LABELS: Record<SortOption, string> = {
  default: 'По умолчанию',
  popular: 'Сначала популярные',
  'price-asc': 'Сначала недорогие',
  'price-desc': 'Сначала дорогие',
}