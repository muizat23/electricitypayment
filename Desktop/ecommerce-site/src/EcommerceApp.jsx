import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89.99,
    rating: 4.7,
    reviews: 1243,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium sound quality with active noise cancellation and 30hrs battery life.",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: "Electronics",
    price: 199.99,
    rating: 4.5,
    reviews: 876,
    badge: "New",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Track fitness, receive notifications, and monitor health metrics from your wrist.",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 59.99,
    rating: 4.6,
    reviews: 2145,
    badge: null,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    description: "360° immersive sound with 24-hour battery life and waterproof design.",
  },
  {
    id: 4,
    name: "Classic Sneakers",
    category: "Fashion",
    price: 129.99,
    rating: 4.8,
    reviews: 3421,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Lightweight design with superior cushioning for everyday comfort.",
  },
  {
    id: 5,
    name: "Leather Crossbody Bag",
    category: "Fashion",
    price: 79.99,
    rating: 4.4,
    reviews: 654,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    description: "Genuine leather with multiple compartments, perfect for everyday use.",
  },
  {
    id: 6,
    name: "Polarised Sunglasses",
    category: "Fashion",
    price: 49.99,
    rating: 4.3,
    reviews: 432,
    badge: null,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop",
    description: "UV400 protection with polarised lenses for maximum visual clarity.",
  },
  {
    id: 7,
    name: "Scented Candle Set",
    category: "Home",
    price: 39.99,
    rating: 4.9,
    reviews: 1876,
    badge: "New",
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop",
    description: "Set of 4 long-lasting soy wax candles in calming lavender and vanilla scents.",
  },
  {
    id: 8,
    name: "Ceramic Mug Set",
    category: "Home",
    price: 34.99,
    rating: 4.7,
    reviews: 987,
    badge: null,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    description: "Set of 4 hand-crafted ceramic mugs, microwave and dishwasher safe.",
  },
  {
    id: 9,
    name: "Skincare Glow Set",
    category: "Beauty",
    price: 74.99,
    rating: 4.6,
    reviews: 2345,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    description: "Complete skincare routine — cleanser, toner, serum, and moisturiser.",
  },
  {
    id: 10,
    name: "Luxury Perfume",
    category: "Beauty",
    price: 89.99,
    rating: 4.8,
    reviews: 1123,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1585218334450-afcf929da36e?w=400&h=400&fit=crop",
    description: "A captivating blend of citrus, floral, and woody notes that lasts all day.",
  },
  {
    id: 11,
    name: "Laptop Backpack",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
    reviews: 765,
    badge: null,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Water-resistant with padded laptop compartment. Fits up to 15.6\" laptops.",
  },
  {
    id: 12,
    name: "Throw Pillow Set",
    category: "Home",
    price: 29.99,
    rating: 4.4,
    reviews: 543,
    badge: null,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    description: "Set of 2 decorative pillows with removable machine-washable covers.",
  },
];

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Beauty"];

const BADGE_STYLES = {
  "Best Seller": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "New": "bg-green-500/20 text-green-400 border-green-500/30",
  "Sale": "bg-red-500/20 text-red-400 border-red-500/30",
};

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-sm">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-700"}>
          ★
        </span>
      ))}
    </div>
  );
}

function CartDrawer({ cart, onClose, onUpdateQty, onRemove }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-lg font-bold text-white">
            Cart ({cart.reduce((s, i) => s + i.qty, 0)})
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl transition">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <div className="text-5xl mb-4">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-gray-800/50 rounded-xl p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                  <p className="text-purple-400 text-sm mt-0.5">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-sm flex items-center justify-center transition"
                    >
                      −
                    </button>
                    <span className="text-sm text-white w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-sm flex items-center justify-center transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="ml-auto text-gray-500 hover:text-red-400 text-xs transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-xl transition duration-200">
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full mt-2 text-gray-400 hover:text-white text-sm py-2 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-gray-800 rounded-2xl max-w-lg w-full overflow-hidden"
      >
        <div className="relative">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          {product.badge && (
            <span className={`absolute top-4 left-4 text-xs px-2 py-0.5 rounded-full border font-medium ${BADGE_STYLES[product.badge]}`}>
              {product.badge}
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-900/80 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-800 transition"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs text-purple-400 mb-1">{product.category}</p>
          <h2 className="text-xl font-bold text-white mb-2">{product.name}</h2>
          <div className="flex items-center gap-2 mb-3">
            <Stars rating={product.rating} />
            <span className="text-yellow-400 text-sm font-medium">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviews.toLocaleString()} reviews)</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            <button
              onClick={() => { onAddToCart(product); onClose(); }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-medium transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function EcommerceApp() {
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
      {/* Toast */}
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

      {/* Cart Drawer */}
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

      {/* Product Modal */}
      <AnimatePresence>
        {selected && (
          <ProductModal
            product={selected}
            onClose={() => setSelected(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>

      {/* Header */}
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
        {/* Categories */}
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

        {/* Product Grid */}
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
