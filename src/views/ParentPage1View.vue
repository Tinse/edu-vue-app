<template>
  <div class="font-inter bg-gray-50 text-dark min-h-screen flex flex-col">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <i class="fa fa-graduation-cap text-primary text-2xl"></i>
          <h1 class="text-xl font-bold text-primary">智教云</h1>
        </div>

        <div class="flex items-center space-x-6">
          <button class="relative text-gray-600 hover:text-primary transition-colors">
            <i class="fa fa-bell-o text-lg"></i>
            <span class="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
          <div class="flex items-center space-x-2">
            <img src="https://picsum.photos/id/1005/200/200" alt="家长头像" class="h-8 w-8 rounded-full object-cover border-2 border-primary">
            <span class="text-sm font-medium hidden sm:inline-block">李家长</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow py-6">
      <div class="max-w-screen-xl mx-auto px-4 lg:px-8 xl:px-12">
      <!-- 页面标题 -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-dark mb-2">发布学习通知</h2>
        <p class="text-gray-500">向孩子的学习机发送重要通知和提醒</p>
      </div>

      <!-- 通知表单卡片 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6 max-w-5xl mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- 学生选择 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">接收学生</label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="radio"
                  id="student1"
                  value="student1"
                  v-model="noticeForm.student"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="student1" class="flex items-center cursor-pointer">
                  <img src="https://picsum.photos/id/1012/200/200" alt="学生1" class="h-10 w-10 rounded-full object-cover">
                  <span class="ml-3 font-medium">李明 (初中一年级)</span>
                </label>
              </div>
              <div class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="radio"
                  id="student2"
                  value="student2"
                  v-model="noticeForm.student"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                >
                <label for="student2" class="flex items-center cursor-pointer">
                  <img src="https://picsum.photos/id/1027/200/200" alt="学生2" class="h-10 w-10 rounded-full object-cover">
                  <span class="ml-3 font-medium">李华 (小学四年级)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 通知类型 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">通知类型</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div class="relative">
                <input
                  type="radio"
                  id="type1"
                  value="homework"
                  v-model="noticeForm.type"
                  class="peer sr-only"
                >
                <label
                  for="type1"
                  class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50 transition-colors"
                >
                  <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 peer-checked:border-primary">
                    <div class="w-3 h-3 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span class="font-medium">作业提醒</span>
                </label>
              </div>
              <div class="relative">
                <input
                  type="radio"
                  id="type2"
                  value="schedule"
                  v-model="noticeForm.type"
                  class="peer sr-only"
                >
                <label
                  for="type2"
                  class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50 transition-colors"
                >
                  <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 peer-checked:border-primary">
                    <div class="w-3 h-3 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span class="font-medium">日程安排</span>
                </label>
              </div>
              <div class="relative">
                <input
                  type="radio"
                  id="type3"
                  value="important"
                  v-model="noticeForm.type"
                  class="peer sr-only"
                >
                <label
                  for="type3"
                  class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/5 hover:bg-gray-50 transition-colors"
                >
                  <div class="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3 peer-checked:border-primary">
                    <div class="w-3 h-3 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform"></div>
                  </div>
                  <span class="font-medium">重要提醒</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 标题 -->
          <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-700">通知标题</label>
            <input
              type="text"
              id="title"
              v-model="noticeForm.title"
              class="w-full px-4 py-3 border border-gray-200 rounded-lg form-focus transition-all"
              placeholder="请输入通知标题"
            >
          </div>

          <!-- 日期时间 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label for="date" class="block text-sm font-medium text-gray-700">日期</label>
              <input
                type="date"
                id="date"
                v-model="noticeForm.date"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg form-focus transition-all"
              >
            </div>
            <div class="space-y-2">
              <label for="time" class="block text-sm font-medium text-gray-700">时间</label>
              <input
                type="time"
                id="time"
                v-model="noticeForm.time"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg form-focus transition-all"
              >
            </div>
          </div>

          <!-- 优先级 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">优先级</label>
            <div class="flex items-center space-x-3">
              <div class="relative">
                <input
                  type="radio"
                  id="priority1"
                  value="normal"
                  v-model="noticeForm.priority"
                  class="peer sr-only"
                >
                <label
                  for="priority1"
                  class="flex items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-secondary peer-checked:bg-secondary/5 hover:bg-gray-50 transition-colors"
                >
                  <i class="fa fa-circle-o text-secondary mr-2"></i>
                  <span>普通</span>
                </label>
              </div>
              <div class="relative">
                <input
                  type="radio"
                  id="priority2"
                  value="important"
                  v-model="noticeForm.priority"
                  class="peer sr-only"
                >
                <label
                  for="priority2"
                  class="flex items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-warning peer-checked:bg-warning/5 hover:bg-gray-50 transition-colors"
                >
                  <i class="fa fa-exclamation-circle text-warning mr-2"></i>
                  <span>重要</span>
                </label>
              </div>
              <div class="relative">
                <input
                  type="radio"
                  id="priority3"
                  value="urgent"
                  v-model="noticeForm.priority"
                  class="peer sr-only"
                >
                <label
                  for="priority3"
                  class="flex items-center px-4 py-2 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-danger peer-checked:bg-danger/5 hover:bg-gray-50 transition-colors"
                >
                  <i class="fa fa-exclamation-triangle text-danger mr-2"></i>
                  <span>紧急</span>
                </label>
              </div>
            </div>
          </div>

          <!-- 通知内容 -->
          <div class="space-y-2">
            <label for="content" class="block text-sm font-medium text-gray-700">通知内容</label>
            <div class="relative">
              <textarea
                id="content"
                v-model="noticeForm.content"
                @input="updateCharCount"
                rows="6"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg form-focus transition-all resize-none"
                placeholder="请输入通知内容..."
                maxlength="500"
              ></textarea>
              <div class="absolute right-3 bottom-3 text-xs text-gray-500">
                <span>{{ charCount }}</span>/500
              </div>
            </div>
          </div>

          <!-- 附件上传 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">添加附件 (可选)</label>
            <div class="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="attachments"
                @change="handleFileUpload"
                class="hidden"
                multiple
              >
              <label for="attachments" class="cursor-pointer">
                <div class="flex flex-col items-center">
                  <i class="fa fa-cloud-upload text-primary text-3xl mb-2"></i>
                  <p class="text-gray-700 font-medium mb-1">点击上传文件</p>
                  <p class="text-gray-500 text-sm">支持PDF、Word、图片等格式</p>
                </div>
              </label>
              <div v-if="uploadedFiles.length > 0" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
                <div
                  v-for="(file, index) in uploadedFiles"
                  :key="index"
                  class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div class="flex items-center">
                    <i :class="getFileIcon(file.type)" class="text-primary mr-2"></i>
                    <span class="text-sm truncate max-w-[150px]">{{ file.name }}</span>
                  </div>
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="text-gray-400 hover:text-danger"
                  >
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 发送选项 -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">发送选项</label>
            <div class="flex flex-col space-y-3">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="sendNow"
                  v-model="noticeForm.sendNow"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="sendNow" class="ml-2 text-sm text-gray-700">立即发送</label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="remind"
                  v-model="noticeForm.remind"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="remind" class="ml-2 text-sm text-gray-700">设置提醒</label>
                <div v-show="noticeForm.remind" class="ml-6">
                  <select
                    v-model="noticeForm.remindTime"
                    class="ml-2 px-3 py-1 border border-gray-200 rounded-lg text-sm form-focus"
                  >
                    <option value="5">5分钟前</option>
                    <option value="15">15分钟前</option>
                    <option value="30">30分钟前</option>
                    <option value="60">1小时前</option>
                    <option value="1440">1天前</option>
                  </select>
                </div>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  id="repeat"
                  v-model="noticeForm.repeat"
                  class="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                >
                <label for="repeat" class="ml-2 text-sm text-gray-700">重复发送</label>
                <div v-show="noticeForm.repeat" class="ml-6">
                  <select
                    v-model="noticeForm.repeatType"
                    class="ml-2 px-3 py-1 border border-gray-200 rounded-lg text-sm form-focus"
                  >
                    <option value="daily">每天</option>
                    <option value="weekly">每周</option>
                    <option value="monthly">每月</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- 按钮区域 -->
          <div class="flex flex-col sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              @click="saveDraft"
              class="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors btn-hover"
            >
              保存草稿
            </button>
            <button
              type="submit"
              class="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium btn-hover"
            >
              <i class="fa fa-paper-plane mr-2"></i>
              发送通知
            </button>
          </div>
        </form>
      </div>

      <!-- 历史通知列表 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-6 max-w-5xl mx-auto">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-lg">最近发布的通知</h3>
          <router-link to="/parent/page2" class="text-primary text-sm hover:underline">查看全部</router-link>
        </div>
        <div class="divide-y divide-gray-100">
          <div
            v-for="notice in recentNotices"
            :key="notice.id"
            class="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-medium">{{ notice.title }}</h4>
                <p class="text-sm text-gray-500 mt-1">{{ notice.content }}...</p>
              </div>
              <span class="text-xs text-gray-400">{{ notice.time }}</span>
            </div>
            <div class="flex items-center mt-3">
              <span :class="getTypeClass(notice.type)">{{ getTypeText(notice.type) }}</span>
              <span :class="getStatusClass(notice.status)">{{ getStatusText(notice.status) }}</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </main>

    <!-- 底部导航 -->
    <footer class="bg-white border-t border-gray-200 py-4 sticky bottom-0 z-40">
      <div class="mx-auto px-4 lg:px-8">
        <div class="flex justify-around items-center">
          <router-link to="/parent/page1" class="flex flex-col items-center text-primary">
            <i class="fa fa-paper-plane text-xl"></i>
            <span class="text-xs mt-1">发布通知</span>
          </router-link>
          <router-link to="/parent/page2" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-history text-xl"></i>
            <span class="text-xs mt-1">历史记录</span>
          </router-link>
          <a href="#" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-calendar text-xl"></i>
            <span class="text-xs mt-1">日程安排</span>
          </a>
          <a href="#" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-user-o text-xl"></i>
            <span class="text-xs mt-1">我的</span>
          </a>
        </div>
      </div>
    </footer>

    <!-- 发送成功模态框 -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-500 mb-4">
            <i class="fa fa-check text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">通知发送成功！</h3>
          <p class="text-gray-600 mb-6">您的通知已成功发送至孩子的学习机，孩子将及时收到提醒。</p>
          <div class="flex justify-center gap-3">
            <button
              @click="closeSuccessModal"
              class="px-6 py-3 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              返回列表
            </button>
            <button
              @click="createNewNotice"
              class="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium btn-hover"
            >
              新建通知
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 响应式数据
const showSuccessModal = ref(false)
const uploadedFiles = ref<File[]>([])

