import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, CATEGORIES, BADGE_STYLES } from "./data/products";
import Stars from "./components/Stars";
import CartDrawer from "./components/CartDrawer";
import ProductModal from "./components/ProductModal";

export default function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef(null);

  const showToast = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastVisible(true);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showToast();
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i).filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-[60] bg-green-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium shadow-lg"
          >
            ✓ Added to cart
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQty={updateQty}
            onRemove={removeFromCart}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      <div className="sticky top-0 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4 flex-wrap">
          <h1 className="text-xl font-bold text-white">🛍️ ShopEase</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 max-w-sm bg-gray-900 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={() => setCartOpen(true)}
            className="relative ml-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-200"
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                category === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-900 border border-gray-800 text-gray-400 hover:border-purple-500 hover:text-purple-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <p className="text-gray-500 text-sm mb-6">{filtered.length} products</p>

        {filtered.length === 0 ? (
          <p className="text-gray-600 text-center py-20">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 rounded-2xl overflow-hidden group transition duration-300"
              >
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setSelected(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.badge && (
                    <span className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_STYLES[product.badge]}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-0.5">{product.category}</p>
                  <h3
                    className="text-sm font-medium text-white line-clamp-2 leading-snug mb-2 cursor-pointer hover:text-purple-400 transition"
                    onClick={() => setSelected(product)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Stars rating={product.rating} />
                    <span className="text-gray-500 text-xs">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">${product.price.toFixed(2)}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-500 text-xs px-3 py-1.5 rounded-lg transition duration-200"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
