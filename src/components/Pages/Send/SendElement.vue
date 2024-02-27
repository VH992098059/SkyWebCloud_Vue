<template>
  <q-page-container>
    <q-page style>
      <div style="position: absolute;z-index: 10000;font-size: 35px;width: 100%;">此功能维护中，敬请期待！</div>
      <div class="position-relative bg-grey-4" :style="style" disabled="disabled" >
        <q-layout view="lHh Lpr lFf" class="WAL__layout shadow-3" container disabled="disabled"  >
          <q-header elevated disabled="disabled" >
            <q-toolbar class="bg-grey-3 text-black">
              <q-btn
                  round
                  flat
                  icon="keyboard_arrow_left"
                  class="WAL__drawer-open q-mr-sm"

              />
              <!--聊天框头部-->
              <q-btn round flat >
                <q-avatar >
                  <img :src="currentConversation.avatar" alt="">
                </q-avatar>
              </q-btn>
              <span class="q-subtitle-1 q-pl-md">
                {{ currentConversation.person }}
              </span>
              <!--空格-->
              <q-space/>
              <q-btn round flat icon="search" />
              <q-btn round flat>
                <q-icon name="attachment" class="rotate-135" />
              </q-btn>
              <q-btn round flat icon="more_vert">
                <q-menu auto-close :offset="[110, 0]">
                  <q-list style="min-width: 150px">
                    <q-item clickable>
                      <q-item-section>Contact data</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Block</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Select messages</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Silence</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Clear messages</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Erase messages</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-toolbar>
          </q-header>

          <q-drawer
              v-model="leftDrawerOpen"
              show-if-above
              bordered
              :breakpoint="690"
          >
            <q-toolbar class="bg-grey-1">
              <q-btn round flat icon="message" />
              <q-btn round flat icon="more_vert">
                <q-menu auto-close :offset="[110, 8]">
                  <q-list style="min-width: 150px">
                    <q-item clickable>
                      <q-item-section>New group</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Profile</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Archived</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Favorites</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Settings</q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>Logout</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-toolbar>

            <q-toolbar class="bg-grey-2">
              <q-input rounded outlined dense class="WAL__field full-width" bg-color="white" v-model="search" placeholder="输入名字">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-toolbar>
            <!--聊天列表-->
            <q-scroll-area style="height: calc(100% - 100px)">
              <q-list>
                <q-item
                    v-for="(conversation, index) in conversations"
                    :key="conversation.id"
                    clickable
                    v-ripple
                    @click="setCurrentConversation(index)"
                >
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="conversation.avatar">
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label lines="1">
                      {{ conversation.person }}
                    </q-item-label>
                    <q-item-label class="conversation__summary" caption>
                      <q-icon name="check" v-if="conversation.sent" />
                      <q-icon name="not_interested" v-if="conversation.deleted" />
                      {{ conversation.caption }}
                    </q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-item-label caption>
                      {{ conversation.time }}
                    </q-item-label>
                    <q-icon name="keyboard_arrow_down" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-drawer>
          <!--聊天内容-->
          <q-page-container  >
            <div style="width: 100%">
              <q-chat-message
                  label="Sunday, 19th"
              />

              <q-chat-message
                  name="me"
                  avatar="https://cdn.quasar.dev/img/avatar4.jpg"
                  :text="['hey, how are you?']"
                  sent
                  stamp="7 minutes ago"
              />
              <q-chat-message
                  :name="currentConversation.person"
                  :avatar="currentConversation.avatar"
                  :text="['doing fine, how r you?']"
                  stamp="4 minutes ago"
              />
            </div>
          </q-page-container>

          <q-footer>
            <q-toolbar class="bg-grey-3 text-black row">
              <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
              <q-input rounded outlined dense class="WAL__field col-grow q-mr-sm" bg-color="white" v-model="message" placeholder="" />
              <q-btn round flat icon="more_vert" />
            </q-toolbar>
          </q-footer>
        </q-layout>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'

const conversations = [
  {
    id: 1,
    person: 'Razvan Stoenescu',
    avatar: 'https://cdn.quasar.dev/team/razvan_stoenescu.jpeg',
    caption: 'I\'m working on Quasar!',
    time: '15:00',
    sent: true
  },
  {
    id: 2,
    person: 'Dan Popescu',
    avatar: 'https://cdn.quasar.dev/team/dan_popescu.jpg',
    caption: 'I\'m working on Quasar!',
    time: '16:00',
    sent: true
  },
  {
    id: 3,
    person: 'Jeff Galbraith',
    avatar: 'https://cdn.quasar.dev/team/jeff_galbraith.jpg',
    caption: 'I\'m working on Quasar!',
    time: '18:00',
    sent: true
  },
  {
    id: 4,
    person: 'Allan Gaunt',
    avatar: 'https://cdn.quasar.dev/team/allan_gaunt.png',
    caption: 'I\'m working on Quasar!',
    time: '17:00',
    sent: true
  }
]

export default {
  name: 'WhatsappLayout',

  setup () {
    const $q = useQuasar()

    const leftDrawerOpen = ref(false)
    const search = ref('')
    const message = ref('')
    const currentConversationIndex = ref(0)

    const currentConversation = computed(() => {
      console.log($q.screen.height)
      return conversations[ currentConversationIndex.value ]
    })

    const style = computed(() => ({
      height: $q.screen.height-50 + 'px',
    }))

   /* function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }*/

    function setCurrentConversation (index) {
      currentConversationIndex.value = index

    }

    return {
      leftDrawerOpen,
      search,
      message,
      currentConversationIndex,
      conversations,
      currentConversation,
      setCurrentConversation,
      style,

      // toggleLeftDrawer
    }
  }
}
</script>

<style lang="sass">
.WAL
  width: 100%
  height: 100%
  padding-top: 20px
  padding-bottom: 20px

  &:before
    content: ''
    height: 127px
    position: fixed
    top: 0
    width: 100%
    background-color: #009688



  &__field.q-field--outlined .q-field__control:before
    border: none

  .q-drawer--standard
    .WAL__drawer-close
      display: none

@media (max-width: 850px)
  .WAL
    padding: 0
    &__layout
      width: 100%
      border-radius: 0

@media (min-width: 691px)
  .WAL
    &__drawer-open
      display: none

.conversation__summary
  margin-top: 4px

.conversation__more
  margin-top: 0!important
  font-size: 1.4rem
</style>
