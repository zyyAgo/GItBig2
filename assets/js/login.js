$(function () {
    //点击 登录 注册相互跳转
    $('.goRes').on('click', function () {
        $('#form_login').hide();
        $('#form_res').show();
    })
    $('.goLogin').on('click', function () {
        $('#form_res').hide();
        $('#form_login').show();
    })

    // 定义表单验证
    // const layer = layui.layer;
    const form = layui.form;
    form.verify({
        //value：表单的值、item：表单的DOM对象
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
        },
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('#form_res [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    // 注册事件
    $('#form_res').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                location.href='/login.html'
            }
        });

    });

    //  登录事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        });

    });









})