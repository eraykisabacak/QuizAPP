<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style scoped>
.container {
  width: 940px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
}
</style>