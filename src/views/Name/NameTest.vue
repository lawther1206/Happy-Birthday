<template>
  <div class="demo">
    <div id="center" v-if="!isShow">
      <div class="login-wrapper">
        <div class="login-wrapper-center">
          <div class="header">缘分测试</div>
          <div class="form-wrapper">
            <input
              type="text"
              name="username"
              placeholder="对方名字"
              class="input-item"
              v-model="name"
            />
            <div class="btn" @click="submitForm">开始</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="demo-top">
        <div v-if="numSun" class="dashboard">
          <el-progress
            type="dashboard"
            :percentage="numSun"
            style="transform: translateY(50%)"
            :width="250"
            :stroke-width="10"
            :color="colors"
          >
            <template #default="{ percentage }">
              <span class="percentage-label" style="color: #fff">结果</span>
              <span class="percentage-value" style="color: #fff"
                >{{ percentage }}%</span
              >
            </template>
          </el-progress>
        </div>
        <div style="transform: translateY(50%)" class="dashboard-label" v-else>
          请稍等,测试中....
        </div>
      </div>
      <div class="demo-progress">
        <div>
          <el-progress
            :percentage="state.lucky"
            :stroke-width="10"
            striped
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 好感度</span>
          </el-progress>
          <el-progress
            :percentage="state.patience"
            :stroke-width="10"
            striped
            :color="colors"
            class="mb20"
          >
            默契度
          </el-progress>
          <el-progress
            :percentage="state.happy"
            :stroke-width="10"
            striped
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 可靠度</span>
          </el-progress>
          <el-progress
            :percentage="state.depressed"
            :stroke-width="10"
            striped
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 信任度</span>
          </el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
const state = reactive({
  lucky: 0,
  patience: 0,
  happy: 0,
  depressed: 0,
} as any);
const numSun = ref(0);
const name = ref("");

const nameList = ["李勇"];

const isShow = ref(false);

const colors = [
  { color: "#F56C6C", percentage: 40 },
  { color: "Lavender", percentage: 60 },
  { color: "LightYellow ", percentage: 80 },
  { color: "LightGreen ", percentage: 100 },
];

// 随机生成0-100的数
const randomNum = () => {
  return Math.floor(Math.random() * 101);
};

const submitForm = () => {
  if (name.value != "") {
    isShow.value = true;
    init();
  } else {
    ElMessage.warning("还没输入名字!");
  }
};

const init = () => {
  let flag = nameList.includes(name.value);
  let lucky = flag ? 100 : randomNum();
  increase("lucky", lucky);
  let patience = flag ? 100 : randomNum();
  increase("patience", patience);
  let happy = flag ? 100 : randomNum();
  increase("happy", happy);
  let depressed = flag ? 100 : randomNum();
  increase("depressed", depressed);

  setTimeout(() => {
    let num = 0;
    for (let i in state) {
      num += state[i];
    }
    numSun.value = Math.floor(num / 4);
  }, 5000);
};

onMounted(() => {});

const increase = (key: string, max: number) => {
  let time = setInterval(() => {
    state[key] += Math.floor(max / 3);
    if (state[key] > max) {
      state[key] = max;
      clearInterval(time);
    }
  }, 1000);
};
</script>

<style scoped lang="scss">
.demo {
  background-color: lightpink;
  width: 100vw;
  height: 100vh;
  position: relative;
  .demo-progress {
    width: 70vw;
    position: absolute;
    bottom: 10%;
    left: 15vw;
    color: #fff;
    .text-color {
      color: #fff;
    }
  }
  .demo-top {
    height: 30vh;
    text-align: center;

    .dashboard-label {
      font-size: 30px;
      color: #fff;
      line-height: 30vh;
      animation: bounce 4s;
    }
  }
}
.mb20 {
  margin-bottom: 20px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(50%);
  }
  40% {
    transform: translateY(45%);
  }
  60% {
    transform: translateY(40%);
  }
}

#center {
  .login-wrapper {
    background-color: #fff;
    width: 270px;
    height: 366px;
    border-radius: 15px;
    padding: 0 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    @media (max-width: 720px) {
      width: 70vw;
      height: 280px;
    }
  }
  .login-wrapper-center {
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
  }
  .header {
    text-align: center;
    // font-family: fantasy;
    color: lightpink;
    font-size: 32px;
    margin-bottom: 20px;
  }
  .input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid lightpink;
    font-size: 15px;
    outline: none;
  }
  .input-item::placeholder {
    text-transform: uppercase;
  }
  .btn {
    text-align: center;
    padding: 10px;
    margin-top: 40px;
    background-color: lightpink;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .msg {
    text-align: center;
    line-height: 88px;
  }
  a {
    text-decoration-line: none;
    color: lightpink;
  }
}
</style>
