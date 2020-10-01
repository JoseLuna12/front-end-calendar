const CreateEventG = {
    methods: {
        add(day, title, descr, hour, color) {
            let data = {
                index: parseInt(day) - 1,
                event: {
                    color,
                    description: descr,
                    time: hour,
                    title
                }
            };
            this.$store.dispatch("addEventGlobal", data);
        }
    }
}

export default CreateEventG