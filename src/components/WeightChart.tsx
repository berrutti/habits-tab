import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


const WeightChart = ({ data }: any) =>
    (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart width={600} height={300} data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={({ payload }: any) => <text>{`Weight: ${payload[0]?.value}`}</text>} />
                    <Line type="monotone" dataKey="weight" stroke="#222" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

export default WeightChart;





