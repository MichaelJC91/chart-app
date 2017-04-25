export default {
  methods: {
    difference(array) {
      return array.slice(1).map((num, iteration) => {
        return Math.abs(num - array[iteration]);
      });
    }
  }
}
