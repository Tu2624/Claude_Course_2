<script setup lang="ts">
import { ref, onMounted } from 'vue'

const team = ref<any[]>([])
const isLoading = ref(true)

const fallback = [
  { id: 't1', name: 'Jane Doe', role: 'Product Manager', email: 'jane@example.com', initials: 'JD', color: 'bg-indigo-100 text-indigo-700' },
  { id: 't2', name: 'Mark Lee', role: 'Lead Developer', email: 'mark@example.com', initials: 'ML', color: 'bg-emerald-100 text-emerald-700' },
  { id: 't3', name: 'Sara Kim', role: 'UX Designer', email: 'sara@example.com', initials: 'SK', color: 'bg-rose-100 text-rose-700' },
  { id: 't4', name: 'Tom Nguyen', role: 'Marketing Specialist', email: 'tom@example.com', initials: 'TN', color: 'bg-amber-100 text-amber-700' },
]

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/team')
    if (!res.ok) throw new Error('API Error')
    team.value = await res.json()
  } catch {
    team.value = fallback
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="space-y-6">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">Team</h2>
      <p class="mt-2 text-base text-slate-500">Collaborate with your coworkers.</p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 border-t-transparent"></div>
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="member in team" :key="member.id" class="rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
        <div :class="['h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold mb-4', member.color]">
          {{ member.initials }}
        </div>
        <h3 class="text-xl font-bold text-slate-900">{{ member.name }}</h3>
        <p class="text-sm font-semibold text-indigo-600 mt-1 mb-3">{{ member.role }}</p>
        <p class="text-xs font-medium text-slate-500 truncate w-full">{{ member.email }}</p>
        
        <button class="mt-6 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-sm transition-colors border border-slate-200">
          Message
        </button>
      </div>
    </div>
  </div>
</template>
