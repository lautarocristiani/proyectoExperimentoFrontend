import React, { useEffect } from 'react';


const Grafico = ({ symbol }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget(
        {
          "width": 980,
          "height": 610,
          "symbol": symbol,
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "light",
          "style": "1",
          "locale": "en",
          "toolbar_bg": "#f1f3f6",
          "enable_publishing": false,
          "withdateranges": true,
          "range": "1M",
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "container_id": "tradingview_chart"
        }
      );
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [symbol]); // Re-run this effect if the symbol prop changes

  return <div id="tradingview_chart"></div>;
};

export default Grafico;
