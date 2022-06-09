<template>
  <div class="Loader-box">
    <div class="Loader-scrolling">
      <hr/>
      <hr/>
      <hr/>
      <hr/>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
.Loader-box {
  position: relative;
}
.Loader-scrolling {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
}

.Loader-scrolling hr {
  border: 0;
  margin: 0;
  width: 40%;
  height: 40%;
  position: absolute;
  border-radius: 50%;
  animation: spin 2s ease infinite
}

.Loader-scrolling :first-child {
  background: #17c5a5;
  animation-delay: -1.5s
}

.Loader-scrolling :nth-child(2) {
  background: #ef5350;
  animation-delay: -1s
}

.Loader-scrolling :nth-child(3) {
  background: #eca75a;
  animation-delay: -0.5s
}

.Loader-scrolling :last-child {
  background: #31718a
}

@keyframes spin {
  0%, 100% {
    transform: translate(0)
  }
  25% {
    transform: translate(160%)
  }
  50% {
    transform: translate(160%, 160%)
  }
  75% {
    transform: translate(0, 160%)
  }
}
</style>
