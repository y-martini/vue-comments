export default {
    name: "Comments",
    props: {
        comments: {
            type: Array,
            required: true,
        },
    },
    model: {
        prop: 'comments',
    },
    watch: {
        comments(v){
            this.model = v ? this.fillId(v) : [];
        },
    },
    mounted() {
        this.model = this.fillId(this.comments);
    },
    data(){
        return {
            model: [],
        }
    },
    methods: {
        /**
         * @param {Object} model
         * @param {Object|null} parent
         */
        submit({model, parent = null}){
            if (model.id__){
                this.updateComment(model);
            }
            else {
                this.insertComment(model, parent);
            }
        },

        /**
         * @param {Object} comment
         * @param {Object|null} parent
         */
        insertComment(comment, parent = null){
            if (parent){
                this.model = this.insert(this.model, parent, comment);
            }
            else {
                this.model.push(comment);
            }

            this.$emit('input', this.model);
        },

        /**
         * @param {Object} comment
         */
        updateComment(comment){
            this.model = this.update(this.comments, comment);
            this.$emit('input', this.model);
        },

        /**
         * @param {Object} comment
         */
        removeComment(comment){
            this.model = this.remove(this.comments, comment);
            this.$emit('input', this.model);
        },

        insert(comments, parent, comment){
            let inserted = false;
            return comments
                .map(item => {
                    if (item.id__ === parent.id__){
                        item.children.push(comment);
                        inserted = true;
                    }
                    else if (!inserted) {
                        item.children = this.insert(item.children, parent, comment);
                    }

                    return item;
                });
        },

        update(comments, comment){
            return comments
                .map(item => {
                    if (item.id__ === comment.id__){
                        item = comment;
                    }
                    else {
                        item.children = this.update(item.children, comment)
                    }

                    return item;
                });
        },

        remove(comments, comment){
            return comments
                .filter(item => item.id__ !== comment.id__)
                .map(item => {
                    item.children = this.remove(item.children, comment)
                    return item;
                });
        },

        fillId(comments){
            return comments
                .map(item => {
                    item.id__ = item.id__ || this.generateId();

                    item.children = this.fillId(item.children || []);

                    return item;
                });
        },

        generateId(){
            return Math.random().toString(20).substring(2);
        },
    },

    render() {
        return this.$slots.default;
    },
}
