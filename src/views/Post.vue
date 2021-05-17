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
        <small
          v-if="maxLengthError"
          class="text-danger"
        >Post text cannot be longer than 500 characters.</small>
        <div>
          <img class="postImg" v-if="post.Image" :src="post.Image" alt />
          <img
            class="postImg"
            v-else
            src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
            alt
          />
        </div>
        <input
          type="number"
          class="form-control mt-4"
          placeholder="Day"
          v-model="post.Day"
          min="1"
          max="31"
          required
        />
        <small
          v-if="invalidIntegerError"
          class="text-danger"
        >Number cannot be smaller than 1 or larger then 31.</small>
        <input type="time" class="form-control mt-4" placeholder="Day" v-model="post.Time" required />
        <button
          v-if="post.Id"
          @click="updatePost"
          class="btn mt-4 btn-primary btn-block"
          type="submit"
          :disabled="disabled"
        >Update</button>
        <button
          v-else
          @click="createPost"
          class="btn mt-4 btn-primary btn-block"
          type="submit"
          :disabled="disabled"
        >Create</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/Nav";
import { bus } from "../main";
import axios from "axios";

export default {
  name: "Post",

  components: {
    Navigation,
  },

  computed: {
    disabled() {
      return !this.post.Text || !this.post.Day || !this.post.Time || this.maxLengthError || this.invalidIntegerError;
    },

    maxLengthError() {
      return this.post.Text.length > 500;
    },

    invalidIntegerError() {
      return (this.post.Day < 1 || this.post.Day > 31) && this.post.Day != null;
    },
  },

  created() {
    if (!localStorage.getItem("template_id")) {
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
      post: {
        Text: "",
        Day: null,
        Time: null,
      },
      validRoute: false,
    };
  },

  methods: {
    createPost() {
      if (this.disabled)
        return bus.$emit(
          "alert",
          "<span class='text-danger'>Please fill in all required fields."
        );

      this.post.templateId = localStorage.getItem("template_id");

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
        .then(() => {
          bus.$emit(
            "alert",
            "<span class='text-success'>Success! New Post Created!</span>"
          );

          this.post = {
            Text: "",
            Day: null,
            Time: null,
          };
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    updatePost() {
      if (this.disabled)
        return bus.$emit(
          "alert",
          "<span class='text-danger'>Please fill in all required fields."
        );

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