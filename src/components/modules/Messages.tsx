import { useState, useRef, useEffect } from 'react';
import { demoMessages } from '@/data/demo';
import Icon from '@/components/ui/icon';

export default function Messages() {
  const [activeChat, setActiveChat] = useState(demoMessages[0]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(demoMessages[0].messages);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: input, time: 'сейчас' }]);
    setInput('');
  };

  const handleChatChange = (chat: typeof demoMessages[0]) => {
    setActiveChat(chat);
    setMessages(chat.messages);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-k-text">Сообщения</h1>
          <p className="text-sm text-k-muted mt-0.5">Чат с поставщиками и партнёрами</p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
          <Icon name="Plus" size={14} />
          Новый чат
        </button>
      </div>

      <div className="flex gap-0 bg-k-surface border border-k-border rounded-xl overflow-hidden h-[600px]">
        {/* Chat List */}
        <div className="w-64 flex-shrink-0 border-r border-k-border flex flex-col">
          <div className="p-3 border-b border-k-border">
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-k-muted" />
              <input
                placeholder="Поиск..."
                className="w-full pl-8 pr-3 py-1.5 bg-k-surface2 border border-k-border rounded-lg text-xs text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {demoMessages.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleChatChange(chat)}
                className={`w-full flex items-start gap-3 px-4 py-3 border-b border-k-border/50 text-left transition-colors ${
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
                  <div className="text-[10px] text-k-muted truncate mt-0.5">{chat.project}</div>
                  <div className="text-[11px] text-k-dim truncate mt-0.5">{chat.lastMessage}</div>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {chat.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-k-border bg-k-surface2/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/20 border border-orange-500/20 flex items-center justify-center text-[10px] font-bold text-orange-400">
                {activeChat.avatar}
              </div>
              <div>
                <div className="text-sm font-semibold text-k-text">{activeChat.supplier}</div>
                <div className="text-[10px] text-k-muted">{activeChat.project}</div>
              </div>
              <div className="flex items-center gap-1 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-emerald-400">Онлайн</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors">
                <Icon name="Phone" size={14} className="text-k-muted" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors">
                <Icon name="Video" size={14} className="text-k-muted" />
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-k-surface3 flex items-center justify-center transition-colors">
                <Icon name="MoreHorizontal" size={14} className="text-k-muted" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* KOMI suggestion */}
            <div className="flex items-start gap-2 justify-center">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/5 border border-orange-500/15">
                <Icon name="Sparkles" size={11} className="text-orange-400" />
                <span className="text-[10px] text-k-dim">KOMI: Быстрые ответы — Статус заказа, Запрос документов, Уточнить сроки</span>
              </div>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.from === 'me' ? 'order-2' : ''}`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === 'me'
                      ? 'bg-orange-500 text-white rounded-br-sm'
                      : 'bg-k-surface2 border border-k-border text-k-text rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <div className={`text-[10px] text-k-muted mt-1 ${msg.from === 'me' ? 'text-right' : ''}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-k-border">
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg bg-k-surface2 border border-k-border flex items-center justify-center hover:border-orange-500/30 transition-colors flex-shrink-0">
                <Icon name="Paperclip" size={14} className="text-k-muted" />
              </button>
              <div className="flex-1 relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Написать сообщение..."
                  className="w-full px-4 py-2.5 bg-k-surface2 border border-k-border rounded-xl text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-k-surface3 transition-colors">
                  <Icon name="Sparkles" size={12} className="text-orange-400" />
                  <span className="text-[10px] text-orange-400">KOMI</span>
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <Icon name="Send" size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
