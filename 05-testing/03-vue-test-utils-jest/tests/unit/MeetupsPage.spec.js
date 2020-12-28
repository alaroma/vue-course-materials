const { shallowMount, mount } = require('@vue/test-utils');
import MeetupsPage from '@/components/MeetupsPage';
import MeetupsList from '@/components/MeetupsList';
import { fetchMeetups } from '@/data';
import meetups from './__fixtures__/meetups.json';
import flushPromises from 'flush-promises';

jest.mock('@/data');

describe('MeetupsPage', () => {
  beforeAll(() => {
    fetchMeetups.mockResolvedValue(meetups);
  });

  it('should be defined', () => {
    expect(MeetupsPage).toBeDefined();
  });

  it('should render list with 2 meetups by <meetups-list>', async () => {
    const wrapper = shallowMount(MeetupsPage);
    await flushPromises();
    expect(fetchMeetups).toHaveBeenCalled();
    expect(wrapper.findComponent(MeetupsList).props('meetups')).toHaveLength(
      meetups.length,
    );
  });

  it('should match shallowMount snapshot', async () => {
    const wrapper = shallowMount(MeetupsPage);
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('should match shallowMount snapshot', async () => {
    const wrapper = shallowMount(MeetupsPage);
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('should match mount snapshot', async () => {
    const wrapper = mount(MeetupsPage);
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render list', async () => {
    const wrapper = mount(MeetupsPage, {
      stubs: ['app-icon', 'app-empty'],
    });
    await flushPromises();
    expect(fetchMeetups).toHaveBeenCalled();
    expect(
      wrapper
        .findAll('.meetups-list__item h5')
        .wrappers.map((wrapper) => wrapper.text()),
    ).toEqual(meetups.map((meetup) => meetup.title));
  });
});
