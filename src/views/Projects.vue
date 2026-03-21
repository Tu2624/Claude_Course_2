<script setup lang="ts">
import { ref, onMounted } from 'vue'

const projects = ref<any[]>([])
const isLoading = ref(true)

const fallback = [
  { id: 'p1', name: 'Website Redesign', status: 'In Progress', progress: 65, dueDate: '2026-04-15' },
  { id: 'p2', name: 'Mobile App Launch', status: 'Planning', progress: 15, dueDate: '2026-06-01' },
  { id: 'p3', name: 'Database Migration', status: 'Completed', progress: 100, dueDate: '2026-02-28' },
  { id: 'p4', name: 'Marketing Campaign Q3', status: 'In Progress', progress: 40, dueDate: '2026-05-10' },
]

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/projects')
    if (!res.ok) throw new Error('API Error')
    projects.value = await res.json()
  } catch {
    projects.value = fallback
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">Projects</h2>
      <p class="mt-2 text-base text-slate-500">Manage all your active and past projects.</p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 border-t-transparent"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="proj in projects" :key="proj.id" class="rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)] flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-slate-900">{{ proj.name }}</h3>
            <span :class="['px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide', proj.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : proj.status === 'In Progress' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600']">
              {{ proj.status }}
            </span>
          </div>
          <p class="text-sm font-medium text-slate-500 mb-6">Due: {{ proj.dueDate }}</p>
        </div>
        
        <div>
          <div class="flex justify-between text-xs font-bold text-slate-600 mb-2">
            <span>Progress</span>
            <span>{{ proj.progress }}%</span>
          </div>
          <div class="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div :class="['h-full rounded-full transition-all duration-1000', proj.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500']" :style="{ width: proj.progress + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
