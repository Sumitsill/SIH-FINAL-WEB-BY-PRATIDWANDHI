import React, { useState } from 'react';
import { X, ShoppingBag, CreditCard, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    displayPrice?: string;
    image: string;
    quantity: number;
}

interface MarketplaceCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onRemoveItem: (id: number) => void;
    onUpdateQuantity: (id: number, change: number) => void;
}

const MarketplaceCart: React.FC<MarketplaceCartProps> = ({
    isOpen,
    onClose,
    cartItems,
    onRemoveItem,
    onUpdateQuantity,
}) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal - discount;

    const handleApplyPromo = () => {
        if (promoCode.toLowerCase() === 'sih2024') {
            setDiscount(subtotal * 0.1); // 10% discount
            alert('Promo code applied! 10% discount.');
        } else {
            alert('Invalid promo code');
        }
    };

    const handleCheckout = () => {
        navigate('/payment', { state: { total, cartItems } });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            <div className="absolute inset-y-0 right-0 max-w-md w-full bg-slate-900 border-l border-slate-700 shadow-2xl transform transition-transform duration-300 ease-in-out">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-blue-400" />
                            Your Cart
                        </h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-400 py-12">
                                <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-slate-800 rounded-lg p-4 flex gap-4 border border-slate-700">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                                        <p className="text-blue-400 font-bold mt-1">{item.displayPrice || `₹${item.price.toLocaleString()}`}</p>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-3 bg-slate-900 rounded-lg px-2 py-1">
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, -1)}
                                                    className="text-gray-400 hover:text-white px-2"
                                                >
                                                    -
                                                </button>
                                                <span className="text-white text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() => onUpdateQuantity(item.id, 1)}
                                                    className="text-gray-400 hover:text-white px-2"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="text-red-400 hover:text-red-300 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t border-slate-700 p-6 bg-slate-800/50">
                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="block text-sm text-gray-400 mb-2">Promo Code</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                    <button
                                        onClick={handleApplyPromo}
                                        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-400">
                                        <span>Discount</span>
                                        <span>-₹{discount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-slate-700">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <CreditCard className="h-5 w-5" />
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketplaceCart;
