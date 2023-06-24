<template>
    <block v-for="(item, index) of data" :key="item">
        <text
            v-if="item['type1'] === 'text'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="clickName(item['@tap'])"
        >
            {{ item["text"] }}
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </text>

        <view
            v-else-if="item['type1'] === 'view'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="clickName(item['@tap'])"
        >
            <text v-if="item['text']">{{ item["text"] }}</text>
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </view>

        <scroll-view
            v-else-if="item['type1'] === 'scroll-view'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            @tap="clickName(undefined, item['@tap'])"
            scroll-y="true"
            @scrolltoupper="clickName($event, item['@scrolltoupper'])"
            @scrolltolower="clickName($event, item['@scrolltolower'])"
            @scroll="clickName($event, item['@scroll'])"
        >
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </scroll-view>

        <swiper
            v-else-if="item['type1'] === 'swiper'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
            :autoplay="mini_Data['autoplay']"
            :interval="mini_Data['interval']"
            :duration="mini_Data['duration']"
            :indicator-dots="mini_Data['indicatorDots']"
        >
            <template v-if="item['children'].length !== 0">
                <swiper-item v-for="(item2, index2) in item['children']">
                    <templateCom
                        :data="item2['children']"
                        :dataInfo="dataInfo"
                    ></templateCom>
                </swiper-item>
            </template>
        </swiper>

        <swiper-item
            v-else-if="item['type1'] === 'swiper-item'"
            :id="item['id']"
            :class="item['class']"
            :style="item['style']"
        >
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </swiper-item>

        <icon
            v-else-if="item['type1'] === 'icon'"
            :id="item['id']"
            :type="item['type']"
            :size="item['size']"
            :class="item['class']"
            :style="item['style']"
        >
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </icon>

        <button
            v-else-if="item['type1'] === 'button'"
            :id="item['id']"
            :type="item['type']"
            :size="item['size']"
            :class="item['class']"
            :style="item['style']"
        >
            {{ item["text"] }}
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </button>

        <template v-else-if="item['type1'] === 'input'">
            <input :id="item['id']" :type="item['type']" :class="item['class']"
            :style="item['style']" :placeholder="item['placeholder']"
             :password="item['password']" />
            
            <template v-if="item['children'].length !== 0">
                <templateCom
                    :data="item['children']"
                    :dataInfo="dataInfo"
                ></templateCom>
            </template>
        </template>
    </block>
</template>
<script>
import { onMounted } from "vue";
import bus from "../pages/index/mitt.js";
import { ref, getCurrentInstance, reactive, toRaw } from "vue";
export default {
    name: "templateCom",
    props: {
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        dataInfo: {
            type: Object,
            default() {
                return {};
            },
        },
        method: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    setup(props) {
        let { proxy } = getCurrentInstance();
        let _this = proxy;
        let scrollY = "scroll-y";
        let scrollX = "scroll-x";
        let indicatorDots = "indicator-dots";
        // let data = props.dataInfo;
        let mini_Data = toRaw(props.dataInfo);
        console.log("==========", mini_Data);

        //时间总线的方式处理点击问题
        const clickName = (e, name) => {
            bus.emit(name, e);
        };
        return { clickName, scrollY, scrollX, indicatorDots, mini_Data };
    },
};
</script>

<style lang="scss" scoped></style>