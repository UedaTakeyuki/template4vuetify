<template>
  <nav>
    <v-toolbar>
<!--      <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="grey--text">
        <span class="font-weight-light">Site</span>
        <span>Title</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
      <v-toolbar-item class="hidden-xs-only">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
          <!-- <v-btn text slot="activator"> -->
          <v-btn text v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Menu</span>
          </v-btn>
          </template>
          <v-list>
            <!-- v-list-tile is changed to v-list-item -->
            <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-item>

      <v-toolbar-item>
        <v-btn text>
          <span>Sign Out</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </v-toolbar-item>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list>
        <v-layout column align-center class="white--text">
          QR code of this app.
          <v-flex>
            <v-avatar tile="true" size="100">
              <img :src="grgenerator" alt="" title="" />
            </v-avatar>
          </v-flex>
        </v-layout>
        <!-- v-list-tile is changed to v-list-item -->
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>


<script>
import router from '../router'
export default {
  data: () => ({
    drawer: false,
    links: [
      { icon: 'home', text: 'Home', route: '/'},
      { icon: 'contacts', text: 'About', route: '/about'},
    ],
    // http://goqr.me/api/doc/create-qr-code/#param_data
    grgenerator: "https://api.qrserver.com/v1/create-qr-code/?data="
     + location.origin + router.currentRoute.fullPath
     + " &amp;size=100x100",
  }),
}
</script>
