import { reactive, getCurrentInstance, toRefs } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import loginAPI from "@/api/loginAPI";
import sysParamAPI from "@/api/sysParamAPI";

export default function (param) {

    let store = userStore();

    // do not use same name with ref
    const form = reactive({
        id: "",
        password: "",
        username: "",
        sex: ""
    });

    const router = useRouter();

    form.onSubmit = async () => {
        const result = await loginAPI.getUserPost(form);
        const params = await sysParamAPI.getSysParam();
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
            if (params && params.success) {
                let userPrefer = {
                    pagerCount:0,
                    pageSize:0
                }
                params.restData.forEach(p=>{
                    userPrefer[p.code] = parseInt(p.codeValue);
                });
                store.updateUserPrefer(userPrefer);
            }


            router.push({
                name: "Index",
                params: result.restData
            });
        }
    }

    return form;
}