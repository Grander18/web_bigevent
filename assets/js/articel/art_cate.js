$(function() {
    let layer = layui.layer
    let form = layui.form
        //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }
    initArtCateList()

    //为添加类别按钮添加点击事件
    let indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    //通过事件委托的方式绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                    // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })


    //通过事件委托的方式绑定点击事件实现弹出层渲染
    let indexEdit = null
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        let id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        });
    })

    //通过事件委托的方式绑定submit事件实现编辑功能
    $('tbody').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类失败！')
                }
                layer.msg('更新分类成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        });
    })

    //通过事件委托的方式绑定点击事件实现删除功能
    let indexDel = null
    $('tbody').on('click', '.btn-delete', function() {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    initArtCateList()
                }
            });

            layer.close(index);
        })
    })
})