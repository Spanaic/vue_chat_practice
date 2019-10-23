<template>
  <main>
    <div class="chat">
      <div class="conversation">
        <ul class="conversation_inner">
          <li v-for="(list,i) in messageLists" :key="i">
            <div class="conversation_user-image"><img src="list.profilePicUrl" alt=""></div>
            <div class="conversation_col">
              <div class="conversation_user-name"> {{list.name}} </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>