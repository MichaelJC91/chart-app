import difference from './controlChart.js';

export default {
  data() {
    return {
      VIEW_ID: '20174488',
      sessions: [],
      days: [],
      totalSessions: Number,
      upperControlLimit: [],
      lowerControlLimit: [],
      averageSessions: Number,
      movingRange: [],
      totalMovingRange: Number,
      averageMovingRange: Number,
      movingRangeUpperControlLimit: [],
      chartData: {
          labels: [],
          series: [

          ]
      },
      chartOptions: {
          lineSmooth: false
      }
    }
  },
  mixins: [difference],
  methods: {
    displayResults(response) {
      //Set session views to a variable
      const sessionViews = response.result.reports[0].data.rows;

      //Create a new array for sessions
      this.sessions = sessionViews.map(data => {
        return data.metrics[0].values[0];
      }).map(Number);

      //Get days that correspond to the sessions and format with Moment.js
      this.days = sessionViews.map((data) => {
        return this.$moment(data.dimensions[0]).format("DD MM");
      });

      //Create the moving range
      this.movingRange = this.difference(this.sessions);

      //Sum total number of sessions
      this.totalSessions = this.sessions.reduce((total, amount) => {
          return total + amount;
      }, 0);

      //Sum total number of moving range
      this.totalMovingRange = this.movingRange.reduce((total, amount) => {
          return total + amount;
      }, 0);

      //Sum average of moving range
      this.averageMovingRange = Math.round(this.totalMovingRange / this.movingRange.length * 100) / 100;

      this.chartData.labels = this.days
      this.chartData.series.push(this.sessions);
      this.chartData.series.push(this.movingRange);
      console.log(this.chartData.series)
      console.log(this.sessions)
    },
    queryReports() {
      gapi.client.request({
        path: '/v4/reports:batchGet',
        root: 'https://analyticsreporting.googleapis.com/',
        method: 'POST',
        body: {
          reportRequests: [
            {
              viewId: this.VIEW_ID,
              dateRanges: [
                {
                  startDate: '2017-04-01',
                  endDate: 'today'
                }
              ],
              metrics: [
                {
                  expression: 'ga:sessions'
                },
                {
                  expression: 'ga:users'
                }
              ],
              dimensions: [
                {
                  name: 'ga:date'
                }
              ]
            }
          ]
        }
      }).then(this.displayResults, console.error.bind(console));
    }
  }
}
