import React from 'react'
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
	{ date: '2025-07-09', totalOrders: 1, revenue: 625 },
	{ date: '2025-07-10', totalOrders: 1, revenue: 125 },
	{ date: '2025-07-11', totalOrders: 3, revenue: 875 },
	{ date: '2025-07-12', totalOrders: 7, revenue: 875 },
	{ date: '2025-07-13', totalOrders: 2, revenue: 250 }
]

export default function OrdersRevenueChart() {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<ResponsiveContainer>
				<ComposedChart data={data} margin={{ top: 20, right: 40, left: 20, bottom: 60 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" angle={-25} textAnchor="end" interval={0} height={60} />
					<YAxis yAxisId="left" label={{ value: 'Orders', angle: -90, position: 'insideLeft' }} />
					<YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue (₹)', angle: 90, position: 'insideRight' }} />
					<Tooltip />
					<Legend verticalAlign="top" />
					<Bar yAxisId="left" dataKey="totalOrders" name="Total Orders" barSize={20} radius={[6, 6, 0, 0]} fill="#8884d8" />
					<Bar yAxisId="right" dataKey="revenue" name="Revenue" barSize={20} radius={[6, 6, 0, 0]} fill="#82ca9d" />
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	)
}
