<template>
    <comments-form
            ref="form"
            :comment="comment"
            :empty-comment="emptyComment"
            :parent="parent"
            @submit="args => $emit('submit', args)"
    >
        <div slot-scope="{submit, model, input}">
            <template v-if="parent">
                reply to: {{ parent.commenter.name }}
                <button @click.prevent="$emit('cancel-reply')">x</button>
            </template>
            <form @submit.prevent="submit">
                <label>
                    vote<br>
                    <input
                            type="number"
                            min="1"
                            step="1"
                            max="5"
                            required
                            :value="model.vote"
                            @input="({target}) => input('vote', parseInt(target.value))"
                    />
                </label>
                <br>
                <label>
                    message<br>
                    <textarea
                            :value="model.message"
                            @input="({target}) => input('message', target.value)"
                            required
                    ></textarea>
                </label>
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
            commenter: {
                type: Object,
                required: true,
            },
            parent: {
                type: [Object, null],
                default: null,
            },
            comment: {
                type: [Object, null],
                default: null,
            },
        },
        computed: {
            emptyComment(){
                return {
                    commenter: this.commenter,
                    message: null,
                    vote: null,
                }
            }
        },
        methods: {
            reset(){
                this.$refs.form.reset();
            },
        },
    }
</script>

<style scoped>

</style>
