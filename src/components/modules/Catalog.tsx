import { useState } from 'react';
import { demoProducts } from '@/data/demo';
import Icon from '@/components/ui/icon';

const categories = [
  { id: 'all', label: 'Все', icon: 'Grid3X3' },
  { id: 'Сантехника', label: 'Сантехника', icon: 'Droplets' },
  { id: 'Плитка', label: 'Плитка', icon: 'SquareStack' },
  { id: 'Освещение', label: 'Освещение', icon: 'Lightbulb' },
  { id: 'Мебель', label: 'Мебель', icon: 'Sofa' },
  { id: 'Кухни', label: 'Кухни', icon: 'ChefHat' },
  { id: 'Двери', label: 'Двери', icon: 'DoorOpen' },
  { id: 'Полы', label: 'Полы', icon: 'Layers' },
  { id: 'Краски', label: 'Краски', icon: 'Paintbrush' },
];

const formatMoney = (v: number) =>
  v >= 1000 ? `₽${(v / 1000).toFixed(0)} 000` : `₽${v}`;

interface ProductDetailProps {
  product: typeof demoProducts[0];
  onClose: () => void;
  onAddToCart: () => void;
}

function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  const [selectedOffer, setSelectedOffer] = useState(0);
  const best = [...product.offers].sort((a, b) => a.price - b.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-scale-in">
      <div className="bg-k-surface border border-k-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-k-border">
          <div>
            <div className="text-[10px] font-medium text-orange-400 uppercase tracking-widest mb-1">{product.category} · {product.brand}</div>
            <h2 className="text-lg font-bold text-k-text">{product.name}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-k-surface2 flex items-center justify-center hover:bg-k-surface3 transition-colors">
            <Icon name="X" size={16} className="text-k-dim" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 p-5">
          {/* Image */}
          <div>
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-xl" />
            <p className="text-xs text-k-muted mt-3 leading-relaxed">{product.description}</p>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Specs */}
            <div>
              <div className="text-xs font-semibold text-k-dim mb-2 uppercase tracking-wide">Характеристики</div>
              <div className="space-y-1.5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-1.5 border-b border-k-border/50">
                    <span className="text-xs text-k-muted">{k}</span>
                    <span className="text-xs font-medium text-k-text">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supplier Offers */}
            <div>
              <div className="text-xs font-semibold text-k-dim mb-2 uppercase tracking-wide">Предложения поставщиков</div>
              <div className="space-y-2">
                {best.map((offer, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedOffer(i)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedOffer === i
                        ? 'border-orange-500/50 bg-orange-500/5'
                        : 'border-k-border bg-k-surface2 hover:border-k-surface3'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {i === 0 && (
                          <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded uppercase">Лучшая цена</span>
                        )}
                        <span className="text-xs font-medium text-k-text">{offer.supplier}</span>
                      </div>
                      <span className="text-sm font-bold text-k-text">{formatMoney(offer.price)}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[10px] text-k-muted flex items-center gap-1">
                        <Icon name="Star" size={10} className="text-orange-400" />
                        {offer.rating}
                      </span>
                      <span className="text-[10px] text-k-muted">В наличии: {offer.stock} шт</span>
                      <span className="text-[10px] text-k-muted">Доставка: {offer.delivery}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={onAddToCart}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="ShoppingCart" size={16} />
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Catalog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof demoProducts[0] | null>(null);
  const [cartAdded, setCartAdded] = useState<number[]>([]);

  const filtered = demoProducts.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (id: number) => {
    setCartAdded(prev => [...prev, id]);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-k-text">Каталог</h1>
          <p className="text-sm text-k-muted mt-0.5">10 000+ товаров от 500+ поставщиков</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text hover:border-k-surface3 transition-colors">
            <Icon name="SlidersHorizontal" size={14} />
            Фильтры
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-k-surface border border-k-border text-sm text-k-dim hover:text-k-text transition-colors">
            <Icon name="ArrowUpDown" size={14} />
            Сортировка
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-k-muted" />
        <input
          type="text"
          placeholder="Поиск товаров, брендов, артикулов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-k-surface border border-k-border rounded-xl text-sm text-k-text placeholder:text-k-muted focus:outline-none focus:border-orange-500/50 transition-colors"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2">
            <Icon name="X" size={14} className="text-k-muted hover:text-k-dim" />
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeCategory === cat.id
                ? 'bg-orange-500 text-white'
                : 'bg-k-surface border border-k-border text-k-dim hover:text-k-text hover:border-k-surface3'
            }`}
          >
            <Icon name={cat.icon} size={13} fallback="Circle" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-4">
        {filtered.map((product) => {
          const minPrice = Math.min(...product.offers.map(o => o.price));
          const maxPrice = Math.max(...product.offers.map(o => o.price));
          const inCart = cartAdded.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-k-surface border border-k-border rounded-xl overflow-hidden hover-lift cursor-pointer group"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-k-surface2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2">
                  <span className="text-[9px] font-bold bg-k-surface/90 backdrop-blur text-k-dim px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="text-[9px] font-semibold bg-emerald-500/90 text-white px-1.5 py-0.5 rounded-full">
                    {product.offers.length} предл.
                  </span>
                </div>
              </div>

              <div className="p-3">
                <div className="text-[10px] text-k-muted mb-1">{product.brand}</div>
                <div className="text-xs font-semibold text-k-text leading-tight mb-2 line-clamp-2">{product.name}</div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-k-text">от {formatMoney(minPrice)}</div>
                    {minPrice !== maxPrice && (
                      <div className="text-[10px] text-k-muted">до {formatMoney(maxPrice)}</div>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(product.id); }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      inCart ? 'bg-emerald-500 text-white' : 'bg-k-surface2 text-k-dim hover:bg-orange-500 hover:text-white'
                    }`}
                  >
                    <Icon name={inCart ? 'Check' : 'Plus'} size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Icon name="SearchX" size={32} className="text-k-muted mx-auto mb-3" />
          <p className="text-k-dim text-sm">Ничего не найдено</p>
          <button onClick={() => { setSearch(''); setActiveCategory('all'); }} className="mt-2 text-xs text-orange-400 hover:text-orange-300">
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => handleAddToCart(selectedProduct.id)}
        />
      )}
    </div>
  );
}
