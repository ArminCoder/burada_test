<template>
  <div>
    <navigation @logout="logout" />
    <div class="mt-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Posts</th>
            <th scope="col">Date Created</th>
            <th scope="col">
              <span @click="createTemplate" class="btn btn-primary">+Create</span>
            </th>
          </tr>
        </thead>
        <tbody v-if="templatesData && templatesData.length">
          <tr v-for="template in templatesData" :key="template.id">
            <th scope="row">{{template.Id}}</th>
            <td>
              <div class="d-flex flex-column">{{template.Name}}</div>
              <div v-if="selectedTemplate.Id == template.Id" class="bg-light rounded">
                <div v-if="templatePosts.length" class="mt-2">
                  <div
                    class="d-flex justify-content-between align-items-center border p-2 bg-secondary text-white"
                  >
                    <span class="w-25">Text</span>
                    <span>Image</span>
                    <span>Day</span>
                    <span>Time</span>
                    <span>Actions</span>
                  </div>
                  <div
                    v-for="post in templatePosts"
                    :key="post.Id"
                    class="post d-flex justify-content-between align-items-center border p-2"
                  >
                    <span @click="toPostScreen(post)" class="w-25 text-primary cursor-pointer text-underline">{{post.Text}}</span>
                    <img class="postImg" v-if="post.Image" :src="post.Image" alt />
                    <img
                      class="postImg"
                      v-else
                      src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
                      alt
                    />
                    <span>{{ post.Day }}</span>
                    <span>{{ post.Time }}</span>
                    <div class="d-flex">
                      <span class="cursor-pointer mx-2 text-primary" @click="editPost(post)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                          />
                        </svg>
                      </span>
                      <span class="cursor-pointer mx-2 text-danger" @click="deletePost(post)">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="mt-2">
                  <div class="text-left">This template contains no posts...</div>
                </div>
                <button @click="toPostScreen" class="btn btn-primary mt-4">+ Create Post</button>
              </div>
            </td>
            <td>{{template.Posts}}</td>
            <td>{{ new Date(template.DateCreated).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
            <td>
              <div class="d-flex align-items-center justify-content-center">
                <span
                  class="cursor-pointer mx-2"
                  :class="{'text-primary' : template.Posts , 'text-secondary' : !template.Posts }"
                  @click="loadPosts(template)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-card-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                    />
                    <path
                      d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
                    />
                  </svg>
                </span>
                <span class="cursor-pointer mx-2 text-primary" @click="editTemplate(template)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pen"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                    />
                  </svg>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>No data to show...</tbody>
      </table>
    </div>
    <modal v-if="showModal" @close="close">
      <SingleTemplate
        @store="storeTemplate"
        @update="updateTemplate"
        :selected-template="selectedTemplate"
        :mode="mode"
      />
    </modal>
    <modal v-if="showEditPostsModal" @close="close">
      <SinglePost @update="updatePost" :post="selectedPost" />
    </modal>
  </div>
</template>

<script>
import Navigation from "../components/Nav";
import Modal from "../components/Misc/Modal";
import SingleTemplate from "../components/Template";
import SinglePost from "../components/SinglePost";
import { bus } from "../main";
import axios from "axios";

export default {
  name: "Dashboard",

  components: {
    Navigation,
    Modal,
    SingleTemplate,
    SinglePost,
  },

  mounted() {
    this.getTemplates();
    if(localStorage.getItem('template_id')) {
      localStorage.removeItem('template_id');
    }
  },

  data() {
    return {
      showModal: false,
      showEditPostsModal: false,
      mode: "create",
      templatesData: [],
      templatePosts: [],
      selectedTemplate: {},
      selectedPost: {},
    };
  },

  methods: {
    toPostScreen(post = {}) {
      localStorage.setItem('template_id', this.selectedTemplate.Id);

      if(post.Id) {
        return this.$router.push("/post/" + post.Id)
      }
      this.$router.push("/post")
    },

    loadPosts(template) {
      this.templatePosts = [];
      this.selectedTemplate = template;

      let token = localStorage.getItem("token");

      axios
        .get(`https://app.postmypartytest.com/api/Templates/${template.Id}/Posts`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.templatePosts = res.data.Data;
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    updateTemplate(data) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .put(
          `https://app.postmypartytest.com/api/Templates/${data.id}`,
          data,
          config
        )
        .then(() => {
          bus.$emit("alert", "<span class='text-success'>Success!</span>");
          this.getTemplates();
          this.showModal = false;
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    storeTemplate(data) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .post(`https://app.postmypartytest.com/api/Templates`, data, config)
        .then(() => {
          bus.$emit("alert", "<span class='text-success'>Success!</span>");
          this.showModal = false;
          this.getTemplates();
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    getTemplates() {
      let token = localStorage.getItem("token");

      axios
        .get("https://app.postmypartytest.com/api/Templates", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.templatesData = res.data.Data;
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

    createTemplate() {
      this.mode = "create";
      this.selectedTemplate = {};
      this.createEditTemplate();
    },

    editTemplate(template) {
      this.mode = "edit";
      this.selectedTemplate = template;
      this.createEditTemplate();
    },

    createEditTemplate() {
      this.showModal = true;
    },

    close() {
      this.showModal = false;
    },

    editPost(post) {
      this.showEditPostsModal = true;
      this.selectedPost = post;
    },

    updatePost(data) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .put(
          `https://app.postmypartytest.com/api/TemplatePosts/${data.Id}`,
          data,
          config
        )
        .then(() => {
          bus.$emit(
            "alert",
            "<span class='text-success'>Success! Post Updated!</span>"
          );
          this.loadPosts(this.selectedTemplate);
          this.showEditPostsModal = false;
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
        });
    },

    deletePost(post) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .delete(
          `https://app.postmypartytest.com/api/TemplatePosts/${post.Id}`,
          config
        )
        .then(() => {
          this.loadPosts(this.selectedTemplate);
          this.selectedTemplate.Posts -= 1;
          bus.$emit("alert", "<span class='text-success'>Post Deleted!</span>");
        })
        .catch((err) => {
          bus.$emit(
            "alert",
            `<span class='text-danger'>${err.response.data.error_description}`
          );
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

.post {
  text-align: left;
}

.postImg {
  max-height: 100px;
  width: auto;
}
</style>