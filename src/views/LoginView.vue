<template>
  <div class="font-inter bg-gray-50 text-dark min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm">
      <div class="mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i class="fa fa-graduation-cap text-primary text-2xl"></i>
          <h1 class="text-xl font-bold text-primary">智教云</h1>
        </div>

        <nav class="hidden md:flex items-center space-x-6">
          <a href="#" class="text-gray-600 hover:text-primary transition-colors">首页</a>
          <a href="#" class="text-gray-600 hover:text-primary transition-colors">关于我们</a>
          <a href="#" class="text-gray-600 hover:text-primary transition-colors">功能介绍</a>
          <a href="#" class="text-gray-600 hover:text-primary transition-colors">联系客服</a>
        </nav>

        <button class="md:hidden text-gray-600 hover:text-primary transition-colors">
          <i class="fa fa-bars text-xl"></i>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow py-12">
      <div class="max-w-screen-2xl mx-auto px-4 lg:px-8 xl:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- 左侧介绍 -->
          <div class="hidden lg:block">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-dark leading-tight">
              连接家长与老师<br>
              <span class="text-primary">打造高效辅导体验</span>
            </h2>
            <p class="text-gray-600 mt-6 text-lg">
              智教云是一款专为家庭教育设计的智能辅导平台，让家长与老师随时保持沟通，共同关注孩子的学习成长。
            </p>

            <div class="mt-10 space-y-6">
              <div class="flex items-start space-x-4">
                <div class="bg-primary/10 p-3 rounded-full text-primary">
                  <i class="fa fa-video-camera text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">视频实时沟通</h3>
                  <p class="text-gray-600 mt-1">家长与老师随时视频通话，及时了解孩子学习情况</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-secondary/10 p-3 rounded-full text-secondary">
                  <i class="fa fa-paper-plane text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">学习通知发布</h3>
                  <p class="text-gray-600 mt-1">家长可以向孩子的学习机发送作业、日程等重要通知</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-warning/10 p-3 rounded-full text-warning">
                  <i class="fa fa-list-alt text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">智能接单系统</h3>
                  <p class="text-gray-600 mt-1">老师可以随时查看并接收学生的辅导请求，提高工作效率</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 右侧登录表单 -->
          <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold text-dark">欢迎登录</h3>
              <p class="text-gray-500 mt-2">请选择身份并登录您的账号</p>
            </div>

            <!-- 用户类型选择 -->
            <div class="grid grid-cols-2 gap-4 mb-8">
              <button
                @click="selectUserType('parent')"
                :class="[
                  'py-3 rounded-lg border-2 font-medium btn-hover transition-all',
                  userType === 'parent'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                ]"
              >
                <i class="fa fa-user-circle-o mr-2"></i>
                家长
              </button>
              <button
                @click="selectUserType('teacher')"
                :class="[
                  'py-3 rounded-lg border-2 font-medium btn-hover transition-all',
                  userType === 'teacher'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                ]"
              >
                <i class="fa fa-briefcase mr-2"></i>
                老师
              </button>
            </div>

            <!-- 登录表单 -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-1">账号</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa fa-user-o text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    id="username"
                    v-model="loginForm.username"
                    class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg form-focus transition-all"
                    placeholder="请输入手机号/邮箱"
                  >
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fa fa-lock text-gray-400"></i>
                  </div>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="loginForm.password"
                    class="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg form-focus transition-all"
                    placeholder="请输入密码"
                  >
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      @click="togglePassword"
                      class="text-gray-400 hover:text-gray-600"
                    >
                      <i :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    v-model="loginForm.remember"
                    class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  >
                  <label for="remember" class="ml-2 text-sm text-gray-600">记住密码</label>
                </div>
                <a href="#" class="text-sm text-primary hover:underline">忘记密码？</a>
              </div>

              <button
                type="submit"
                class="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium btn-hover transition-all"
              >
                登录
              </button>

              <div class="text-center text-sm text-gray-500">
                还没有账号？ <a href="#" class="text-primary hover:underline">立即注册</a>
              </div>
            </form>

            <!-- 其他登录方式 -->
            <div class="mt-8">
              <div class="relative flex items-center justify-center">
                <div class="flex-grow border-t border-gray-200"></div>
                <span class="flex-shrink mx-4 text-gray-500">其他登录方式</span>
                <div class="flex-grow border-t border-gray-200"></div>
              </div>

              <div class="flex justify-center space-x-6 mt-4">
                <button class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <i class="fa fa-weixin text-xl"></i>
                </button>
                <button class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <i class="fa fa-qq text-xl"></i>
                </button>
                <button class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
                  <i class="fa fa-weibo text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 py-8">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <i class="fa fa-graduation-cap text-primary text-2xl"></i>
              <h3 class="text-xl font-bold text-primary">智教云</h3>
            </div>
            <p class="text-gray-600">
              连接家长与老师，打造高效辅导体验
            </p>
            <div class="flex space-x-4 mt-4">
              <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                <i class="fa fa-weixin text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                <i class="fa fa-weibo text-xl"></i>
              </a>
              <a href="#" class="text-gray-400 hover:text-primary transition-colors">
                <i class="fa fa-qq text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 mb-4">平台功能</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">视频通话</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">作业通知</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">教师接单</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">学习分析</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 mb-4">关于我们</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">公司简介</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">加入我们</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">联系方式</a></li>
              <li><a href="#" class="text-gray-600 hover:text-primary transition-colors">常见问题</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-gray-900 mb-4">联系我们</h4>
            <ul class="space-y-2">
              <li class="flex items-start space-x-2">
                <i class="fa fa-map-marker text-gray-400 mt-1"></i>
                <span class="text-gray-600">北京市海淀区中关村科技园区</span>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fa fa-phone text-gray-400 mt-1"></i>
                <span class="text-gray-600">400-123-4567</span>
              </li>
              <li class="flex items-start space-x-2">
                <i class="fa fa-envelope-o text-gray-400 mt-1"></i>
                <span class="text-gray-600">contact@zhijiaoyun.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2025 智教云教育科技有限公司 版权所有 | 京ICP备12345678号-1</p>
        </div>
      </div>
    </footer>

    <!-- 登录成功提示 -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <i class="fa fa-check text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">登录成功！</h3>
          <p class="text-gray-600 mb-6">正在跳转至首页，请稍候...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 响应式数据
