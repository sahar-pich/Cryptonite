'use client';

import {
    ComposedChart,
    Line,
    Area,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

type ChartData = {
    time: string;
    [key: string]: number | string;
}

type AreaChartProps = {
    chartData: ChartData[];
    selectedCoins: string[];
}

const AreaChartComponent = ({ chartData, selectedCoins }: AreaChartProps) => {
    const colors = ['#34b574', '#ff6a54', '#adc1b4', '#00a2ff', '#f8a32f'];

    return (
        <div id="chart">
            <h2>Price History</h2>
            <p id="chartDescription">🟢 Live feed · syncing every 2s</p>

            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    data={chartData}
                    margin={{ top: 30, right: 60, bottom: 30, left: 30 }}
                >
                    <defs>
                        {selectedCoins.map((symbol, index) => (
                            <linearGradient
                                key={`gradient-${symbol}`}
                                id={`color-${symbol}`}
                                x1="0" y1="0" x2="0" y2="1"
                            >
                                <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>

                    <XAxis dataKey="time" stroke="#23b574" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#23b574" style={{ fontSize: '12px' }} />
                    <CartesianGrid strokeDasharray="3 3" stroke="#394b41" opacity={0.3} />
                    <Tooltip content={<CustomToolTip />} />
                    <Legend content={<CustomLegend selectedCoins={selectedCoins} colors={colors} />} />

                    {selectedCoins.map((symbol, index) => (
                        <>
                            <Area
                                key={`area-${symbol}`}
                                type="monotone"
                                dataKey={symbol.toUpperCase()}
                                fill={`url(#color-${symbol})`}
                                stroke="none"
                                fillOpacity={1}
                                name=""
                                legendType="none"
                                tooltipType="none"
                            />
                            <Line
                                key={`line-${symbol}`}
                                type="monotone"
                                dataKey={symbol.toUpperCase()}
                                stroke={colors[index % colors.length]}
                                strokeWidth={2}
                                dot={false}
                                name={symbol.toUpperCase()}
                                activeDot={{ r: 6 }}
                            />
                        </>
                    ))}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const CustomToolTip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const filteredPayload = payload.filter((entry: any) => entry.type !== 'none');

        return (
            <div className="chartToolTip">
                <p style={{ color: '#23b574', marginBottom: '8px', textAlign: 'center' }}>
                    {label}
                </p>
                {filteredPayload.map((entry: any, index: number) => (
                    <p key={index} style={{ color: entry.stroke, margin: '4px 0' }}>
                        {entry.name}: ${entry.value.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ selectedCoins, colors }: any) => (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', paddingTop: '20px' }}>
        {selectedCoins.map((symbol: string, index: number) => (
            <div key={symbol} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    backgroundColor: colors[index % colors.length],
                    borderRadius: '2px'
                }} />
                <span style={{ color: '#23b574', fontSize: '14px' }}>
                    {symbol.toUpperCase()}
                </span>
            </div>
        ))}
    </div>
);

export default AreaChartComponent;