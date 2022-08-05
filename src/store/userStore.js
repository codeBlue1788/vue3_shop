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
            },
            userPrefer:{
                pagerCount:5,
                pageSize:10
            }
        }
    },
    getters: {
        userInfo: (state) => state.user
    },
    actions:{
        updateUserInfo(userBO){
            Object.assign(this.user,userBO);
        },
        updateUserPrefer(userPrefer){
            Object.assign(this.userPrefer,userPrefer);
        }
    },
    persist:{
        enabled:true
    }
});