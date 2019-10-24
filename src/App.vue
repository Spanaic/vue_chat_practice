<template>
  <div id="app">
    <header class="header">
      <div class="header_inner">
        <template v-if="isSignedIn && userName && userPic">
          <!-- 認証が出来ればデータベースから受け取ったデータを表示させるv-if文 -->
            <div class="header_user-image"><img src="userPic"></div>
            <p class="header_user-name"> {{ userName }} </p>
        </template>
        <!-- 認証がなければ、認証を促すボタンを表示する -->
        <button class="header_auth-button" @click="authFunction">
          {{ authButtonText }}
        </button>
      </div>
    </header>

    <router-view
      :isSignedIn="isSignedIn"
      :userName="userName"
      :userPic="userPic"
    ></router-view>
    <!-- router-viewについてはもう一度学ぶ必要がある -->
    <!-- router-view内で子コンポーネントに値を渡しているみたい -->
    <!-- propsではないところに注目 -->

  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      userName: null,
      userPic: null,
      isSignedIn: null,
      authButtonText: null,
      authFunction(){}
    }
  },
  // dataの中は基本的な初期値を入力する。authFundtionのような関数は関数の初期値を記述
  created () {
    this.onAuthStateChanged()
  },
  // ライフサイクルの一つであるcreatedは関数である。Stateなのでmutationに定義された関数をcreatedのタイミングで呼び出している
  // methods以下の内容はfirebaseのauth認証の決り文句なのでコピペでご勘弁。(firebaseを使用する際は内容をしっかり勉強する必要有り)
  methods: {
    onAuthStateChanged () {
      firebase.auth().onAuthStateChanged( user => {
        this.userName = user ?
          this.getUserName() : null
        this.userPic = user ?
          this.getProfilePicUrl() : null
        this.authButtonText = user ?
          'Sign-out' : 'Sign-in with Google'
        this.authFunction = user ?
          this.signOut : this.signIn
        this.isSignedIn = user ?
          true : false
      })
    },
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signOut () {
      firebase.auth().signOut()
    },
    isUserSignedIn () {
      return !!firebase.auth().currentUser || false;
    },
    getProfilePicUrl () {
      return firebase.auth().currentUser.photoURL || '/static/images/profile_placeholder.png';
    },
    getUserName () {
      return firebase.auth().currentUser.displayName;
    }
  }
}
</script>

<style lang="scss">
  body {
    background-color: #ECEFF1;
  }
  .header {
    background-color: #009CE5;
    &__inner {
      width: 90%;
      height: 70px;
      margin: 0 auto;
      display: flex;
      align-items: center;
    }
    &__user-image {
      position: relative;
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    &__user-name {
      margin: 0 15px;
      color: #FFF;
    }
    &__auth-button {
      background: #FFF;
      border: none;
      border-radius: 50px;
      padding: 5px 10px;
      color: #009CE5;
    }
  }
</style>