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
            <span class="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">5</span>
          </button>
          <div class="flex items-center space-x-2">
            <img src="https://picsum.photos/id/1011/200/200" alt="老师头像" class="h-8 w-8 rounded-full object-cover border-2 border-primary">
            <span class="text-sm font-medium hidden sm:inline-block">张老师</span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow py-6">
      <div class="max-w-screen-xl mx-auto px-4 lg:px-8 xl:px-12">
      <!-- 页面标题和统计 -->
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-dark mb-2">老师工作台</h2>
        <p class="text-gray-500">管理学生辅导请求，提供优质教学服务</p>

        <!-- 统计卡片 -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                <i class="fa fa-list-alt text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ pendingCount }}</h3>
                <p class="text-gray-500 text-sm">待接单</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="bg-green-100 p-3 rounded-full text-green-600 mr-4">
                <i class="fa fa-check-circle text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ acceptedCount }}</h3>
                <p class="text-gray-500 text-sm">已接单</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="bg-yellow-100 p-3 rounded-full text-yellow-600 mr-4">
                <i class="fa fa-clock-o text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ inProgressCount }}</h3>
                <p class="text-gray-500 text-sm">进行中</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg p-6 shadow-sm">
            <div class="flex items-center">
              <div class="bg-purple-100 p-3 rounded-full text-purple-600 mr-4">
                <i class="fa fa-trophy text-xl"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold">{{ completedCount }}</h3>
                <p class="text-gray-500 text-sm">已完成</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 筛选选项 -->
      <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div class="flex flex-wrap gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-colors',
              activeTab === tab.key
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ tab.label }} ({{ getOrdersByTab(tab.key).length }})
          </button>
        </div>
      </div>

      <!-- 订单列表 -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="font-bold text-lg">{{ getCurrentTabLabel() }}</h3>
        </div>

        <div v-if="currentOrders.length === 0" class="p-12 text-center text-gray-500">
          <i class="fa fa-inbox text-4xl mb-4"></i>
          <p>暂无相关订单</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="order in currentOrders"
            :key="order.id"
            class="px-6 py-6 hover:bg-gray-50 transition-colors"
          >
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h4 class="font-bold text-lg">{{ order.subject }}</h4>
                  <span :class="getStatusClass(order.status)">{{ getStatusText(order.status) }}</span>
                  <span :class="getUrgencyClass(order.urgency)">{{ getUrgencyText(order.urgency) }}</span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fa fa-user mr-2"></i>
                    <span>{{ order.studentName }} ({{ order.grade }})</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fa fa-clock-o mr-2"></i>
                    <span>{{ order.duration }}小时 | {{ order.time }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fa fa-map-marker mr-2"></i>
                    <span>{{ order.location }}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fa fa-money mr-2"></i>
                    <span>{{ order.price }}元/小时</span>
                  </div>
                </div>

                <p class="text-gray-700 mb-3">{{ order.description }}</p>

                <div class="flex items-center text-xs text-gray-400 gap-4">
                  <span>发布时间：{{ order.publishTime }}</span>
                  <span v-if="order.deadline">要求完成：{{ order.deadline }}</span>
                </div>
              </div>

              <div class="ml-6 flex flex-col gap-2">
                <button
                  v-if="order.status === 'pending'"
                  @click="acceptOrder(order.id)"
                  class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  接单
                </button>

                <button
                  v-if="order.status === 'accepted'"
                  @click="startTeaching(order.id)"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  开始教学
                </button>

                <button
                  v-if="order.status === 'in-progress'"
                  @click="completeOrder(order.id)"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  完成订单
                </button>

                <button
                  @click="showOrderDetail(order)"
                  class="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  查看详情
                </button>
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
          <a href="#" class="flex flex-col items-center text-primary">
            <i class="fa fa-list text-xl"></i>
            <span class="text-xs mt-1">订单管理</span>
          </a>
          <a href="#" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-calendar text-xl"></i>
            <span class="text-xs mt-1">我的课表</span>
          </a>
          <a href="#" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-bar-chart text-xl"></i>
            <span class="text-xs mt-1">收益统计</span>
          </a>
          <a href="#" class="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <i class="fa fa-user text-xl"></i>
            <span class="text-xs mt-1">个人中心</span>
          </a>
        </div>
      </div>
    </footer>

    <!-- 订单详情模态框 -->
    <div v-if="showDetailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-start">
            <h3 class="text-xl font-bold">{{ selectedOrder?.subject }}辅导</h3>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
              <i class="fa fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div class="p-6">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">学生姓名</label>
                <p class="text-gray-900">{{ selectedOrder?.studentName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">年级</label>
                <p class="text-gray-900">{{ selectedOrder?.grade }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">辅导要求</label>
              <div class="bg-gray-50 p-4 rounded-lg">
                <p class="text-gray-900">{{ selectedOrder?.description }}</p>
              </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Order {
  id: number
  subject: string
  studentName: string
  grade: string
  duration: number
  time: string
  location: string
  price: number
  description: string
  publishTime: string
  deadline?: string
  status: 'pending' | 'accepted' | 'in-progress' | 'completed'
  urgency: 'normal' | 'urgent'
}

// 响应式数据
const activeTab = ref('pending')
const showDetailModal = ref(false)
const selectedOrder = ref<Order | null>(null)

const tabs = [
  { key: 'pending', label: '待接单' },
  { key: 'accepted', label: '已接单' },
  { key: 'in-progress', label: '进行中' },
  { key: 'completed', label: '已完成' }
]

const allOrders = ref<Order[]>([
  {
    id: 1,
    subject: '数学',
    studentName: '李明',
    grade: '初中一年级',
    duration: 2,
    time: '今天晚上 19:00-21:00',
    location: '学生家中',
    price: 120,
    description: '需要辅导一元一次方程和几何基础，孩子基础较弱，希望老师耐心讲解。',
    publishTime: '2小时前',
    deadline: '今天 18:00前确认',
    status: 'pending',
    urgency: 'urgent'
  },
  {
    id: 2,
    subject: '英语',
    studentName: '王小华',
    grade: '小学五年级',
    duration: 1.5,
    time: '明天下午 16:00-17:30',
    location: '在线辅导',
    price: 80,
    description: '主要辅导英语语法和单词记忆方法。',
    publishTime: '4小时前',
    status: 'pending',
    urgency: 'normal'
  },
  {
    id: 3,
    subject: '物理',
    studentName: '张同学',
    grade: '初中二年级',
    duration: 2,
    time: '周三晚上 19:30-21:30',
    location: '学习中心',
    price: 150,
    description: '力学部分不太理解，特别是牛顿定律的应用。',
    publishTime: '昨天',
    status: 'accepted',
    urgency: 'normal'
  }
])

// 计算属性
const pendingCount = computed(() => allOrders.value.filter(order => order.status === 'pending').length)
const acceptedCount = computed(() => allOrders.value.filter(order => order.status === 'accepted').length)
const inProgressCount = computed(() => allOrders.value.filter(order => order.status === 'in-progress').length)
const completedCount = computed(() => allOrders.value.filter(order => order.status === 'completed').length)

const currentOrders = computed(() => getOrdersByTab(activeTab.value))

// 方法
const getOrdersByTab = (tab: string) => {
  return allOrders.value.filter(order => order.status === tab.replace('-', '-'))
}

const getCurrentTabLabel = () => {
  const tab = tabs.find(t => t.key === activeTab.value)
  return tab ? tab.label : '订单列表'
}

const getStatusClass = (status: string) => {
  const baseClass = 'text-xs px-2 py-1 rounded-full'
  switch (status) {
    case 'pending':
      return `${baseClass} bg-yellow-50 text-yellow-600`
    case 'accepted':
      return `${baseClass} bg-blue-50 text-blue-600`
    case 'in-progress':
      return `${baseClass} bg-green-50 text-green-600`
    case 'completed':
      return `${baseClass} bg-purple-50 text-purple-600`
    default:
      return `${baseClass} bg-gray-50 text-gray-600`
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return '待接单'
    case 'accepted':
      return '已接单'
    case 'in-progress':
      return '进行中'
    case 'completed':
      return '已完成'
    default:
      return '未知'
  }
}

const getUrgencyClass = (urgency: string) => {
  const baseClass = 'text-xs px-2 py-1 rounded-full'
  switch (urgency) {
    case 'urgent':
      return `${baseClass} bg-red-50 text-red-600`
    case 'normal':
      return `${baseClass} bg-gray-50 text-gray-600`
    default:
      return `${baseClass} bg-gray-50 text-gray-600`
  }
}

const getUrgencyText = (urgency: string) => {
  switch (urgency) {
    case 'urgent':
      return '紧急'
    case 'normal':
      return '普通'
    default:
      return '普通'
  }
}

const acceptOrder = (orderId: number) => {
  const order = allOrders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'accepted'
    alert('订单接受成功！')
  }
}

const startTeaching = (orderId: number) => {
  const order = allOrders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'in-progress'
    alert('开始教学！')
  }
}

const completeOrder = (orderId: number) => {
  const order = allOrders.value.find(o => o.id === orderId)
  if (order) {
    order.status = 'completed'
    alert('订单完成！')
  }
}

const showOrderDetail = (order: Order) => {
  selectedOrder.value = order
  showDetailModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedOrder.value = null
}
</script>

<style scoped>
:root {
  --primary: #165DFF;
  --danger: #F87272;
  --dark: #1E293B;
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
