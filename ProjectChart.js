




// 任务甘特图
// created by shangshunli on 2020.08.17
define([
    'widgets/TabWidget',
    "text!./ProjectChart.html",
    "framework/highcharts/modules/xrange", "framework/highcharts/modules/oldie",
], function (TabWidget, ProjectChart) {
    var widget = TabWidget.extend({
        events: {
            "click .goBack": 'goBack',
            "click .img_top":"flexRange"
        },
        render: function (data) {

            this.parent = data.parent
            this.rangeData = data.rangeData
            this.rangeUrl = data.rangeUrl
            // this.$el.empty().html(_.template(ProjectChart)({}))
            this.getData()
            return this;
        },
        goBack: function () {
            this.parent.$el.find('.XRange').hide()
            this.parent.$el.find('.SJ_info').show()
        },
        getData: function () {
            var me = this
            me.flag=true
            request(this.rangeUrl + "/AccountManage/getProjectStageTask_Jt", {
                query: this.rangeData,
                cacheBust: true
            }).then(function (res) {
                me.taskData = res.data.getMe
                this.$el.empty().html(_.template(ProjectChart)({
                    data: me.taskData
                }))
                me.allData=me.taskData
                this.getRangeData()

            }.bind(this))
        },
        getRangeData: function () {
            var me = this
            var first={
                x:NaN,
                x2:NaN,
                y:0
            }
            var rangeData = []
            rangeData.push(first)
            var today = this.getDays()
            if(me.taskData.length){

                me.taskName=me.taskData[0].StageName||''
                me.taskData.forEach(item => {
                    if(me.taskName!=item.StageName){
                        first.y=rangeData.length
                        rangeData.push(first)
                    }
                    me.taskName=item.StageName
                    var rangeObj = {
                        x: 0,
                        x2: 0,
                        start: '',
                        end: '',
                        color: '#E4E9E8',
                        partialFill: {
                            fill: '',
                            amount: ''
                        },
                        y: '',
                        y1: '',
                        progress: 0
                    } 
                    // 数据是三级的，才能更好的进行循环操作  https://jshare.com.cn/gantt/CYdxL6
                    rangeObj.x = Date.UTC(item.STimeReal.split('-')[0],item.STimeReal.split('-')[1]-1,item.STimeReal.split('-')[2])
                    rangeObj.x2 = Date.UTC(item.ETimeReal.split('-')[0],item.ETimeReal.split('-')[1]-1,item.ETimeReal.split('-')[2])
                    rangeObj.start = item.STimeReal
                    rangeObj.end = item.ETimeReal
                    rangeObj.partialFill.amount = (item.ProjectProcess)/100
                    rangeObj.partialFill.fill = item.IsDely==1 ? '#FF9900':'#25BC9E'
                    rangeObj.y = rangeData.length 
                    rangeObj.y1 = this.iDays(item.STimeReal, today)
                    rangeObj.progress=item.ProjectProcess
                    rangeData.push(rangeObj)
                    item.TaskLevelTwoList.forEach(item1 => {
                        var rangeObj1 = {
                            x: 0,
                            x2: 0,
                            start: '',
                            end: '',
                            color: '#E4E9E8',
                            partialFill: {
                                fill: '',
                                amount: ''
                            },
                            y: '',
                            y1: '',
                            progress: 0
                        }
                        rangeObj1.x = Date.UTC(item1.STimeReal.split('-')[0],item1.STimeReal.split('-')[1]-1,item1.STimeReal.split('-')[2])
                        rangeObj1.x2 = Date.UTC(item1.ETimeReal.split('-')[0],item1.ETimeReal.split('-')[1]-1,item1.ETimeReal.split('-')[2])
                        rangeObj1.start = item1.STimeReal
                        rangeObj1.end = item1.ETimeReal
                        rangeObj1.partialFill.amount = (item1.ProjectProcess)/100
                        rangeObj1.partialFill.fill = item1.IsDely==1 ? '#FF9900':'#25BC9E'
                        rangeObj1.y = rangeData.length
                        rangeObj1.y1 = this.iDays(item1.STimeReal, today)
                        rangeObj1.progress=item1.ProjectProcess
                        rangeData.push(rangeObj1)
                    })
                })
            }
           
            this.renderXrange(rangeData)
        },
        renderXrange: function (rangeData) {
            // console.log(rangeData)
            var me=this
            var newArr=[]
            rangeData.forEach(item=>{
                if(isNaN(item.x) || isNaN(item.x2)){
                 item.x=''
                 item.x2=''
                }
                newArr.push(item)
            })
            let chartHeight = newArr.length * 48 + 40+30+14 + 'px'
            this.$el.find(".container").get(0).style.height = chartHeight
            this.$el.find(".task_left").get(0).style.height = chartHeight
            this.$el.find(".bigRange").get(0).style.height = chartHeight
            var categories = []
            for (var i = 0; i < newArr.length; i++) {
                var a = ''
                categories.push(a)
            }
            var options = {
                chart: {
                    type: 'xrange',
                    marginBottom: 5,
                    // marginTop: 40,
                    marginLeft: 0,
                    marginRight: 0
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                // scrollbar: {
                //     enabled: true,
                //     margin: 0
                // },
                rangeSelector: {
                    enabled: true,
                    selected: 3, //默认选中值
                    buttons: [{
                        type: 'day',
                        count: 0,
                        text: '日'
                    }, {
                        type: 'week',
                        count: 1,
                        text: '周'
                    },{
                        type: 'month',
                        count: 2,
                        text: '月'
                    },  {
                        type: 'all',
                        count:3,
                        text: '所有'
                    }],
                    height:30,
                    inputDateFormat:'%Y-%m-%d', //输入时间格式化
                    buttonSpacing:10,//按钮之间选中的间距问题
                    labelStyle:{
                        color:'#33333', //范围开始时间和和结束时间文字颜色
                        fontSize:'14px'
                    },
                    buttonTheme: { // styles for the buttons
                        fill: '#F1F6F6',
                        stroke: 'none',
                        'stroke-width': 0,
                        r: 3, //选中圆角
                        style: {
                            color: '#333',
                            fontWeight: 'bold'
                        },
                        states: {
                            hover: {
                            },
                            select: {
                                fill: '#25BC9E',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    inputBoxWidth: 100,
                    inputBoxHeight: 20,
                    inputStyle: {
                        color: '#333',
                        fontWeight: 'bold',
                        fontSize: '14px',
                    },
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%d',   //天
                        week: '%m/%d', //周
                        month:'%m', //月
                    },
                    labels: {
                        // 定义x轴样式
                        style: {
                            color: "#333",
                            fontSize: '14px',
                        },
                    },
                    gridLineColor: '#EFEFEF',
                    gridLineWidth: 1,
                    opposite: true,
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    categories: categories,
                    reversed: true,
                    labels: {
                        // 定义y轴样式
                        style: {
                            color: "red",
                            fontSize: '12px',
                        },
                    }
                },
                tooltip: {

                    shared: true,
                    useHTML: true,
                    headerFormat: '<small>产品性能目标</small><table>',
                    pointFormat: '<tr><td style="color:#333">持续时间: <span>{point.y1}天</span></td></tr>' +
                        '<tr><td>当前进度:<span style="color:#6BBDAD">{point.progress}%</span></td></tr><tr><td>计划开始日期:<span style="color:#5D5D5D">{point.start}</span></td></tr><tr><td>计划结束日期:<span style="color:#5D5D5D">{point.end}</span></td></tr>',
                    footerFormat: '</table>',
                    style: {
                        padding: 10,
                        fontWeight: 'bold',
                        color: '#333',
                    }
                },
                legend: {
                    enabled: false,
                },
                series: [{

                    // pointPadding: 0,
                    // groupPadding: 0,
                    borderColor: '#E4E9E8',//进度条颜色
                    // borderWidth:3, //进度条宽度
                    pointWidth: 20, //进度条宽度
                    borderRadius: 10,  //进度条边框
                    data: newArr,
                    // 显示当前值
                    dataLabels: {
                        enabled: false
                    }
                }]
            };
               Highcharts.setOptions({
                global: {
                    useUTC: false //中文区时间格式
                },
                // 所有语言文字相关配置都设置在 lang 里
                lang: {
                    resetZoom: '重置',
                    resetZoomTitle: '重置缩放比例',
                    rangeSelectorZoom: '范围', // 不显示 'zoom' 文字
                    noData: '暂无数据',
                    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    shortMonths: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                    rangeSelectorFrom: "起始",
                    rangeSelectorTo: "结束",
                }
            }); 
            var chart = Highcharts.chart(this.$el.find(".container").get(0), options)
            if(me.flag){
                var timeArr=[]
                newArr.forEach((item,index)=>{
                    if(!(item.x=='')){
                        timeArr.push(item)
                    }
                })
                for(var j=0;j<timeArr.length-1;j++){
                    //两两比较，如果前一个比后一个大，则交换位置。
                    for(var i=0;i<timeArr.length-1-j;i++){
                        if(timeArr[i].x>timeArr[i+1].x){
                            var temp = timeArr[i];
                            timeArr[i] = timeArr[i+1];
                            timeArr[i+1] = temp;
                        }
                    } 
                }
                var year=new Date(timeArr[0].x).getFullYear()
                var month=new Date(timeArr[0].x).getMonth()+1
                var _html=''
                if(year){
                    _html=year+'年'
                }
                if(month){
                    _html=_html+month+'月'
                }
                this.$el.find(".startTime").get(0).innerHTML=_html||''
                me.flag=false
            }
        },
        flexRange:function(e){
            var me=this
            let level=$(e.target)[0].attributes[3].value
            let name=$(e.target)[0].attributes[4].value
            let clickIndex=$(e.target)[0].attributes[5].value
            if( $(e.target)[0].style.transform==''){
                $(e.target)[0].style.transform= 'rotateX(-180deg)'
                // 点击一级阶段隐藏
                if(level==0){
                    var arr=me.taskData.filter(item=>item.StageName!=name)
                    var newArr=me.taskData.filter(item=>item.StageName==name)
                    var hideLength=Number(clickIndex)+Number(newArr.length)
                    for(var i=clickIndex;i<hideLength;i++){
                        // console.log( document.querySelectorAll("#bigBox"))
                        document.querySelectorAll("#bigBox")[i].style.display='none'
                    }
                   me.taskData=arr
                    this.getRangeData()
                }else if(level==1){
                    // 点击二级阶段隐藏
                    // var arr1=me.taskData.filter(item=>item.StageTaskName==name)
                    // var hideLength=Number(clickIndex)+Number(arr1.length)
                    // console.log(arr1)
                    // console.log(document.querySelectorAll("#task3"))
                    // for(var i=clickIndex;i<hideLength;i++){
                    //     document.querySelectorAll("#task3")[i].style.display="none"
                    // }
                    // console.log(arr1)
                    // var arr=me.taskData.filter(item=>item.StageTaskName!=name)
                    // me.taskData=arr
                    // 只让当前点击二级阶段里面的TaskLevelTwoList的值发生变化
                    me.taskData.forEach(item=>{
                            if(item.StageTaskName==name){
                                item.TaskLevelTwoList=[]
                            }
                    })
                    this.getRangeData()
                }
            }else{
                // 点击一级阶段将隐藏的内容显示
                if(level==0){
                    var newArr=me.allData.filter(item=>item.StageName==name)
                    var index=me.allData.findIndex(item=>item.ID==newArr[0].ID)
                    var arr1=me.taskData.slice(0,index)
                    var arr2=me.taskData.slice(index)
                    var concatArr=[...arr1,...newArr,...arr2]
                    me.taskData=concatArr
                    var hideLength=Number(clickIndex)+Number(newArr.length)
                    for(var i=clickIndex;i<hideLength;i++){
                        document.querySelectorAll("#bigBox")[i].style.display=''
                    }
                    this.getRangeData()
                    $(e.target)[0].style.transform= ''
                }else if(level==1){
                    // 点击二级阶段将隐藏的内容显示
                    console.log(me.allData)
                 
                    this.getRangeData()
                    $(e.target)[0].style.transform= ''
                }
               
            }
        },
        iDays: function (dateStr1, dateStr2) { //sDate1和sDate2是2006-12-18格式  
            var dateSpan,
                iDays;
            dateStr1 = Date.parse(dateStr1);
            dateStr2 = Date.parse(dateStr2);
            dateSpan = dateStr2 - dateStr1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
        getDays: function () {
            var today = new Date()
            var year = today.getFullYear()
            var month = today.getMonth() +1
            month = month < 10 ? '0' + month : month
            var day = today.getDate()
            day = day < 10 ? '0' + day : day
            return year + '-' + month + '-' + day
        }

    })
    return widget;
});