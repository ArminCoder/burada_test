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
          <tr v-for="item in templatesData" :key="item.id">
            <th scope="row">{{item.Id}}</th>
            <td>
              <div class="d-flex flex-column">{{item.Name}}</div>
              <div v-if="selectedTemplate.Id == item.Id" class="bg-light rounded">
                <div v-if="templatePosts.length">
                  <div class="d-flex justify-content-between align-items-center border p-2 bg-secondary text-white">
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
                    <span class="w-25">{{post.Text}}</span>
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
                        <span class="cursor-pointer mx-2 text-primary" @click="editPost(post.Id)">
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
                        <span class="cursor-pointer mx-2 text-danger" @click="deletePost(post.Id)">
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
                  </div>
                </div>
                <div v-else>
                  <div class="text-left">This template contains no posts...</div>
                </div>
              </div>
            </td>
            <td>{{item.Posts}}</td>
            <td>{{ new Date(item.DateCreated).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
            <td>
              <div class="d-flex align-items-center justify-content-center">
                <span
                  class="cursor-pointer mx-2"
                  :class="{'text-success' : item.Posts , 'text-secondary' : !item.Posts }"
                  @click="viewPosts(item)"
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
                <span class="cursor-pointer mx-2 text-primary" @click="editTemplate(item)">
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
  </div>
</template>

<script>
import Navigation from "../components/Nav";
import Modal from "../components/Misc/Modal";
import SingleTemplate from "../components/Template";
import { bus } from "../main";
import axios from "axios";

export default {
  name: "Dashboard",

  components: {
    Navigation,
    Modal,
    SingleTemplate,
  },

  mounted() {
    this.getTemplates();
  },

  data() {
    return {
      smg: "test",
      templatesData: [],
      selectedTemplate: {},
      mode: "create",
      showModal: false,
      templatePosts: [],
    };
  },

  methods: {
    viewPosts(item) {
      this.selectedTemplate = item;

      let token = localStorage.getItem("token");

      axios
        .get(`https://app.postmypartytest.com/api/Templates/${item.Id}/Posts`, {
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
          this.getTemplates();
          this.showModal = false;
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

    editPost(id) {
      console.log('edit', id);
    },

    deletePost(id) {
      console.log('delete', id);
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
  max-height: 100px;
  width: auto;
}
</style>