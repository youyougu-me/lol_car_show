import service from "@/utils/request";

export function GetCity(data) {
    return service.request({
      method: "post",
      url: "/cityPicker/",
      data: data
    })
  }