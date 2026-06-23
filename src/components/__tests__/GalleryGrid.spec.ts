// src/components/__tests__/GalleryGrid.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryGrid from '../GalleryGrid.vue'
import type { ImageDetails } from '@/api/picsum.types'

describe('GalleryGrid', () => {
  it('renders one ImageCard per image', () => {
    const images: ImageDetails[] = [
      {
        id: 1,
        author: 'Alice',
        width: 1000,
        height: 800,
        url: 'https://example.com/1',
        download_url: 'https://example.com/1.jpg'
      },
      {
        id: 2,
        author: 'Bob',
        width: 1000,
        height: 800,
        url: 'https://example.com/2',
        download_url: 'https://example.com/2.jpg'
      },
      {
        id: 3,
        author: 'Carol',
        width: 1000,
        height: 800,
        url: 'https://example.com/3',
        download_url: 'https://example.com/3.jpg'
      }
    ]

    const wrapper = mount(GalleryGrid, {
      props: { images },
      global: {
        stubs: {
          ImageCard: {
            props: ['image'],
            template: '<div class="image-card-stub">{{ image.author }}</div>'
          }
        }
      }
    })

    const cards = wrapper.findAll('.image-card-stub')
    expect(cards).toHaveLength(3)
    expect(cards[0]!.text()).toBe('Alice')
    expect(cards[1]!.text()).toBe('Bob')
    expect(cards[2]!.text()).toBe('Carol')
  })
})