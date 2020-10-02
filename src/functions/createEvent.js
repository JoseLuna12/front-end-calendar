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
        }
    }
}

export default CreateEventG