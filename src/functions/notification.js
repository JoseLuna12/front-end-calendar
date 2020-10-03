const notification = {
    methods: {
        CreateNotification({position = 'top-right', color, title, description}) {
            this.$vs.notification({
                progress: "auto",
                duration: 6000,
                color,
                position,
                title,
                text: description
              });
        }
    }
}

export default notification