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

    <b-form-file v-model="inputUpdateImage" class="mt-3" plain @change="onFilePicked"></b-form-file>
    <img :src="inputUpdateImage" />
    <div class="mt-3">
      <b-spinner v-if="statusLoad" variant="primary" label="Spinning"></b-spinner>
      Selected file: {{ inputUpdateImage ? inputUpdateImage.name : '' }}
    </div>
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
      inputUpdateTitle: "",
      inputUpdateContent: "",
      inputUpdateImage: "",
      statusLoad : false,
      image : '',
      imageUrl: "",
      imageFile: "",
      loading: false,
      baseUrl: "http://localhost:3000"
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
    uploadImage(){
      this.$emit('reUpload')
    },
    refetchFeeds(){
      console.log('masuk fetch')
      this.$emit('refetchFeeds')
    },
    refetchMyArticle(){
      console.log('masuk fetch')
      this.$emit('refetchMyArt')
    },
    updateArticle() {
      Swal.fire({
        title: "Are you sure?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(result => {
        if (result.value) {
          let newData = {
            title: this.inputUpdateTitle,
            content: this.inputUpdateContent,
            image : this.inputUpdateImage
          };
          ax({
            method: "patch",
            url: `/articles/${this.getIdArticle}`,
            data: newData,
            headers: { token: localStorage.token }
          })
            .then(({ data }) => {
              console.log("berhasil sukses update mamangggggsss");
              this.refetchFeeds()
              this.refetchMyArticle()            
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
      });      
    },
    onFilePicked (e) {
      this.statusLoad = true      
      this.loading = true      
      this.imageUrl = ""
      const files = e.target.files
      if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
              return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
              this.imageFile = files[0] // this is an image file that can be sent to server...
              const formData = new FormData()
                  formData.append('image',this.imageFile)
                  ax({
                    method: "POST",
                    url: `${this.baseUrl}/articles/upload`,
                    headers: {
                      token: localStorage.token
                    },
                    data: formData
                  })
                    .then(({ data }) =>{
                      this.loading = false
                      this.statusLoad = false                      
                      this.imageUrl = fr.result
                      this.image = data
                      this.inputUpdateImage = this.image
                      })
                    .catch(err =>{
                      console.log(err.response)
                      })
          })
      } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
      }
    },
  },
  created() {
    this.findCurrentArt();
  }
};
</script>

<style>
</style>
