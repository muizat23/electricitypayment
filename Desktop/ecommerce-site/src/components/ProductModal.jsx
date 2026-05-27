import { motion } from "framer-motion";
import Stars from "./Stars";
import { BADGE_STYLES } from "../data/products";

export default function ProductModal({ product, onClose, onAddToCart }) {
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
