<script setup lang="ts">
defineProps<{ sidebarOpen: boolean }>()
defineEmits<{ toggleSidebar: [] }>()
</script>

<template>
  <header class="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-4 sm:px-6 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.05)]">
    <!-- Hamburger (mobile only) -->
    <button
      class="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors lg:hidden"
      aria-label="Toggle sidebar"
      @click="$emit('toggleSidebar')"
    >
      <svg
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          v-if="sidebarOpen"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Page title -->
    <h1 class="text-base font-semibold text-gray-900">
      Dashboard
    </h1>

    <!-- Right actions -->
    <div class="ml-auto flex items-center gap-2">
      <!-- Search -->
      <div class="hidden sm:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 w-48 lg:w-64">
        <svg
          class="h-4 w-4 shrink-0"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
          /><path
            stroke-linecap="round"
            d="m21 21-4.35-4.35"
          />
        </svg>
        Search…
      </div>
    </div>
  </header>
</template>
