import React from 'react';
import { TradingViewWidget, Themes } from 'react-tradingview-widget';

const Grafico = () => {
  return (
    <div>
      <h1>TradingView Chart</h1>
      <TradingViewWidget
        symbol="NASDAQ:AAPL"
        theme={Themes.DARK}
        locale="es"
        autosize
      />
    </div>
  );
};

export default Grafico;
