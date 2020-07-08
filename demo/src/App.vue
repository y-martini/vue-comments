<template>
  <div>
    <comments ref="comments" v-model="comments">
      <div>
        <list
                :comments="comments"
                @edit="onEdit"
                @delete="onDelete"
                @reply="onReply"
        />

        <comments-form
                ref="form"
                :commenter="commenter"
                :parent="replyComment"
                :comment="formComment"
                @submit="onFormSubmit"
                @cancel-reply="onCancelReply"
        />
      </div>
    </comments>
    <hr>
    <button @click="initComments">Generate</button>
  </div>
</template>

<script>
  import {Comments} from "../../src";
  import Form from "./components/Form";
  import List from "./components/List";
  import {LoremIpsum} from "lorem-ipsum";

  const LOREM_IPSUM = new LoremIpsum();

const COMMENTER_NAME = 'Yuriy Martini';
const NAMES = [
        'Ernest Robertson',
        'Laylah Dorsey',
        'Kester Pike',
        'Celia Webber',
        'Zachariah Howard',
        'Aston Andrews',
        'Uwais Amin',
        'Lucca Wheatley',
        'Gracie Mackay',
        'Ines Beach',
];

export default {
  name: 'App',
  components: {
    List,
    CommentsForm: Form,
    Comments
  },
  data(){
    return {
      comments: [],
      commenter: {
        name: COMMENTER_NAME,
        avatar: this.getAvatar(COMMENTER_NAME),
      },
      formComment: null,
      replyComment: null,
    }
  },
  mounted() {
    this.initComments();
  },
  methods: {
    initComments(){
      this.comments = this.generateComments();
    },
    generateComments(max = 10, maxLevel = 3, level = 1){
      let comments = [];
      for (let i = 0; i < Math.floor(Math.random() * max); i++) {
        comments.push(this.generateComment(maxLevel, level));
      }
      return comments;
    },
    generateComment(maxLevel, level){
      if (level > maxLevel){
        return [];
      }

      let name = NAMES[Math.floor(NAMES.length * Math.random())];
      return {
        commenter: {
          name,
          avatar: this.getAvatar(name),
        },
        vote: Math.floor(Math.random() * 5) + 1,
        message: LOREM_IPSUM.generateSentences(3),
        children: this.generateComments(maxLevel, level + 1),
      }
    },
    getAvatar(name){
      return 'https://api.adorable.io/avatars/48/' + name.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-')  + '@adorable.io.png';
    },
    onEdit(comment){
      this.replyComment = null;
      this.formComment = comment;
    },
    onReply(comment){
      this.formComment = null;
      this.replyComment = comment;
    },
    onDelete(comment){
      this.$refs.comments.removeComment(comment);
    },
    onCancelReply(){
      this.replyComment = null;
    },
    onFormSubmit(args){
      this.formComment = null;
      this.replyComment = null;
      this.$refs.comments.submit(args);
      this.$refs.form.reset();
    },
  }
}
</script>
