<script setup lang="ts">
import type { KpiCard } from '../types/dashboard'

defineProps<{ card: KpiCard }>()
</script>

<template>
  <div class="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
    <div class="flex items-center justify-between">
      <p class="text-sm font-semibold text-slate-500 tracking-wide uppercase text-[11px]">
        {{ card.label }}
      </p>
    </div>
    <p class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
      {{ card.value }}
    </p>
    <p
      :class="[
        'mt-2 text-xs font-semibold px-2 py-1 rounded-full inline-block',
        card.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : card.trend === 'down' ? 'text-rose-700 bg-rose-50' : 'text-slate-600 bg-slate-100',
      ]"
    >
      {{ card.change }}
    </p>
  </div>
</template>
