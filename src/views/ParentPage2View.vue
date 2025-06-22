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
        <h2 class="text-2xl font-bold text-dark mb-2">通知历史记录</h2>
        <p class="text-gray-500">查看所有已发送的学习通知</p>
      </div>

      <!-- 搜索和筛选 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <input
              type="text"
              v-model="searchKeyword"
              class="w-full px-4 py-2 border border-gray-200 rounded-lg form-focus transition-all"
              placeholder="搜索通知标题或内容..."
            >
          </div>
          <div class="flex gap-3">
            <select
              v-model="filterType"
              class="px-4 py-2 border border-gray-200 rounded-lg form-focus"
            >
              <option value="">全部类型</option>
              <option value="homework">作业提醒</option>
              <option value="schedule">日程安排</option>
              <option value="important">重要提醒</option>
            </select>
            <select
              v-model="filterStatus"
              class="px-4 py-2 border border-gray-200 rounded-lg form-focus"
            >
              <option value="">全部状态</option>
              <option value="sent">已发送</option>
              <option value="read">已阅读</option>
              <option value="pending">待发送</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 通知列表 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 class="font-bold text-lg">通知列表 ({{ filteredNotices.length }})</h3>
          <router-link to="/parent/page1" class="text-primary text-sm hover:underline">
            <i class="fa fa-plus mr-1"></i>
            新建通知
          </router-link>
        </div>

        <div v-if="filteredNotices.length === 0" class="p-12 text-center text-gray-500">
          <i class="fa fa-inbox text-4xl mb-4"></i>
          <p>暂无通知记录</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="notice in filteredNotices"
            :key="notice.id"
            class="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            @click="showNoticeDetail(notice)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-medium text-lg">{{ notice.title }}</h4>
                  <span :class="getTypeClass(notice.type)">{{ getTypeText(notice.type) }}</span>
                  <span :class="getStatusClass(notice.status)">{{ getStatusText(notice.status) }}</span>
                </div>
                <p class="text-sm text-gray-500 mb-2">{{ notice.content.substring(0, 100) }}...</p>
                <div class="flex items-center text-xs text-gray-400 gap-4">
                  <span><i class="fa fa-user-o mr-1"></i>{{ notice.student }}</span>
                  <span><i class="fa fa-calendar-o mr-1"></i>{{ notice.date }}</span>
                  <span><i class="fa fa-clock-o mr-1"></i>{{ notice.time }}</span>
                </div>
              </div>
              <div class="text-right text-sm text-gray-400">
                <div>{{ notice.createTime }}</div>
                <div v-if="notice.priority === 'urgent'" class="text-red-500 mt-1">
                  <i class="fa fa-exclamation-triangle mr-1"></i>紧急
                </div>
                <div v-else-if="notice.priority === 'important'" class="text-yellow-500 mt-1">
                  <i class="fa fa-exclamation-circle mr-1"></i>重要
                </div>
              </div>
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
          <router-link to="/parent/page1" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-paper-plane text-xl"></i>
            <span class="text-xs mt-1">发布通知</span>
          </router-link>
          <router-link to="/parent/page2" class="flex flex-col items-center text-primary">
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

    <!-- 通知详情模态框 -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold">{{ selectedNotice?.title }}</h3>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
              <i class="fa fa-times text-xl"></i>
            </button>
          </div>
          <div class="flex items-center gap-3 mt-2">
            <span :class="getTypeClass(selectedNotice?.type)">{{ getTypeText(selectedNotice?.type) }}</span>
            <span :class="getStatusClass(selectedNotice?.status)">{{ getStatusText(selectedNotice?.status) }}</span>
          </div>
        </div>

        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">接收学生</label>
              <p class="text-gray-900">{{ selectedNotice?.student }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">日期</label>
                <p class="text-gray-900">{{ selectedNotice?.date }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">时间</label>
                <p class="text-gray-900">{{ selectedNotice?.time }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">通知内容</label>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-900 whitespace-pre-line">{{ selectedNotice?.content }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">发送时间</label>
              <p class="text-gray-500">{{ selectedNotice?.createTime }}</p>
            </div>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 flex justify-end gap-3">
          <button
            @click="closeDetailModal"
            class="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            关闭
          </button>
          <button
            @click="editNotice"
            class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            编辑
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 响应式数据
const searchKeyword = ref('')
const filterType = ref('')
const filterStatus = ref('')
const showDetailModal = ref(false)
const selectedNotice = ref<any>(null)

const allNotices = ref([
  {
    id: 1,
    title: '今日数学作业',
    content: `请完成以下数学作业：

1. 课本P56练习题1-10
2. 练习册P32-33
3. 预习下节课内容

注意：明天上午要进行单元测试，请做好复习准备！`,
    student: '李明 (初中一年级)',
    date: '2025-06-18',
    time: '18:30',
    type: 'homework',
    status: 'sent',
    priority: 'normal',
    createTime: '今天 10:23'
  },
  {
    id: 2,
    title: '本周日程安排',
    content: `本周重要日程提醒：

周一：英语听写，请复习第5单元单词
周二：数学单元测试，复习第3章内容
周三：语文作文课，准备素材
周四：家长会，下午2点在班级教室
周五：体育测试，穿运动服

请合理安排时间，做好准备！`,
    student: '李明 (初中一年级)',
    date: '2025-06-17',
    time: '08:00',
    type: 'schedule',
    status: 'read',
    priority: 'important',
    createTime: '昨天 18:45'
  },
  {
    id: 3,
    title: '重要提醒：明天带美术工具',
    content: '明天美术课需要带水彩笔、画板和素描本，请提前准备好。如果没有可以到学校附近的文具店购买。',
    student: '李华 (小学四年级)',
    date: '2025-06-17',
    time: '09:00',
    type: 'important',
    status: 'sent',
    priority: 'urgent',
    createTime: '06-16 19:12'
  },
  {
    id: 4,
    title: '期中考试复习计划',
    content: `期中考试即将来临，请按照以下计划复习：

数学：重点复习方程组和几何证明
语文：背诵必背古诗词，练习作文
英语：复习语法和词汇
物理：复习力学和电学基础

每天复习2小时，合理安排时间。`,
    student: '李明 (初中一年级)',
    date: '2025-06-15',
    time: '19:00',
    type: 'homework',
    status: 'read',
    priority: 'important',
    createTime: '06-15 16:30'
  },
  {
    id: 5,
    title: '假期阅读计划',
    content: '暑假期间请阅读以下书籍：《朝花夕拾》、《昆虫记》、《海底两万里》。每本书写一份读书笔记，开学后上交。',
    student: '李华 (小学四年级)',
    date: '2025-06-14',
    time: '10:00',
    type: 'schedule',
    status: 'sent',
    priority: 'normal',
    createTime: '06-14 14:20'
  }
])

// 计算属性
const filteredNotices = computed(() => {
  return allNotices.value.filter(notice => {
    const matchesSearch = !searchKeyword.value ||
      notice.title.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchKeyword.value.toLowerCase())

    const matchesType = !filterType.value || notice.type === filterType.value
    const matchesStatus = !filterStatus.value || notice.status === filterStatus.value

    return matchesSearch && matchesType && matchesStatus
  })
})

// 方法
const getTypeClass = (type: string) => {
  const baseClass = 'text-xs px-2 py-1 rounded-full'
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

const showNoticeDetail = (notice: any) => {
  selectedNotice.value = notice
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedNotice.value = null
}

const editNotice = () => {
  // 跳转到编辑页面
  router.push('/parent/page1')
  closeDetailModal()
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
.text-danger { color: var(--danger); }
.text-dark { color: var(--dark); }

.bg-primary { background-color: var(--primary); }
.bg-danger { background-color: var(--danger); }

.border-primary { border-color: var(--primary); }

.hover\:bg-primary\/90:hover { background-color: rgba(22, 93, 255, 0.9); }

.font-inter {
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
