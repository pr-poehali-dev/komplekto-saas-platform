export const demoProjects = [
  { id: 1, name: 'ЖК Авангард', type: 'Жилой комплекс', status: 'active', progress: 67, budget: 48500000, spent: 32450000, rooms: 24, orders: 12, city: 'Москва' },
  { id: 2, name: 'Офис Meridian', type: 'Офис', status: 'active', progress: 42, budget: 8200000, spent: 3444000, rooms: 8, orders: 6, city: 'Санкт-Петербург' },
  { id: 3, name: 'Апартаменты Sky', type: 'Квартира', status: 'planning', progress: 15, budget: 3500000, spent: 525000, rooms: 5, orders: 2, city: 'Москва' },
  { id: 4, name: 'Отель Grand', type: 'Гостиница', status: 'active', progress: 89, budget: 125000000, spent: 111250000, rooms: 86, orders: 34, city: 'Сочи' },
  { id: 5, name: 'Коттедж Лесной', type: 'Загородный дом', status: 'completed', progress: 100, budget: 12000000, spent: 11850000, rooms: 12, orders: 18, city: 'Подмосковье' },
];

export const demoSuppliers = [
  { id: 1, name: 'СантехГрупп', rating: 4.8, orders: 1240, category: 'Сантехника', city: 'Москва', verified: true },
  { id: 2, name: 'ПлиткаМаркет', rating: 4.6, orders: 890, category: 'Плитка', city: 'Екатеринбург', verified: true },
  { id: 3, name: 'LightPro', rating: 4.9, orders: 2100, category: 'Освещение', city: 'Москва', verified: true },
  { id: 4, name: 'МебельОпт', rating: 4.3, orders: 567, category: 'Мебель', city: 'Казань', verified: false },
  { id: 5, name: 'ДекорТрейд', rating: 4.7, orders: 1456, category: 'Декор', city: 'Санкт-Петербург', verified: true },
  { id: 6, name: 'КухниПро', rating: 4.5, orders: 678, category: 'Кухни', city: 'Новосибирск', verified: true },
  { id: 7, name: 'ПолПаркет', rating: 4.4, orders: 934, category: 'Полы', city: 'Москва', verified: true },
  { id: 8, name: 'КраскиМир', rating: 4.2, orders: 345, category: 'Краски', city: 'Ростов-на-Дону', verified: false },
];