const userType = ref<'parent' | 'teacher'>('parent')
const showPassword = ref(false)
const showSuccessModal = ref(false)

const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

// 方法
const selectUserType = (type: 'parent' | 'teacher') => {
  userType.value = type
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = () => {
  // 模拟登录验证
  if (loginForm.value.username && loginForm.value.password) {
    showSuccessModal.value = true

    // 2秒后根据用户类型跳转到相应页面
    setTimeout(() => {
      showSuccessModal.value = false
      if (userType.value === 'parent') {
        router.push('/parent/page1')
      } else {
        router.push('/teacher')
      }
    }, 2000)
  } else {
    alert('请输入用户名和密码')
  }
}
</script>

<style scoped>
.btn-hover {
  @apply transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5;
}

.form-focus {
  @apply focus:ring-2 focus:ring-primary/50 focus:border-primary;
}

:root {
  --primary: #165DFF;
  --secondary: #36D399;
  --warning: #FFAA33;
  --danger: #F87272;
  --dark: #1E293B;
  --light: #F8FAFC;
}

.text-primary { color: var(--primary); }
.text-secondary { color: var(--secondary); }
.text-warning { color: var(--warning); }
.text-danger { color: var(--danger); }
.text-dark { color: var(--dark); }
.text-light { color: var(--light); }

.bg-primary { background-color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.bg-warning { background-color: var(--warning); }
.bg-danger { background-color: var(--danger); }
.bg-dark { background-color: var(--dark); }
.bg-light { background-color: var(--light); }

.border-primary { border-color: var(--primary); }
.border-secondary { border-color: var(--secondary); }
.border-warning { border-color: var(--warning); }
.border-danger { border-color: var(--danger); }

.bg-primary\/5 { background-color: rgba(22, 93, 255, 0.05); }
.bg-primary\/10 { background-color: rgba(22, 93, 255, 0.1); }
.bg-secondary\/10 { background-color: rgba(54, 211, 153, 0.1); }
.bg-warning\/10 { background-color: rgba(255, 170, 51, 0.1); }

.hover\:bg-primary\/90:hover { background-color: rgba(22, 93, 255, 0.9); }

.font-inter {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
