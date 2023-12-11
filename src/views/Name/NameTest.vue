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
          <div
            ref="evaluationScore"
            style="
              width: 100%;
              height: 220px;
              display: flex;
              justify-content: center;
            "
          ></div>
        </div>

        <div style="transform: translateY(50%)" class="dashboard-label" v-else>
          请稍等,测试中....
        </div>
      </div>

      <div v-show="numSun" class="text-show">{{ textShowTime }}</div>

      <div class="demo-progress">
        <div>
          <el-progress
            :percentage="state.lucky"
            :stroke-width="10"
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 好感度</span>
          </el-progress>
          <el-progress
            :percentage="state.patience"
            :stroke-width="10"
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 默契度</span>
          </el-progress>
          <el-progress
            :percentage="state.happy"
            :stroke-width="10"
            :color="colors"
            class="mb20"
          >
            <span class="text-color"> 可靠度</span>
          </el-progress>
          <el-progress
            :percentage="state.depressed"
            :stroke-width="10"
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
import * as echarts from "echarts";
import { ref, onMounted, reactive, nextTick } from "vue";
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
const textShow = ref("");
const textShowTime = ref("");

const isShow = ref(false);

const colors = [
  { color: "#2f4555", percentage: 100 },
  { color: "#74838e", percentage: 80 },
  { color: "#ddd2ab", percentage: 60 },
  { color: "#d9cb9f", percentage: 40 },
  { color: "#d4c593 ", percentage: 20 },
];

const testList = [
  {
    value: 20,
    text: "彼此之间还在探索对方，互相了解的过程中。这个阶段可能存在一些差异，但也正是这些差异让彼此更加丰富有趣。",
  },
  {
    value: 40,
    text: "默契度到达这个程度双方已经可以展现了一些积极的进展了，尝试主动约会或者深入交流，但仍需要一些保留和谨慎。",
  },
  {
    value: 60,
    text: "你们的默契度表明对对方的了解已经比较深入。你们彼此之间的关系应该非常密切，可能已经开始考虑未来的可能性。",
  },
  {
    value: 80,
    text: "你们属于非常默契的关系，你们应该更加频繁的见面、深入的交流，建议对彼此感情的明确表达。这个阶段通常伴随着更深层次的投入和承诺。",
  },
  {
    value: 100,
    text: "你们属于天作之和，建议结婚",
  },
];

// 随机生成0-100的数
const randomNum = () => {
  return Math.floor(Math.random() * 101);
};

const submitForm = () => {
  if (name.value != "") {
    isShow.value = true;
    init();
  }
};

const init = () => {
  let flag = nameList.includes(name.value);
  let avg = 1;
  let lucky = flag ? 100 : randomNum();
  increase("lucky", lucky, 3);
  let patience = flag ? 100 : randomNum();
  increase("patience", patience, 3);
  let happy = flag ? 100 : randomNum();
  increase("happy", happy, 3);
  let depressed = flag ? 100 : randomNum();
  increase("depressed", depressed, 3);

  setTimeout(() => {
    let num = 0;
    for (let i in state) {
      num += state[i];
    }
    numSun.value = Math.floor(num / 4);
    nextTick(() => {
      testList.forEach((el) => {
        if (numSun.value >= el.value) {
          textShow.value = el.text;
        }
      });
      initScore(numSun.value);
      animateText();
    });
  }, 5000);
};

onMounted(() => {});

/** 计算平均值 */
const increase = (key: string, max: number, avg: number) => {
  let time = setInterval(() => {
    state[key] += Math.floor(max / avg);
    if (state[key] > max) {
      state[key] = max;
      clearInterval(time);
    }
  }, 1000);
};

/** 文字逐字显示 */
const animateText = () => {
  let index = 0;
  let time = setInterval(() => {
    if (index >= textShow.value.length - 1) clearInterval(time);
    textShowTime.value += textShow.value[index];
    index++;
  }, 200);
};

