import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface KomiPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (m: Module) => void;
}

type Message = { role: 'komi' | 'user'; text: string; chips?: string[]; action?: { label: string; module: Module } };

const initialMessages: Message[] = [
  {
    role: 'komi',
    text: 'Привет! Я KOMI — ваш AI закупочный ассистент. Знаю о ваших 4 активных проектах с общим бюджетом ₽197М.\n\nЧем помочь?',
    chips: ['Найти товары', 'Сравнить поставщиков', 'Создать спецификацию', 'Анализ бюджетов', 'Дешевле альтернативы', 'Статус проектов'],
  },
];

function getKomiResponse(text: string, onNavigate: (m: Module) => void): Message {
  const t = text.toLowerCase();

  if (t.includes('сантехник') || t.includes('унитаз') || t.includes('раковин') || t.includes('смесител')) {
    return {
      role: 'komi',
      text: '🔍 Нашёл 284 товара по сантехнике.\n\nТоп-предложения:\n• Grohe Essence унитаз — ₽28 500 (СантехГрупп ★4.8)\n• Duravit Happy D.2 раковина — ₽24 900 (АквастройМ)\n• hansgrohe Metris смеситель — ₽18 700 (МегаСантех)\n\nЛучший поставщик: СантехГрупп (45 товаров в наличии, доставка 2-3 дня)',
      chips: ['Добавить лучшие в корзину', 'До ₽50 000', 'Только Grohe', 'Показать в каталоге'],
      action: { label: 'Открыть каталог сантехники', module: 'catalog' },
    };
  }

  if (t.includes('плитк') || t.includes('керамогранит') || t.includes('напольн')) {
    return {
      role: 'komi',
      text: '🔍 По плитке найдено 156 позиций.\n\nЛучшие предложения на Porcelanosa Urban 60×60:\n• ПлиткаМаркет — ₽2 400/м² (★4.6, доставка 3-5 дней)\n• КерамоПро — ₽2 650/м² (★4.7, доставка 2 дня)\n• ТайлСтор — ₽2 100/м² (★4.1, доставка 7-10 дней)\n\n💡 Рекомендую ПлиткаМаркет — лучший баланс цены и сроков.',
      chips: ['Добавить в корзину', 'Ещё дешевле', 'Сравнить детально'],
      action: { label: 'Смотреть плитку в каталоге', module: 'catalog' },
    };
  }

  if (t.includes('освещени') || t.includes('светильник') || t.includes('лампа') || t.includes('свет')) {
    return {
      role: 'komi',
      text: '💡 Найдено 340 товаров по освещению.\n\nТоп по рейтингу:\n• EGLO Olindra LED — ₽4 200 (LightPro ★4.9, доставка 1-2 дня)\n• Maytoni Technical — ₽3 800 (СветПро ★4.6)\n• Elektrostandard — ₽2 900 (ЭлектроМаркет ★4.3)\n\nДля офиса Meridian рекомендую EGLO — IP44, диммер, 5 лет гарантия.',
      chips: ['Добавить EGLO в корзину', 'Для жилого', 'Для коммерческого'],
      action: { label: 'Каталог освещения', module: 'catalog' },
    };
  }

  if (t.includes('альтернатив') || t.includes('дешевле') || t.includes('замен') || t.includes('сэконом')) {
    return {
      role: 'komi',
      text: '💰 Нашёл альтернативы с экономией:\n\n1. Плитка Atlas Concorde вместо Porcelanosa\n   Экономия: ₽84 000 (-35%) · Качество: аналогичное\n\n2. Светильники Gauss вместо EGLO\n   Экономия: ₽37 000 (-28%) · IP44, тот же стандарт\n\n3. Смеситель Hansgrohe Logis вместо Metris\n   Экономия: ₽21 000 (-18%) · Та же серия, упрощённый дизайн\n\nОбщая экономия: ₽142 000 💚',
      chips: ['Заменить всё', 'Показать сравнение', 'Только плитку заменить'],
      action: { label: 'Смотреть альтернативы', module: 'catalog' },
    };
  }

  if (t.includes('поставщик') || t.includes('сравни') || t.includes('сравнить') || t.includes('рейтинг')) {
    return {
      role: 'komi',
      text: '📊 Сравнение поставщиков по вашим проектам:\n\n🥇 СантехГрупп\n   ★4.8 · 1 240 заказов · Доставка 2-3 дня\n   GMV с вами: ₽284 500\n\n🥈 LightPro\n   ★4.9 · 2 100 заказов · Доставка 1-2 дня\n   Самый быстрый, чуть дороже\n\n🥉 ПлиткаМаркет\n   ★4.6 · 890 заказов · Доставка 3-5 дней\n   Лучшие цены на плитку\n\nДля крупного заказа → просите скидку у СантехГрупп (обычно дают 5-8%)',
      chips: ['Запросить КП у СантехГрупп', 'Написать в чат', 'Полный рейтинг'],
      action: { label: 'Перейти к сообщениям', module: 'messages' },
    };
  }

  if (t.includes('спецификаци') || t.includes('создай спец') || t.includes('составь список')) {
    return {
      role: 'komi',
      text: '📋 Создаю спецификацию. Для какого помещения?\n\nПо типовому санузлу 8м² вам потребуется:\n• Унитаз — 1 шт (₽28 500)\n• Раковина — 1 шт (₽24 900)\n• Смеситель — 2 шт (₽37 400)\n• Плитка — 18 м² (₽43 200)\n• Полотенцесушитель — 1 шт (₽32 000)\n\nИтого: ₽166 000\nЭкономия с KOMI: ₽28 500 (-17%)',
      chips: ['Создать спецификацию', 'Для 12м²', 'Для кухни', 'Для гостиной'],
      action: { label: 'Открыть спецификации', module: 'specs' },
    };
  }

  if (t.includes('бюджет') || t.includes('расход') || t.includes('потрачен') || t.includes('финанс')) {
    return {
      role: 'komi',
      text: '📈 Анализ бюджетов по проектам:\n\n✅ ЖК Авангард — ₽32.5М из ₽48.5М (67%)\n   В плане, всё под контролем\n\n✅ Офис Meridian — ₽3.4М из ₽8.2М (42%)\n   Есть запас\n\n⚠️ Отель Grand — ₽111М из ₽125М (89%)\n   Осталось ₽14М — нужна корректировка!\n\n🏠 Апартаменты Sky — ₽525К из ₽3.5М (15%)\n   На раннем этапе\n\n💡 Рекомендую пересмотреть план по Отелю Grand.',
      chips: ['Оптимизировать Отель Grand', 'Экспорт PDF', 'Детали по проекту'],
      action: { label: 'Перейти к проектам', module: 'projects' },
    };
  }

  if (t.includes('заказ') || t.includes('статус') || t.includes('доставк') || t.includes('отгруз')) {
    return {
      role: 'komi',
      text: '📦 Статус активных заказов:\n\n🚚 ORD-2401 (СантехГрупп) — Отгружен\n   ₽284 500 · Доставка 20 июня\n\n✅ ORD-2402 (LightPro) — Подтверждён\n   ₽168 000 · Ожидается 22 июня\n\n⚙️ ORD-2403 (ПлиткаМаркет) — Обработка\n   ₽420 000 · Ожидается 25 июня\n\n📝 ORD-2404 (МебельОпт) — Черновик\n   ₽94 000 · Не отправлен',
      chips: ['Отследить ORD-2401', 'Отправить ORD-2404', 'Все заказы'],
      action: { label: 'Перейти к заказам', module: 'orders' },
    };
  }

  if (t.includes('чёрн') || t.includes('черн') || t.includes('black') || t.includes('тёмн')) {
    return {
      role: 'komi',
      text: '🖤 Чёрная сантехника — подборка:\n\n• Grohe Essence черный матовый\n  Унитаз — ₽64 000, Раковина — ₽48 000\n\n• Hansgrohe смеситель черный\n  ₽28 500 (СантехГрупп ★4.8)\n\n• AM.PM Font черная серия\n  Комплект санузла — ₽145 000\n\nВсе товары в наличии у СантехГрупп.',
      chips: ['Добавить в корзину', 'Создать спецификацию', 'Смотреть в каталоге'],
      action: { label: 'Каталог сантехники', module: 'catalog' },
    };
  }

  if (t.includes('мебел') || t.includes('диван') || t.includes('стол') || t.includes('кресл')) {
    return {
      role: 'komi',
      text: '🛋️ По мебели найдено 156 позиций.\n\nЛучшие предложения:\n• Flex System диван модульный — ₽187 000 (МебельОпт ★4.3)\n• Arco стол обеденный — ₽94 000 (ДизайнМебель ★4.7)\n• Herman Miller кресло — ₽215 000 (ОфисПро ★4.9)\n\n⚠️ Мебель: срок изготовления 14-45 дней, учтите при планировании!',
      chips: ['Подобрать для офиса', 'Для жилого', 'Заказать каталог'],
      action: { label: 'Каталог мебели', module: 'catalog' },
    };
  }

  if (t.includes('помощ') || t.includes('что умеешь') || t.includes('что можешь') || t.includes('возможности')) {
    return {
      role: 'komi',
      text: '🤖 Мои возможности:\n\n🔍 Поиск товаров по описанию\n💰 Сравнение цен у поставщиков\n🔄 Поиск альтернатив и аналогов\n📋 Создание спецификаций\n📊 Анализ бюджетов проектов\n📦 Статус заказов\n🤝 Рекомендации по поставщикам\n✏️ Помощь с переговорами\n\nПросто пишите мне — объясню, найду, сравню!',
      chips: ['Найти товары', 'Анализ бюджета', 'Статус заказов', 'Сравнить поставщиков'],
    };
  }

  if (t.includes('проект') || t.includes('авангард') || t.includes('meridian') || t.includes('sky') || t.includes('grand')) {
    return {
      role: 'komi',
      text: '📁 Ваши активные проекты:\n\n🏗️ ЖК Авангард — 67% готов\n   Бюджет: ₽48.5М · Осталось: ₽16М\n\n🏢 Офис Meridian — 42% готов\n   Бюджет: ₽8.2М · Осталось: ₽4.8М\n\n🏠 Апартаменты Sky — 15% готов\n   Бюджет: ₽3.5М · На старте\n\n⚠️ Отель Grand — 89% готов\n   Бюджет КРИТИЧЕСКИЙ! Осталось ₽14М',
      chips: ['Оптимизировать Отель Grand', 'Создать спецификацию', 'Открыть проекты'],
      action: { label: 'Перейти к проектам', module: 'projects' },
    };
  }

  // default
  return {
    role: 'komi',
    text: `Понял ваш запрос: «${text}»\n\nПоищу по каталогу и сравню предложения поставщиков. Уточните детали — бюджет, проект или категорию товара?`,
    chips: ['Для ЖК Авангард', 'До ₽100 000', 'Срочно (1-3 дня)', 'Лучшее качество'],
    action: { label: 'Открыть каталог', module: 'catalog' },
  };
}