const noticeForm = ref({
  student: 'student1',
  type: 'homework',
  title: '今日数学作业',
  date: '2025-06-18',
  time: '18:30',
  priority: 'normal',
  content: `请完成以下数学作业：

1. 课本P56练习题1-10
2. 练习册P32-33
3. 预习下节课内容

注意：明天上午要进行单元测试，请做好复习准备！`,
  sendNow: true,
  remind: false,
  remindTime: '15',
  repeat: false,
  repeatType: 'weekly'
})

const recentNotices = ref([
  {
    id: 1,
    title: '今日数学作业',
    content: '请完成课本P56练习题1-10，练习册P32-33',
    time: '今天 10:23',
    type: 'homework',
    status: 'sent'
  },
  {
    id: 2,
    title: '本周日程安排',
    content: '周一：英语听写 周二：数学单元测试 周四：家长会',
    time: '昨天 18:45',
    type: 'schedule',
    status: 'sent'
  },
  {
    id: 3,
    title: '重要提醒：明天带美术工具',
    content: '明天美术课需要带水彩笔、画板和素描本，请提前准备好。',
    time: '06-16 19:12',
    type: 'important',
    status: 'read'
  }
])

// 计算属性
const charCount = computed(() => {
  return noticeForm.value.content.length
})

// 方法
const updateCharCount = () => {
  // 字符计数在computed中自动更新
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    uploadedFiles.value = Array.from(target.files)
  }
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return 'fa fa-file-image-o'
  if (type.startsWith('video/')) return 'fa fa-file-video-o'
  if (type.startsWith('audio/')) return 'fa fa-file-audio-o'
  if (type.includes('pdf')) return 'fa fa-file-pdf-o'
  if (type.includes('word')) return 'fa fa-file-word-o'
  if (type.includes('excel')) return 'fa fa-file-excel-o'
  return 'fa fa-file-o'
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

