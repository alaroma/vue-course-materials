export default {
  template: `<figure>
    <img :src="'https://cataas.com/cat?height=200&random=' + random" alt="Random cat 1">
    <figcaption>Cat #{{ random }}</figcaption>
  </figure>`,

  data: () => ({
    random: Math.random(),
  }),
};
