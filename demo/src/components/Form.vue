<template>
    <comments-form
            :comment="comment"
            :parent="parent"
            @submit="args => $emit('submit', args)"
    >
        <div slot-scope="{submit, message, attrs, events}">
            <template v-if="parent">
                reply to: {{ parent.commenter.name }}
                <button @click.prevent="$emit('cancel-reply')">x</button>
            </template>
            <form @submit.prevent="submit">
                <textarea v-bind="attrs" v-on="events" required></textarea>
                <br>
                <button>Submit</button>
            </form>
        </div>
    </comments-form>
</template>

<script>
    import {Form} from "../../../src";

    export default {
        name: "Form",
        components: {CommentsForm: Form},
        props: {
            parent: {
                type: [Object, null],
                default: null,
            },
            comment: {
                type: [Object, null],
                default: null,
            },
        },
    }
</script>

<style scoped>

</style>
