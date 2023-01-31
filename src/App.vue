<script setup>
import { db } from './services/firebase'
import { ref as dbRef, onValue, push, set, child } from 'firebase/database'
import { nextTick, onMounted, ref } from 'vue'

const chatroomRef = dbRef(db, 'chatroom')
const msgRef = dbRef(db, 'messages')

// const key = push(msgRef).key
// console.log(key)

// set(child(msgRef, key), {
//   message: 'Hello World',
// })

const chatroom = ref([])
const tempUsername = ref('')
const username = ref('')
const message = ref('')
const messageInput = ref(null)
const chatroomWindow = ref(null)

function setUsername() {
  username.value = tempUsername.value
  nextTick(() => {
    messageInput.value.focus()
  })
}

function addMessage() {
  if (!message.value.trim()) return
  if (!username.value.trim()) return

  const key = push(chatroomRef).key
  set(child(chatroomRef, key), {
    key,
    username: username.value,
    message: message.value,
    createdAt: new Date().getTime(),
  })

  message.value = ''
}

onMounted(() => {
  onValue(chatroomRef, snapshot => {
    const data = snapshot.val()
    console.log('[chatroomRef]snapshot:', data)
    chatroom.value = data
    console.log(chatroomWindow.value.scrollHeight)
    nextTick(() => {
      chatroomWindow.value.scrollTop = chatroomWindow.value.scrollHeight
    })
  })
})
</script>

<template>
  <div class="mx-auto w-80 rounded-md border border-white p-4">
    <div class="mb-2">Your username: {{ username }}</div>
    <div class="mb-4 flex items-center gap-x-2">
      <input
        class="rounded border-white px-3 py-2 ring-0"
        type="text"
        v-model="tempUsername"
        @keyup.enter="setUsername"
        placeholder="Enter your username..."
      />
      <button
        type="button"
        class="h-full flex-grow rounded py-2 transition hover:bg-gray-300 hover:text-gray-900"
        @click="setUsername"
      >
        Confirm
      </button>
    </div>
    <div class="mb-4 flex items-center gap-x-2">
      <input
        type="text"
        class="rounded border-white px-3 py-2 ring-0"
        v-model="message"
        @keyup.enter="addMessage"
        :disabled="!username"
        ref="messageInput"
      />
      <button
        class="h-full flex-grow rounded py-2 transition hover:bg-gray-300 hover:text-gray-900"
        type="button"
        @click="addMessage"
      >
        Send
      </button>
    </div>
    <ul
      class="grid h-full max-h-60 grid-cols-1 gap-y-2 overflow-y-auto pr-4 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded"
      ref="chatroomWindow"
    >
      <li
        class="flex gap-x-2"
        v-for="chat in chatroom"
        :key="chat.key"
      >
        <div
          class="mt-1 flex aspect-[1/1] h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-300"
        >
          <!-- <img
            class="h-full w-full"
            src="https://picsum.photos/128/128?random=1"
            alt="avatar"
          /> -->
          <div class="text-2xl font-semibold text-gray-900">
            {{ chat.username.slice(0, 1) }}
          </div>
        </div>
        <div class="flex-grow">
          <div>{{ chat.username }}</div>
          <p class="max-w-fit break-all rounded bg-gray-700 px-2 py-1">
            {{ chat.message }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
