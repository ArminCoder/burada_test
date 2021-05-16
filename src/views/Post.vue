<template>
  <div>
    <navigation @logout="logout" />
    <div v-if="validRoute" class="mt-4">
      <div class="form-group col-12 mx-auto bg-light rounded shadow p-4">
        <h1 class="h3 mb-3 font-weight-normal">Post</h1>
        <textarea
          class="form-control"
          placeholder="Post Text..."
          v-model="post.Text"
          required
          max="500"
        />
        <img class="postImg" v-if="post.Image" :src="post.Image" alt />
        <img
          class="postImg"
          v-else
          src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
          alt
        />
        <input
          type="number"
          class="form-control mt-4"
          placeholder="Day"
          v-model="post.Day"
          min="1"
          max="31"
          required
        />
        <input type="time" class="form-control mt-4" placeholder="Day" v-model="post.Time" required />
        <button
          v-if="post.Id"
          @click="updatePost"
          class="btn mt-4 btn-primary btn-block"
          type="submit"
        >Update</button>
        <button
          v-else
          @click="createPost"
          class="btn mt-4 btn-primary btn-block"
          type="submit"
        >Create</button>
      </div>
    </div>
    <modal v-if="showCreateEditPost">
      <div>smh</div>
    </modal>
  </div>
</template>

<script>
import Navigation from "../components/Nav";
import Modal from "../components/Misc/Modal";
import { bus } from "../main";
import axios from "axios";

export default {
  name: "Post",

  components: {
    Navigation,
    Modal,
  },

  created() {
    if(!localStorage.getItem('template_id')) {
        return this.$router.back();
    }  

    this.validRoute = true;

    if (this.$route.params.id) {
      this.getPostData(this.$route.params.id);
    }
  },

  data() {
    return {
      showCreateEditPost: false,
      post: {},
      validRoute: false
    };
  },

  methods: {
    createPost() {
      this.post.templateId = localStorage.getItem('template_id');

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(
          `https://app.postmypartytest.com/api/Templates/${this.post.templateId}/Posts`,
          this.post,
          config
        )
        .then((res) => {
          console.log("res", res);
          bus.$emit(
            "alert",
            "<span class='text-success'>Success! New Post Created!</span>"
          );
          this.post = {};
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    updatePost() {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .put(
          `https://app.postmypartytest.com/api/TemplatePosts/${this.post.Id}`,
          this.post,
          config
        )
        .then(() => {
          bus.$emit(
            "alert",
            "<span class='text-success'>Success! Post Updated!</span>"
          );
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    getPostData(id) {
      let token = localStorage.getItem("token");

      axios
        .get(`https://app.postmypartytest.com/api/TemplatePosts/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.post = res.data;
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    logout() {
      localStorage.removeItem("token");
      this.$nextTick(() => {
        location.reload();
      });
    },
  },
};
Modal;
</script>

<style scoped>
label {
  text-align: left;
}

.cursor-pointer {
  cursor: pointer;
}

form {
  text-align: left;
}

.post {
  text-align: left;
}

.postImg {
  max-height: 200px;
  width: auto;
  margin-top: 30px;
}
</style>