export default {
    name: "Comments",
    props: {
        comments: {
            type: Array,
            required: true,
        },
        commenter: {
            type: Object,
            required: true,
        },
    },
    model: {
        prop: 'comments',
    },
    watch: {
        comments(v){
            this.comments_ = this.fillId(v);
        },
    },
    mounted() {
        this.comments_ = this.fillId(this.comments);
    },
    data(){
        return {
            comments_: [],
        }
    },
    methods: {
        /**
         * @param {string} message
         * @param {Object|null} parent
         * @param {Object|null} comment
         */
        submit({message, parent = null, comment}){
            if (comment){
                this.updateComment(comment, message);
            }
            else {
                let comment = {
                    id__: this.generateId(),
                    commenter: this.commenter,
                    message,
                    children: [],
                };
                this.insertComment(comment, parent);
            }
        },

        /**
         * @param {Object} comment
         * @param {Object|null} parent
         */
        insertComment(comment, parent = null){
            if (parent){
                this.comments_ = this.insert(this.comments_, parent, comment);
            }
            else {
                this.comments_.push(comment);
            }

            this.$emit('input', this.comments_);
        },

        /**
         * @param {Object} comment
         * @param {string} message
         */
        updateComment(comment, message){
            this.comments_ = this.update(this.comments, comment, message);
            this.$emit('input', this.comments_);
        },

        /**
         * @param {Object} comment
         */
        removeComment(comment){
            this.comments_ = this.remove(this.comments, comment);
            this.$emit('input', this.comments_);
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

        update(comments, comment, message){
            return comments
                .map(item => {
                    if (item.id__ === comment.id__){
                        item.message = message;
                    }
                    else {
                        item.children = this.update(item.children, comment, message)
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

                    item.children = this.fillId(item.children);

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
