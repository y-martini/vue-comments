export default {
    name: "Form",
    props: {
        comment: {
            type: [Object, null],
            default: null,
        },
        emptyComment: {
            type: Object,
            default: () => {
                return {};
            },
        },
        parent: {
            type: [Object, null],
            default: null,
        },
    },
    data(){
        return {
            model: null,
        }
    },
    watch: {
        comment(v){
            if (v){
                this.model = {...v};
            }
            else {
                this.reset();
            }
        },
    },
    methods: {
        submit(){
            this.$emit('submit', {parent: this.parent, comment: this.comment, model: this.model});
            this.reset();
        },
        reset(){
            this.model = this.emptyComment;
            this.model.children = this.model.children || [];
        },
    },

    render() {
        if (!this.model){
            this.reset();
        }

        return this.$scopedSlots.default({
            parent: this.parent,
            comment: this.comment,
            model: this.model,

            input: (prop, value) => this.model[prop] = value,
            submit: this.submit,
        });
    },
}
