import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsStockTools from 'highcharts/modules/stock-tools';
import HighchartsAnnotations from 'highcharts/modules/annotations';
import BrandLight from 'highcharts/themes/brand-light';
import 'highcharts/css/stocktools/gui.css';
import 'highcharts/css/annotations/popup.css';
import "../styles/grafico.css";

// Inicializa el módulo de stock tools y anottations, además del theme Brand Light
HighchartsStockTools(Highcharts);
HighchartsAnnotations(Highcharts);
BrandLight(Highcharts);

const Grafico = () => {
    const [instrumentDetails, setInstrumentDetails] = useState([]);
    const [trades, setTrades] = useState([]);
    const [marketData, setMarketData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [symbol, setSymbol] = useState('RFX20/JUN24');
    const [intervalo, setIntervalo] = useState(3600000);

    useEffect(() => {
        const fetchData = async () => {
            console.log(process.env.REACT_APP_API_URL);
            const instDetails = await axios.get(`${process.env.REACT_APP_API_URL}/getInstrumentDetails`);
            console.log(instDetails);
            const sortedInstruments = instDetails.data.instruments.sort((a, b) =>
                (a.instrumentId.symbol > b.instrumentId.symbol) ? 1 : ((b.instrumentId.symbol > a.instrumentId.symbol) ? -1 : 0)
            );
    
            const tradeDetails = await axios.get(`${process.env.REACT_APP_API_URL}/getTodayTrades`, {
                params: { symbol }
            });

            const marketDetails = await axios.get(`${process.env.REACT_APP_API_URL}/getMarketData`, {
                params: { symbol, entries: "BI,OF,LA,OP,CL,SE,OI", depth: 1 }
            });

            const chartDetails = await axios.get(`${process.env.REACT_APP_API_URL}/getTrades`, {
                params: { symbol , date: "2024-01-01", dateTo: "2024-12-31", intervalo }
            });

            setInstrumentDetails(sortedInstruments);
            setTrades(tradeDetails.data.trades);
            setMarketData(marketDetails.data.marketData);
            setChartData(chartDetails.data);
            setLoading(false);
        };

        fetchData();
    }, [symbol, intervalo]);

    const options = {
        rangeSelector: {
            enabled: true,
            selected: 1,
            inputEnabled: true,
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
            }, {
                type: 'week',
                count: 1,
                text: '1w'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'all',
                text: 'All'
            }]
        },
        title: {
            text: `${symbol} Stock Price`
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                month: '%e. %b',
                year: '%b'
            }
        },
        yAxis: [{
            height: '50%',
            resize: {
                enabled: true
            }
        }, {
            top: '55%',
            height: '45%',
            offset: 0
        }],
        series: [
            {
                type: 'ohlc',
                name: `${symbol} OHLC`,
                data: chartData.map(item => [item.date, item.open, item.high, item.low, item.close]),
                dataGrouping: {
                    enabled: false
                },
                yAxis: 0
            },
            {
                type: 'candlestick',
                name: `${symbol} Candlestick`,
                data: chartData.map(item => [item.date, item.open, item.high, item.low, item.close]),
                dataGrouping: {
                    enabled: false
                },
                yAxis: 1
            }
        ],
        stockTools: {
            gui: {
                enabled: true
            }
        },
        navigation: {
            bindingsClassName: 'stocktools-wrapper'
        }
    };

    return (
        <div>
            {loading ? <p>Loading data...</p> : (
                <>
                    <div className="select-container">
                        <select className="select" value={symbol} onChange={e => setSymbol(e.target.value)}>
                            {instrumentDetails.map((inst, index) => (
                                <option key={index} value={inst.instrumentId.symbol}>
                                    {inst.instrumentId.symbol}
                                </option>
                            ))}
                        </select>
                        <select className="select" value={intervalo} onChange={e => setIntervalo(Number(e.target.value))}>
                            <option value={60000}>1 minuto</option>
                            <option value={300000}>5 minutos</option>
                            <option value={600000}>10 minutos</option>
                            <option value={1800000}>30 minutos</option>
                            <option value={3600000}>1 hora</option>
                        </select>
                    </div>
                    <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div className="market-data-container">
                            <h2>Market Data</h2>
                            <table className="table market-data-table">
                                <tbody>
                                    <tr>
                                        <td>Mejor oferta de compra</td>
                                        <td>{marketData.BI?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Mejor oferta de venta</td>
                                        <td>{marketData.OF?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Último precio operado</td>
                                        <td>{marketData.LA?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio de apertura</td>
                                        <td>{marketData.OP?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio de cierre</td>
                                        <td>{marketData.CL?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Precio de ajuste</td>
                                        <td>{marketData.SE?.price || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Interés abierto</td>
                                        <td>{marketData.OI?.price || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <h2>Trades del Día</h2>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>Hora</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="trades-container">
                                <table className="table">
                                    <tbody>
                                        {[...trades].reverse().map((trade, index) => (
                                            <tr key={index}>
                                                <td>${trade.price}</td>
                                                <td>{trade.size}</td>
                                                <td>{new Date(new Date(trade.datetime).getTime() - 10800000).toLocaleTimeString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Grafico;