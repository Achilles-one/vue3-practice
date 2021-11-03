<template>
<div>等级： {{ lvl }}</div>

<div class="board">
    <BoardItem 
    v-for="(cell, index) in cells" 
    :key="cell + '-' + index" 
    :icon="cell" 
    @mousedown="mousedown(index)"
    @mouseup="mouseup(index)"
    @mousemove="go(index)"
    :selected="checkRoad(index)"
    :closed="isRoadClosed(index)"
    />
</div>

<div @click="reload()" class="reload">重置等级</div>
</template>

<script>
import BoardItem from './BoardItem.vue'
import { ref } from 'vue'

export default {
    name: 'Board',
    components: { BoardItem },
    setup() {
        const cells = ref([3, 1, 0, 1, 0, 3, 0, 3, 2, 0, 0, 0, 2, 0, 0, 3]);
        const path = ref([])
        const size = ref(4)
        const closePath = ref([])
        const lvl = 1

        const mousedown = (index) => {
            path.value = []
            if(cells.value[index] && !isRoadClosed(index)) {
                path.value.push(index)
            } 
        }

        const mouseup = (index) => {
            if(index !== path.value[0] && cells.value[index] === cells.value[path.value[0]]) {
                closePath.value = closePath.value.concat(path.value)
            }
            path.value = []
            checkLvl()
        }

        
        const go = (index) => {
            if(path.value.length) {
                const lastIndex = path.value[path.value.length - 1]

                if((Math.abs(lastIndex - index) === 1 || Math.abs(lastIndex - index) === size.value) && !isRoadClosed(index)) {
                    path.value.push(index)
                }

                if(isRoadClosed(index) || (cells.value[index] && cells.value[index] !== cells.value[path.value[0]])) {
                    path.value = []
                }
            }
        }

        const checkRoad = (index) => {
            return path.value.findIndex(p => p === index) > -1
        }

        const isRoadClosed = (index) => {
            return closePath.value.findIndex(p => p === index) > -1
        }

        const start = (lvl) => {
            // ...
            if(lvl === 1) {
                cells.value = [3, 1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 3]
            }
            if(lvl === 2) {
                cells.value = [3, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 3]
            }

            size.value = 4
            path.value = []
            closePath.value = []
        }
        start()

        const reload = () => {
            start(lvl)
        }

        const checkLvl  = () => {
            let completed = true

            cells.value.forEach((cell, index) => {
                if(cell && !isRoadClosed(index)) {
                    completed = false
                }
            })

            if(completed) {
                alert('你赢了')
            }
        }

        return { cells, mousedown, mouseup, go, path, checkRoad, isRoadClosed, lvl, reload, checkLvl }
    }
}
</script>

<style>
.board {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    height: 200px;
    margin: 20px auto;
}
.reload {
    text-decoration: underline;
    cursor: pointer;
}
</style>