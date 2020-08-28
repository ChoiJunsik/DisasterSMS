// @flow 
import * as React from 'react';
import { LineChart, Line, Legend, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { locationTable } from '../container/KorMap/data';

import './public/chart.css';

const WeeklyGraph = ({ location,weeklyData }) => {
    console.log(location)
    return (
        <>
            <ResponsiveContainer width="96%" height="95%">

                <LineChart style={{ fontFamily: 'GmarketSansLight' }} data={weeklyData} margin={{ right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide={true} />
                    <YAxis />
                    <Tooltip />
                    <Legend payload={[{ value: ` 일주일간 ${locationTable[location]} 재난문자 발생건수`, type: 'line',color:'c62828'}]}/>
                    <Line type="monotone" dataKey="재난문자 발생건수" stroke="#c62828" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default WeeklyGraph;