import getForecast from './getForecast'
import genId from './idgenerator'
import notification from './notification'
const CreateEventG = {
    mixins: [getForecast, genId, notification],
    methods: {
        add(day, title, descr, hour, color, forecast, updated = false) {
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
            this.getForecast(title, day, hourParsed, randomId, this.CreateNotification)
            if(updated == true){
                this.CreateNotification({color:'success', title:`Event updated`, description: `Updated event for ${this.$store.state.currentMonthName} ${day}` })
            }else{
                this.CreateNotification({color:'success', title:`new Event added`, description: `New event for ${this.$store.state.currentMonthName} ${day} in ${title} ` })
            }
        },
        Remove(day, index, updated = false){
            console.log(day + " " + index)
            this.$store.dispatch("removeEvent",{
                day: day-1,
                index
            });
            if(updated == false){
                this.CreateNotification({color:'danger', title:`Event removed`, description: `Removed event for ${this.$store.state.currentMonthName} ${day}` })
            }
        },
        Replace(day, index, event){
            this.Remove(day, index, true);
            this.add(event.day, event.title, event.descr, event.time, event.color, event.forecast, true);
        },
        RemoveAllEvents(day){
            this.$store.dispatch("removeAllEventsForOneDay", day-1)
            this.CreateNotification({color:'danger', title:`All events removed`, description: `Removed all events for ${this.$store.state.currentMonthName} ${day}` })
        }
    }
}

export default CreateEventG