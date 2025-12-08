import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import type { Product } from '../types';
import { useAuth } from '../lib/auth-context';

declare global {
    interface Window {
        Razorpay: unknown;
    }
}

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/products').then((res) => setProducts(res.data));

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleBuy = async (product: Product) => {
        if (!window.Razorpay) {
            alert('Razorpay SDK not loaded. Check your connection.');
            return;
        }



        const options = {
            key: "rzp_test_RoCzyfwZwdYvxS",
            amount: product.price * 100,
            currency: product.currency,
            name: "Demo Store",
            description: `Purchase ${product.name}`,
            handler: async function (response: any) {
                // alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                console.log("payment success", response.razorpay_payment_id);

                await api.post('/orders', {
                    id: crypto.randomUUID(),
                    userId: user!.id,
                    productId: product.id,
                    amount: product.price,
                    status: 'success',
                    paymentId: response.razorpay_payment_id,
                    createdAt: new Date().toISOString()
                });
            },
            prefill: {
                name: user!.name,
                email: user!.email,
                contact: "9999999999"
            },
            theme: {
                color: "#0f172a"
            }
        };



        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Products
                </h2>
                <button
                    onClick={() => navigate('/orders')}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Check Orders
                </button>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden shadow rounded-lg flex flex-col">
                        <div className="px-4 py-5 sm:p-6 flex-1">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {product.name}
                            </h3>
                            <div className="mt-2 max-w-xl text-sm text-gray-500">
                                <p>{product.description}</p>
                            </div>
                            <div className="mt-5 text-2xl font-bold text-gray-900">
                                ₹{product.price}
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-4 sm:px-6">
                            <button onClick={() => handleBuy(product)} className="w-full">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
