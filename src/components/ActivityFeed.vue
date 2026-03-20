<script setup lang="ts">
import type { ActivityItem } from '../types/dashboard'

defineProps<{ items: ActivityItem[], title?: string }>()

function toRelative(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}
</script>

<template>
  <div class="rounded-3xl border border-slate-200/60 bg-white/80 p-6 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md">
    <p class="mb-5 text-base font-bold tracking-tight text-slate-800">
      {{ title ?? 'Recent Activity' }}
    </p>
    <ul class="space-y-3">
      <li
        v-for="item in items"
        :key="item.id"
        class="flex items-start gap-3"
      >
        <div
          :class="[
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-gray-700',
            item.avatarColor,
          ]"
        >
          {{ item.avatarInitials }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm text-gray-800">
            <span class="font-medium">{{ item.actor }}</span>
            {{ item.action }}
            <span class="font-medium text-indigo-600">{{ item.target }}</span>
          </p>
          <p class="text-xs text-gray-400">
            {{ toRelative(item.timestamp) }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
