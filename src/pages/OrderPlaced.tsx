import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight, Home } from 'lucide-react';

const OrderPlaced: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { total, cartItems } = location.state || { total: 0, cartItems: [] };

    if (!location.state) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No order details found</h2>
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="bg-blue-500 px-6 py-2 rounded-lg"
                    >
                        Go to Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 py-20 px-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle className="h-12 w-12 text-white" />
                </div>

                <h1 className="text-4xl font-bold text-white mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-400 text-lg mb-12">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>

                <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 text-left mb-12">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-blue-400" />
                        Order Details
                    </h3>

                    <div className="space-y-4 mb-6">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="flex gap-4 items-center bg-slate-900/50 p-3 rounded-xl">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <p className="text-white font-medium">{item.name}</p>
                                    <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <p className="text-white font-bold">{item.displayPrice || `₹${item.price.toLocaleString()}`}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                        <span className="text-gray-400">Total Amount Paid</span>
                        <span className="text-2xl font-bold text-white">₹{total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/marketplace')}
                        className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-colors"
                    >
                        Continue Shopping
                        <ArrowRight className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-colors border border-slate-700"
                    >
                        <Home className="h-5 w-5" />
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderPlaced;
