(function(factory){if(typeof module==="object"&&module.exports){module.exports=factory}else{factory(Highcharts)}})(function(Highcharts){var protocol=window.location.protocol;var defaultOptionsZhCn={lang:{contextButtonTitle:"鍥捐〃瀵煎嚭鑿滃崟",decimalPoint:".",downloadCSV:"涓嬭浇 CSV 鏂囦欢",downloadJPEG:"涓嬭浇 JPEG 鍥剧墖",downloadPDF:"涓嬭浇 PDF 鏂囦欢",downloadPNG:"涓嬭浇 PNG 鏂囦欢",downloadSVG:"涓嬭浇 SVG 鏂囦欢",downloadXLS:"涓嬭浇 XLS 鏂囦欢",drillUpText:"鈼� 杩斿洖 {series.name}",exitFullscreen:"閫€鍑哄叏灞�",exportData:{categoryDatetimeHeader:"鏃堕棿",categoryHeader:"绫诲埆"},openInCloud:"鍦� Highcharts Cloud 涓墦寮€",invalidDate:"鏃犳晥鐨勬椂闂�",loading:"鍔犺浇涓�...",months:["涓€鏈�","浜屾湀","涓夋湀","鍥涙湀","浜旀湀","鍏湀","涓冩湀","鍏湀","涔濇湀","鍗佹湀","鍗佷竴鏈�","鍗佷簩鏈�"],navigation:{popup:{addButton:"鏂板",arrowLine:"鐩寸嚎",arrowRay:"灏勭嚎",arrowSegment:"绾挎",background:"鑳屾櫙",backgroundColor:"鑳屾櫙棰滆壊",backgroundColors:"鑳屾櫙棰滆壊",borderColor:"杈规棰滆壊",borderRadius:"鍦嗚",borderWidth:"杈规澶у皬",circle:"鍦�",color:"棰滆壊",connector:"杩炴帴",crooked3:"Crooked 3 line",crooked5:"Crooked 5 line",crosshairX:"绔栫洿鍑嗘槦绾�",crosshairY:"姘村钩鍑嗘槦绾�",editButton:"缂栬緫",elliott3:"Elliott 3 line",elliott5:"Elliott 5 line",fibonacci:"鏂愭尝绾冲",fill:"濉厖棰滆壊",flags:"鏍囧織",fontSize:"瀛椾綋澶у皬",format:"鏂囨湰",height:"楂樺害",horizontalLine:"姘村钩绾�",infinityLine:"鏃犻檺绾�",innerBackground:"鍐呰儗鏅�",label:"鏂囧瓧鏍囩",labelOptions:"鏂囧瓧鏍囩閰嶇疆",labels:"鏂囧瓧鏍囩",line:"绾�",lines:"绾挎潯",measure:"Measure",measureX:"Measure X",measureXY:"Measure XY",measureY:"Measure Y",name:"鍚嶅瓧",outerBackground:"澶栬儗鏅�",padding:"鍐呴棿璺�",parallelChannel:"骞惰閫氶亾",pitchfork:"鏉堝瓙",ray:"灏勭嚎",rectangle:"鐭╁舰",removeButton:"鍒犻櫎",saveButton:"淇濆瓨",segment:"娈佃惤",series:"鏁版嵁鍒�",shapeOptions:"鍥惧舰閰嶇疆",shapes:"鍥惧舰",simpleShapes:"绠€鍗曞浘褰�",stroke:"绾挎潯棰滆壊",strokeWidth:"绾挎潯绮楃粏",style:"鏍峰紡",title:"鏍囬",tunnel:"閫氶亾",typeOptions:"璇︽儏",verticalArrow:"绔栫洿绠ご",verticalCounter:"绔栫洿璁℃暟鍣�",verticalLabel:"绔栫洿鏍囩",verticalLine:"绔栫洿绾�",volume:"鎴愪氦閲�"}},noData:"鏆傛棤鏁版嵁",numericSymbols:null,printChart:"鎵撳嵃鍥捐〃",resetZoom:"閲嶇疆缂╂斁姣斾緥",resetZoomTitle:"閲嶇疆涓哄師濮嬪ぇ灏�",shortMonths:["涓€鏈�","浜屾湀","涓夋湀","鍥涙湀","浜旀湀","鍏湀","涓冩湀","鍏湀","涔濇湀","鍗佹湀","鍗佷竴鏈�","鍗佷簩鏈�"],thousandsSep:",",viewData:"鏌ョ湅鏁版嵁琛ㄦ牸",viewFullscreen:"鍏ㄥ睆鏌ョ湅",weekdays:["鏄熸湡澶�","鏄熸湡涓€","鏄熸湡浜�","鏄熸湡涓�","鏄熸湡鍥�","鏄熸湡浜�","鏄熸湡鍏�"],viewData:"鏌ョ湅鏁版嵁琛ㄦ牸",rangeSelectorFrom:"寮€濮嬫椂闂�",rangeSelectorTo:"缁撴潫鏃堕棿",rangeSelectorZoom:"鑼冨洿",zoomIn:"缂╁皬",zoomOut:"鏀惧ぇ",},global:{canvasToolsURL:protocol+"//cdn.hcharts.cn/highcharts/modules/canvas-tools.js",VMLRadialGradientURL:protocol+ +"//cdn.hcharts.cn/highcharts/gfx/vml-radial-gradient.png"},title:{text:"鍥捐〃鏍囬"},tooltip:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m-%d",month:"%Y-%m",year:"%Y"},split:false},exporting:{url:protocol+"//export.highcharts.com.cn"},credits:{text:"Highcharts.com.cn",href:"https://www.highcharts.com.cn"},xAxis:{dateTimeLabelFormats:{millisecond:"%H:%M:%S.%L",second:"%H:%M:%S",minute:"%H:%M",hour:"%H:%M",day:"%Y-%m-%d",week:"%Y-%m",month:"%Y-%m",year:"%Y"}},rangeSelector:{inputDateFormat:"%Y-%m-%d",buttons:[{type:"month",count:1,text:"鏈�"},{type:"month",count:3,text:"瀛ｅ害"},{type:"month",count:6,text:"鍗婂勾"},{type:"ytd",text:"YTD"},{type:"year",count:1,text:"骞�"},{type:"all",text:"鎵€鏈�"}]},plotOptions:{series:{dataGrouping:{dateTimeLabelFormats:{millisecond:["%Y-%m-%d %H:%M:%S.%L","%Y-%m-%d %H:%M:%S.%L"," ~ %H:%M:%S.%L"],second:["%Y-%m-%d %H:%M:%S","%Y-%m-%d %H:%M:%S"," ~ %H:%M:%S"],minute:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],hour:["%Y-%m-%d %H:%M","%Y-%m-%d %H:%M"," ~ %H:%M"],day:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],week:["%Y-%m-%d","%Y-%m-%d"," ~ %Y-%m-%d"],month:["%Y-%m","%Y-%m"," ~ %Y-%m"],year:["%Y","%Y"," ~ %Y"]}}},ohlc:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>'+"寮€鐩橈細{point.open}<br/>"+"鏈€楂橈細{point.high}<br/>"+"鏈€浣庯細{point.low}<br/>"+"鏀剁洏锛歿point.close}<br/>"}},candlestick:{tooltip:{split:false,pointFormat:'<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>'+"寮€鐩橈細{point.open}<br/>"+"鏈€楂橈細{point.high}<br/>"+"鏈€浣庯細{point.low}<br/>"+"鏀剁洏锛歿point.close}<br/>"}}}};Highcharts.setOptions(defaultOptionsZhCn)});