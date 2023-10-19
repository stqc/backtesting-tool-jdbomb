import { updateNextCandleTime } from "../App";

var Datafeed;
export var sub;

var timeframeAllowed={"1m":1,"5m":5,"15m":15,"30m":30,"1h":60,"4h":"4h","6h":"6h","12h":"12h","1d":"1D","1w":"1W"}

export async function createChart(timeFrame,startTime,endTime,symbol){

    Datafeed={
        /* mandatory methods for realtime chart */
        onReady:  cb => {console.log("hello")
        setTimeout(()=>cb())},
        resolveSymbol: async (symbolName, onSymbolResolvedCallback, onResolveErrorCallback) => 
        {console.log(symbolName)
         onSymbolResolvedCallback({
        name:symbolName,
        ticker:symbolName,
        has_intraday:true,
        visible_plots_set: 'ohlcv',
        minmov: 1,
        session:'24x7'
})
        return;
    },
        getBars: async(symbolInfo, resolution, periodParams, onHistoryCallback,from,to, onErrorCallback, firstDataRequest) =>
        {   
           

            onHistoryCallback([],{noData:true})
                  
             }
             ,subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => 
             {
             sub=onRealtimeCallback;
        },
             unsubscribeBars: subscriberUID => {console.log("unsub")}
            }
            
            const options={
                debug:true,
                symbol:symbol ,
                autosize:true,
                container:document.getElementById("charts"), 
                library_path: './charting_library/',
                client_id:"JDBomb",
                user_id:"JD",
                datafeed:Datafeed,
                disabled_features: ['use_localstorage_for_settings'],
                interval:timeframeAllowed[timeFrame]
            }

       const widget= new window.TradingView.widget(options);
            
    
}

export async function update(timeFrame,startTime,endTime,symbol){
 
     
    let startTime_ = new Date(startTime);
    startTime_= startTime_.getTime();
   let endTime_ = new Date(endTime);
   endTime_=endTime_.getTime();
   updateNextCandleTime(endTime_)
   var data = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeFrame}&endTime=${endTime_}&startTime=${startTime_}&limit=1000`)
   data = await data.json()
   console.log(data)
  
   for(var i=0; i<data.length; i++){
      sub({
            time:Number(data[i][0]),
            open:Number(data[i][1]),
            high:Number(data[i][2]),
            low:Number(data[i][3]),
            close:Number(data[i][4]),
            volume:Number(data[i][7]),
        });
       
   }
   console.log("udpate")
}

export async function getNextCandle(timeFrame,startTime,symbol){

    let startTime_ = new Date(startTime);
    startTime_= startTime_.getTime();
    var data = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${timeFrame}&startTime=${startTime_}&limit=1`)
   data = await data.json()
   console.log(data)
   for(var i=0; i<data.length; i++){
    sub({
          time:Number(data[i][0]),
          open:Number(data[i][1]),
          high:Number(data[i][2]),
          low:Number(data[i][3]),
          close:Number(data[i][4]),
          volume:Number(data[i][7]),
      });
     
 }

 updateNextCandleTime(data[0][6])

}