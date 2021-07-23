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
              multiple
              accept="image/*"
            >
              <template slot='file-name' slot-scope='{ names }'>
                <b-badge variant='dark'> {{ names[0] }}</b-badge>
                <b-badge v-if='names.length > 1' variant='dark' class='ml-1'>
                  + {{ names.length - 1}} More files
                </b-badge>
              </template>
            </b-form-file>
          </b-form-group>

          <b-button
            class='mt-5'
            type="submit"
            variant="primary"
            v-if="!loading"
          >
            Upload files
          </b-button>
          <b-button
            class='mt-5'
            type="submit"
            variant="primary"
            v-if="loading"
            disabled
          >
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
    async onSubmit () {
      const payload = new FormData()
      for (const file of this.avatar) {
        payload.append('avatar', file, file.name)
      }
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
