<template>
    <div class="BadgeParent">
        <div v-if="id <= 1" class="badge" :class="color" v-on:click="openAllReminders(day)">
            {{title}}
        </div>
        <div v-if="id == 2">
            <div class="badge black" v-on:click="openAllReminders">
                ...
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "Badge",
    props:["color", "title", "id", 'day', 'openAllReminders']
}
</script>

<style scoped>
.badge{
    width: 80%;
    font-size: 15px;
    height: 17px;
    color: white;
    padding: 2px;
    text-align: center;
    border-radius: 50px;
    text-overflow: ellipsis;
}
.BadgeParent .badge{
    cursor: pointer;
}
</style>