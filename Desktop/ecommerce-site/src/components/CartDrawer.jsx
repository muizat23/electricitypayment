import { motion } from "framer-motion";

export default function CartDrawer({ cart, onClose, onUpdateQty, onRemove }) {
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
