/*
* @Author: Wanglj
* @Date:   2017-08-08 14:00:07
* @Last Modified by:   Wanglj
* @Last Modified time: 2017-08-11 14:41:15
*/

(function($){
    'use strict';
    var FormDataConfig=[];//保存设置的表单信息
    var RadioAddArray=null;//保存添加的选项信息
    var Control={
        leave:{//请假
            html:'<div class="leave-ui-box"><div class="leave-type clearfix"><div class="fleft"><label class="ui-label">请假类型</label></div><div class="leave-choose fright clearfix"><div class="itext fleft">请选择&nbsp;(必填)</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div><div class="control-choose-time"><div class="leave-item clearfix"><div class="fleft"><label class="ui-label">开始时间</label></div><div class="leave-choose fright clearfix"><div class="itext fleft">请选择&nbsp;(必填)</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div><div class="leave-item clearfix"><div class="fleft"><label class="ui-label">结束时间</label></div><div class="leave-choose fright clearfix"><divclass="itext fleft">请选择&nbsp;(必填)</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div><div class="leave-item clearfix"><div class="fleft"><label class="ui-label">时长</label></div><div class="leave-choose fright clearfix"><div class="choose-time"><span></span><i>小时</i></div></div></div></div></div>'
        },
        inputText:{//单行输入
            html:'<div class="text-ui-box"><div class="text-ms-box clearfix"><div class="text-state"><label class="ui-label">单行输入框</label></div><div class="text-input-wrap"><div class="text-format-input"><div class="div-input">请输入</div><!--<input type="text" class="text-input" placeholder="请输入"/>--></div></div></div></div>'
        },//多行输入
        inputTextArea:{
            html:'<div class="textarea-ui-box"><div class="textarea-ms-box clearfix"><div class="textarea-state"><label class="ui-label">多行输入框</label></div><div class="textarea-input-wrap"><div class="textarea-format-input"><div class="div-textarea">请输入</div><!--<textarea class="textarea-input" placeholder="请输入"></textarea>--></div></div></div></div>'
        },//数字输入框
        inputNumber:{
            html:'<div class="num-ui-box clearfix"><div class="num-label"><label class="ui-label">数字输入框</label></div><div class="num-input-area"><div class="div-input">请输</div></div></div>'
        },//单选框
        inputRadio:{
            html:'<div class="radio-ui-box clearfix"><div class="radio-label"><label class="ui-label">单选框</label></div><div class="radio-input-area clearfix"><div class="radio-choose fright clearfix"><div class="itext fleft">请选择&nbsp;</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div></div>'
        },//多选框
        inputCheckbox:{
            html:'<div class="checkbox-ui-box clearfix"><div class="checkbox-label"><label class="ui-label">多选框</label></div><div class="checkbox-input-area clearfix"><div class="checkbox-choose fright clearfix"><div class="itext fleft">请选择&nbsp;</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div></div>'
        },//日期
        inputDate:{
            html:'<div class="date-ui-box clearfix"><div class="date-label"><label class="ui-label">日期</label></div><div class="date-input-area clearfix"><div class="date-choose fright clearfix"><div class="itext fleft">请选择&nbsp;</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div></div>'
        },//日期区间
        inputDateRange:{
            html:'<div class="dateRange-ui-box clearfix"><div class="dateRange-label none"><label class="ui-label">日期区间</label></div><div class="dateRange-display"><div class="dateRange-item"><div class="dateRange-label"><label class="ui-label">开始时间</label></div><div class="dateRange-input-area clearfix"><div class="dateRange-choose fright clearfix"><div class="itext fleft">请选择&nbsp;</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div></div><div class="dateRange-item"><div class="dateRange-label"><label class="ui-label">结束时间</label></div><div class="dateRange-input-area clearfix"><div class="dateRange-choose fright clearfix"><div class="itext fleft">请选择&nbsp;</div><div class="fleft arrow-box"><div class="arrow-right"></div></div></div></div></div></div></div>'
        },//图片
        inputAttachMent:{
            html:'<div class="attachMent-ui-box clearfix"><div class="attachMent-label"><label class="ui-label">附件</label></div><div class="attachMent-input-area clearfix"><div class="attachMent-choose fright clearfix"></div></div></div>'
        },
        inputImg:{
            html:'<div class="img-ui-box clearfix"><div class="img-label"><label class="ui-label">图片</label></div><div class="img-input-area clearfix"><div class="img-choose fright clearfix"></div></div></div>'
        },//金额
        inputMoney:{
            html:'<div class="money-ui-box clearfix"><div class="money-label"><label class="ui-label">金额（元）</label></div><div class="money-input-area"><div class="div-input">请输入</div></div></div>'
        }
    }
    var FormSetting={
        inputText:{//单行输入
            html:'<div data-classify="inputText"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="单行输入框"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value="请输入"></div><div class="from-text"><i class="tips">内容最多可填写1000个字</i></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }


                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".div-input").text(val);
                    arr[tamp]['tips']=val;
                });
                $("#controlSettingBox").find("input").eq(2).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["tips"]!=undefined){
                    $("#controlSettingBox").find("input").eq(1).val(data["tips"]);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(2).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputTextArea:{//多行输入
            html:'<div data-classify="inputTextArea"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="多行输入框"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value="请输入"></div><div class="from-text"><i class="tips">内容最多可填写8000个字</i></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".div-textarea").text(val);
                    arr[tamp]['tips']=val;
                });
                $("#controlSettingBox").find("input").eq(2).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["tips"]!=undefined){
                    $("#controlSettingBox").find("input").eq(1).val(data["tips"]);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(2).prop("checked",data["validate"]);;
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputNumber:{//数字输入框
            html:'<div data-classify="inputNumber"><div class="item current"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="数字输入框"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value="请输入"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">单位</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value=""></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"><input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".div-input").text(val);
                    arr[tamp]['tips']=val;
                });
                $("#controlSettingBox").find("input").eq(2).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    //单位dom.find(".div-input").text(val);
                    arr[tamp]['unit']=val;
                });
                $("#controlSettingBox").find("input").eq(3).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["tips"]!=undefined){
                    $("#controlSettingBox").find("input").eq(1).val(data["tips"]);
                }
                if(data["unit"]!=undefined){
                    $("#controlSettingBox").find("input").eq(2).val(data["unit"]);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(3).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputDate:{//日期
            html:'<div data-classify="inputDate"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="日期"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">日期类型</span><i class="tips"></i></div><div class="from-text"><label class="form-setting-label"><input type="radio" checked="" name="date" value="0"> 年-月-日 时:分</label><label class="form-setting-label"><input type="radio" name="date" value="1"> 年-月-日</label></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input[type='radio']").on("change",function(){
                    var val=$("#controlSettingBox").find("input[type='radio']").filter(":checked").val();
                    arr[tamp]['dateType']=val;
                });
                $("#controlSettingBox").find("input").eq(3).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["dateType"]!=undefined){
                    $("#controlSettingBox").find("input[type='radio']").filter("[value="+data["dateType"]+"]").prop("checked",true);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(3).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputDateRange:{//日期区间
            html:'<div data-classify="inputDateRange"><div class="form-control"><div class="from-text"><span class="thumb-size">标题1</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="开始时间"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">标题2</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="结束时间"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">日期类型</span><i class="tips"></i></div><div class="from-text"><label class="form-setting-label"><input type="radio" checked="" name="date" value="0"> 年-月-日 时:分</label><label class="form-setting-label"><input type="radio" name="date" value="1"> 年-月-日</label></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value="请选择"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                var inputs=$("#controlSettingBox").find("input");
                inputs.eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").eq(1).text(val);
                    arr[tamp]['title1']=val;
                });
                inputs.eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").eq(2).text(val);
                    arr[tamp]['title2']=val;
                });
                $("#controlSettingBox").find("input[type='radio']").on("change",function(){
                    var val=$("#controlSettingBox").find("input[type='radio']").filter(":checked").val();
                    arr[tamp]['dateType']=val;
                });
                inputs.eq(4).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".itext").text(val);
                    arr[tamp]['tips']=val;
                });
                inputs.eq(5).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                var inputs=$("#controlSettingBox").find("input");
                if(data==undefined){
                    return;
                }
                if(data["title1"]!=undefined){
                    inputs.eq(0).val(data["title1"]);
                }
                if(data["title2"]!=undefined){
                    inputs.eq(1).val(data["title2"]);
                }
                if(data["tips"]!=undefined){
                    inputs.eq(4).val(data["tips"]);
                }
                if(data["dateType"]!=undefined){
                    $("#controlSettingBox").find("input[type='radio']").filter("[value="+data["dateType"]+"]").prop("checked",true);
                }
                if(data["validate"]!=undefined){
                    inputs.eq(5).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputRadio:{//单选框
            html:'<div data-classify="inputRadio"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="单选框"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="请选择"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">选项</span><i class="tips">最多200项，每项最多20个字</i></div><div class="form-control-add"><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项1"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项2"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项3"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"><input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                var $add=$("#controlSettingBox").find(".form-control-add");
                var arrResult=new Array();
                $add.find("input").each(function(){
                    arrResult.push($(this).val());
                });
                RadioAddArray=arrResult;
                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".itext").text(val);
                    arr[tamp]['tips']=val;
                });
                $add.find("input").on("blur",function(){
                    var tampArr=new Array();
                    $add.find("input").each(function(){
                        tampArr.push($(this).val());
                    });
                    RadioAddArray=tampArr;
                    arr[tamp]['items']=RadioAddArray;
                });
                arr[tamp]['items']=RadioAddArray;
                $("#controlSettingBox").find("input").last().on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                var inputs=$("#controlSettingBox").find("input");
                var html='';
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    inputs.eq(0).val(data["title"]);
                }
                if(data["tips"]!=undefined){
                    inputs.eq(1).val(data["tips"]);
                }
                if(data["validate"]!=undefined){
                    inputs.last().prop("checked",data["validate"]);
                }
                if(RadioAddArray!=undefined){
                    $.each(data["items"],function(i,item){
                        html+='<div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="'+item+'"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div>';
                    });
                    $("#controlSettingBox").find(".form-control-add").html(html);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputCheckbox:{//多选框
            html:'<div data-classify="inputCheckbox"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="多选框"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">选项</span><i class="tips">最多200项，每项最多20字</i></div><div class="form-control-add"><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项1"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项2"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div><div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="选项3"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"><input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }
                var $add=$("#controlSettingBox").find(".form-control-add");
                var arrResult=new Array();
                $add.find("input").each(function(){
                    arrResult.push($(this).val());
                });
                RadioAddArray=arrResult;
                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $add.find("input").on("blur",function(){
                    var tampArr=new Array();
                    $add.find("input").each(function(){
                        tampArr.push($(this).val());
                    });
                    RadioAddArray=tampArr;
                    arr[tamp]['items']=RadioAddArray;
                });
                arr[tamp]['items']=RadioAddArray;
                $("#controlSettingBox").find("input").last().on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                var inputs=$("#controlSettingBox").find("input");
                var html='';
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    inputs.eq(0).val(data["title"]);
                }
                if(data["validate"]!=undefined){
                    inputs.last().prop("checked",data["validate"]);
                }
                if(RadioAddArray!=undefined){
                    $.each(data["items"],function(i,item){
                        html+='<div class="form-add-item"><div class="iblock add-input"><input data-max-len="10" type="text" class="form-input" value="'+item+'"></div><div class="btn-minus btn-i-cell"></div><div class="btn-add btn-i-cell"></div></div>';
                    });
                    $("#controlSettingBox").find(".form-control-add").html(html);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputImg:{//图片选择
            html:'<div data-classify="inputCheckbox"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="图片"></div><div class="from-text"><i class="tips">图片最多可添加9张</i></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"><input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }


                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(1).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputAttachMent:{//附件
            html:'<div data-classify="inputAttachMent"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="附件"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"><input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }


                $("#controlSettingBox").find("input").eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                $("#controlSettingBox").find("input").eq(1).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    $("#controlSettingBox").find("input").eq(0).val(data["title"]);
                }
                if(data["validate"]!=undefined){
                    $("#controlSettingBox").find("input").eq(1).prop("checked",data["validate"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        },
        inputMoney:{//金额
            html:'<div data-classify="inputText"><div class="form-control"><div class="from-text"><span class="thumb-size">标题</span><i class="tips">最多10个字</i></div><div class="input-div"><input data-max-len="10" type="text" class="form-input" value="金额（元）"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">提示文字</span><i class="tips">最多20个字</i></div><div class="input-div"><input data-max-len="20" type="text" class="form-input" value="请输入"></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">验证</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">必填</span></label></div></div><div class="form-control"><div class="from-text"><span class="thumb-size">大写</span></div><div class="input-div"><label class="form-label"> <input type="checkbox" class="form-ckbox"><span class="statement">显示大写</span><span class="upper-case">输入数字后自动显示大写</span></label></div></div></div>',
            injectEvent:function(dom,arr,index,jump){//注射事件方法
                var obj=new Object();
                var classify=dom.attr("data-classify");
                var inputs=$("#controlSettingBox").find("input");
                obj["type"]=classify;
                var tamp=index;
                if(jump==false||jump==undefined){
                   if(index>=arr.length){
                        tamp=arr.push(obj)-1;
                    }else{
                        arr.splice(index,0,obj);
                    }
                }

                inputs.eq(0).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".ui-label").text(val);
                    arr[tamp]['title']=val;
                });
                inputs.eq(1).on("blur",function(){
                    var currentDom=$(this),val=currentDom.val();
                    dom.find(".div-input").text(val);
                    arr[tamp]['tips']=val;
                });
                inputs.eq(2).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['validate']=result;
                });
                inputs.eq(3).on("change",function(){
                    var result=$(this).prop("checked")
                    arr[tamp]['capital']=result;
                });
            },
            analysisData:function(dom,arr,index){//解析dom上数据的方法
                var data=arr[index];
                var inputs=$("#controlSettingBox").find("input");
                if(data==undefined){
                    return;
                }
                if(data["title"]!=undefined){
                    inputs.eq(0).val(data["title"]);
                }
                if(data["tips"]!=undefined){
                    inputs.eq(1).val(data["tips"]);
                }
                if(data["validate"]!=undefined){
                    inputs.eq(2).prop("checked",data["validate"]);
                }
                if(data["capital"]!=undefined){
                    inputs.eq(3).prop("checked",data["capital"]);
                }
                this.injectEvent(dom,arr,index,true);
            }
        }
    }
    var fun={
        clickIboxCopera:function(){
            //点击获取高亮
            var ibox=$("#ibox"),
            tampVal=null,
            liArrs=ibox.children("li");
            ibox.delegate(".droppingDOM","click",function(e){
                e.stopPropagation();
                e.preventDefault();
                var currentDOM=$(this);
                var index=currentDOM.index();
                currentDOM.addClass("current").siblings().removeClass("current");
                var classify=$(this).attr("data-classify");
                var htmlForm=FormSetting[classify]&&FormSetting[classify]["html"];
                if(htmlForm==undefined){
                    htmlForm="";
                }
                $("#controlSettingBox").html(htmlForm);
                //解析dom上的数据
                FormSetting[classify]&&FormSetting[classify]["analysisData"]&&typeof FormSetting[classify]["analysisData"]=='function'&&FormSetting[classify]["analysisData"](currentDOM,FormDataConfig,index);
                //console.log(FormDataConfig);
            });
            //关闭按钮
            $("#ibox").delegate(".drag-close","click",function(){
                var dom=$(this).parents("li.droppingDOM").eq(0),
                index=dom.index();
                dom.remove();
                if($("#ibox").children(".droppingDOM").length==0){
                    $("#ibox").append('<li id="drag-empty" class="drag-empty">可以从控件库拖动相应的组件进来</li>');
                }
                $("#controlSettingBox").empty();
                //更改FormDataConfig
                FormDataConfig.splice(index-1,1);
            });
            //input表单字数长度的限制
            $("body").delegate("input[data-max-len]","input",function(e){
                var len=$(this).attr("data-max-len");
                var value=$(this).val();
                if(value.length>len){
                    this.value=tampVal;
                }else{
                    tampVal=value;
                }
            });
            //点击保存
            $("#formSettingSave").on("click",function(){
                console.log(FormDataConfig);
            });
            $("#btn-grups").find(".btn").each(function(i,item){
                $(item).on("mouseenter",function(){
                    $(this).addClass("current").siblings().removeClass("current");
                });
            });
            //单选框添加
            $("#controlSettingBox").delegate(".btn-add","click",function(){
                var item=$(this).parents(".form-add-item").eq(0);
                var cloneDom=item.clone(true);
                item.after(cloneDom);
                cloneDom.find("input").focus();
            });
            //单选框移除
            $("#controlSettingBox").delegate(".btn-minus","click",function(){
                var item=$(this).parents(".form-add-item").eq(0);
                var parentDom=$(this).parents(".form-control-add").eq(0);
                var itemLength=parentDom.find(".form-add-item").length;
                if(itemLength<=1){
                    alert("至少要保留一项");
                    return;
                }
                item.remove();
                parentDom.find(".form-add-item").find("input").eq(0).focus();
            });
        },
        //控件拖拽方法
        dragDOM:function(){
            var dragArea=$("#drag-area"),
                dropArea=$("#ibox"),
                tampArrs=null,//ibox中元素的距离文档的top值
                tampLeft=null,//ibox距离文档左边的left值
                tampRight=null,//ibox右边距离文档左边的left值
                tampTop=null,//ibox距离文档左边的top值
                domWidth=null,//拽起来的元素的宽度
                DragReplaceDom=null,//将要插入的元素的html结构
                FirstDOMHeight=null,//第一个元素的高度ibox中
                CreateClassifyKey=null,//生成的data-classify
                MouseClickIndex=null;//点击ibox中li所在位置
            //拖拽已经生成的元素
            var ClickDOM=null;
            //拖拽控件
            var opt={
                containment:".container",
                scroll:false,
                helper:function(event,dom){
                    var text=event.target.innerText;
                    return $( "<li class='drag-item drag-item-draging ui-draggable ui-draggable-handle'>"+text+"</li>" );
                },
                start: function(event,dom) {
                    //存储位置信息
                    var kk=null,
                        domEle=$(dom.helper),
                        donOrigialEle=$(this);
                        CreateClassifyKey=donOrigialEle.attr("data-classify");
                        CreateClassifyKey=CreateClassifyKey;
                    tampArrs=[];
                    tampLeft=$("#ibox").offset().left;
                    tampRight=tampLeft+$("#ibox").outerWidth();
                    tampTop=$("#ibox").offset().top;
                    domWidth=domEle.outerWidth();
                    DragReplaceDom=Control[CreateClassifyKey]&&Control[CreateClassifyKey]["html"];
                    $("#ibox").children(".droppingDOM").each(function(idx,item){
                        kk=parseInt($(item).offset().top);
                        tampArrs.push(kk);
                        if(idx==0){
                            FirstDOMHeight=$(item).outerHeight();
                        }
                    });
                },
                drag: function(event,dom) {
                    var ele=$(dom.helper);
                    var top=parseInt(ele.offset().top);
                    var left=parseInt(ele.offset().left);
                    var myIndex=null;
                    if(tampLeft<=left+domWidth&&left<=tampRight){
                        //找到元素的位置
                        $("#ibox").find("#drag-empty").remove();
                        $.each(tampArrs,function(idx,item){
                            var next=idx+1;
                            var otamp=tampArrs[next];
                            if(otamp!=undefined){
                                if(idx==0&&top<parseInt((item+otamp)/2)){
                                    myIndex=-1;
                                    return false;
                                }
                                if(item<top&&otamp>=top){
                                    myIndex=idx;
                                    return false;
                                }
                            }else{
                                if(tampArrs.length==1&&FirstDOMHeight+item-top>=parseInt(FirstDOMHeight/2)){
                                    myIndex=-1;
                                    return false;
                                }
                                myIndex=idx;
                            }
                        });
                        $("#drop-line").remove();
                        if(myIndex==-1){
                            $("#ibox").prepend("<li id='drop-line' class='dropDomPo-line'></li>");
                        }else{
                           $("#ibox").children(".droppingDOM").eq(myIndex).after("<li id='drop-line' class='dropDomPo-line'></li>");
                        }
                        if(tampArrs.length==0){
                            $("#drop-line").remove();
                            $("#ibox").prepend("<li id='drop-line' class='dropDomPo-line'></li>");
                        }
                    }else{
                        $("#drop-line").remove();
                        $("#ibox").find("#drag-empty").remove();
                        if(tampArrs.length==0){
                            $("#ibox").prepend('<li id="drag-empty" class="drag-empty">可以从控件库拖动相应的组件进来</li>');
                        }
                    }
                    /*if(tampArrs.length==0){
                        $("#drop-line").remove();
                        $("#ibox").prepend("<li id='drop-line' class='dropDomPo-line'></li>");
                    }*/
                },
                stop: function() {
                    $("#drop-line").siblings().removeClass("current");
                    var NewReplaceDom=$('<li data-classify="'+CreateClassifyKey+'" class="droppingDOM item current">'+DragReplaceDom+'<div class="drag-close"><div class="close-btn"></div></div></li>');
                    var index=$("#drop-line").index();
                    if(index==-1){
                        return;
                    }
                    $("#drop-line").replaceWith(NewReplaceDom);
                    dropArea.find(".droppingDOM").draggable(optNewCreate);
                    //更换form表单
                    var formHTML=FormSetting[CreateClassifyKey]&&FormSetting[CreateClassifyKey]["html"];
                    $("#controlSettingBox").html(formHTML);
                    //绑定事件
                    FormSetting[CreateClassifyKey]&&FormSetting[CreateClassifyKey]["injectEvent"]&&typeof FormSetting[CreateClassifyKey]["injectEvent"]=='function'&&FormSetting[CreateClassifyKey]["injectEvent"](NewReplaceDom,FormDataConfig,index);
                }
            }
            var optNewCreate={
                containment:".container",
                cursorAt: { top:5, left: 22},
                scroll:false,
                helper:function(event){
                    var domEle=$(event.currentTarget),
                    text=domEle.find(".ui-label").eq(0).text();
                    return $( "<li class='ui-draggable-active'>"+text+"</li>" );
                },
                start: function(event,dom) {
                    //存储位置信息
                    var kk=null,
                        domEle=$(dom.helper),
                        donOrigialEle=$(this);
                        ClickDOM=donOrigialEle;
                        CreateClassifyKey=donOrigialEle.attr("data-classify");
                        MouseClickIndex=$(event.target).index();
                    tampArrs=[];
                    tampLeft=$("#ibox").offset().left;
                    tampTop=$("#ibox").offset().top;
                    domWidth=domEle.outerWidth();
                    DragReplaceDom=Control[CreateClassifyKey]&&Control[CreateClassifyKey]["html"];
                    $("#ibox").children(".droppingDOM").each(function(idx,item){
                        kk=parseInt($(item).offset().top);
                        tampArrs.push(kk);
                        if(idx==0){
                            FirstDOMHeight=$(item).outerHeight();
                        }
                    });
                },
                drag: function(event,dom) {
                    var ele=$(dom.helper);
                    var top=parseInt(ele.offset().top);
                    var left=parseInt(ele.offset().left);
                    var myIndex=null;
                    if(tampLeft<=left+domWidth){
                        //找到元素的位置
                        $.each(tampArrs,function(idx,item){
                            var next=idx+1;
                            var otamp=tampArrs[next];
                            if(otamp!=undefined){
                                if(idx==0&&top<parseInt((item+otamp)/2)){
                                    myIndex=-1;
                                    return false;
                                }
                                if(item<top&&otamp>=top){
                                    myIndex=idx;
                                    return false;
                                }
                            }else{
                                if(tampArrs.length==1&&FirstDOMHeight+item-top>=parseInt(FirstDOMHeight/2)){
                                    myIndex=-1;
                                    return false;
                                }
                                myIndex=idx;
                            }
                        });
                        $("#drop-line").remove();
                        if(myIndex==-1){
                            $("#ibox").prepend("<li id='drop-line' class='dropDomPo-line'></li>");
                        }else{
                           $("#ibox").children(".droppingDOM").eq(myIndex).after("<li id='drop-line' class='dropDomPo-line'></li>");
                       }

                    }else{
                        $("#drop-line").remove();
                    }
                    if(tampArrs.length==0){
                        $("#ibox").find("#drag-empty").remove();
                        $("#drop-line").remove();
                        $("#ibox").prepend("<li id='drop-line' class='dropDomPo-line'></li>");
                    }
                },
                stop: function(event,dom) {
                    $("#drop-line").siblings().removeClass("current");
                    /*var NewReplaceDom='<li data-classify="'+CreateClassifyKey+'" class="droppingDOM item current ui-draggable ui-draggable-handle">'+DragReplaceDom+'<div class="drag-close"><div class="close-btn"></div></div></li>';*/
                    var NewReplaceDom=ClickDOM;
                    var index=$("#drop-line").index();
                    var formHTML=null;
                    var ICurrentIndex=null,iIndex=null;
                    if(index>MouseClickIndex){
                        index=index-1;
                    }
                    NewReplaceDom.addClass("current");
                    $("#drop-line").replaceWith(NewReplaceDom);
                    //ClickDOM.remove();
                    dropArea.find(".droppingDOM").draggable(optNewCreate);
                    //更换form表单
                    formHTML=FormSetting[CreateClassifyKey]&&FormSetting[CreateClassifyKey]["html"];
                    $("#controlSettingBox").html(formHTML);
                    ICurrentIndex=MouseClickIndex;
                    iIndex=index;
                    //在拖起来的地方删除
                    var tamp=FormDataConfig.splice(ICurrentIndex,1);
                    //在放下的地方放置
                    FormDataConfig.splice(iIndex,0,tamp[0]);
                    //绑定事件
                    FormSetting[CreateClassifyKey]&&FormSetting[CreateClassifyKey]["analysisData"]&&typeof FormSetting[CreateClassifyKey]["analysisData"]=='function'&&FormSetting[CreateClassifyKey]["analysisData"](NewReplaceDom,FormDataConfig,index,true);
                    FormSetting[CreateClassifyKey]&&FormSetting[CreateClassifyKey]["injectEvent"]&&typeof FormSetting[CreateClassifyKey]["injectEvent"]=='function'&&FormSetting[CreateClassifyKey]["injectEvent"](NewReplaceDom,FormDataConfig,index,true);

                }
            }
            //放置
            var dropOption={
                activeClass: "dropping-hover",
                hoverClass: "ui-state-active",
                drop: function( event, ui ) {
                }
            }

            dragArea.children(".drag-item").draggable(opt);
            dropArea.droppable(dropOption);
            dropArea.find(".droppingDOM").draggable(optNewCreate);
        }
    }
    fun.clickIboxCopera();
    fun.dragDOM();
})(jQuery);