import { useState, useRef, useEffect } from 'react';
import { demoMessages } from '@/data/demo';
import Icon from '@/components/ui/icon';

type ChatMsg = { from: string; text: string; time: string; file?: string };

export default function Messages() {
  const [activeChat, setActiveChat] = useState(demoMessages[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMsg[]>(demoMessages[0].messages);
  const [chatSearch, setChatSearch] = useState('');
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const msg = text ?? input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: msg, time: 'сейчас' }]);
    setInput('');

    // Auto-reply for demo
    if (msg.toLowerCase().includes('статус') || msg.toLowerCase().includes('заказ')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          from: 'supplier',
          text: 'Заказ ORD-2401 в статусе «Отгружен». Трек-номер: RU456789012. Ожидаемая дата доставки — 20 июня.',
          time: 'сейчас'
        }]);
      }, 1000);
    } else if (msg.toLowerCase().includes('скидк') || msg.toLowerCase().includes('цен')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          from: 'supplier',
          text: 'Готовы предоставить скидку 7% при заказе от 500 000 ₽. Отправить коммерческое предложение?',
          time: 'сейчас'
        }]);
      }, 1000);
    } else if (msg.toLowerCase().includes('документ') || msg.toLowerCase().includes('счёт') || msg.toLowerCase().includes('счет')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          from: 'supplier',
          text: 'Счёт и накладная уже в системе. Проверьте раздел «Документы» в заказе ORD-2401.',
          time: 'сейчас'
        }]);
      }, 800);
    }
  };

  const handleChatChange = (chat: typeof demoMessages[0]) => {
    setActiveChat(chat);
    setMessages(chat.messages);
    setShowMobileChat(true);
  };

  const filteredChats = demoMessages.filter(c =>
    !chatSearch || c.supplier.toLowerCase().includes(chatSearch.toLowerCase()) || c.project.toLowerCase().includes(chatSearch.toLowerCase())
  );

  const quickReplies = ['Статус заказа?', 'Запросить счёт', 'Уточнить сроки', 'Скидка при объёме?'];

  return (
    <div className="animate-fade-in">
      <div className="mb-4 lg:mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-k-text">Сообщения</h1>
          <p className="text-xs lg:text-sm text-k-muted mt-0.5">Чат с поставщиками</p>
        </div>
        <button
          onClick={() => setShowNewChat(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors"
        >
          <Icon name="Plus" size={14} />
          <span className="hidden sm:inline">Новый чат</span>
        </button>
      </div>

      <div className="flex bg-k-surface border border-k-border rounded-xl overflow-hidden" style={{ height: 'calc(100vh - 220px)', minHeight: '500px' }}>
        {/* Chat List */}
        <div className={`w-full lg:w-64 flex-shrink-0 border-r border-k-border flex flex-col ${showMobileChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-3 border-b border-k-border">
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-k-muted" />
              <input
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                placeholder="Поиск..."
                className="w-full pl-8 pr-3 py-1.5 bg-k-surface2 border border-k-border rounded-lg text-xs text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatChange(chat)}
                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-k-border/50 text-left transition-colors ${
                  activeChat.id === chat.id ? 'bg-orange-500/5 border-l-2 border-l-orange-500' : 'hover:bg-k-surface2/50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/20 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400 flex-shrink-0">
                  {chat.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-k-text truncate">{chat.supplier}</span>
                    <span className="text-[10px] text-k-muted flex-shrink-0 ml-1">{chat.time}</span>
                  </div>
                  <div className="text-[10px] text-k-muted truncate">{chat.project}</div>
                  <div className="text-[11px] text-k-dim truncate mt-0.5">{chat.lastMessage}</div>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">{chat.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden lg:flex' : 'flex'}`}>
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 lg:px-5 py-3.5 border-b border-k-border bg-k-surface2/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileChat(false)}
                className="lg:hidden w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center mr-1"
              >
                <Icon name="ChevronLeft" size={14} className="text-k-dim" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/20 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400">
                {activeChat.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-k-text">{activeChat.supplier}</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Онлайн</span>
                  <span className="text-[10px] text-k-muted ml-1">· {activeChat.project}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => alert('Функция звонка будет доступна в следующей версии')}
                className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors"
                title="Позвонить"
              >
                <Icon name="Phone" size={14} className="text-k-muted hover:text-k-dim" />
              </button>
              <button
                onClick={() => alert('Видеозвонок будет доступен в следующей версии')}
                className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors"
                title="Видеозвонок"
              >
                <Icon name="Video" size={14} className="text-k-muted hover:text-k-dim" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors">
                <Icon name="MoreHorizontal" size={14} className="text-k-muted" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Quick replies */}
            <div className="flex items-center gap-2 flex-wrap">
              {quickReplies.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(qr)}
                  className="text-[10px] px-2.5 py-1 rounded-full border border-k-border text-k-dim hover:border-orange-500/30 hover:text-orange-400 transition-all"
                >
                  {qr}
                </button>
              ))}
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[75%]">
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-orange-500 text-white rounded-br-sm'
                      : 'bg-k-surface2 border border-k-border text-k-text rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-k-muted mt-1 ${msg.from === 'me' ? 'text-right' : ''}`}>{msg.time}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-k-border">
            <div className="flex items-center gap-2">
              <input type="file" ref={fileRef} className="hidden" onChange={() => {
                setMessages(prev => [...prev, { from: 'me', text: '📎 Файл прикреплён', time: 'сейчас' }]);
              }} />
              <button
                onClick={() => fileRef.current?.click()}
                className="w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors flex-shrink-0"
                title="Прикрепить файл"
              >
                <Icon name="Paperclip" size={14} className="text-k-muted" />
              </button>
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Написать сообщение..."
                  className="w-full px-4 py-2.5 bg-k-surface2 border border-k-border rounded-xl text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
                />
              </div>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Icon name="Send" size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-k-surface border border-k-border rounded-2xl w-full max-w-sm animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-k-border">
              <h2 className="text-base font-bold text-k-text">Новый чат</h2>
              <button onClick={() => setShowNewChat(false)} className="w-7 h-7 rounded-lg bg-k-surface2 flex items-center justify-center">
                <Icon name="X" size={14} className="text-k-dim" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Поставщик</label>
                <input
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-k-surface2 border border-k-border rounded-lg text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
                  placeholder="Название поставщика"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-k-dim mb-1.5 block">Быстрый выбор</label>
                <div className="space-y-1">
                  {['СантехГрупп', 'LightPro', 'ПлиткаМаркет', 'МебельОпт'].map(s => (
                    <button
                      key={s}
                      onClick={() => setNewChatName(s)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${newChatName === s ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400' : 'bg-k-surface2 border border-k-border text-k-dim hover:text-k-text'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => { setShowNewChat(false); setNewChatName(''); }}
                disabled={!newChatName.trim()}
                className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold text-sm transition-colors"
              >
                Начать чат
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
