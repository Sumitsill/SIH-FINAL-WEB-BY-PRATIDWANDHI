import React, { useState } from "react";
import {
    MapPin,
    ShoppingBag,
    Tag,
    Search,
    Filter,
    CheckCircle,
    AlertCircle,
    Truck,
    Store,
    ShieldCheck,
    Award,
    Package,
    Clock,
} from "lucide-react";
import MarketplaceCart, { CartItem } from "../components/MarketplaceCart";

const Marketplace: React.FC = () => {
    const [locationAccess, setLocationAccess] = useState<boolean>(false);
    const [showLocationModal, setShowLocationModal] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<"buy" | "sell" | "orders">("buy");
    const [isVerifiedUser] = useState<boolean>(true); // Mocked verification status
    const [showQualityCheck, setShowQualityCheck] = useState<boolean>(false);

    // Cart State
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (product: any) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const handleUpdateQuantity = (id: number, change: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    // Mock Data for Buy Mode
    const products = [
        // Sponsored Supplements (Upfront)
        {
            id: 101,
            name: "Gold Standard Whey Protein Isolate",
            price: 1,
            displayPrice: "₹1",
            category: "Nutrition",
            seller: "Official Nutrition Partner",
            image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=300&q=80",
            type: "sponsored",
        },
        {
            id: 102,
            name: "Advanced BCAA Energy Powder",
            price: 1800,
            displayPrice: "₹1,800",
            category: "Nutrition",
            seller: "Official Nutrition Partner",
            image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=300&q=80",
            type: "sponsored",
        },
        {
            id: 103,
            name: "Creatine Monohydrate (Micronized)",
            price: 999,
            displayPrice: "₹999",
            category: "Nutrition",
            seller: "Official Nutrition Partner",
            image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=300&q=80", // Reusing image for demo
            type: "sponsored",
        },
        // Existing & New Equipment
        {
            id: 1,
            name: "Pro Performance Running Shoes",
            price: 4500,
            displayPrice: "₹4,500",
            category: "Footwear",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
        {
            id: 2,
            name: "Heavy Duty Training Dumbbells (Set)",
            price: 2200,
            displayPrice: "₹2,200",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=300&q=80",
            type: "local",
        },
        {
            id: 5,
            name: "Agility Ladder & Cones Kit",
            price: 1500,
            displayPrice: "₹1,500",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?auto=format&fit=crop&w=300&q=80",
            type: "local",
        },
        {
            id: 3,
            name: "Compression Athletic Wear",
            price: 1200,
            displayPrice: "₹1,200",
            category: "Apparel",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
        {
            id: 4,
            name: "Standard Cricket Bat (Grade A)",
            price: 3800,
            displayPrice: "₹3,800",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=300&q=80",
            type: "local",
        },
        {
            id: 6,
            name: "Professional Yoga Mat (Non-Slip)",
            price: 850,
            displayPrice: "₹850",
            category: "Equipment",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
        {
            id: 7,
            name: "Resistance Bands Set (5 Levels)",
            price: 650,
            displayPrice: "₹650",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=300&q=80",
            type: "local",
        },
        {
            id: 8,
            name: "Adjustable Bench Press",
            price: 5500,
            displayPrice: "₹5,500",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=300&q=80", // Reusing image for demo
            type: "local",
        },
        {
            id: 9,
            name: "Pro Match Football (Size 5)",
            price: 1100,
            displayPrice: "₹1,100",
            category: "Equipment",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
        {
            id: 10,
            name: "Carbon Fiber Badminton Racket",
            price: 2800,
            displayPrice: "₹2,800",
            category: "Equipment",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1626224583764-8478ab2e1539?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
        {
            id: 11,
            name: "Cast Iron Kettlebell (16kg)",
            price: 1800,
            displayPrice: "₹1,800",
            category: "Equipment",
            seller: "Local Factory Direct",
            image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=300&q=80",
            type: "local",
        },
        {
            id: 12,
            name: "Pro Boxing Gloves (12oz)",
            price: 1600,
            displayPrice: "₹1,600",
            category: "Equipment",
            seller: "SAI Approved Brand",
            image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=300&q=80",
            type: "brand",
        },
    ];

    const handleGrantLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Location access granted", position);
                    setLocationAccess(true);
                    setShowLocationModal(false);
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Location access is required to show local products.");
                    setShowLocationModal(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSellSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowQualityCheck(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4 sm:px-6 lg:px-8">
            <MarketplaceCart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
            />

            {/* Cart Toggle Button (Mobile/Floating) */}
            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 left-6 z-40 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
            >
                <ShoppingBag className="h-6 w-6" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                        {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </button>

            {/* Location Modal */}
            {showLocationModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
                        <div className="bg-blue-500/20 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
                            <MapPin className="h-10 w-10 text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Enable Location Access
                        </h2>
                        <p className="text-gray-300 mb-8">
                            To show you the best equipment deals from local factories and SAI
                            approved centers near you, we need access to your location.
                        </p>
                        <button
                            onClick={handleGrantLocation}
                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Allow Location Access
                        </button>
                        <button
                            onClick={() => setShowLocationModal(false)}
                            className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            Continue without location
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        🛒{" "}
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Athlete Marketplace
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Buy essential gear or sell your used equipment to support the next
                        generation of athletes.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-800/50 p-1 rounded-xl inline-flex">
                        <button
                            onClick={() => setActiveTab("buy")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "buy"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <ShoppingBag className="h-5 w-5" />
                            Buy Equipment
                        </button>
                        <button
                            onClick={() => setActiveTab("sell")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "sell"
                                ? "bg-yellow-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <Tag className="h-5 w-5" />
                            Sell / Lend
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "orders"
                                ? "bg-green-500 text-white shadow-lg"
                                : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                                }`}
                        >
                            <Package className="h-5 w-5" />
                            Orders
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {activeTab === "buy" ? (
                    <div className="animate-fadeIn">
                        {/* Filters & Search */}
                        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search for equipment..."
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm">
                                    <Filter className="h-4 w-4" /> Filter
                                </button>
                                <div className="flex items-center gap-2 text-sm text-gray-400 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-700">
                                    <MapPin className="h-4 w-4 text-green-400" />
                                    <span>
                                        {locationAccess ? "Location Active" : "Location Required"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-white border border-slate-600">
                                            {product.type === "brand" ? (
                                                <span className="flex items-center gap-1 text-blue-400">
                                                    <ShieldCheck className="h-3 w-3" /> SAI Approved
                                                </span>
                                            ) : product.type === "sponsored" ? (
                                                <span className="flex items-center gap-1 text-yellow-400">
                                                    <Award className="h-3 w-3" /> Sponsored
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-green-400">
                                                    <Store className="h-3 w-3" /> Factory Direct
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="text-xs text-gray-400 mb-1">
                                            {product.category}
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 h-14">
                                            {product.name}
                                        </h3>
                                        <div className="flex justify-between items-end mb-4">
                                            <div>
                                                <p className="text-xs text-gray-400">Price</p>
                                                <p className="text-xl font-bold text-yellow-400">
                                                    {product.displayPrice}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Seller</p>
                                                <p className="text-xs text-white">{product.seller}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-slate-700 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ShoppingBag className="h-4 w-4" /> Add to Cart
                                        </button>
                                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
                                            <Truck className="h-3 w-3" /> Delivery & Pickup Available
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === "orders" ? (
                    <div className="animate-fadeIn max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Package className="h-6 w-6 text-green-400" />
                            Your Orders
                        </h2>

                        {(() => {
                            const orders = JSON.parse(localStorage.getItem('orders') || '[]');

                            if (orders.length === 0) {
                                return (
                                    <div className="text-center py-12 bg-slate-800 rounded-2xl border border-slate-700">
                                        <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No Orders Yet</h3>
                                        <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                                        <button
                                            onClick={() => setActiveTab('buy')}
                                            className="text-blue-400 hover:text-blue-300 underline"
                                        >
                                            Start Shopping
                                        </button>
                                    </div>
                                );
                            }

                            return (
                                <div className="space-y-6">
                                    {orders.map((order: any) => (
                                        <div key={order.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                                            <div className="p-4 border-b border-slate-700 flex flex-wrap justify-between items-center gap-4 bg-slate-900/30">
                                                <div className="flex items-center gap-4">
                                                    <div className="bg-slate-700 p-2 rounded-lg">
                                                        <Package className="h-5 w-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-400 text-xs">Order ID</p>
                                                        <p className="text-white font-mono">#{order.id}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-xs">Date Placed</p>
                                                    <p className="text-white text-sm">
                                                        {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-400 text-xs">Total Amount</p>
                                                    <p className="text-green-400 font-bold">₹{order.total.toLocaleString()}</p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                                                    <Clock className="h-3 w-3 text-blue-400" />
                                                    <span className="text-blue-400 text-xs font-semibold">{order.status}</span>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="space-y-4">
                                                    {order.items.map((item: any, index: number) => (
                                                        <div key={index} className="flex gap-4 items-center">
                                                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-700" />
                                                            <div className="flex-1">
                                                                <p className="text-white font-medium line-clamp-1">{item.name}</p>
                                                                <p className="text-gray-400 text-sm">Qty: {item.quantity} × {item.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        })()}
                    </div>
                ) : (
                    <div className="animate-fadeIn max-w-3xl mx-auto">
                        {!showQualityCheck ? (
                            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-700">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">
                                            List Your Equipment
                                        </h2>
                                        <p className="text-gray-400 mt-1">
                                            Sell or lend to underprivileged athletes
                                        </p>
                                    </div>
                                    {isVerifiedUser ? (
                                        <div className="bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span className="text-green-400 font-semibold text-sm">
                                                Verified Seller
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="bg-red-500/10 border border-red-500/30 px-4 py-2 rounded-full flex items-center gap-2">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                            <span className="text-red-400 font-semibold text-sm">
                                                Verification Required
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {isVerifiedUser ? (
                                    <form onSubmit={handleSellSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Product Name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                                                    placeholder="e.g. Used Training Kit"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Category
                                                </label>
                                                <select className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all">
                                                    <option>Equipment</option>
                                                    <option>Apparel</option>
                                                    <option>Footwear</option>
                                                    <option>Accessories</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Description & Condition
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                                                placeholder="Describe the item and its current condition..."
                                            ></textarea>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Listing Type
                                                </label>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            defaultChecked
                                                            className="accent-yellow-500"
                                                        />
                                                        <span className="text-white">Sell</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="type"
                                                            className="accent-yellow-500"
                                                        />
                                                        <span className="text-white">Lend (Free)</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Price (₹)
                                                </label>
                                                <input
                                                    type="number"
                                                    className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
                                                    placeholder="0.00"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]"
                                            >
                                                Submit for Quality Check
                                            </button>
                                            <p className="text-center text-xs text-gray-500 mt-3">
                                                * All listings must pass our quality verification process
                                                before going live.
                                            </p>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="text-center py-12">
                                        <AlertCircle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            Access Restricted
                                        </h3>
                                        <p className="text-gray-400 mb-6">
                                            Only verified high-end users can sell or lend equipment on
                                            this platform.
                                        </p>
                                        <button className="text-blue-400 hover:text-blue-300 underline">
                                            Apply for Verification
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center animate-fadeIn">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck className="h-10 w-10 text-green-500" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Submission Received!
                                </h2>
                                <p className="text-xl text-gray-300 mb-8">
                                    Your item has been sent for{" "}
                                    <span className="text-yellow-400 font-bold">
                                        Quality Check Validation
                                    </span>
                                    .
                                </p>
                                <div className="bg-slate-900/50 p-6 rounded-xl max-w-md mx-auto mb-8 text-left">
                                    <h4 className="text-white font-semibold mb-2">Next Steps:</h4>
                                    <ul className="space-y-3 text-gray-400 text-sm">
                                        <li className="flex gap-2">
                                            <span className="text-blue-400">1.</span> Our team will
                                            review your images and description.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-blue-400">2.</span> You may receive
                                            a request for additional verification.
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-blue-400">3.</span> Once approved,
                                            your listing will be visible to athletes in your region.
                                        </li>
                                    </ul>
                                </div>
                                <button
                                    onClick={() => setShowQualityCheck(false)}
                                    className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Submit Another Item
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
