<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :span="16" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">歡迎光臨</div>
        <div class="text-gray-200 text-sm">商城後台登入</div>
      </div>
    </el-col>
    <el-col
      :span="8"
      class="bg-light-50 flex items-center justify-center flex-col"
    >
      <h2 class="font-bold text-3xl text-gray-800">登入</h2>
      <div
        class="flex items-center justify-center my-5 text-gray-300 space-x-2"
      >
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <span>帳戶密碼</span>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form :model="loginData" class="w-[250px]">
        <el-form-item>
          <el-input v-model="loginData.id" placeholder="請輸入用戶名">
            <template #prefix>
              <el-icon class="el-input__icon"><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginData.password" placeholder="請輸入密碼" type="password" :show-password="true">
            <template #prefix>
              <el-icon class="el-input__icon"><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            round
            color="#626aef"
            class="w-[250px]"
            type="primary"
            @click="loginData.onSubmit()"
            >登入</el-button
          >
        </el-form-item>
      </el-form>
      <!-- <span>{{ name }} -- {{ age }}</span> -->
      <span>{{ loginData.username }} -- {{ loginData.sex }}</span>
    </el-col>
  </el-row>
</template>

<script setup>
import login from "@/views/login";

import { reactive, toRefs,ref } from "vue";




// login function
const loginData = login("OK");

// let person = reactive({
//   name: "Ryan",
//   age: 18,
// });

// const { name, age } = toRefs(person);
</script>
