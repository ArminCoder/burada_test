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
            <td>{{item.Name}}</td>
            <td>{{item.Posts}}</td>
            <td>{{ new Date(item.DateCreated).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}</td>
            <td>
              <div class="d-flex align-items-center justify-content-center">
                <span class="cursor-pointer" @click="editTemplate(item)">
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
    <modal v-if="showModal" :open="createEditTemplate" @close="close">
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
    };
  },

  methods: {
    updateTemplate(data) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      axios.put( `https://app.postmypartytest.com/api/Templates/${data.id}`, data, config)
        .then(() => {
          bus.$emit('alert', "<span class='text-success'>Success!</span>");
          this.getTemplates();
          this.showModal = false;
        })
    },

    storeTemplate(data) {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      axios.post( `https://app.postmypartytest.com/api/Templates`, data, config)
        .then(() => {
          bus.$emit('alert', "<span class='text-success'>Success!</span>");
          this.getTemplates();
          this.showModal = false;
        })
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
</style>