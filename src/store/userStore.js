import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: () => {
        return {
            user: {
                id: "",
                password: "",
                username: "",
                sex: "",
                email: "",
                createDate: ""
            }
        }
    },
    getters: {
        userInfo: (state) => state.user
    },
    actions:{
        updateUserInfo(userBO){
            Object.assign(this.user,userBO);
        }
    },
    persist:{
        enabled:true
    }
});