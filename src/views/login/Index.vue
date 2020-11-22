<template>
  <div id="login_container">
    <div class="register_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <!-- <img src="@/assets/images/loginav.png" alt /> -->
        <h1 class="h1">信息管理系统登录</h1>
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username" class="item-from">
          <el-input v-model="loginForm.username" size="medium" placeholder="请输入用户名">
            <i slot="suffix">
              <svg-icon iconClass="user" />
            </i>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" class="item-from">
          <el-input v-model="loginForm.password" type="password" size="medium" placeholder="请输入密码">
            <i slot="suffix">
              <svg-icon iconClass="password" />
            </i>
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code" class="item-from">
          <el-row align="middle">
            <el-col :span="15" style="width:190px;margin-right:10px;">
              <el-input v-model="loginForm.code" size="medium" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="9" style="width:128px;">
              <el-button
                style="width:100%;"
                type="default"
                :disabled="smsButton.stopStatus"
                size="medium"
                class="pull-right"
                @click="getLoginSms"
                :loading="smsButton.loadingStatus"
              >{{smsButton.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns item-from">
          <el-button type="danger" size="medium" @click="login">登录</el-button>
          <span
            @click="register"
            style="margin-left:13px;cursor:pointer;color:#3d3d3d;text-decoration:underline;"
          >没有账号?去注册</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GetLoginSms } from "@/api/login";
export default {
  data() {
    return {
      loginForm: {
        username: "985029149@qq.com",
        password: "a123456",
        code: ""
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 0, max: 16, message: "长度在 0 到 16 个字符", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      //获取验证码按钮状态
      smsButton: {
        stopStatus: false,
        text: "获取验证码",
        loadingStatus: false,
        LoginTimer: ""
      }
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return;
        this.goLogin();
      });
    },

    //方法封装*************************
    goLogin() {
      let requestData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        code: this.loginForm.code
      };
      this.$store
        .dispatch("login/login", requestData)
        .then(response => {
          this.$router.push({
            name: "Console"
          });
        })
        .catch(error => {});
    },
    register() {
      this.$router.push({
        name: "Register"
      });
    },
    //点击获取验证码
    getLoginSms() {
      if (this.loginForm.username == "") {
        this.$message({
          type: "error",
          message: "请输入用户名后再获取验证码"
        });
        return false;
      }
      this.smsButton.stopStatus = true;
      this.smsButton.loadingStatus = true;
      const requestData = {
        username: this.loginForm.username,
        module: "login"
      };
      GetLoginSms(requestData)
        .then(res => {
          this.$message({
            type: "success",
            message: res.data.message
          });
          const str = res.data.message;
          const i = str.indexOf("：");
          const sms = str.substring(i + 1);
          this.loginForm.code = sms;
          //处理按钮状态
          this.smsButton.loadingStatus = false;
          this.smsButton.text = `10秒`;
          let time = 9;
          this.smsButton.LoginTimer = setInterval(() => {
            this.smsButton.text = `${time}秒`;
            time--;
            if (time < 0) {
              this.smsButton.text = "获取验证码";
              this.smsButton.stopStatus = false;
              clearInterval(this.smsButton.LoginTimer);
            }
          }, 1000);
        })
        .catch(err => {
          this.smsButton.stopStatus = false;
          this.smsButton.loadingStatus = false;
        });
    }
  }
};
</script>

<style lang="scss">
#login_container {
  // background-color: $mainCcolor2;
  background: url("../../assets/images/bgc.jpg") no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  .register_box {
    width: 450px;
    height: 320px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #446f9c;
    //头像盒子
    .avatar_box {
      height: 40px;
      width: 100%;
      position: absolute;
      left: 50%;
      top: -10px;
      transform: translate(-50%, -50%);
      text-align: center;
      h1 {
        width: 100%;
        color: #446f9c;
        font-size: 20px;
        font-weight: bolder;
      }
    }
    //表单区域
    .login_form {
      position: absolute;
      bottom: 20px;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .item-from {
        margin: 0 auto;
        margin-bottom: 25px;
        width: 328px;
      }
      .btns {
        display: flex;
        justify-content: flex-end;
      }
      //图标
      .el-input {
        span.el-input__suffix {
          span.el-input__suffix-inner {
            line-height: 45px;
            margin-right: 5px;
            .svg-icon {
              font-size: 18px !important;
              color: #c0cfe2 !important;
            }
          }
        }
      }
    }
  }
}
</style>
