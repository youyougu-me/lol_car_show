import service from "@/utils/request";


/**
 * 获取用户列表
 */
export function GetUserList(data) {

    return service.request({
        method: "post",
        url: "/user/getList/",
        data
    })
}

/**
 * 删除用户
 */
export function DeleteUser(data) {

    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    })
}

/**
 * 添加用户
 */
export function AddUser(data) {

    return service.request({
        method: "post",
        url: "/user/add/",
        data
    })
}

/**
 * 编辑用户
 */
export function EditUser(data) {

    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    })
}

/**
*是否禁用
*/
export function ControlStatus(data) {
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    })
}




/**
 * 获取角色
 */
export function GetSystem(data) {

    return service.request({
        method: "post",
        url: "/system/",
        data
    })
}

//获取所有按钮
export function GetAllBtns(data) {

    return service.request({
        method: "post",
        url: "/permButton/",
        data
    })
}

