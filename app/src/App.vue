<template>
    <div id="app">
        <Navbar/>
        <router-view/>
        <Footer/>
    </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';
  import Footer from '@/components/footer/Footer.vue';
  import Navbar from '@/components/navbar/Navbar.vue';

  @Component({
    components: {
      Navbar,
      Footer,
    },
  })
  export default class App extends Vue {}
</script>
