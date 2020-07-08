<template>
    <div class="media">
        <div class="media-left">
            <img class="img-responsive" :src="comment.commenter.avatar" alt="avatar">
        </div>
        <div class="media-body">
            <h4 class="media-heading">{{ comment.commenter.name }}</h4>
            vote: {{ comment.vote }}
            <p>{{ comment.message }}</p>
            <button
                    v-if="canEdit"
                    @click.prevent="$emit('edit', comment)"
            >Edit</button>

            <button
                    v-if="canDelete"
                    @click.prevent="$emit('delete', comment)"
            >Delete</button>

            <button @click.prevent="$emit('reply', comment)">Reply</button>

            <template v-if="children.length">
                <hr>

                <item
                        v-for="child in children"
                        :key="child.id__"
                        :comment="child"
                        @edit="args => $emit('edit', args)"
                        @delete="args => $emit('delete', args)"
                        @reply="args => $emit('reply', args)"
                />
            </template>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: {
            comment: {
                type: Object,
                required: true,
            }
        },
        computed: {
            canEdit(){
                return true;
            },
            canDelete(){
                return true;
            },
            children(){
                return this.comment.children || [];
            }
        },
    }
</script>

<style scoped>

</style>
