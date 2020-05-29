<template>
    <div>
        <item
                v-for="comment in comments"
                :key="comment.id__"
                :comment="comment"
                @edit="args => $emit('edit', args)"
                @delete="args => $emit('delete', args)"
                @reply="args => $emit('reply', args)"
        />
    </div>
</template>

<script>
    import Item from "./Item";
    export default {
        name: "List",
        components: {Item},
        props: {
            comments: {
                type: Array,
                required: true,
            },
        }
    }
</script>

<style scoped>

</style>
