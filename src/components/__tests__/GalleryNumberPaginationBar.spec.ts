import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryNumberPaginationBar from '../GalleryNumberPaginationBar.vue'

describe('GalleryNumberPaginationBar', () => {
  it('shows the correct item range', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    expect(wrapper.text()).toContain('21-40 of 95')
  })

  it('emits page-change when a page button is clicked', async () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const pageButtons = wrapper.findAll('.pagination-selector')
    expect(pageButtons.length).toBeGreaterThan(0)

    await pageButtons[0]!.trigger('click')
    expect(wrapper.emitted('page-change')).toBeTruthy()
  })

  it('disables previous button on first page', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 95,
        currentPage: 1
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)

    expect((buttons[0]!.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('disables next button on last page', () => {
    const wrapper = mount(GalleryNumberPaginationBar, {
      props: {
        currentLimit: 20,
        totalItems: 40,
        currentPage: 2
      },
      global: {
        stubs: {
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBeGreaterThan(0)

    expect((buttons[buttons.length - 1]!.element as HTMLButtonElement).disabled).toBe(true)
  })
})