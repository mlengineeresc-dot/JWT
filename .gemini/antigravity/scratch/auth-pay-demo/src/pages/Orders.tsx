import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import type { Order, Product } from '../types';
import { useAuth } from '../lib/auth-context';

export default function Orders() {
    const [orders, setOrders] = useState<(Order & { product?: Product })[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            const { data: userOrders } = await api.get<Order[]>(`/orders?userId=${user.id}`);

            const expandedOrders = await Promise.all(userOrders.map(async (order) => {
                const { data: product } = await api.get<Product>(`/products/${order.productId}`);
                return { ...order, product };
            }));

            setOrders(expandedOrders);
        };

        fetchOrders();
    }, [user]);

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
                {orders.length === 0 && (
                    <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No orders found.</li>
                )}
                {orders.map((order) => (
                    <li key={order.id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-indigo-600 truncate">
                                    {order.product?.name || 'Unknown Product'}
                                </p>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {order.status}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        Payment ID: {order.paymentId}
                                    </p>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <p>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
