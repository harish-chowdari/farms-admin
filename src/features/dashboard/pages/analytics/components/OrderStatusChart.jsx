import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts'

const data = [
	{ status: 'placed', count: 4 },
	{ status: 'accepted', count: 1 },
	{ status: 'delivered', count: 1 }
]

const COLORS = ['#4f46e5', '#10b981', '#f59e0b']

export default function OrderStatusChart() {
	return (
		<div style={{ width: '100%', height: '95%' }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						dataKey="count"
						nameKey="status"
						cx="50%"
						cy="50%"
						outerRadius={120}
						fill="#8884d8"
						labelLine={false}
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
						))}
						<LabelList dataKey="count" position="inside" fill="#ffffff" fontSize={16} fontWeight="bold" />
					</Pie>
					<Tooltip />
					<Legend layout="vertical" align="right" verticalAlign="middle" />
				</PieChart>
			</ResponsiveContainer>
		</div>
	)
}