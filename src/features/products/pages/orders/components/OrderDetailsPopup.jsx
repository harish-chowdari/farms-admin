import { Calendar, CreditCard, MapPin } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../../../../utils/dateFormatter'

export default function OrderDetailsPopup({
    selectedOrder,
    onClose,
    getStatusColor = () => {},
    getStatusIcon = () => {}
}) {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
                
                <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900">
                            Order Details - #{selectedOrder._id.slice(-8)}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Status and Payment */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                                    {getStatusIcon(selectedOrder.orderStatus)}
                                    <span className="ml-1 capitalize">{selectedOrder.orderStatus}</span>
                                </span>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{selectedOrder.paymentMethod}</span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start space-x-2">
                                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <div className="text-sm text-gray-900">
                                        <div>{selectedOrder.shippingAddress.address}</div>
                                        <div>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</div>
                                        <div>{selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Order Items</label>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {selectedOrder.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                                            <div className="text-sm text-gray-500">
                                                {item.quantity} × {item.weight}{item.weightUnit}
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            ₹{item.price - item.discountPrice}
                                            {item.discountPrice > 0 && (
                                                <span className="ml-2 text-xs text-gray-500 line-through">₹{item.price}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Subtotal</span>
                                <span className="text-sm font-medium text-gray-900">₹{selectedOrder.totalPrice - selectedOrder.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-gray-600">Shipping</span>
                                <span className="text-sm font-medium text-gray-900">₹{selectedOrder.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                <span className="text-base font-medium text-gray-900">Total</span>
                                <span className="text-base font-bold text-green-600">₹{selectedOrder.totalPrice}</span>
                            </div>
                        </div>

                        {/* Order Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Order Date</label>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{formatDate(selectedOrder.createdAt)}</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Paid Date</label>
                                <div className="flex items-center space-x-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-900">{formatDate(selectedOrder.paidAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
