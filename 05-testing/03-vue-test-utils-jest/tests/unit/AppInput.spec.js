const { mount } = require('@vue/test-utils');
// or import { shallowMount } from '@vue/test-utils';
import AppInput from '@/components/AppInput';

describe('AppInput', () => {
  it('should be defined', () => {
    expect(AppInput).toBeDefined();
  });

  describe('without initial props', () => {
    let wrapper;
    let inputGroup;
    let formControl;

    beforeEach(() => {
      wrapper = mount(AppInput);
      inputGroup = wrapper.find('.input-group');
      formControl = inputGroup.find('.form-control');
    });

    it('should render input.input-group inside form-control', async () => {
      expect(inputGroup.exists()).toBe(true);
      expect(formControl.exists()).toBe(true);
    });

    it('should have form-control_rounded on input only when rounded is true', async () => {
      expect(formControl.classes('form-control_rounded')).toBe(false);
      await wrapper.setProps({ rounded: true });
      // await wrapper.vm.$nextTick();
      expect(formControl.classes('form-control_rounded')).toBe(true);
    });

    it('should have current value', async () => {
      const value = 'SameValue';
      await wrapper.setProps({ value });
      expect(formControl.element.value).toBe(value);
    });

    it('should match snapshot', async () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  it.each(['password', 'num', 'range', 'date', 'time', 'email', 'tel'])(
    'should render current input type (%s)',
    (type) => {
      const wrapper = mount(AppInput, {
        propsData: { type },
      });
      expect(wrapper.find('.form-control').attributes('type')).toBe(type);
    },
  );

  it('should handle native input event and emit input with inputted value', async () => {
    const value = 'SomeText';
    const handler = jest.fn();
    const wrapper = mount(AppInput, {
      listeners: {
        input: (event) => handler(event),
      },
    });
    // wrapper.find('.form-control').element.value = value;
    // await wrapper.find('.form-control').trigger('input');
    await wrapper.find('.form-control').setValue(value);

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(value);
    // or
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toHaveLength(1);
    expect(wrapper.emitted().input[0]).toEqual([value]);
  });
});
