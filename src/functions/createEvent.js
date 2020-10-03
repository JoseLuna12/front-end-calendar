import getForecast from './getForecast'
import genId from './idgenerator'
const CreateEventG = {
    mixins: [getForecast, genId],
    methods: {
        add(day, title, descr, hour, color, forecast) {
            let randomId = this.GenerateId();
            let data = {
                index: parseInt(day) - 1,
                event: {
                    id: randomId,
                    color,
                    description: descr,
                    time: hour,
                    title,
                    forecast
                }
            };
            this.$store.dispatch("addEventGlobal", data);
            let hourParsed = hour.split(':')
            hourParsed = parseInt(hourParsed[0])
            this.getForecast(title, day, hourParsed, randomId)
        },
        Remove(day, index){
            console.log(day + " " + index)
            this.$store.dispatch("removeEvent",{
                day: day-1,
                index
            })
        },
        Replace(day, index, event){
            // console.log(day + " " +index + " "  + JSON.stringify(event))
            this.Remove(day, index);
            this.add(event.day, event.title, event.descr, event.time, event.color, event.forecast);
        }
    }
}

export default CreateEventG