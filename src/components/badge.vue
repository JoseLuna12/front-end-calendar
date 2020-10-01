<template>
    <div>
        <div v-if="id <= 1" class="badge" :class="color">
            {{title}}
        </div>
        <div v-if="id == 2">
            <div class="badge black">
                ...
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "Badge",
    props:["color", "title", "id"]
}
</script>

<style scoped>
.badge{
    width: 30%;
    height: 17px;
    color: white;
    padding: 2px;
    text-align: center;
    border-radius: 50px;
}
</style>