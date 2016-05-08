<style scoped>
</style>

<template>
    <canvas id="{{ mount }}" v-el:chart></canvas>
</template>

<script>
    module.exports = {
        props: {
            type: {
                default: 'bar'
            },

            data: {
                default: ''
            },
            mount: {
                default: 'default'
            },
            options: {}
        },

        watch: {
            'data': function() {

                var context = document.querySelector('#' + this.mount).getContext('2d');

                new Chart(context,{
                    type: this.type,
                    data: this.data,
                    options: this.options,
                });
            }
        }
    }
</script>
