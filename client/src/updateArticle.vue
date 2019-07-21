<template>
  <div>
    <label for="title">
      <h5>Title :</h5>
    </label>
    <b-form-input v-model="inputUpdateTitle" placeholder="Enter your title"></b-form-input>
    <br />
    <tinymce-editor
      v-model="inputUpdateContent"
      id="tiny-editor"
      api-key="API_KEY"
      :init="{plugins: 'wordcount'}"
    ></tinymce-editor>

    <b-form-file v-model="inputUpdateImage" class="mt-3" plain></b-form-file>
    <div class="mt-3">Selected file: {{ inputUpdateImage ? inputUpdateImage.name : '' }}</div>

    <b-button @click="updateArticle" variant="outline-info" style="float: left;">Submit</b-button>
  </div>
</template>

<script>
import ax from "./api/api";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "update",
  props: {
    getIdArticle: String
  },
  components: {
    "tinymce-editor": Editor
  },
  data() {
    return {
      prevData: {
        title: "",
        content: "",
        image: ""
      },
      inputUpdateTitle: "",
      inputUpdateContent: "",
      inputUpdateImage: ""
      //   file: null,
      //   file2: null
    };
  },
  methods: {
    toMyarticle() {},
    findCurrentArt() {
      console.log(this.getIdArticle, "ini id article");
      ax({
        method: "get",
        url: `/articles/${this.getIdArticle}`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          this.inputUpdateTitle = data.title;
          this.inputUpdateContent = data.content;
          this.inputUpdateImage = data.image;
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    updateArticle() {
      let newData = {
        title: this.inputUpdateTitle,
        content: this.inputUpdateContent
      };
      ax({
        method: "patch",
        url: `/articles/${this.getIdArticle}`,
        data: newData,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log("berhasil sukses update mamangggggsss");
          Swal.fire({
            type: "success",
            title: "Successfully update!",
            showConfirmButton: false,
            timer: 1700
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.findCurrentArt();
  }
};
</script>

<style>
</style>
