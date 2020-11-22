<template>
    <v-app-bar
        app
      >
        <v-container fluid class="align-start px-12 py-12">
          <v-row class="mx-0">
            <v-toolbar flat class="px-6">
              <div class="text-h5"><h3>Quiz App</h3></div>
              <v-spacer />
              <v-btn class="mx-5">
                  Register
              </v-btn>
              <v-btn>
                Login
              </v-btn>
            </v-toolbar>
          </v-row>
        </v-container>
      </v-app-bar>
</template>

<script>
    export default {
        data: () => ({
            dialog: false,
        }),
    }
</script>

<style lang="sass" scoped>

</style>