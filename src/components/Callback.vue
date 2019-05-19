
<template>
    <div>
        <p>Loading...</p>
    </div>
</template>

<script>
    export default {
        methods: {
            handleLoginEvent(data) {
                this.$router.push(data.state.target || "/");
            }
        },
        created() {
            let access_token = location.hash.substr(1).split("=")[1];
            this.$auth.setAccessToken(access_token);
            this.$auth.handleAuthentication();
        }
    };
</script>