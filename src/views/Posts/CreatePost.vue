<script setup>
import { defineProps, defineEmits, reactive, watch, onMounted } from "vue";
import axios from "axios";

const props = defineProps({
  showModal: Boolean, 
});

const emit = defineEmits(["close", "postCreated"]);

const form = reactive({
  title: "",
  content: "", 
  likes: 0,
});

const userIds = reactive([]);

const fetchUserIds = async () => {
  try {
    const response = await axios.get("/api/users");
    userIds.push(...response.data.data.map(user => user.id));
    if (userIds.length > 0) {
      form.user_id = userIds[0];
    }
  } catch (error) {
    console.error("Error fetching user IDs:", error);
  }
};


onMounted(() => {
  fetchUserIds();
});


const submitPost = async () => {
  try {
    await axios.post("/api/posts", form);
    emit("postCreated");
    resetForm();
  } catch (error) {
    console.error("Error submitting post:", error);
  }
};

const resetForm = () => {
  form.title = "";
  form.content = ""; 
  form.likes = 0;
  emit("close"); 
};
</script>

<template>
  <transition name="fade">
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="create-post-container bg-white rounded-xl shadow-2xl w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12 overflow-hidden">
        <div class="header p-6 bg-gradient-to-r from-indigo-600 to-blue-500">
          <h2 class="text-2xl font-bold text-white text-center">Create Post</h2>
        </div>
        <div class="editor p-6">
          <input
            v-model="form.title"
            class="title w-full border rounded-lg p-3 mb-6"
            placeholder="Enter a title..."
            type="text"
          />
          <textarea
            v-model="form.content"
            class="content w-full border rounded-lg p-3 mb-6"
            placeholder="Write your content here..."
            rows="4"
          ></textarea>
          
          <div class="buttons flex justify-end gap-4 mt-6">
            <button @click="resetForm" class="btn px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button @click="submitPost" class="btn px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg">Post</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
