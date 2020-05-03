<template>
  <div class="tab">
    <cube-tab-bar
      :useTransition=false
      :showSlider=true
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
        <cube-slide-item>
          <goods v-bind:sellerid="this.id"></goods></cube-slide-item>
        <cube-slide-item><ratings></ratings></cube-slide-item>
        <cube-slide-item><sellerinfo></sellerinfo></cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
  import goods from '../goods'
  import ratings from '../ratings'
  import sellerinfo from '../sellerinfo'
  export default {
    name: 'tab',
    props: {
      initialIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        id: this.$route.query.id,
        index: this.initialIndex,
        tabs: [{
          label: '商品'
        }, {
          label: '评价'
        }, {
          label: '商家'
        }],
        slideOptions: {
          listenScroll: true,
          probeType: 3,
          directionLockThreshold: 0
        }
      }
    },
    components: {
      goods, ratings, sellerinfo
    },
    computed: {
      selectedLabel: {
        get() {
          return this.tabs[this.index].label
        },
        set(newVal) {
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
    },
    mounted() {
      this.onChange(this.index)
      this.refresh()
    },
    methods: {
      onScroll(pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        this.$refs.tabBar.setSliderTransform(transform)
      },
      onChange(current) {
        this.index = current
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/variable.styl"
  .tab
    position relative
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
