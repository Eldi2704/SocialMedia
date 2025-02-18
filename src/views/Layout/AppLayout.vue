<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPosts } from "@/services/posts";
import CreatePost from "@/views/Posts/CreatePost.vue";

const posts = ref(null);

onMounted(async () => {
  try {
    const data = await getPosts();
    console.log("Post data:", data.result.data);
    posts.value = data.result.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});

import { ref } from "vue";

const showModal = ref(false);

const handlePostCreated = () => {
  showModal.value = false;
};
</script>

<template>
  <div class="w-full flex flex-row flex-wrap">
    <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="w-full bg-indigo-100 h-screen flex flex-row flex-wrap justify-center">
      <!-- Begin Navbar -->
      <div class="bg-white shadow-lg border-t-4 border-indigo-500 absolute bottom-0 w-full md:w-0 md:hidden flex flex-row flex-wrap">
        <div class="w-full text-right">
          <button class="p-2 fa fa-bars text-4xl text-gray-600"></button>
        </div>
      </div>

      <div class="w-0 md:w-1/5 lg:w-1/6 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
        <div class="p-4 bg-white sticky top-0">
          <img class="border border-indigo-100 shadow-lg round w-14 h-14" src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg" alt="">
          <div class="pt-2 border-t mt-3 w-full text-center text-sm text-gray-600">
            Some Person
          </div>
        </div>
        <div class="w-full h-screen antialiased flex flex-col hover:cursor-pointer">
          <a class="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-sm text-left text-gray-600 font-semibold" href=""><i class="fa fa-comment text-gray-600 text-lg pr-1 pt-1 float-right"></i>Messages</a>
          <a class="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-sm text-left text-gray-600 font-semibold" href=""><i class="fa fa-cog text-gray-600 text-lg pr-1 pt-1 float-right"></i>Settings</a>
          <a class="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-sm text-left text-gray-600 font-semibold" href=""><i class="fa fa-arrow-left text-gray-600 text-lg pr-1 pt-1 float-right"></i>Log out</a>
        </div>
      </div>

      <!-- End Navbar -->

      <div class="w-full md:w-4/5 lg:w-5/6 p-5 md:px-12 lg:24 h-full overflow-x-scroll antialiased">
        <div class="w-full flex items-center bg-white shadow rounded-lg p-3 cursor-pointer" @click="showModal = true">
          <!-- Profile Picture -->
          <img class="w-12 h-12 rounded-full mr-3" src="http://lilithaengineering.co.za/wp-content/uploads/2017/08/person-placeholder.jpg" alt="User Avatar">
          
          <!-- Placeholder Text -->
          <div class="flex-grow bg-gray-100 text-gray-500 px-4 py-2 rounded-lg">
            What's on your mind?
          </div>
        </div>

        <!-- Modal Component -->
        <CreatePost
          :showModal="showModal"
          @close="showModal = false"
          @postCreated="handlePostCreated"
        />

        <div class="mt-3 flex flex-col">
          <div v-for="post in posts" :key="post.id">
            <div class="bg-white mt-3">
              {{ post.user.firstname }} {{ post.user.lastname }}
              <br>
              {{ post.title }}
              <br>
              {{ post.content.status }}
              <img class="border rounded-t-lg shadow-lg" :src="post.content.image" alt="Post Image">
            </div>

            <div class="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
              <div class="bg-white p-1 border shadow flex flex-row flex-wrap">
                <div class="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
                <div class="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
                <div class="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
              </div>

              <div class="bg-white border-4 border-white rounded-b-lg shadow p-5 text-xl text-gray-700 content-center font-semibold flex flex-row flex-wrap">
                <div class="w-full">
                  <div class="w-full text-left text-xl text-gray-600">
                    @Some Person
                  </div>
                  A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
                  A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white mt-3">
            <img class="border rounded-t-lg shadow-lg" src="https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
            <div class="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
              A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
            </div>
            <div class="bg-white p-1 rounded-b-lg border shadow flex flex-row flex-wrap">
              <div class="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
              <div class="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
              <div class="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
            </div>
          </div>

          <div class="bg-white mt-3">
            <img class="border rounded-t-lg shadow-lg" src="https://images.unsplash.com/photo-1572817519612-d8fadd929b00?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
            <div class="bg-white border shadow p-5 text-xl text-gray-700 font-semibold">
              A Pretty Cool photo from the mountains. Image credit to @danielmirlea on Unsplash.
            </div>
            <div class="bg-white p-1 rounded-b-lg border shadow flex flex-row flex-wrap">
              <div class="w-1/3 hover:bg-gray-200 text-center text-xl text-gray-700 font-semibold">Like</div>
              <div class="w-1/3 hover:bg-gray-200 border-l-4 border-r- text-center text-xl text-gray-700 font-semibold">Share</div>
              <div class="w-1/3 hover:bg-gray-200 border-l-4 text-center text-xl text-gray-700 font-semibold">Comment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.round {
  border-radius: 50%;
}
</style>
