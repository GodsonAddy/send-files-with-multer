<template>
  <div>
    <div class="cardFiles">
      <b-card class="p-5">
        <div>
          <b-alert v-model="showSuccessAlert" variant="success" dismissible>
            Your file was successfully uploaded
          </b-alert>
          <b-alert v-model="showErrorAlert" variant="danger" dismissible>
            Unsuccessful! Please upload your file again!
          </b-alert>
        </div>
        <b-form @submit.prevent="onSubmit" enctype="multipart/form-data">
          <b-form-group label="File" label-cols-sm="2" label-size="lg">
            <b-form-file
              v-model="avatar"
              :state="Boolean(avatar)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              ref="filed"
              @change="selectFile"
              accept="image/*"
            >
            </b-form-file>
          </b-form-group>
          <div class="mt-3 mb-5">
            Selected file: {{ avatar ? avatar.name : "" }}
          </div>
          <b-button type="submit" variant="primary" v-if="!loading">
            Upload files
          </b-button>
          <b-button type="submit" variant="primary" v-if="loading" disabled>
            <b-spinner small type="grow"></b-spinner> Loading...
          </b-button>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      avatar: [],
      loading: false,
      showSuccessAlert: false,
      showErrorAlert: false
    }
  },
  methods: {
    selectFile () {
      this.avatar = this.$refs.filed.files[0]
      this.showSuccessAlert = false
      this.showErrorAlert = false
    },
    async onSubmit () {
      const payload = new FormData()
      payload.append('avatar', this.avatar)
      this.loading = true

      try {
        await axios.post('http://localhost:5000', payload)
        this.loading = false
        this.avatar = []
        this.showSuccessAlert = true
        this.showErrorAlert = false
      } catch (error) {
        console.log(error)
        this.showSuccessAlert = false
        this.showErrorAlert = true
        this.loading = false
        this.avatar = []
      }
    }
  }
}
</script>

<style scoped>
.cardFiles {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}
</style>
