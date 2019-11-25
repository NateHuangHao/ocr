$(function () {

    var canvas_width = 320; //画布宽度
    var canvas_height = 320; //画布高度
    var px_size = 10; //画布中每个像素的宽度和高度
    var px_row_num = canvas_width / px_size; //每一行的像素点个数
    var px_col_num = canvas_height / px_size; //每一列的像素点个数
    var canvas_data = []; //画布中的数据

    //初始化数组
    for (var x = 0; x < px_row_num; x++) {
        canvas_data[x] = [];
        for (var y = 0; y < px_col_num; y++) {
            canvas_data[x][y] = 0;
        }
    }

    //初始化画布
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = "#2F4056"; //设置颜色
    context.fillRect(0, 0, canvas_width, canvas_width); //绘制矩形

    //绘制画布辅助线
    for (var x = px_size, y = px_size; x < canvas_width; x += px_size, y += px_size) {
        //绘制列辅助线
        context.strokeStyle = '#e2e2e2';
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas_height);
        context.stroke();
        //绘制行辅助线
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas_width, y);
        context.stroke();
    }

    // 绑定canvas事件
    $('#canvas').on('mousedown', function (e) {
        canvas.isDrawing = true;
        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop + 10);
        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop);

        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop + 10);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop + 10);
    });
    $('#canvas').on('mousemove', function (e) {
        if (!canvas.isDrawing) {
            return;
        }
        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);

        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop + 10);
        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop);

        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop - 10);
        draw(context, e.clientX - canvas.offsetLeft - 10, e.clientY - canvas.offsetTop + 10);
        draw(context, e.clientX - canvas.offsetLeft + 10, e.clientY - canvas.offsetTop + 10);
    });
    $('#canvas').on('mouseup', function (e) {
        canvas.isDrawing = false;
    });

    $('#identify').on('click', function () {
        let url = 'http://127.0.0.1:5000/identify';
        let json = {
            image: JSON.stringify(canvas_data),
        };
        sendData(url,json);
    });

    $('#refresh').on('click', function () {
        location.reload(true);
    });

    // $('#train').on('click', function () {
    //     let url = 'http://127.0.0.1:5000/train';
    //     let digit = $('#digit').val();
    //     if(!digit){
    //         alert('请输入训练数字！');
    //         return false;
    //     }
    //     let json = {
    //         image: JSON.stringify(canvas_data),
    //         digit: digit
    //     };
    //     sendData(url,json);
    // });

    //以像素格来改变颜色，实现画图效果
    function draw(context, x, y) {
        var xPixel = Math.floor(x / px_size);
        var yPixel = Math.floor(y / px_size);
        canvas_data[yPixel][xPixel] = 1;

        context.fillStyle = '#ffffff';
        context.fillRect(xPixel * px_size, yPixel * px_size, px_size, px_size);
    }

    //发送数据
    function sendData(url,json) {
        $.ajax({
            url: url, //请求的url地址
            dataType: "json", //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: json, //参数值
            type: "POST", //请求方式
            success: function (response) {
                console.log(response.data);
                //请求成功时处理
                alert('识别结果，第一匹配项是：' + response['result1'] + '，第二匹配项是：' + response['result2'])
            },
            error: function (error) {
                //请求出错处理
                console.log(error);
            }
        });
    }
});