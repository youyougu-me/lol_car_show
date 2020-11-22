import service from "@/utils/request";

/**
 * 获取一二级信息分类
 */
export function GetCategoryAll(data) {

    return service.request({
        method: "post",
        url: "/news/getCategoryAll/ ",
        data
    })
}


/**
 * 获取一级信息分类
 */
export function GetCategory(data) {

    return service.request({
        method: "post",
        url: "/news/getCategory/ ",
        data
    })
}

/**
 * 一级分类添加
 */
export function FirstAdd(data) {

    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}
/**
 * 一级分类编辑
 */
export function FirstEdit(data) {

    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}


/**
 * 一二级级分类删除
 */
export function DeleteCategory(data) {

    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}


/**
 * 添加一级分类子级
 */
export function AddFirstChild(data) {

    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}

////////////////////////////信息页、、、、、、、、、、、、、、
/**
 * 获取信息列表
 */
export function GetTableData(data) {

    return service.request({
        method: "post",
        url: "/news/getList/",
        data
    })
}

/**
 * 添加信息
 */
export function AddNewsInfo(data) {

    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}

/**
 * 编辑信息
 */
export function EditNewsInfo(data) {

    return service.request({
        method: "post",
        url: "/news/editInfo/",
        data
    })
}

/**
 * 删除信息
 */
export function DeleteNewsInfo(data) {

    return service.request({
        method: "post",
        url: "/news/deleteInfo/",
        data
    })
}