$(function() {
        //调用getUserInfo函数获取用户基本信息
        getUserInfo()

        let layer = layui.layer
            // 退出按钮
        $('#btnLogout').on('click', function() {
            //提示用户是否退出
            layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
                //do something
                localStorage.removeItem('token')
                location.href = '/login.html'
                layer.close(index);
            })
        })
    })
    //获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: "/my/userinfo",
        // headers: { Authorization: localStorage.getItem('token') || '' },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvater渲染用户的头像
            renderAvater(res.data)
        },

        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    });
}
//渲染用户的头像
function renderAvater(user) {
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}