<template>
<div class="el-input">
    <input
        type="text"
        class="el-input__inner"
        :placeholder="placeholder"
        :value="value"
        @change="onChange"
        @keyup.enter="onEnter"
    />
</div>
</template>

<script>
/**
 * Necesarry component because element-ui's event handling on inputs is trash
 * Note that it is controlled rather than using v-model so that the parent
 * can access the input value. Instead of using v-model we bind to :value and
 * use the @change event handler to execute a function prop, passing in the
 * current value stored in the input.
 */
export default {
    props: {
        // Function prop that gets executed when the user changes the state of
        // the input. We pass in the input's new value
        onChange: {
            type: Function,
            required: true,
        },
        // String prop for the inputs placeholder
        placeholder: {
            type: String,
            default: '',
        },
        // Current value of the input - remember this is stored in the data of
        // parent (or even further up the component hierarchy)
        value: {
            type: String,
            required: true,
        },
        // Function handler for when the user presses enter
        onEnter: {
            type: Function,
            default: function() {
                return () => {}
            }
        },
    }
}
</script>
