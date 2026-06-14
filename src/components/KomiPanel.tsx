import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface KomiPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Message = { role: 'komi' | 'user'; text: string; chips?: string[] };

const initialMessages: Message[] = [
  {
    role: 'komi',
    text: 'Привет! Я KOMI — ваш закупочный ассистент. Помогу найти товары, сравнить поставщиков, создать спецификацию или проанализировать бюджет.',
    chips: ['Найти сантехнику', 'Сравнить поставщиков', 'Создать спецификацию', 'Анализ бюджета'],
  },
];

const komiResponses: Record<string, Message> = {
  'Найти сантехнику': {
    role: 'komi',
    text: 'Нашёл 284 товара по сантехнике. Лучшие предложения:\n\n• Grohe Essence — от ₽28 500 (СантехГрупп)\n• Duravit Happy D.2 — от ₽24 900 (АквастройМ)\n• hansgrohe Metris — от ₽18 700 (МегаСантех)\n\nЕсть дополнительные фильтры?',
    chips: ['По бюджету до ₽50К', 'Только Grohe', 'Для санузла 8м²'],
  },
  'Сравнить поставщиков': {
    role: 'komi',
    text: 'По вашим проектам топ-3 поставщика сантехники:\n\n1. **СантехГрупп** — ★4.8 · 2-3 дня · 45 товаров в наличии\n2. **АквастройМ** — ★4.5 · 1 день · Дороже на 9%\n3. **МегаСантех** — ★4.3 · 5-7 дней · Дешевле на 2%\n\nРекомендую СантехГрупп: лучший баланс цены и скорости.',
    chips: ['Добавить в корзину', 'Запросить КП', 'Другая категория'],
  },
  'Создать спецификацию': {
    role: 'komi',
    text: 'Для какого помещения создать спецификацию?',
    chips: ['Санузел', 'Кухня', 'Гостиная', 'Весь проект'],
  },
  'Анализ бюджета': {
    role: 'komi',
    text: 'Анализ бюджета по проектам:\n\n• **ЖК Авангард** — потрачено 67% от ₽48.5М ✓\n• **Офис Meridian** — потрачено 42% от ₽8.2М ✓\n• **Отель Grand** — ⚠️ 89% бюджета — скоро исчерпается\n\nРекомендую пересмотреть спецификацию отеля. Нашёл альтернативы с экономией ₽2.1М.',
    chips: ['Показать альтернативы', 'Отчёт PDF', 'Пересмотреть спецификацию'],
  },
  'Санузел': {
    role: 'komi',
    text: 'Создаю спецификацию для санузла. Укажите площадь (м²) и я подберу всё необходимое — сантехнику, плитку, освещение и аксессуары с лучшими ценами от поставщиков.',
    chips: ['8 м²', '12 м²', '15 м²', 'Ввести вручную'],
  },
};

const defaultResponse: Message = {
  role: 'komi',
  text: 'Понял! Ищу информацию по вашему запросу... Вот что нашёл: могу предложить несколько вариантов и сравнить предложения поставщиков. Уточните детали?',
  chips: ['Показать все варианты', 'Сравнить цены', 'Создать спецификацию'],
};

export default function KomiPanel({ isOpen, onClose }: KomiPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', text };
    const response = komiResponses[text] ?? defaultResponse;
    setMessages(prev => [...prev, userMsg, response]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-[380px] z-50 flex flex-col bg-k-surface border-l border-k-border animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-k-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl komi-gradient flex items-center justify-center orange-glow-sm">
              <Icon name="Sparkles" size={16} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-k-text">KOMI</span>
                <span className="text-[9px] font-bold bg-orange-500/15 text-orange-400 px-1.5 py-0.5 rounded-full uppercase tracking-wide">AI</span>
              </div>
              <div className="text-[10px] text-k-muted">Закупочный ассистент</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-k-surface2 hover:bg-k-surface3 flex items-center justify-center transition-colors"
          >
            <Icon name="X" size={14} className="text-k-dim" />
          </button>
        </div>

        {/* Capabilities */}
        <div className="px-4 py-3 border-b border-k-border bg-k-surface2/50">
          <div className="flex items-center gap-4 text-[10px] text-k-muted">
            {['Поиск', 'Сравнение', 'Спецификации', 'Аналитика'].map((cap, i) => (
              <span key={i} className="flex items-center gap-1">
                <Icon name="Check" size={10} className="text-orange-400" />
                {cap}
              </span>
            ))}
          </div>
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
              <div className="max-w-[85%]">
                <div className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : 'bg-k-surface2 border border-k-border text-k-text rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
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
          <div ref={endRef} />
        </div>

        {/* Examples */}
        <div className="px-4 pb-2">
          <div className="text-[10px] text-k-muted mb-2">Примеры запросов:</div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Чёрная сантехника до 200К',
              'Дешевле альтернативы',
              'Сравни поставщиков',
            ].map((ex, i) => (
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
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Спросите KOMI..."
              className="flex-1 px-4 py-2.5 bg-k-surface2 border border-k-border rounded-xl text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl komi-gradient hover:opacity-90 disabled:opacity-40 flex items-center justify-center transition-all flex-shrink-0"
            >
              <Icon name="Send" size={15} className="text-white" />
            </button>
          </div>
          <p className="text-[10px] text-k-muted text-center mt-2">
            KOMI использует данные ваших проектов для персонализированных рекомендаций
          </p>
        </div>
      </div>
    </>
  );
}
