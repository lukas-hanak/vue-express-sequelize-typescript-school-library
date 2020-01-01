<template>
    <footer class="text-center">
        <div class="container">
            <p>selectedIcon: designed by Pixel perfect from Flaticon | removeIcon:
                designed by Alfredo Hernandez from Flaticon | editIcon: designed by Freepik from Flaticon</p>
        </div>
    </footer>
</template>
<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  @Component
  export default class Footer extends Vue {
  }
</script>
<style scoped>
    footer {
        position: fixed;
        height: 30px;
        bottom: 0;
        width: 100%;
        background-color: #f8f8f8;
    }

    @media (max-width: 767px) {
        footer {
            margin-left: -20px;
            margin-right: -20px;
            padding-left: 20px;
            padding-right: 20px;
        }
    }
</style>
