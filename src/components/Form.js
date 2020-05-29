export default {
    name: "Form",
    props: {
        comment: {
            type: [Object, null],
            default: null,
        },
        parent: {
            type: [Object, null],
            default: null,
        },
    },
    data(){
        return {
            message: null,
        }
    },
    watch: {
        comment(v){
            if (v){
                this.message = v.message;
            }
            else {
                this.reset();
            }
        },
    },
    methods: {
        submit(){
            this.$emit('submit', {parent: this.parent, comment: this.comment, message: this.message});
            this.reset();
        },
        reset(){
            this.message = null;
        },
    },

    render() {
        return this.$scopedSlots.default({
            parent: this.parent,
            comment: this.comment,
            message: this.message,
            submit: this.submit,

            attrs: {
                value: this.message,
            },
            events: {
                input: e => this.message = e.target.value,
            },
        });
    },
}
