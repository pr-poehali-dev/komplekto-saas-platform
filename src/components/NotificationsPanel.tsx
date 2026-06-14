import Icon from '@/components/ui/icon';
import type { Module } from '@/App';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (m: Module) => void;
}

const notifications = [
  { id: 1, type: 'order', icon: 'Package', title: 'Заказ ORD-2401 отгружен', desc: 'СантехГрупп отгрузил ваш заказ. Ожидайте доставку 20 июня.', time: '10 мин назад', color: 'text-blue-400', bg: 'bg-blue-500/10', unread: true, module: 'orders' as Module },
  { id: 2, type: 'budget', icon: 'AlertTriangle', title: 'Бюджет превышен', desc: 'Проект «Офис Meridian» — потрачено 92% от бюджета ₽8.2М', time: '1 час назад', color: 'text-yellow-400', bg: 'bg-yellow-500/10', unread: true, module: 'projects' as Module },
  { id: 3, type: 'komi', icon: 'Sparkles', title: 'KOMI нашёл экономию', desc: 'Найдены альтернативы по плитке. Экономия до ₽84 000 без потери качества.', time: '2 часа назад', color: 'text-orange-400', bg: 'bg-orange-500/10', unread: true, module: 'catalog' as Module },
  { id: 4, type: 'message', icon: 'MessageSquare', title: 'Новое сообщение', desc: 'ПлиткаМаркет: «Прайс-лист во вложении»', time: 'вчера', color: 'text-purple-400', bg: 'bg-purple-500/10', unread: false, module: 'messages' as Module },
  { id: 5, type: 'order', icon: 'CheckCircle', title: 'Заказ ORD-2405 доставлен', desc: 'Кухни КухниПро успешно доставлены в проект «Отель Grand»', time: 'вчера', color: 'text-emerald-400', bg: 'bg-emerald-500/10', unread: false, module: 'orders' as Module },
];

export default function NotificationsPanel({ isOpen, onClose, onNavigate }: NotificationsPanelProps) {
  if (!isOpen) return null;

  const unread = notifications.filter(n => n.unread).length;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-4 top-16 w-[340px] z-50 bg-k-surface border border-k-border rounded-2xl shadow-2xl shadow-black/40 animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-k-border">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-k-text">Уведомления</h3>
            {unread > 0 && (
              <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">{unread}</span>
            )}
          </div>
          <button onClick={onClose} className="text-[10px] text-orange-400 hover:text-orange-300">
            Прочитать все
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto">
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => { onNavigate(n.module); onClose(); }}
              className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-k-border/50 hover:bg-k-surface2/50 text-left transition-colors ${n.unread ? 'bg-orange-500/3' : ''}`}
            >
              <div className={`w-8 h-8 rounded-lg ${n.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <Icon name={n.icon} size={15} className={n.color} fallback="Circle" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-k-text">{n.title}</span>
                  {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />}
                </div>
                <p className="text-[11px] text-k-muted mt-0.5 leading-relaxed">{n.desc}</p>
                <span className="text-[10px] text-k-muted mt-1 block">{n.time}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="px-4 py-3 border-t border-k-border">
          <button className="w-full text-xs text-center text-k-muted hover:text-orange-400 transition-colors">
            Показать все уведомления
          </button>
        </div>
      </div>
    </>
  );
}