const getTypeClass = (type: string) => {
  const baseClass = 'text-xs px-2 py-1 rounded-full mr-2'
  switch (type) {
    case 'homework':
      return `${baseClass} bg-blue-50 text-blue-600`
    case 'schedule':
      return `${baseClass} bg-purple-50 text-purple-600`
    case 'important':
      return `${baseClass} bg-red-50 text-red-600`
    default:
      return `${baseClass} bg-gray-50 text-gray-600`
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case 'homework':
      return '作业提醒'
    case 'schedule':
      return '日程安排'
    case 'important':
      return '重要提醒'
    default:
      return '通知'
  }
}

const getStatusClass = (status: string) => {
  const baseClass = 'text-xs px-2 py-1 rounded-full'
  switch (status) {
    case 'sent':
      return `${baseClass} bg-green-50 text-green-600`
    case 'read':
      return `${baseClass} bg-yellow-50 text-yellow-600`
    case 'pending':
      return `${baseClass} bg-gray-50 text-gray-600`
    default:
      return `${baseClass} bg-gray-50 text-gray-600`
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'sent':
      return '已发送'
    case 'read':
      return '已阅读'
    case 'pending':
      return '待发送'
    default:
      return '未知'
  }
}

const handleSubmit = () => {
  // 模拟发送通知
  showSuccessModal.value = true
}

const saveDraft = () => {
  alert('草稿已保存')
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
}

const createNewNotice = () => {
  showSuccessModal.value = false
  // 重置表单
  noticeForm.value = {
    student: 'student1',
    type: 'homework',
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '18:30',
    priority: 'normal',
    content: '',
    sendNow: true,
    remind: false,
    remindTime: '15',
    repeat: false,
    repeatType: 'weekly'
  }
  uploadedFiles.value = []
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

.bg-primary { background-color: var(--primary); }
.bg-secondary { background-color: var(--secondary); }
.bg-warning { background-color: var(--warning); }
.bg-danger { background-color: var(--danger); }

.border-primary { border-color: var(--primary); }
.border-secondary { border-color: var(--secondary); }
.border-warning { border-color: var(--warning); }
.border-danger { border-color: var(--danger); }

.bg-primary\/5 { background-color: rgba(22, 93, 255, 0.05); }
.bg-secondary\/5 { background-color: rgba(54, 211, 153, 0.05); }
.bg-warning\/5 { background-color: rgba(255, 170, 51, 0.05); }
.bg-danger\/5 { background-color: rgba(248, 114, 114, 0.05); }

.hover\:bg-primary\/90:hover { background-color: rgba(22, 93, 255, 0.9); }

.font-inter {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
