<template>
  <svg :class="svgClass" aria-hidden="true">
    <!-- 这个类跟阿里里面内置的保持一致 -->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
//要用3.0必须要引入的东西
//这个@是固定写法
import { ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  //接收父组件传过来的值
  props: {
    iconClass: {
      type: String, //定义值的接收类型
      default: ""
    },
    className: {
      type: String, //定义值的接收类型
      default: ""
    }
  },
  //setup初始化的时候,props已经被注入进来了
  setup(props) {
    //这边就可以在props里面拿到父组件传过来的值
    //父组件传过来的是图标类名
    // console.log(props.iconClass);
    // 这个是自定义的可以不传
    // console.log(props.className);
    //定义单个变量用ref

    //用计算属性将父组件传过来的类名进行拼接然后使用
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
// .svg-icon每个图标的自定义基类
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color:#fff;
  //特有的类
  // &.menu {
  //   font-size: 100px;
  // }
}
</style>