$(function() {
    //调用getUserInfo获取用户基本信息
    getUserInfo()

    var layer = layui.layer;

    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地的token
            localStorage.removeItem('token');
            //2.重新跳转到登录页面
            location.href = '/login.html';

            //关闭询问框
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        //无论成功还是失败，最终都会调用complete这个函数
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}


// renderAvatar渲染用户的头像
function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
        //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}