<template>
  <template v-for="(menuItem, index) in test" :key="index">
    <q-item clickable v-ripple :to="{path:menuItem.name}"  @click="link=tapclick(index)" active-class="my-menu-link" :active="link===tapclick(index)">
      <q-item-section avatar>
        <q-icon :name="menuItem.icon" />
      </q-item-section>
      <q-item-section name="name">
        {{ menuItem.label }}
      </q-item-section>
    </q-item>
    <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
  </template>

</template>

<style src="/src/assets/css/inner.css" >

</style>
<script>

import {useRoute, useRouter} from "vue-router";
import {computed, ref} from "vue";
import router from "../../Router/index.js";
import createStore from "../../store/modules/createStore.js";
import {UserService} from "../../store/modules/api.js";

const test=createStore.getters.menuList
export default {
  setup() {
    return{
      test,
      link: ref(router.currentRoute.value.fullPath.substring(1)),
      tapclick(index) {
        return test[index].name
      },

    }
  }
}
</script>
