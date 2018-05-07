<template>
    <div>
        <span class="count">{{count}}</span>
        <button class="increment" v-on:click="incrementCount">Increment</button>
        <span class="message">{{message}}</span>
    </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        message: '',
        count: 0,
      }
    },
    methods: {
      incrementCount () {
        const self = this
        self.count++
        axios.post('/count', {
          value: self.count,
        }).then(() => {
          self.message = 'Saved'
        })
      }
    }
  }
</script>