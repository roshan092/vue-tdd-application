import Counter from '../src/components/Counter.vue'
import { mount } from '@vue/test-utils'
import moxios from 'moxios'
import expect from 'expect'

describe('Counter', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('defaults to a count of 0', () => {
    let wrapper = mount(Counter)
    expect(wrapper.vm.count).toBe(0)
  })

  it('should present the current count', function () {
    let wrapper = mount(Counter)
    expect(wrapper.find('.count').text()).toEqual('0')
  })

  it('should increment the count when the increment button is clicked', function () {
    let wrapper = mount(Counter)
    wrapper.find('.increment').trigger('click')
    expect(wrapper.find('.count').text()).toEqual('1')
  })

  it('should persist the updated count', function (done) {
    let wrapper = mount(Counter)
    moxios.stubRequest('/count', {
      status: 200,
    })

    wrapper.find('.increment').trigger('click')

    moxios.wait(() => {
      expect(wrapper.find('.message').text()).toEqual('Saved')
      let request = moxios.requests.mostRecent()
      expect(request.config.method).toEqual('post')
      expect(JSON.parse(request.config.data)).toEqual({
        value: 1,
      })
      done()
    })
  })
})