<template>
<div class="flex" :class="classes" >
    <slot></slot>
</div>
</template>

<script>
/**
 * A helper component for using flexbox. Basically it is just a div that
 * uses flexbox by default and it provides prop that handle basic flexbox
 * styling rules. For example, <Flex column></Flex> basically creates a 
 * div with the css rules:
 * {
 *   display: flex;
 *   flex-direction: column;
 * }
 *
 * Note that for click handlers you need to add the .native modifier so
 * that it adds an event listener to the root div in the template rather
 * than the compnent itself.
 */
export default {
    name: 'Flex',
    props: {
        // Specify the flex direction of the div. The default in flex
        // is 'row' unless this is specified
        column: {
            type: Boolean,
            default: false,
        },
        // Specify whether this element should grow...basically translates
        // to `flex: 1 1 auto;`
        auto: {
            type: Boolean,
            default: false,
        },
        // Specify the 'justify-content' attribute...should be either 'flex-start',
        // 'center', or 'flex-end'
        justify: {
            type: String,
        },
        // Specify the 'align-items' attribute...should be either 'flex-start',
        // 'center', or 'flex-end'
        align: {
            type: String,
        },
        // Specify the 'flex-wrap' property...defaults to 'no-wrap' if not supplied
        wrap: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        classes: function() {
            let classes = []
            this.column && classes.push('flex-col')
            this.auto && classes.push('flex-auto')
            this.justify && classes.push(`flex-justify__${this.justify}`)
            this.align && classes.push(`flex-align__${this.align}`)
            this.wrap && classes.push('flex-wrap')
            return classes
        }
    }
}
</script>

<style>
.flex {
    display: flex;
}
.flex-col {
    flex-direction: column;
}
.flex-auto {
    flex: 1 1 auto;
}
.flex-wrap {
    flex-wrap: wrap;
}
.flex-justify__start {
    justify-content: flex-start;
}
.flex-justify__center {
    justify-content: center;
}
.flex-justify__end {
    justify-content: flex-end;
}
.flex-align__start {
    align-items: flex-start;
}
.flex-align__center {
    align-items: center;
}
.flex-align__end {
    align-items: flex-end;
}
</style>
