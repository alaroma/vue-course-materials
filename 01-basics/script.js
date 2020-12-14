import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const getDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

const fetchMeetups = () =>
  fetch('./api/meetups.json').then((res) => res.json());

const app = new Vue({
  // со свойством el Vue смонтирует приложение в элемент #app
  // так как шаблон мы не передали, то он возьмёт его из того же элемента #app
  el: '#app',

  data() {
    return {
      rawMeetups: [],
      filter: {
        date: 'all',
        participation: 'all',
        search: '',
      },
      // filteredMeetups: [],
      hello: '<h1>world</h1>',
      view: 'list',
    };
  },

  async mounted() {
    this.rawMeetups = await fetchMeetups();
  },

  watch: {
    // Вместо отслеживания используем computed
    // filter: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.filteredMeetups = this.getFilteredMeetups();
    //   },
    // },
    // meetups: {
    //   deep: true,
    //   immediate: true,
    //   handler() {
    //     this.filteredMeetups = this.getFilteredMeetups();
    //   },
    // },
    // hello(newValue, oldValue) {
    //   console.log(newValue, oldValue);
    // },
  },

  computed: {
    meetups() {
      return this.rawMeetups.map((meetup) => ({
        ...meetup,
        cover: meetup.imageId
          ? `https://course-vue.javascript.ru/api/images/${meetup.imageId}`
          : undefined,
        coverStyle: meetup.imageId
          ? {
              '--bg-url': `url('https://course-vue.javascript.ru/api/images/${meetup.imageId}')`,
            }
          : {},
        date: new Date(meetup.date),
        localDate: new Date(meetup.date).toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        dateOnlyString: getDateOnlyString(new Date(meetup.date)),
      }));
    },

    filteredMeetups() {
      const dateFilter = (meetup) =>
        this.filter.date === 'all' ||
        (this.filter.date === 'past' && new Date(meetup.date) <= new Date()) ||
        (this.filter.date === 'future' && new Date(meetup.date) > new Date());

      const participationFilter = (meetup) =>
        this.filter.participation === 'all' ||
        (this.filter.participation === 'organizing' && meetup.organizing) ||
        (this.filter.participation === 'attending' && meetup.attending);

      const searchFilter = (meetup) =>
        [meetup.title, meetup.description, meetup.place, meetup.organizer]
          .join(' ')
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());

      return this.meetups.filter(
        (meetup) =>
          dateFilter(meetup) &&
          participationFilter(meetup) &&
          searchFilter(meetup),
      );
    },
  },

  methods: {
    // Обработчик события написали прямо в шаблоне
    // inputHandler(e) {
    //   this.filter.search = e.target.value;
    // },
  },
});

window.app = app;
