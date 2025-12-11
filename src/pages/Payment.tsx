import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Building, ShieldCheck, Clock, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const Payment: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { total, cartItems } = location.state || { total: 0, cartItems: [] };

    const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);
    const upiId = "anupamraj493@okicici";         // ✅ replace
    const merchantName = "Pratidwandhi";
    const transactionNote = "Marketplace Order";

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
        merchantName
    )}&am=${total}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;


    // QR Code Rotation State
    // const qrImages = ['/payment qr SS.jpg', '/payment-qr AR.jpg'];
    // const [currentQrIndex, setCurrentQrIndex] = useState(0);

    useEffect(() => {
        if (paymentMethod === 'upi' && !isPaymentComplete && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [paymentMethod, isPaymentComplete, timeLeft]);

    // Rotate QR codes every 3 seconds
    // useEffect(() => {
    //     if (paymentMethod === 'upi' && !isPaymentComplete && timeLeft > 0) {
    //         const interval = setInterval(() => {
    //             setCurrentQrIndex((prev) => (prev + 1) % qrImages.length);
    //         }, 3000);
    //         return () => clearInterval(interval);
    //     }
    // }, [paymentMethod, isPaymentComplete, timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePaymentSuccess = () => {
        setIsPaymentComplete(true);

        // Save order to localStorage
        const newOrder = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: cartItems,
            total: total,
            status: 'Processing'
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

        setTimeout(() => {
            navigate('/order-placed', {
                state: {
                    total,
                    cartItems
                }
            });
        }, 2000);
    };

    if (!location.state) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
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
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back
                </button>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <CreditCard className="h-6 w-6 text-blue-400" />
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                {/* UPI Option */}
                                <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'upi'
                                    ? 'bg-blue-500/10 border-blue-500'
                                    : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'upi'}
                                        onChange={() => setPaymentMethod('upi')}
                                        className="w-5 h-5 text-blue-500"
                                        disabled={timeLeft === 0}
                                    />
                                    <div className="ml-4 flex items-center gap-3">
                                        <div className="bg-white p-1 rounded">
                                            <Smartphone className="h-6 w-6 text-slate-900" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">UPI / QR Code</p>
                                            <p className="text-sm text-gray-400">Google Pay, PhonePe, Paytm</p>
                                        </div>
                                    </div>
                                </label>

                                {/* Card Option */}
                                <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'card'
                                    ? 'bg-blue-500/10 border-blue-500'
                                    : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="w-5 h-5 text-blue-500"
                                        disabled={timeLeft === 0}
                                    />
                                    <div className="ml-4 flex items-center gap-3">
                                        <div className="bg-slate-700 p-1 rounded">
                                            <CreditCard className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Credit / Debit Card</p>
                                            <p className="text-sm text-gray-400">Visa, Mastercard, RuPay</p>
                                        </div>
                                    </div>
                                </label>

                                {/* Net Banking Option */}
                                <label className={`flex items-center p-4 rounded-xl border cursor-pointer transition-all ${paymentMethod === 'netbanking'
                                    ? 'bg-blue-500/10 border-blue-500'
                                    : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === 'netbanking'}
                                        onChange={() => setPaymentMethod('netbanking')}
                                        className="w-5 h-5 text-blue-500"
                                        disabled={timeLeft === 0}
                                    />
                                    <div className="ml-4 flex items-center gap-3">
                                        <div className="bg-slate-700 p-1 rounded">
                                            <Building className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Net Banking</p>
                                            <p className="text-sm text-gray-400">All Indian Banks</p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Payment Details Section */}
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
                            {/* Session Expired Overlay */}
                            {timeLeft === 0 && (
                                <div className="absolute inset-0 z-10 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-sm w-full">
                                        <Clock className="h-12 w-12 text-red-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Session Expired</h3>
                                        <p className="text-gray-400 mb-6">
                                            Your payment session has expired. Please return to the marketplace to restart the process.
                                        </p>
                                        <button
                                            onClick={() => navigate('/marketplace')}
                                            className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition-colors"
                                        >
                                            <RefreshCw className="h-5 w-5" />
                                            Return to Marketplace
                                        </button>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-white mb-4">Scan QR to Pay</h3>

                                    {/* Amount Display */}
                                    <div className="mb-4 bg-slate-700/50 p-3 rounded-lg inline-block">
                                        {/* <p className="text-gray-400 text-sm">Amount to Pay</p> */}
                                        {/* <p className="text-2xl font-bold text-white">₹{total.toLocaleString()}</p> */}
                                    </div>

                                    <div className={`bg-white p-4 rounded-xl inline-block mb-4 transition-all duration-500 ${timeLeft === 0 ? 'blur-md opacity-50' : ''}`}>
                                        {/* <img
                                            src={qrImages[currentQrIndex]}
                                            alt="UPI QR Code"
                                            className="w-[200px] h-auto object-contain transition-opacity duration-300"
                                        /> */}
                                        <QRCodeCanvas
                                            value={upiUrl}
                                            size={220}
                                            bgColor="#ffffff"
                                            fgColor="#000000"
                                            level="H"
                                        />

                                    </div>
                                    <div className={`flex items-center justify-center gap-2 font-mono text-xl mb-6 ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-yellow-400'}`}>
                                        <Clock className="h-5 w-5" />
                                        {formatTime(timeLeft)}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-6">
                                        Scan with any UPI app to complete payment
                                    </p>
                                    <button
                                        onClick={handlePaymentSuccess}
                                        disabled={timeLeft === 0}
                                        className="w-full bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                                    >
                                        I have paid
                                    </button>
                                </div>
                            )}

                            {paymentMethod === 'card' && (
                                <div className={`space-y-4 ${timeLeft === 0 ? 'blur-sm' : ''}`}>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-2">Card Number</label>
                                        <input type="text" placeholder="0000 0000 0000 0000" disabled={timeLeft === 0} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none disabled:opacity-50" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">Expiry Date</label>
                                            <input type="text" placeholder="MM/YY" disabled={timeLeft === 0} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none disabled:opacity-50" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-2">CVV</label>
                                            <input type="password" placeholder="123" disabled={timeLeft === 0} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none disabled:opacity-50" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handlePaymentSuccess}
                                        disabled={timeLeft === 0}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                                    >
                                        Pay ₹{total.toLocaleString()}
                                    </button>
                                </div>
                            )}

                            {paymentMethod === 'netbanking' && (
                                <div className={`space-y-4 ${timeLeft === 0 ? 'blur-sm' : ''}`}>
                                    <select disabled={timeLeft === 0} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none disabled:opacity-50">
                                        <option>Select Bank</option>
                                        <option>HDFC Bank</option>
                                        <option>SBI</option>
                                        <option>ICICI Bank</option>
                                        <option>Axis Bank</option>
                                    </select>
                                    <button
                                        onClick={handlePaymentSuccess}
                                        disabled={timeLeft === 0}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl mt-4 transition-colors"
                                    >
                                        Proceed to Pay ₹{total.toLocaleString()}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-6">
                        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 sticky top-24">
                            <h3 className="text-lg font-bold text-white mb-4">Order Summary</h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cartItems.map((item: any) => (
                                    <div key={item.id} className="flex gap-3">
                                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                        <div className="flex-1">
                                            <p className="text-white text-sm line-clamp-2">{item.name}</p>
                                            <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-white font-medium text-sm">{item.displayPrice || `₹${item.price.toLocaleString()}`}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-700 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-green-400 text-sm">
                                    <span>Delivery</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-slate-700 mt-2">
                                    <span>Total to Pay</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-green-400 text-xs bg-green-500/10 p-3 rounded-lg">
                                <ShieldCheck className="h-4 w-4" />
                                Safe and Secure Payments
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {isPaymentComplete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-800 p-8 rounded-2xl text-center max-w-sm mx-4 animate-fadeIn">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
                        <p className="text-gray-400">Your order has been placed successfully.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
