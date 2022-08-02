import { ElNotification } from "element-plus"

export function notifyError(title,message){
    ElNotification({
        title,
        message,
        type:"error"
    });
}

export function notifySuccess(title,message) {
    ElNotification({
        title,
        message,
        type:"success"
    });
}