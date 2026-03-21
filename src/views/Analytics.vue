<script setup lang="ts">
import { ref, onMounted } from 'vue'

const data = ref<any>(null)
const isLoading = ref(true)

const fallback = {
  pageViews: 124500,
  bounceRate: '42%',
  avgSessionDuration: '2m 14s',
  topPages: [
    { path: '/home', views: 45000 },
    { path: '/pricing', views: 22000 },
    { path: '/blog', views: 18000 },
  ],
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/analytics')
    if (!res.ok) throw new Error('API Error')
    data.value = await res.json()
  } catch {
    data.value = fallback
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">Analytics</h2>
      <p class="mt-2 text-base text-slate-500">Deep dive into your metrics.</p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 border-t-transparent"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
        <p class="text-sm font-semibold text-slate-500 tracking-wide uppercase text-[11px]">Page Views</p>
        <p class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{{ data.pageViews.toLocaleString() }}</p>
      </div>
      <div class="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
        <p class="text-sm font-semibold text-slate-500 tracking-wide uppercase text-[11px]">Bounce Rate</p>
        <p class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{{ data.bounceRate }}</p>
      </div>
      <div class="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
        <p class="text-sm font-semibold text-slate-500 tracking-wide uppercase text-[11px]">Avg Session</p>
        <p class="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">{{ data.avgSessionDuration }}</p>
      </div>
      
      <div class="md:col-span-3 rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md">
        <h3 class="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Top Pages</h3>
        <ul class="space-y-4">
          <li v-for="page in data.topPages" :key="page.path" class="flex justify-between items-center p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-sm">
            <span class="font-bold text-indigo-600 tracking-wide">{{ page.path }}</span>
            <span class="text-slate-600 font-bold bg-slate-100 px-4 py-1.5 rounded-full text-sm">{{ page.views.toLocaleString() }} views</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