export const demoProducts = [
  {
    id: 1, name: 'Унитаз подвесной Grohe Essence', category: 'Сантехника', brand: 'Grohe',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
    description: 'Современный подвесной унитаз с безободковой технологией',
    specs: { 'Материал': 'Фарфор', 'Цвет': 'Альпийский белый', 'Крепление': 'Подвесное', 'Гарантия': '5 лет' },
    offers: [
      { supplier: 'СантехГрупп', price: 28500, stock: 45, delivery: '2–3 дня', rating: 4.8 },
      { supplier: 'АквастройМ', price: 31200, stock: 12, delivery: '1 день', rating: 4.5 },
      { supplier: 'МегаСантех', price: 27900, stock: 8, delivery: '5–7 дней', rating: 4.3 },
    ]
  },
  {
    id: 2, name: 'Плитка керамогранит Porcelanosa Urban', category: 'Плитка', brand: 'Porcelanosa',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=400&h=400&fit=crop',
    description: 'Крупноформатный керамогранит с имитацией бетона',
    specs: { 'Размер': '60×60 см', 'Поверхность': 'Матовая', 'Морозостойкость': 'Да', 'Класс': 'PEI 4' },
    offers: [
      { supplier: 'ПлиткаМаркет', price: 2400, stock: 1200, delivery: '3–5 дней', rating: 4.6 },
      { supplier: 'КерамоПро', price: 2650, stock: 800, delivery: '2 дня', rating: 4.7 },
      { supplier: 'ТайлСтор', price: 2100, stock: 300, delivery: '7–10 дней', rating: 4.1 },
    ]
  },
  {
    id: 3, name: 'Светильник EGLO Olindra LED', category: 'Освещение', brand: 'EGLO',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop',
    description: 'Встраиваемый светодиодный светильник с регулировкой яркости',
    specs: { 'Мощность': '12W', 'Световой поток': '1080 lm', 'Цветовая температура': '3000K', 'IP': 'IP44' },
    offers: [
      { supplier: 'LightPro', price: 4200, stock: 340, delivery: '1–2 дня', rating: 4.9 },
      { supplier: 'ЭлектроМаркет', price: 4600, stock: 120, delivery: '3 дня', rating: 4.4 },
      { supplier: 'СветМир', price: 3900, stock: 45, delivery: '5 дней', rating: 4.2 },
    ]
  },
  {
    id: 4, name: 'Диван модульный Flex System', category: 'Мебель', brand: 'Flex',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
    description: 'Модульный диван с возможностью конфигурации под любое пространство',
    specs: { 'Обивка': 'Велюр', 'Цвет': 'Графит', 'Ширина': '280 см', 'Механизм': 'Еврокнижка' },
    offers: [
      { supplier: 'МебельОпт', price: 187000, stock: 8, delivery: '14–21 день', rating: 4.3 },
      { supplier: 'ДизайнМебель', price: 210000, stock: 3, delivery: '7 дней', rating: 4.7 },
    ]
  },
  {
    id: 5, name: 'Ламинат Egger Pro Classic 8мм', category: 'Полы', brand: 'Egger',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Профессиональный ламинат с защитой от влаги и царапин',
    specs: { 'Класс': '33', 'Толщина': '8 мм', 'Замок': 'Click', 'АС-класс': 'АС5' },
    offers: [
      { supplier: 'ПолПаркет', price: 890, stock: 5600, delivery: '2–3 дня', rating: 4.4 },
      { supplier: 'ПаркетМастер', price: 950, stock: 2100, delivery: '1 день', rating: 4.6 },
      { supplier: 'ПолПро', price: 820, stock: 890, delivery: '5 дней', rating: 4.0 },
    ]
  },
  {
    id: 6, name: 'Краска Sherwin-Williams Emerald', category: 'Краски', brand: 'Sherwin-Williams',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop',
    description: 'Премиальная интерьерная краска с антибактериальным покрытием',
    specs: { 'Основа': 'Акриловая', 'Расход': '10–12 м²/л', 'Блеск': 'Матовый', 'Высыхание': '1 час' },
    offers: [
      { supplier: 'КраскиМир', price: 3200, stock: 240, delivery: '3 дня', rating: 4.2 },
      { supplier: 'ColorsPlus', price: 3500, stock: 180, delivery: '2 дня', rating: 4.5 },
    ]
  },
  {
    id: 7, name: 'Кухня Nolte Artwood', category: 'Кухни', brand: 'Nolte',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    description: 'Немецкая кухня с фасадами из натурального шпона дуба',
    specs: { 'Материал фасада': 'Шпон дуба', 'Фурнитура': 'Blum', 'Столешница': 'Кварц', 'Гарантия': '10 лет' },
    offers: [
      { supplier: 'КухниПро', price: 485000, stock: 2, delivery: '30–45 дней', rating: 4.5 },
      { supplier: 'КухниМаркет', price: 520000, stock: 1, delivery: '21 день', rating: 4.8 },
    ]
  },
  {
    id: 8, name: 'Дверь межкомнатная Profil Doors 2.0', category: 'Двери', brand: 'Profil Doors',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Скрытая межкомнатная дверь с алюминиевой кромкой',
    specs: { 'Покрытие': 'Эмаль', 'Цвет': 'Белый', 'Высота': '210 см', 'Ширина': '80 см' },
    offers: [
      { supplier: 'ДвериОпт', price: 28900, stock: 34, delivery: '5–7 дней', rating: 4.4 },
      { supplier: 'ДверьМастер', price: 31500, stock: 18, delivery: '3 дня', rating: 4.6 },
    ]
  },
];

export const demoOrders = [
  { id: 'ORD-2401', project: 'ЖК Авангард', supplier: 'СантехГрупп', status: 'shipped', amount: 284500, items: 12, date: '2024-01-15', eta: '2024-01-20' },
  { id: 'ORD-2402', project: 'Офис Meridian', supplier: 'LightPro', status: 'confirmed', amount: 168000, items: 40, date: '2024-01-16', eta: '2024-01-22' },
  { id: 'ORD-2403', project: 'ЖК Авангард', supplier: 'ПлиткаМаркет', status: 'processing', amount: 420000, items: 175, date: '2024-01-17', eta: '2024-01-25' },
  { id: 'ORD-2404', project: 'Апартаменты Sky', supplier: 'МебельОпт', status: 'draft', amount: 94000, items: 5, date: '2024-01-18', eta: null },
  { id: 'ORD-2405', project: 'Отель Grand', supplier: 'КухниПро', status: 'delivered', amount: 2425000, items: 5, date: '2024-01-10', eta: '2024-01-18' },
  { id: 'ORD-2406', project: 'Отель Grand', supplier: 'ПолПаркет', status: 'delivered', amount: 890000, items: 1000, date: '2024-01-08', eta: '2024-01-15' },
];

