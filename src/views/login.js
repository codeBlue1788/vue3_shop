import { reactive, getCurrentInstance, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import loginAPI from "@/api/loginAPI";

export default function (param) {

    let store = userStore();

    // do not use same name with ref
    const form = reactive({
        id: "",
        password: "",
        username: "",
        sex: ""
    });

    // form.onSubmit = ()=>{
    //     proxy.$http.get(`/api/login/test`,{params:form})
    //     .then(res => {
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    const router = useRouter();

    form.onSubmit = async () => {
        const result = await loginAPI.getUserPost(form);
        console.log(result);
        if (result && result.success) {
            form.username = result.restData.username;
            form.sex = result.restData.sex;
            console.log(result.restData);
            // 再包一層object會出現[object, Object]
            // router.push({
            //     name:"Table",
            //     params:{
            //         result: JSON.stringify(result.restData)
            //     }
            // });

            // 存入pinia
            store.updateUserInfo(result.restData);

            router.push({
                name: "Index",
                params: result.restData
            });
        }
    }

    return form;
}