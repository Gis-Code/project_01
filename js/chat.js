$(function(){
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui();

    //为发送按钮绑定鼠标点击事件
    $('#btnSend').on('click',function(){
        var text =$('#ipt').val().trim(); //获得输入框的文本
        if(text.length<=0)
        {
            return  $('#ipt').val('') //清空输入框
        }
        // 将输入框的内容追加到页面上
        $('.talk_list').append('<li class="right_word"><img src="img/user.png" /> <span>'+text+'</span></li>')
        $('#ipt').val('') //清空输入框
        //把消息追加到页面之后,重置滚动条位置
        resetui();

        getMsg(text)
    })



    //从服务器获取机器人回复的消息
    function getMsg(text){
        //发起一个ajax请求
        $.ajax({
            type:'GET',
            // url:'http://www.liulongbin.top:3006/api/robot',
            // url:'https://api.ownthink.com/bot?appid=6c6d70079ce41aa2b4c52e852f978cfd&userid=BcKcCkrg&spoken=姚明多高啊？',
            url:'https://api.ownthink.com/bot?appid=6c6d70079ce41aa2b4c52e852f978cfd&userid=BcKcCkrg',
            data:{
                spoken:text
            },
            //success的值为请求成功后的回调函数
            success:function(res){
                if(res.message==='success')
                {
                    var msg = res.data.info.text;
                    $('.talk_list').append('<li class="left_word"><img src="img/daai.png" /> <span>'+msg+'</span></li>');
                    
                    //拿到机器人的消息之后,调用转语音函数
                    getVoice(msg);
                    //重置滚动条位置
                    resetui();
                }else return $('.talk_list').append('<li class="left_word"><img src="img/daai.png" /> <span>你在狗叫什么我听不懂</span></li>');
            }
        })
    }

    //把大爱的文字转为语音
    function getVoice(text){
        //发起ajax请求
        $.ajax({
            type:'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text,
            },
            success:function(res){
                if(res.status==200)
                {
                    $('#voice').attr('src',res.voiceUrl)
                }
            }
        })
    }

    //输入回车发送消息
    $('#ipt').on('keyup',function(e){
        if(e.key=='Enter')
        {
            //触发click()点击函数
            $('#btnSend').click()
        }
    })
})