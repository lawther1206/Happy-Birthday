<template>
  <div id="app-center">
    <div class="container">
      <div>
        <div class="rabbit"></div>
        <div class="clouds"></div>
        <div class="text-btn">
          <div v-show="state.showloading"><i class="el-icon-loading"></i></div>
          <el-button v-show="!state.showloading" @click="getInto"
            >进入</el-button
          >
        </div>
        <div class="text-loading">Loading...</div>
      </div>

      <div v-show="state.showloading" id="center">
        <div class="login-wrapper">
          <div class="login-wrapper-center">
            <div class="header">Birthday person</div>
            <div class="form-wrapper">
              <input
                type="text"
                name="username"
                placeholder="是谁生日"
                class="input-item"
                v-model="state.form.username"
              />
              <div class="btn" @click="submitForm">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";

const state = reactive({
  form: {
    username: "",
  },
  showloading: false,
  showreg: false,
});

const getInto = () => {
  state.showloading = true;
  let rabbit = document.querySelector(".rabbit");
  let clouds = document.querySelector(".clouds");
  rabbit.style.animationPlayState = "paused";
  clouds.style.animationPlayState = "paused";
};

const emits = defineEmits(["showLogin"]);

const submitForm = () => {
  emits("showLogin", state.form.username);
};

const regLog = (type) => {
  state.showloading = true;
  state.showreg = false;
};
</script>

<style lang="scss" scoped>
#app-center {
  background-color: #b78e81;
  width: 100vw;
  height: 100vh;
  position: relative;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    @media (min-width: 720px) {
      flex-direction: row;
    }

    .rabbit {
      width: 5em;
      height: 3em;
      background: #ffffff;
      border-radius: 70% 90% 60% 50%;
      position: relative;
      box-shadow: -0.2em 1em 0 -0.75em #b78e81;
      transform: translate(-2em, 0);
      animation: hop 1s infinite linear;
      z-index: 1;

      &:before {
        content: "";
        position: absolute;
        width: 1em;
        height: 1em;
        background: white;
        border-radius: 100%;
        top: 0.5em;
        left: -0.3em;
        box-shadow: 4em 0.4em 0 -0.35em #3f3334, 0.5em 1em 0 white,
          4em 1em 0 -0.3em white, 4em 1em 0 -0.3em white, 4em 1em 0 -0.4em white;
        animation: kick 1s infinite linear;
      }
      &:after {
        content: "";
        position: absolute;
        width: 0.75em;
        height: 2em;
        background: white;
        border-radius: 50% 100% 0 0;
        transform: rotate(-30deg);
        right: 1em;
        top: -1em;
        border-top: 1px solid #f7f5f4;
        border-left: 1px solid #f7f5f4;
        box-shadow: -0.5em 0 0 -0.1em white;
      }

      @media (min-width: 720px) {
        width: 8em;
        height: 4em;
      }
    }

    .clouds {
      background: white;
      width: 10%;
      height: 10%;
      border-radius: 100% 100% 0 0;
      position: relative;
      top: -20%;
      opacity: 0;
      transform: translate(0, 0);
      animation: cloudy 1s infinite linear forwards;
      box-shadow: 50% 20% 0 -3% white, -20% 20% 0 0 white;

      &:before,
      &:after {
        content: "";
        position: absolute;
        box-shadow: 50% 20% 0 -3% white, -20% 20% 0 white;
      }

      &:before {
        width: 12.5%;
        height: 12.5%;
        border-radius: 100% 100% 0 100%;
        background: white;
        left: -30%;
        bottom: 0;
      }

      &:after {
        width: 15%;
        height: 15%;
        border-radius: 100% 100% 100% 0;
        background: white;
        right: -30%;
        bottom: 0;
      }
    }

    .text-btn {
      position: fixed;
      left: -1em;
      right: 0;
      bottom: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      text-transform: uppercase;
      // font-family: fantasy;
      z-index: 10;

      // @media (min-width: 720px) {
      //   bottom: 20%;
      // }
    }

    .text-loading {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 2%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 32px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      // font-family: fantasy;
      // @media (min-width: 720px) {
      //   bottom: 10%;
      // }
    }
  }
}

@keyframes hop {
  20% {
    transform: rotate(-10deg) translate(1em, -2em);
    box-shadow: -0.2em 3em 0 -1em #b78e81;
  }
  40% {
    transform: rotate(10deg) translate(3em, -4em);
    box-shadow: -0.2em 3.25em 0 -1.1em #b78e81;
  }
  60%,
  75% {
    transform: rotate(0) translate(4em, 0);
    box-shadow: -0.2em 1em 0 -0.75em #b78e81;
  }
}

@keyframes kick {
  20%,
  50% {
    box-shadow: 4em 0.4em 0 -0.35em #3f3334, 0.5em 1.5em 0 white,
      4em 1.75em 0 -0.3em white, 4em 1.75em 0 -0.3em white,
      4em 1.9em 0 -0.4em white;
  }
  40% {
    box-shadow: 4em 0.4em 0 -0.35em #3f3334, 0.5em 2em 0 white,
      4em 1.75em 0 -0.3em white, 4.2em 1.75em 0 -0.2em white,
      4.4em 1.9em 0 -0.2em white;
  }
}

@keyframes cloudy {
  40% {
    opacity: 0.75;
    transform: translate(-3em, 0);
  }
  55% {
    opacity: 0;
    transform: translate(-4em, 0);
  }
  90% {
    transform: translate(0, 0);
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
    color: #b78e81;
    font-size: 32px;
    margin-bottom: 20px;
  }
  .input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid #b78e81;
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
    background-color: #b78e81;
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
    color: #b78e81;
  }
}
</style>
