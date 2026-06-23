// src/components/__tests__/GalleryArrowBar.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import GalleryArrowBar from '../GalleryArrowBar.vue'
import { getImageDetailsById } from '@/api/picsum.api'

vi.mock('@/api/picsum.api', () => ({
  getImageDetailsById: vi.fn()
}))

describe('GalleryArrowBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('emits navigation events', async () => {
    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: true,
        canGoRight: true,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)

    const [backButton, prevButton, nextButton] = buttons

    await backButton!.trigger('click')
    expect(wrapper.emitted('back-to-gallery')).toHaveLength(1)

    await prevButton!.trigger('click')
    expect(wrapper.emitted('previous-image')).toHaveLength(1)

    await nextButton!.trigger('click')
    expect(wrapper.emitted('next-image')).toHaveLength(1)
  })

  it('disables arrow buttons correctly', () => {
    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: false,
        canGoRight: false,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })
  
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(4)
  
    expect((buttons[1]!.element as HTMLButtonElement).disabled).toBe(true)
    expect((buttons[2]!.element as HTMLButtonElement).disabled).toBe(true)
  })

  it('downloads the image when download is clicked', async () => {
    vi.mocked(getImageDetailsById).mockResolvedValue({
      id: '10',
      author: 'Alice',
      width: 1000,
      height: 800,
      url: 'https://example.com/photo',
      download_url: 'https://example.com/photo.jpg'
    } as any)
  
    const blob = new Blob(['test'], { type: 'image/jpeg' })
    global.fetch = vi.fn().mockResolvedValue({
      blob: vi.fn().mockResolvedValue(blob)
    }) as any
  
    const createObjectURLSpy = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:test-url')
  
    const appendChildSpy = vi
      .spyOn(document.body, 'appendChild')
      .mockImplementation(() => null as any)
  
    const removeChildSpy = vi
      .spyOn(document.body, 'removeChild')
      .mockImplementation(() => null as any)
  
    const link = document.createElement('a')
    const clickSpy = vi.spyOn(link, 'click').mockImplementation(() => {})
  
    const originalCreateElement = document.createElement.bind(document)
  
    vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') return link
      return originalCreateElement(tagName)
    })
  
    const wrapper = mount(GalleryArrowBar, {
      props: {
        canGoLeft: true,
        canGoRight: true,
        imageId: 10
      },
      global: {
        stubs: {
          BaseButton: {
            template: '<button class="download-btn" @click="$emit(`click`)"><slot /></button>'
          },
          ArrowLeftRegular: true,
          IconCarretLeftRegular: true,
          IconCarretRightRegular: true
        }
      }
    })
  
    await wrapper.get('.download-btn').trigger('click')
  
    expect(getImageDetailsById).toHaveBeenCalledWith(10)
    expect(global.fetch).toHaveBeenCalledWith('https://example.com/photo.jpg')
    expect(createObjectURLSpy).toHaveBeenCalled()
    expect(appendChildSpy).toHaveBeenCalled()
    expect(clickSpy).toHaveBeenCalled()
    expect(removeChildSpy).toHaveBeenCalled()
  })
})