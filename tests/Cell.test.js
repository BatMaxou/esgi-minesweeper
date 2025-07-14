import { describe, it, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'

import Cell from '@/components/minesweeper/Cell.vue'

const createWrapper = (props = {}) => {
  return mount(Cell, {
    props: {
      x: 0,
      y: 0,
      ...props,
    },
    global: {
      plugins: [createPinia()],
    },
  })
}

describe('Cell.vue', () => {
  describe('Initialisation d\'une cellule', () => {
    it('x, y défini', () => {
      const wrapper = createWrapper({ x: 5, y: 3 })
      expect(wrapper.props('x')).toBe(5)
      expect(wrapper.props('y')).toBe(3)
    })

    it('forceReveal à false par défaut', () => {
      const wrapper = createWrapper()
      expect(wrapper.props('forceReveal')).toBe(false)
    })

    it('La cellule est vide par défaut', () => {
      const wrapper = createWrapper()
      expect(wrapper.vm.cellValue).toBe('')
    })
  })
})