export const demoMessages = [
  {
    id: 1, supplier: 'СантехГрупп', avatar: 'СГ', lastMessage: 'Товар отгружен, трек-номер прикрепили',
    time: '10:24', unread: 2, project: 'ЖК Авангард',
    messages: [
      { from: 'supplier', text: 'Добрый день! Подтверждаем заказ ORD-2401.', time: '09:15' },
      { from: 'me', text: 'Отлично, когда планируете отгрузку?', time: '09:20' },
      { from: 'supplier', text: 'Сегодня. Документы вышлем позже.', time: '09:45' },
      { from: 'supplier', text: 'Товар отгружен, трек-номер прикрепили', time: '10:24' },
    ]
  },
  {
    id: 2, supplier: 'LightPro', avatar: 'LP', lastMessage: 'Готовы предоставить скидку 5%',
    time: 'вчера', unread: 0, project: 'Офис Meridian',
    messages: [
      { from: 'me', text: 'Можете предложить скидку на большой объём?', time: 'вчера 14:30' },
      { from: 'supplier', text: 'Готовы предоставить скидку 5%', time: 'вчера 16:00' },
    ]
  },
  {
    id: 3, supplier: 'ПлиткаМаркет', avatar: 'ПМ', lastMessage: 'Прайс-лист во вложении',
    time: 'вчера', unread: 1, project: 'ЖК Авангард',
    messages: [
      { from: 'supplier', text: 'Прайс-лист во вложении', time: 'вчера 11:00' },
    ]
  },
];

export const demoSpecs = [
  {
    id: 1, name: 'Спецификация санузла — кв. 14А', project: 'ЖК Авангард', room: 'Санузел',
    status: 'approved', total: 847500, itemsCount: 18,
    items: [
      { product: 'Унитаз Grohe Essence', qty: 1, unit: 'шт', supplier: 'СантехГрупп', price: 28500, total: 28500, status: 'confirmed' },
      { product: 'Раковина Duravit Happy D.2', qty: 1, unit: 'шт', supplier: 'СантехГрупп', price: 24900, total: 24900, status: 'confirmed' },
      { product: 'Плитка Urban 60×60', qty: 18, unit: 'м²', supplier: 'ПлиткаМаркет', price: 2400, total: 43200, status: 'pending' },
      { product: 'Смеситель hansgrohe Metris', qty: 2, unit: 'шт', supplier: 'СантехГрупп', price: 18700, total: 37400, status: 'confirmed' },
      { product: 'Полотенцесушитель Zehnder', qty: 1, unit: 'шт', supplier: 'СантехГрупп', price: 32000, total: 32000, status: 'pending' },
    ]
  },
];

export const demoCart = [
  { id: 1, product: 'Унитаз Grohe Essence', supplier: 'СантехГрупп', qty: 45, price: 28500, total: 1282500, delivery: '2–3 дня' },
  { id: 2, product: 'Раковина Duravit Happy D.2', supplier: 'СантехГрупп', qty: 45, price: 24900, total: 1120500, delivery: '2–3 дня' },
  { id: 3, product: 'Плитка Urban 60×60', supplier: 'ПлиткаМаркет', qty: 450, price: 2400, total: 1080000, delivery: '3–5 дней' },
  { id: 4, product: 'Светильник EGLO Olindra', supplier: 'LightPro', qty: 120, price: 4200, total: 504000, delivery: '1–2 дня' },
  { id: 5, product: 'Ламинат Egger Pro 8мм', supplier: 'ПолПаркет', qty: 800, price: 890, total: 712000, delivery: '2–3 дня' },
];

export const statCards = [
  { label: 'Активные проекты', value: '4', change: '+1', trend: 'up', icon: 'Layers' },
  { label: 'Активные заказы', value: '18', change: '+3', trend: 'up', icon: 'ShoppingBag' },
  { label: 'Бюджет проектов', value: '₽197.2М', change: '-2.1%', trend: 'neutral', icon: 'Wallet' },
  { label: 'Экономия от KOMI', value: '₽8.4М', change: '+14%', trend: 'up', icon: 'Sparkles' },
];
