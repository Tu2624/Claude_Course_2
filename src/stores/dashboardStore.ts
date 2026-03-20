import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Transaction, ActivityItem, KpiCard, GoalItem } from '../types/dashboard'
import { transactions as seedTransactions } from '../data/mockData'

export const useDashboardStore = defineStore('dashboard', () => {
  const transactions = ref<Transaction[]>([...seedTransactions])
  const activityFeed = ref<ActivityItem[]>([])
  const kpiCards = ref<KpiCard[]>([])
  const goals = ref<GoalItem[]>([])
  const isLoading = ref<boolean>(true)
  const error = ref<string | null>(null)

  async function fetchDashboardData() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/api/dashboard')
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      
      kpiCards.value = data.kpiCards
      activityFeed.value = data.activityFeed
      goals.value = data.goals
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch dashboard data'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  function addTransaction(t: Omit<Transaction, 'id'>): void {
    transactions.value.unshift({ ...t, id: crypto.randomUUID() })
  }

  function deleteTransaction(id: string): void {
    const index = transactions.value.findIndex((t) => t.id === id)
    if (index !== -1) transactions.value.splice(index, 1)
  }

  const transactionCount = computed(() => transactions.value.length)

  const totalIncome = computed(() =>
    transactions.value
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  )

  const totalExpenses = computed(() =>
    transactions.value
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
  )

  return {
    transactions,
    activityFeed,
    kpiCards,
    goals,
    isLoading,
    error,
    fetchDashboardData,
    addTransaction,
    deleteTransaction,
    transactionCount,
    totalIncome,
    totalExpenses,
  }
})
