<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ close: [] }>()

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Analytics', path: '/analytics' },
  { label: 'Projects', path: '/projects' },
  { label: 'Team', path: '/team' },
  { label: 'Settings', path: '/settings' },
]
</script>

<template>
  <!-- Mobile overlay -->
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-20 bg-black/40 lg:hidden"
      @click="$emit('close')"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-white/70 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]',
      'transition-transform duration-300 ease-in-out',
      'lg:translate-x-0 lg:static lg:z-auto lg:shadow-none',
      open ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Logo -->
    <div class="flex h-16 items-center gap-3 border-b border-gray-200 px-5">
      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm">
        A
      </div>
      <span class="text-lg font-semibold text-gray-900">Acme App</span>
    </div>

    <!-- Nav items -->
    <nav class="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
      <router-link
        v-for="item in navItems"
        :key="item.label"
        :to="item.path"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm hover:ring-1 hover:ring-slate-200/50 transition-all duration-200 group"
        active-class="bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200/50"
      >
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
