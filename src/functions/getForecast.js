const forecast = {
    computed: {
        GetCurrentMont() {
            return this.$store.state.currentMonthName;
        },
        GetAllMonths() {
            return this.$store.state.months;
        }
    },
    created() {
        this.monthsForForecast = this.GetAllMonths;
    },
    data() {
        return {
            forecast: [],
            monthsForForecast: [],
            currentForecast: 'No Data'
        }
    },
    methods: {
        fetchData(city) {
            return new Promise((resolve, reject) => {
                fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=7d8030279fb0a5877f8c2bbea6e27c66`)
                    .then(response => response.json())
                    .then(data => {
                        this.forecast = [...data.list]
                        resolve(this.forecast)
                    })
                    .catch((e) => reject(e));
            })
        },
        getForecast(city, day, hour, evid, notification) {
            let month = this.monthsForForecast.indexOf(this.GetCurrentMont) + 1;
            let dayParsed = day;
            let hourParsed = hour
            if (day < 10) {
                dayParsed = 0 + '' + day
            }
            if (hour < 10) {
                hourParsed = 0 + '' + hour
            }

            let date = `2020-${month}-${dayParsed}`;
            
            this.fetchData(city).then((res) => {

                for (var i = 0; i < res.length; i++) {
                    
                    let e = res[i];
                    let forecastDate = e.dt_txt.split(' ');
                    let forcastHour = forecastDate[1].split(':');

                    if (date == forecastDate[0]) {
                        console.log(hour % 3)
                        if (hour % 3 == 0) {                            
                            if (hourParsed == forcastHour[0]) {
                                console.log(e.weather[0].main + " || " + e.dt_txt);
                                this.currentForecast = e.weather[0].main;
                                break;
                            }
                        }else if(hour - hour % 3 == parseInt(forcastHour[0])){
                            console.log(e.weather[0].main + " || " + e.dt_txt);
                            this.currentForecast = e.weather[0].main;
                            break;
                        }
                    }else{
                        this.currentForecast = 'No data'
                    }
                }
            }).then(() => {
                this.$store.dispatch('updateForecastInEvent', {
                    id: evid,
                    index: (day) - 1,
                    arrayIndex: 0,
                    forecast: this.currentForecast
                });
                if(this.currentForecast != 'No data'){
                    notification({color:'success', title:`The forecast for ${city} is ${this.currentForecast}`, description: `The forecast for ${this.$store.state.currentMonthName} ${day} was fetched successfuly` })
                }
            }).catch((e) =>{
                console.log(e)
                // this.$store.dispatch('updateForecastInEvent', {
                //     id: evid,
                //     index: (day) - 1,
                //     arrayIndex: 0,
                //     forecast: 'No data'
                // })
            });
        }
    }
}

export default forecast