/** 仪表盘相关 */
const evaluationScore = ref();
const initScore = (value: number) => {
  var myChart = echarts.init(evaluationScore.value);
  var option;

  option = {
    series: [
      {
        type: "gauge",
        radius: "120%", // 位置
        center: ["50%", "70%"],
        min: 0,
        max: 100,
        startAngle: 360,
        endAngle: 0,
        axisLine: {
          show: true,
          lineStyle: {
            // 轴线样式
            width: 120, // 宽度
            opacity: 0.2,
            color: [[1, "#fff"]], // 颜色
          },
        },
        axisTick: {
          // 刻度
          show: false,
        },
        pointer: {
          // 仪表盘指针
          show: false,
        },
        splitLine: {
          // 分割线
          show: false,
        },
        axisLabel: {
          // 刻度标签
          show: false,
        },
        detail: {
          // 仪表盘详情
          show: false,
        },
      },
      {
        type: "gauge",
        radius: "100%", // 位置
        center: ["50%", "70%"],
        min: 0,
        max: 100,
        startAngle: 360,
        endAngle: 0,
        axisLine: {
          show: true,
          lineStyle: {
            // 轴线样式
            width: 120, // 宽度
            opacity: 0.6,
            color: [[1, "#fff"]], // 颜色
          },
        },
        axisTick: {
          // 刻度
          show: false,
        },
        splitLine: {
          // 分割线
          show: false,
        },
        axisLabel: {
          // 刻度标签
          show: false,
        },
        pointer: {
          // 仪表盘指针
          show: false,
        },
        detail: {
          // 仪表盘详情
          show: false,
        },
      },
      {
        type: "gauge",
        center: ["50%", "70%"],
        radius: "80%",
        min: 0,
        max: 100,
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [
                0.5,
                new echarts.graphic.RadialGradient(0.5, 1, 1, [
                  {
                    offset: 0.5,
                    color: "#d4c593",
                  },
                  {
                    offset: 1,
                    color: "#2f4555 ",
                  },
                ]),
              ],
              [1, "#2f4555"],
            ],
          },
        },
        axisLabel: {
          color: "#2f4555",
        },
        pointer: {
          icon: "circle",
          width: 18,
          offsetCenter: [0, "-62%"],
          itemStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          distance: -25,
          length: 8,
          lineStyle: {
            color: "transparent",
            width: 2,
          },
        },
        splitLine: {
          distance: -25,
          length: 30,
          lineStyle: {
            color: "transparent",
            width: 5,
          },
        },
        detail: {
          valueAnimation: true,
          formatter: "{name|评估得分}\n{score|{value}}",
          color: "#2f4555",
          offsetCenter: [0, "5%"],
          rich: {
            name: {
              fontSize: 14,
              color: "#2f4555",
            },
            score: {
              padding: [-15, 0, 0, 0],
              fontSize: 22,
              fontWeight: "bold",
              color: "#2f4555",
            },
          },
        },
        data: [
          {
            value: value,
          },
        ],
      },
    ],
  };

  option && myChart.setOption(option);
};
</script>

<style scoped lang="scss">
.demo {
  background: url(@/assets/photo.avif);
  background-size: cover;
  // background-color: #2f4555;
  width: 100vw;
  height: 100vh;
  position: relative;
  .demo-progress {
    padding: 20px 20px 0px 20px;
    // background-color: #fff;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.5);

    width: 70vw;
    position: absolute;
    bottom: 10%;
    left: 12vw;
    // color: #fff;
    .text-color {
      // color: #fff;
    }
  }

  .text-show {
    margin: 0 auto;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.5);
    width: 70vw;
    padding: 8px 5px;
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
    color: #2f4555;
    font-size: 32px;
    margin-bottom: 20px;
  }
  .input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid #2f4555;
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
    background-color: #2f4555;
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
    color: #2f4555;
  }
}
</style>
