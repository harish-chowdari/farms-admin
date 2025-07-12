import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { productName: '', revenue: 0 },
	{ productName: 'Fresh Tomatoes (1kg)', revenue: 160 },
	{ productName: 'Organic Spinach (500g)', revenue: 180 },
	{ productName: 'Fresh Carrot', revenue: 80 },
	{ productName: 'Fresh Potato', revenue: 80 },
	{ productName: 'Fresh Beetroot', revenue: 160 }
]

export default function ProductRevenueLineChart() {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<ResponsiveContainer>
				<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
					<XAxis dataKey="productName" angle={-25} textAnchor="end" interval={0} height={80} />
					<YAxis />
					<Tooltip />
					<Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