export default function KomiPanel({ isOpen, onClose, onNavigate }: KomiPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const response = getKomiResponse(text, onNavigate);
      setMessages(prev => [...prev, response]);
    }, 600 + Math.random() * 600);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 lg:bg-transparent" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[380px] z-50 flex flex-col bg-k-surface border-l border-k-border animate-slide-in-right shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 lg:px-5 py-4 border-b border-k-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl komi-gradient flex items-center justify-center orange-glow-sm">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-k-text">KOMI</span>
                <span className="text-[9px] font-bold bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded-full uppercase">AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-k-muted">Закупочный ассистент · онлайн</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(initialMessages)}
              className="w-7 h-7 rounded-lg bg-k-surface2 hover:bg-k-surface3 flex items-center justify-center transition-colors"
              title="Очистить чат"
            >
              <Icon name="RotateCcw" size={13} className="text-k-muted" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg bg-k-surface2 hover:bg-k-surface3 flex items-center justify-center transition-colors"
            >
              <Icon name="X" size={14} className="text-k-dim" />
            </button>
          </div>
        </div>

        {/* Context bar */}
        <div className="px-4 py-2.5 border-b border-k-border bg-k-surface2/50 flex items-center gap-3 overflow-x-auto">
          <span className="text-[10px] text-k-muted whitespace-nowrap">Контекст:</span>
          {['4 проекта', '₽197М бюджет', '18 заказов', '3 чата'].map((c, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-k-surface3 text-k-dim whitespace-nowrap flex-shrink-0">{c}</span>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2.5`}>
              {msg.role === 'komi' && (
                <div className="w-6 h-6 rounded-lg komi-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="Sparkles" size={11} className="text-white" />
                </div>
              )}
              <div className="max-w-[88%]">
                <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : 'bg-k-surface2 border border-k-border text-k-text rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
                {msg.action && (
                  <button
                    onClick={() => { onNavigate(msg.action!.module); onClose(); }}
                    className="mt-1.5 flex items-center gap-1.5 text-[11px] text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <Icon name="ArrowRight" size={11} />
                    {msg.action.label}
                  </button>
                )}
                {msg.chips && msg.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.chips.map((chip, j) => (
                      <button
                        key={j}
                        onClick={() => sendMessage(chip)}
                        className="text-[11px] px-2.5 py-1 rounded-full border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg komi-gradient flex items-center justify-center flex-shrink-0">
                <Icon name="Sparkles" size={11} className="text-white" />
              </div>
              <div className="px-3.5 py-3 rounded-2xl rounded-bl-sm bg-k-surface2 border border-k-border flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-k-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-k-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-k-muted animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Quick examples */}
        <div className="px-4 pb-2">
          <div className="text-[10px] text-k-muted mb-1.5">Попробуйте спросить:</div>
          <div className="flex flex-wrap gap-1.5">
            {['Чёрная сантехника до ₽200К', 'Статус заказов', 'Анализ бюджета Отеля'].map((ex, i) => (
              <button
                key={i}
                onClick={() => sendMessage(ex)}
                className="text-[10px] px-2 py-1 rounded-md bg-k-surface2 border border-k-border text-k-dim hover:text-orange-400 hover:border-orange-500/30 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-k-border">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
              placeholder="Спросите KOMI..."
              className="flex-1 px-4 py-2.5 bg-k-surface2 border border-k-border rounded-xl text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
              disabled={isTyping}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl komi-gradient hover:opacity-90 disabled:opacity-40 flex items-center justify-center transition-all flex-shrink-0"
            >
              <Icon name="Send" size={15} className="text-white" />
            </button>
          </div>
          <p className="text-[10px] text-k-muted text-center mt-2">
            KOMI знает ваши проекты и персонализирует ответы
          </p>
        </div>
      </div>
    </>
  );
}
