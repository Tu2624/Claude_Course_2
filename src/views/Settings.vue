<script setup lang="ts">
import { ref, onMounted } from 'vue'

const config = ref<any>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/settings')
    if (!res.ok) throw new Error('API Error')
    config.value = await res.json()
  } catch (e: any) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
})

const saveSettings = () => {
  alert('Settings saved! (Simulated)')
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div class="mb-8">
      <h2 class="text-3xl font-extrabold tracking-tight text-slate-900">Settings</h2>
      <p class="mt-2 text-base text-slate-500">Configure your dashboard preferences.</p>
    </div>
    
    <div v-if="isLoading" class="flex justify-center items-center py-24">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 border-t-transparent"></div>
    </div>
    
    <div v-else-if="error" class="bg-rose-50 text-rose-600 p-6 rounded-2xl shadow-sm border border-rose-100">
      Error: {{ error }} - Please ensure the backend server is running.
    </div>
    
    <div v-else class="rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md">
      <form @submit.prevent="saveSettings" class="space-y-8">
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">General Preferences</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Theme</label>
              <select v-model="config.theme" class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Language</label>
              <select v-model="config.language" class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none">
                <option>English</option>
                <option>Vietnamese</option>
                <option>French</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Timezone</label>
              <input type="text" v-model="config.timezone" class="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 block p-3 outline-none" />
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Notifications</h3>
          <div class="flex items-center">
            <input id="notifs" type="checkbox" v-model="config.notifications" class="w-5 h-5 text-indigo-600 bg-slate-50 border-slate-300 rounded focus:ring-indigo-500">
            <label for="notifs" class="ml-3 text-sm font-medium text-slate-700">Receive email notifications for weekly summaries</label>
          </div>
        </div>
        
        <div class="pt-4 flex justify-end">
          <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl shadow-sm transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
