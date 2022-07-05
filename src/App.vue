<script setup>
import ACatalog from '~/components/catalog/ACatalog.vue'
import ACart from '~/components/cart/ACart.vue'
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <main class="wrapper__content">
        <ACart />

        <ACatalog />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

  html {
    font-family: 'Lato', sans-serif;
  }

  h1, h2, h3, h4 {
    margin: 0;
  }

  h3 {
    line-height: 30px;
  }

  .a-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 30px;
    border: none;
    background-color: black;
    color: white;
    font-weight: 700;
    transition: all ease-in-out .3s;
    box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);

    &:hover, &:focus {
      background-color: white;
      color: black;
    }
  }

  .a-btn--reverse {
    background-color: white;
    color: black;

    &:hover, &:focus {
      background-color: black;
      color: white;
    }
  }

  .a-btn--disabled {
    pointer-events: none;
  }

  .container {
    max-width: 1270px;
    width: 90%;
    margin:  0 auto;
  }

  .wrapper {
    min-height: 100vh;
    padding: 60px 0;

    &__content {
      display: flex;
      flex-direction: column;
    }
  }
</style>
