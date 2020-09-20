import React, { FunctionComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, TooltipProps } from 'recharts';

const data = [
    { date: '2020-09-09', weight: 85 },
    { date: '2020-09-10', weight: 84 },
    { date: '2020-09-11', weight: 83 },
    { date: '2020-09-12', weight: 82 },
    { date: '2020-09-13', weight: 81.5 },
    { date: '2020-09-14', weight: 81 },
    { date: '2020-09-15', weight: 80.8 },
];

type WeightChartProps = {
    data1: any;
}


const renderLabel = ({ payload }: TooltipProps) => {
    return <text>{`Weight: ${payload}`}</text>;
};

const WeightChart: FunctionComponent<WeightChartProps> = ({ data1 }: WeightChartProps) => {
    return (
        <LineChart width={600} height={300} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={renderLabel}/>
            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
}

export default WeightChart;





