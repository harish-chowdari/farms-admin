import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
    { productName: '', quantity: 0 },
	{ productName: 'Fresh Tomatoes (1kg)', quantity: 4 },
	{ productName: 'Organic Spinach (500g)', quantity: 6 },
	{ productName: 'Fresh Carrot', quantity: 2 },
	{ productName: 'Fresh Potato', quantity: 2 },
	{ productName: 'Fresh Beetroot', quantity: 4 }
]

export default function ProductQuantityLineChart() {
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<ResponsiveContainer>
				<LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
					<XAxis dataKey="productName" angle={-25} textAnchor="end" interval={0} height={80} />
					<YAxis domain={[0, 'auto']} />
					<Tooltip />
					<Line type="monotone" dataKey="quantity" stroke="#60A5FA" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
