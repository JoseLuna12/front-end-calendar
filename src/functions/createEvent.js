const CreateEventG = {
    methods: {
        add(day, title, descr, hour, color, forecast) {
            let data = {
                index: parseInt(day) - 1,
                event: {
                    color,
                    description: descr,
                    time: hour,
                    title,
                    forecast
                }
            };
            this.$store.dispatch("addEventGlobal", data);
        }
    }
}

export default CreateEventG